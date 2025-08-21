import { Project, ProjectInsert, supabase } from "../lib/supabase";

export const getProjects = async () => {
  const { data, error } = await supabase.from("projects").select("*");

  if (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }

  return data;
};

export const createProject = async (
  project: ProjectInsert
): Promise<Project> => {
  const { data, error } = await supabase.rpc("create_project_and_link_user", {
    p_project_name: project.name,
    p_project_description: project.description,
  });

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
};

export const deleteProject = async (id: string) => {
  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw error;
  }
};
