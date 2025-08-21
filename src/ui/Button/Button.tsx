import React from "react";
import { StyledButton, ButtonContentContainer } from "./styles";
import Spinner from "../Spinner";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "danger"
  | "inverse";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
  size?: "small" | "medium";
  variant?: ButtonVariant;
  width?: number;
  textTransform?: "uppercase" | "none";
}

const Button = ({
  children,
  className = "",
  fullWidth = false,
  icon,
  isLoading = false,
  size = "medium",
  variant = "primary",
  width,
  textTransform = "uppercase",
  ...props
}: ButtonProps) => {
  return (
    <StyledButton
      variant={variant}
      fullWidth={fullWidth}
      customWidth={width}
      className={className}
      size={size}
      {...props}
    >
      {isLoading ? (
        <Spinner size="button-spinner" />
      ) : (
        <ButtonContentContainer>
          {icon}
          <span>{children}</span>
        </ButtonContentContainer>
      )}
    </StyledButton>
  );
};

export default Button;
