import styled from "styled-components";
import { AlertVariant } from "./Alert";

export const variantConfig = {
  error: {
    backgroundColor: "#fef2f2", // bg-red-50
    borderColor: "#fecaca", // border-red-200
    textColor: "#991b1b", // text-red-800
    iconColor: "#f87171", // text-red-400
  },
  success: {
    backgroundColor: "#f0fdf4", // bg-green-50
    borderColor: "#bbf7d0", // border-green-200
    textColor: "#166534", // text-green-800
    iconColor: "#4ade80", // text-green-400
  },
  info: {
    backgroundColor: "#eff6ff", // bg-blue-50
    borderColor: "#bfdbfe", // border-blue-200
    textColor: "#1e40af", // text-blue-800
    iconColor: "#60a5fa", // text-blue-400
  },
};

export const AlertContainer = styled.div<{ variant: AlertVariant }>`
  display: flex;
  border: 1px solid ${({ variant }) => variantConfig[variant].borderColor};
  border-radius: 6px;
  padding: 1rem;
  background-color: ${({ variant }) => variantConfig[variant].backgroundColor};
  color: ${({ variant }) => variantConfig[variant].textColor};
`;

export const AlertContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const StyledIcon = styled.div<{ variant: AlertVariant }>`
  height: 1.25rem;
  width: 1.25rem;
  color: ${({ variant }) => variantConfig[variant].iconColor};

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
