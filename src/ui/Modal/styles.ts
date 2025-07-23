import styled, { keyframes } from "styled-components";

// Animation keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Modal backdrop/overlay
export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.2s ease;
`;

// Modal content container
export const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  max-height: 90vh;
  min-width: 360px;

  animation: ${slideIn} 0.3s ease;
  position: relative;
  padding: 1rem;
  gap: 1rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 95%;
    max-width: none;
    margin: 1rem;
  }
`;

// Modal header
export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

// Modal title
export const ModalTitle = styled.h5`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
`;

// Modal body
export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.875rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;
