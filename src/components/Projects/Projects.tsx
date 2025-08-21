import React from "react";
import styled from "styled-components";
import { QueryBoundary } from "../QueryBoundary/QueryBoundary";
import NewProjectButton from "./NewProjectButton";
import EmptyState from "../../ui/EmptyState";
import ProjectCard from "./ProjectCard";
import { useProjects } from "../../hooks/useProjects";

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const ProjectList: React.FC = () => {
  const projectQuery = useProjects();

  return (
    <QueryBoundary query={projectQuery}>
      {({ data: projects }) => {
        if (!projects || projects.length === 0) {
          return (
            <EmptyState
              title="No projects yet"
              description="Start managing your projects by adding your first project."
              action={<NewProjectButton>Create New Project</NewProjectButton>}
            />
          );
        }

        return (
          <ProjectGrid>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </ProjectGrid>
        );
      }}
    </QueryBoundary>
  );
};

export default ProjectList;
