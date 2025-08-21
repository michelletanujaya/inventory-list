import { useState } from "react";
import { useDeleteLogByDate } from "../../hooks/useLogs";
import { useToast } from "../../ui/Toast";
import { Alert } from "../../ui/Alert";
import ConfirmationModal from "../../ui/ConfirmationModal";
import { useProjectId } from "../../hooks/useProjectId";
import Button from "../../ui/Button";

const DeleteLogButton = ({ logDate }: { logDate: string }) => {
  const projectId = useProjectId();
  const [open, setOpen] = useState(false);
  const { showSuccess, showError } = useToast();
  const deleteLog = useDeleteLogByDate(projectId, {
    onSuccess: () => {
      showSuccess("Log deleted successfully!");
      setOpen(false);
    },
    onError: () => {
      showError("Failed to delete log");
      setOpen(false);
    },
  });

  const handleDelete = () => {
    deleteLog.mutate(logDate);
  };

  return (
    <>
      <Button
        size="small"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
        variant="secondary"
      >
        Delete
      </Button>
      <ConfirmationModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
        title="Delete Log"
        confirmText="Delete"
        variant="danger"
      >
        <Alert
          variant="error"
          title="Are you sure you want to delete this log?"
          message="This action cannot be undone."
        />
      </ConfirmationModal>
    </>
  );
};

export default DeleteLogButton;
