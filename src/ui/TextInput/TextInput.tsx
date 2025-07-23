import React from "react";
import { StyledTextInput, ScreenReaderLabel } from "./styles";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
  className?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  id,
  className,
  ...inputProps
}) => {
  const inputId = id || `textinput-${Math.random().toString(36).substr(2, 9)}`;
  return (
    <>
      {label && (
        <ScreenReaderLabel htmlFor={inputId}>{label}</ScreenReaderLabel>
      )}
      <StyledTextInput id={inputId} className={className} {...inputProps} />
    </>
  );
};

export default TextInput;
