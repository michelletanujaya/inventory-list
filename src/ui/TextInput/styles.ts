import styled from "styled-components";

// Main text input styled component
export const StyledTextInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-family: "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif;
  flex: 1;

  &:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
`;

// Screen reader only label
export const ScreenReaderLabel = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;
