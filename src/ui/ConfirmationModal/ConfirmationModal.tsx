import React from "react";
import { Modal } from "../Modal";
import Button from "../Button";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  variant?: "danger" | "warning" | "info";
  children?: React.ReactNode;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading = false,
  variant = "danger",
  children,
}) => {
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      actions={
        <>
          <Button onClick={onClose} variant="secondary" disabled={isLoading}>
            {cancelText}
          </Button>
          <Button
            onClick={handleConfirm}
            variant={variant === "danger" ? "danger" : "primary"}
            disabled={isLoading}
            isLoading={isLoading}
          >
            {confirmText}
          </Button>
        </>
      }
    >
      {children}
    </Modal>
  );
};
