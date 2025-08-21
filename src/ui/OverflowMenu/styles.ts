import styled, { css } from "styled-components";

export const StyledOverflowMenu = styled.div`
  position: relative;
  display: inline-block;
`;

export const StyledMenuDropdown = styled.div<{
  placement: "bottom-start" | "bottom-end" | "top-start" | "top-end";
}>`
  position: absolute;
  z-index: 1000;
  min-width: 160px;
  background: white;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 4px 0;

  ${({ placement }) => {
    switch (placement) {
      case "bottom-start":
        return css`
          top: 100%;
          left: 0;
          margin-top: 4px;
        `;
      case "bottom-end":
        return css`
          top: 100%;
          right: 0;
          margin-top: 4px;
        `;
      case "top-start":
        return css`
          bottom: 100%;
          left: 0;
          margin-bottom: 4px;
        `;
      case "top-end":
        return css`
          bottom: 100%;
          right: 0;
          margin-bottom: 4px;
        `;
      default:
        return css`
          top: 100%;
          right: 0;
          margin-top: 4px;
        `;
    }
  }}
`;

export const StyledMenuItem = styled.div<{
  disabled?: boolean;
  destructive?: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  font-size: 14px;
  color: ${({ destructive, disabled }) => {
    if (disabled) return "#9ca3af";
    if (destructive) return "#dc2626";
    return "#374151";
  }};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.15s ease;

  &:hover {
    background-color: ${({ disabled }) =>
      disabled ? "transparent" : "#f3f4f6"};
  }

  &:focus {
    outline: none;
    background-color: ${({ disabled }) =>
      disabled ? "transparent" : "#f3f4f6"};
  }

  .menu-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    flex-shrink: 0;

    svg {
      width: 14px;
      height: 14px;
    }
  }

  .menu-label {
    flex: 1;
    font-weight: 400;
    line-height: 1.4;
  }

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `}
`;

export const StyledMenuSeparator = styled.div`
  height: 1px;
  background-color: #e5e7eb;
  margin: 4px 0;
`;
