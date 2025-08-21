import styled from "styled-components";
import { Project } from "../../lib/supabase";
import { OverflowMenu } from "../../ui/OverflowMenu";
import { Delete, Eye } from "../../ui/icons";
import { useRouter } from "next/router";
import { useCurrentUserPermissions } from "../../hooks/usePermissions";
import { useState } from "react";
import { useToast } from "../../ui/Toast";
import ConfirmationModal from "../../ui/ConfirmationModal";
import { Alert } from "../../ui/Alert";
import { useDeleteProjectById } from "../../hooks/useProjects";

const StyledProjectCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  gap: 0.75rem;
  text-align: left;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const ProjectName = styled.span`
  color: var(--text-primary);
  font-size: 1.2rem;
  font-weight: 600;
`;

const ProjectDescription = styled.div`
  color: var(--text-secondary);
  font-size: 0.875rem;
`;

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const { id: projectId, name, description } = project;

  const { showSuccess, showError } = useToast();
  const { permissions } = useCurrentUserPermissions(projectId);

  // Guard components
  // {permissions.canRead && <ViewData />}

  const deleteProject = useDeleteProjectById(projectId, {
    onSuccess: () => {
      showSuccess("Project deleted successfully");
    },
    onError: (error) => {
      showError("Failed to delete project");
    },
  });

  const handleOpenDeleteModal = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleConfirm = async () => {
    try {
      await deleteProject.mutateAsync();
      setIsOpen(false);
      showSuccess("Project deleted successfully");
    } catch (error) {
      showError("Failed to delete project");
    }
  };

  const menuItems = [
    {
      id: "view",
      label: "View",
      icon: <Eye />,
      onClick: () => router.push(`/project/${projectId}`),
    },
    ...(permissions.canDelete
      ? [
          {
            id: "delete",
            label: "Delete",
            icon: <Delete />,
            onClick: handleOpenDeleteModal,
            destructive: true,
          },
        ]
      : []),
  ];

  return (
    <>
      <StyledProjectCard key={projectId}>
        <div>
          <ProjectName>{name}</ProjectName>
          <ProjectDescription>{description}</ProjectDescription>
        </div>

        <OverflowMenu items={menuItems} placement="bottom-end" />
      </StyledProjectCard>
      <ConfirmationModal
        isOpen={isOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        title="Delete Project"
        confirmText="Delete"
        variant="danger"
      >
        <Alert
          variant="error"
          title="Are you sure you want to delete this project?"
          message="This action cannot be undone."
        />
      </ConfirmationModal>
    </>
  );
};

export default ProjectCard;
