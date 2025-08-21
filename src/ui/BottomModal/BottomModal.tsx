import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import {
  BottomModalBackdrop,
  BottomModalContent,
  BottomModalHeader,
  DragHandle,
  BottomModalTitleRow,
  BottomModalTitle,
  BottomModalBody,
} from "./styles";
import IconButton from "../IconButton";
import { Close } from "../icons";

interface BottomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
  showDragHandle?: boolean;
}

export const BottomModal: React.FC<BottomModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className = "",
  showDragHandle = true,
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

  const handleDragHandleClick = () => {
    onClose();
  };

  const modalContent = (
    <BottomModalBackdrop
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="bottom-modal-title"
    >
      <BottomModalContent className={className}>
        <BottomModalHeader>
          {showDragHandle && (
            <DragHandle onClick={handleDragHandleClick} title="Close modal" />
          )}
          <BottomModalTitleRow>
            <BottomModalTitle id="bottom-modal-title">{title}</BottomModalTitle>
            <IconButton
              aria-label="Close"
              icon={<Close />}
              onClick={onClose}
              size="medium"
              variant="ghost"
            />
          </BottomModalTitleRow>
        </BottomModalHeader>
        <BottomModalBody>{children}</BottomModalBody>
      </BottomModalContent>
    </BottomModalBackdrop>
  );

  // Render modal in a portal to escape parent container constraints
  return createPortal(modalContent, document.body);
};
