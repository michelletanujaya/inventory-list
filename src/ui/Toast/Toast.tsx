import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Close } from "../icons";
import IconButton from "../IconButton";

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const ToastContainer = styled.div<{
  variant: "success" | "error";
  isVisible: boolean;
}>`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  padding: 12px 16px;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  font-weight: 500;
  max-width: 300px;
  min-width: 200px;
  animation: ${({ isVisible }) => (isVisible ? slideIn : slideOut)} 0.3s
    ease-in-out;
  background-color: ${({ variant }) =>
    variant === "success" ? "#22c55e" : "#ef4444"};
  border: 1px solid
    ${({ variant }) => (variant === "success" ? "#16a34a" : "#dc2626")};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const ToastMessage = styled.div`
  flex: 1;
`;

export interface ToastProps {
  message: string;
  variant: "success" | "error";
  onClose: () => void;
  duration?: number;
  hasCloseButton?: boolean;
}

const Toast: React.FC<ToastProps> = ({
  message,
  variant,
  onClose,
  duration = 5000,
  hasCloseButton = false,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for animation to complete
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <ToastContainer variant={variant} isVisible={isVisible}>
      <ToastMessage>{message}</ToastMessage>
      {hasCloseButton && (
        <IconButton
          variant="inverse"
          aria-label="Close"
          size="x-small"
          icon={<Close />}
          onClick={handleClose}
        />
      )}
    </ToastContainer>
  );
};

export default Toast;
