import React, { useEffect } from "react";
import {
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalActions,
} from "./styles";
import { IconButton } from "../IconButton/IconButton";
import { Close } from "../icons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className = "",
  actions,
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalBackdrop
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <ModalContent className={className}>
        <ModalHeader>
          <ModalTitle id="modal-title">{title}</ModalTitle>
          <IconButton aria-label="Close" icon={<Close />} onClick={onClose} />
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
        {actions && <ModalActions>{actions}</ModalActions>}
      </ModalContent>
    </ModalBackdrop>
  );
};
