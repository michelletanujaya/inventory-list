import { useState } from "react";
import { IconButton } from "../../ui/IconButton";
import { Delete } from "../../ui/icons";
import { ConfirmationModal } from "../../ui/ConfirmationModal";
import { useDeleteInventoryById } from "../../hooks/useInventories";
import { useToast } from "../Toast";
import { Alert } from "../../ui/Alert";

interface DeleteTypeButtonProps {
  itemId: string;
}

const DeleteTypeButton = ({ itemId }: DeleteTypeButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { showSuccess, showError } = useToast();

  const deleteInventory = useDeleteInventoryById(itemId);

  const handleDeleteClick = () => setIsOpen(true);
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
      <IconButton
        aria-label="Delete"
        icon={<Delete />}
        onClick={handleDeleteClick}
        size="small"
      />
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

export default DeleteTypeButton;
