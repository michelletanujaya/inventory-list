import styled, { keyframes } from "styled-components";

// Animation keyframes
const spinnerSpin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Container for spinner and text
export const StyledSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

// Spinner circle with size variants
export const SpinnerCircle = styled.div<{ size: string }>`
  border-radius: 50%;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3b82f6;
  animation: ${spinnerSpin} 1s linear infinite;

  /* Size variants */
  ${({ size }) => {
    switch (size) {
      case "button-spinner":
        return `
          width: 10px;
          height: 10px;
          border-width: 2px;
        `;
      case "3x-small":
        return `
          width: 14px;
          height: 14px;
          border-width: 2px;
        `;
      case "2x-small":
        return `
          width: 16px;
          height: 16px;
          border-width: 2px;
        `;
      case "x-small":
        return `
          width: 20px;
          height: 20px;
          border-width: 2px;
        `;
      case "small":
        return `
          width: 24px;
          height: 24px;
          border-width: 3px;
        `;
      case "medium":
        return `
          width: 40px;
          height: 40px;
          border-width: 4px;
        `;
      case "large":
        return `
          width: 60px;
          height: 60px;
          border-width: 5px;
        `;
      default:
        return `
          width: 40px;
          height: 40px;
          border-width: 4px;
        `;
    }
  }}

  /* Reduced motion preference */
  @media (prefers-reduced-motion: reduce) {
    animation-duration: 2s;
  }
`;

// Spinner text with size variants
export const SpinnerText = styled.p<{ size: string }>`
  margin: 0;
  color: #666;
  font-size: ${({ size }) => {
    switch (size) {
      case "3x-small":
      case "2x-small":
      case "x-small":
      case "small":
        return "0.875rem";
      case "large":
        return "1.125rem";
      default:
        return "1rem";
    }
  }};
`;
