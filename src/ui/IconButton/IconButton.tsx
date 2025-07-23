import React from "react";
import { StyledIconButton, IconContent } from "./styles";
import { ButtonVariant } from "../Button/Button";

interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  icon: React.ReactNode;
  size?: "x-small" | "small" | "medium" | "large";
  variant?: ButtonVariant;
  "aria-label": string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size = "medium",
  variant = "ghost",
  className = "",
  "aria-label": ariaLabel,
  ...props
}) => {
  return (
    <StyledIconButton
      variant={variant}
      fullWidth={false}
      size={size}
      className={className}
      aria-label={ariaLabel}
      {...props}
    >
      <IconContent size={size}>{icon}</IconContent>
    </StyledIconButton>
  );
};
