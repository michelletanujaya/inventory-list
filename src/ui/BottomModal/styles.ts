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

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Modal backdrop/overlay
export const BottomModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.2s ease;
`;

// Modal content container
export const BottomModalContent = styled.div`
  background: white;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  box-shadow: 0 -10px 25px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  animation: ${slideUp} 0.3s ease;
  position: relative;

  @media (max-width: 768px) {
    max-width: 100%;
    border-radius: 0;
    max-height: 90vh;
  }
`;

// Modal header with drag handle
export const BottomModalHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 1.5rem 0.5rem 1.5rem;
  position: relative;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

// Drag handle indicator
export const DragHandle = styled.div`
  width: 40px;
  height: 4px;
  background-color: #d1d5db;
  border-radius: 2px;
  margin-bottom: 1rem;
  cursor: pointer;
`;

// Modal title row
export const BottomModalTitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

// Modal title
export const BottomModalTitle = styled.h5`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
`;

// Modal body
export const BottomModalBody = styled.div`
  padding: 0.5rem 1.5rem 1.5rem 1.5rem;

  @media (max-width: 768px) {
    padding: 0.5rem 1rem 1rem 1rem;
  }
`;
