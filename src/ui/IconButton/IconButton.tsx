import React from "react";
import { StyledIconButton, StyledIconContent } from "./styles";
import { ButtonVariant } from "../Button/Button";

interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  icon: React.ReactNode;
  size?: "x-small" | "small" | "medium" | "large";
  variant?: ButtonVariant;
  "aria-label": string;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      size = "medium",
      variant = "ghost",
      className = "",
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    return (
      <StyledIconButton
        ref={ref}
        variant={variant}
        fullWidth={false}
        size={size}
        className={className}
        aria-label={ariaLabel}
        {...props}
      >
        <StyledIconContent size={size} variant={variant}>
          {icon}
        </StyledIconContent>
      </StyledIconButton>
    );
  }
);

export default IconButton;
