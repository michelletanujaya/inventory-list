import { useState } from "react";
import Button from "../../ui/Button";
import LogDayModal from "./LogDayModal";
import { useProjectId } from "../../hooks/useProjectId";
import { Plus } from "../../ui/icons";
import { usePermissions } from "../../hooks/usePermissions";

const LogDayButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const projectId = useProjectId();
  const { data: permissions } = usePermissions(projectId);

  if (!permissions?.can_add) {
    return null;
  }

  const handleLogDay = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Button onClick={handleLogDay} variant="primary" icon={<Plus />}>
        Log Day
      </Button>
      <LogDayModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        projectId={projectId}
      />
    </>
  );
};

export default LogDayButton;
