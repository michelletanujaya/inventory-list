import styled from "styled-components";
import { AlertVariant } from "./Alert";

export const variantConfig = {
  error: {
    backgroundColor: "bg-red-50",
    borderColor: "border-red-200",
    textColor: "text-red-800",
    iconColor: "text-red-400",
  },
  success: {
    backgroundColor: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-800",
    iconColor: "text-green-400",
  },
  info: {
    backgroundColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-800",
    iconColor: "text-blue-400",
  },
  warning: {
    backgroundColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    textColor: "text-yellow-800",
    iconColor: "text-yellow-400",
  },
};

export const AlertContainer = styled.div<{ variant: AlertVariant }>`
  display: flex;
  border: 1px solid
    ${({ variant }) => `var(--${variantConfig[variant].borderColor})`};
  border-radius: 6px;
  padding: 1rem;
  background-color: ${({ variant }) =>
    `var(--${variantConfig[variant].backgroundColor})`};
  color: ${({ variant }) => `var(--${variantConfig[variant].textColor})`};
`;

export const AlertContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const StyledIcon = styled.div<{ variant: AlertVariant }>`
  height: 1.25rem;
  width: 1.25rem;
  color: ${({ variant }) => `var(--${variantConfig[variant].iconColor})`};

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const TextContainer = styled.div`
  display: grid;
  gap: 0.25rem;
`;

export const AlertTitle = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
`;

export const AlertMessage = styled.span`
  font-size: 0.75rem;
`;
