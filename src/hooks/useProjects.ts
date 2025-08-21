import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProject,
  deleteProject,
  getProjects,
} from "../services/projects";
import { useAuth } from "../contexts/AuthContext";

const projectKeys = {
  all: ["projects"] as const,
  lists: (userId?: string) => [...projectKeys.all, "list", userId] as const,
};

// Get all projects
export const useProjects = () => {
  const { user, loading } = useAuth();

  return useQuery({
    queryKey: projectKeys.lists(user?.id),
    queryFn: getProjects,
    enabled: !!user && !loading,
  });
};

export const useCreateProject = (options?: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists(user?.id) });

      options?.onSuccess?.();
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
};

export const useDeleteProjectById = (
  id: string,
  options?: {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
  }
) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: () => deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists(user?.id) });

      options?.onSuccess?.();
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
