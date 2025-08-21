import React from "react";
import styled from "styled-components";

const StyledTextArea = styled.textarea`
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

const ScreenReaderLabel = styled.label`
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

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  id?: string;
  className?: string;
  resize?: "none" | "both" | "horizontal" | "vertical";
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  id,
  className,
  resize = "none",
  ...inputProps
}) => {
  const inputId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  return (
    <>
      {label && (
        <ScreenReaderLabel htmlFor={inputId}>{label}</ScreenReaderLabel>
      )}
      <StyledTextArea
        style={{ resize: resize }}
        id={inputId}
        className={className}
        {...inputProps}
      />
    </>
  );
};

export default TextArea;
