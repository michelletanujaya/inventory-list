import { useState } from "react";
import { IconButton } from "../../ui/IconButton";
import { Delete } from "../../ui/icons";
import { Modal } from "../../ui/Modal";
import Button from "../../ui/Button";
import { useDeleteLogByDate } from "../../hooks/useLogs";
import { useToast } from "../Toast";
import { Alert } from "../../ui/Alert";
import { ConfirmationModal } from "../../ui/ConfirmationModal";

const DeleteLogButton = ({ logDate }: { logDate: string }) => {
  const [open, setOpen] = useState(false);
  const { showSuccess, showError } = useToast();
  const deleteLog = useDeleteLogByDate({
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
      <IconButton
        icon={<Delete />}
        aria-label="Delete log"
        size="small"
        onClick={() => setOpen(true)}
        variant="secondary"
      />
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
