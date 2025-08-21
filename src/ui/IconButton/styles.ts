import styled from "styled-components";
import { StyledButton } from "../Button/styles";
import { ButtonVariant } from "../Button/Button";

interface IconButtonProps {
  size: "x-small" | "small" | "medium" | "large";
  variant: ButtonVariant;
}

// Override the base button styling for icon buttons
export const StyledIconButton = styled(StyledButton)<IconButtonProps>`
  /* Override button default styling for icon buttons */
  min-width: auto;

  /* Increase specificity with && to ensure our padding overrides base button */
  && {
    ${({ size }) => {
      switch (size) {
        case "x-small":
          return `
            padding: 0.125rem;
            font-size: 0.75rem;
          `;
        case "small":
          return `
            padding: 0.25rem;
            font-size: 0.75rem;
          `;
        case "medium":
          return `
            padding: 0.25rem;
            font-size: 0.75rem;
          `;
        case "large":
          return `
            padding: 0.75rem;
            font-size: 0.75rem;
          `;
        default:
          return `
            padding: 0.5rem;
            font-size: 0.75rem;
          `;
      }
    }}
  }
`;

// Icon content container
export const StyledIconContent = styled.span<IconButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    ${({ size }) => {
      const sizes: Record<string, string> = {
        "x-small": "14px",
        small: "16px",
        medium: "20px",
        large: "24px",
      };
      const dimension = sizes[size] || "20px";
      return `
        width: ${dimension};
        height: ${dimension};
      `;
    }}
  }
  }
`;
