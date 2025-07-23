import styled from "styled-components";
import { ButtonVariant } from "./Button";

interface StyledButtonProps {
  variant: ButtonVariant;
  fullWidth: boolean;
  customWidth?: number;
  size?: "small" | "medium";
}

export const StyledButton = styled.button<StyledButtonProps>`
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: background 0.2s, color 0.2s, border 0.2s;
  outline: none;
  display: inline-block;
  width: ${({ fullWidth, customWidth }) => {
    if (customWidth) return `${customWidth}px`;
    if (fullWidth) return "100%";
    return "fit-content";
  }};

  /* Size styles */
  ${({ size }) => {
    switch (size) {
      case "small":
        return `
          padding: 0.25rem 0.75rem;
          font-size: 0.75rem;
          text-transform: none;
        `;
      case "medium":
      default:
        return `
          padding: 0.45rem 0.75rem;
          font-size: 0.75rem;
        `;
    }
  }}

  svg {
    width: 1rem;
    height: 1rem;
  }

  ${({ variant }) => {
    switch (variant) {
      case "primary":
        return `
          background-color: var(--bg-primary-accent);
          color: var(--white);
          border: 1px solid var(--bg-primary-accent);
          
          &:hover,
          &:focus {
            background-color: var(--bg-primary-accent-dark);
            border-color: var(--bg-primary-accent-dark);
          }
        `;
      case "secondary":
        return `
          background-color: var(--bg-secondary);
          color: var(--text-light);
          border: 1px solid var(--border);
          
          &:hover,
          &:focus {
            background-color: var(--bg-tertiary);
            border-color: var(--border-dark);
          }
        `;
      case "ghost":
        return `
          background: transparent;
          color: var(--bg-primary-accent-dark);
          border: none;
          
          &:hover,
          &:focus {
            background: var(--brand-tertiary);
            color: var(--bg-primary-accent);
            border: none;
          }
        `;
      case "inverse":
        return `
            background: transparent;
            color: var(--white);
            border: none;
            
            &:hover,
            &:focus {
              background: var(--brand-tertiary);
              color: var(--bg-primary-accent);
              border: none;
            }
          `;
      case "danger":
        return `
          background-color: var(--error);
          color: var(--white);
          border: 1px solid var(--error);
          
          &:hover,
          &:focus {
            background-color: var(--error-dark);
            border-color: var(--error-dark);
          }
        `;
      default:
        return "";
    }
  }}

  /* Focus styles */
  &:focus {
    outline: 2px solid var(--bg-primary-accent);
    outline-offset: 2px;
  }
`;

// Button content container
export const ButtonContentContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
