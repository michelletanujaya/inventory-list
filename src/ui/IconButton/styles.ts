import styled from "styled-components";
import { StyledButton } from "../Button/styles";

interface IconButtonProps {
  size: "x-small" | "small" | "medium" | "large";
}

// Override the base button styling for icon buttons
export const StyledIconButton = styled(StyledButton)<IconButtonProps>`
  /* Override button default padding for icon buttons */
  min-width: auto;
  padding: ${({ size }) => {
    switch (size) {
      case "x-small":
        return "0.125rem";
      case "small":
        return "0.5rem";
      case "medium":
        return "0.5rem";
      case "large":
        return "0.75rem";
      default:
        return "0.5rem";
    }
  }};
`;

// Icon content container
export const IconContent = styled.span<IconButtonProps>`
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
