import { useState } from "react";
import Button from "../../ui/Button";
import NewProjectModal from "./NewProjectModal";
import { Plus } from "../../ui/icons";

interface NewProjectButtonProps {
  children: React.ReactNode;
}

const NewProjectButton = ({ children }: NewProjectButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleNewProject = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Button onClick={handleNewProject} variant="primary" icon={<Plus />}>
        {children}
      </Button>
      <NewProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default NewProjectButton;
