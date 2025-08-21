import { useState } from "react";
import ConfirmationModal from "../../ui/ConfirmationModal";
import { useDeleteInventoryById } from "../../hooks/useInventories";
import { useToast } from "../../ui/Toast";
import { Alert } from "../../ui/Alert";
import { useProjectId } from "../../hooks/useProjectId";
import { usePermissions } from "../../hooks/usePermissions";
import Button from "../../ui/Button";

interface DeleteInventoryButtonProps {
  itemId: string;
}

const DeleteInventoryButton = ({ itemId }: DeleteInventoryButtonProps) => {
  const projectId = useProjectId();
  const { data: permissions } = usePermissions(projectId);
  const [isOpen, setIsOpen] = useState(false);
  const { showSuccess, showError } = useToast();

  const deleteInventory = useDeleteInventoryById(itemId, projectId, {
    onSuccess: () => {
      showSuccess("Inventory deleted successfully");
    },
    onError: (error) => {
      showError("Failed to delete inventory");
    },
  });

  if (!permissions?.can_delete) {
    return null;
  }

  const handleOpenModal = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const handleConfirm = async () => {
    try {
      await deleteInventory.mutateAsync();
      setIsOpen(false);
      showSuccess("Inventory deleted successfully");
    } catch (error) {
      showError("Failed to delete inventory");
    }
  };

  return (
    <>
      <Button variant="secondary" onClick={handleOpenModal}>
        Delete
      </Button>
      <ConfirmationModal
        isOpen={isOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        title="Delete Type"
        confirmText="Delete"
        variant="danger"
      >
        <Alert
          variant="error"
          title="Are you sure you want to delete this type?"
          message="This action cannot be undone."
        />
      </ConfirmationModal>
    </>
  );
};

export default DeleteInventoryButton;
