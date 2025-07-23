import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

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

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export interface ToastProps {
  message: string;
  variant: "success" | "error";
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({
  message,
  variant,
  onClose,
  duration = 5000,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for animation to complete
  };

  return (
    <ToastContainer variant={variant} isVisible={isVisible}>
      <ToastMessage>{message}</ToastMessage>
      <CloseButton onClick={handleClose}>×</CloseButton>
    </ToastContainer>
  );
};

export default Toast;
