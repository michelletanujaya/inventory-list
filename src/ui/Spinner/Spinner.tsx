import React from "react";
import { StyledSpinner, SpinnerCircle, SpinnerText } from "./styles";

interface SpinnerProps {
  size?:
    | "button-spinner"
    | "3x-small"
    | "2x-small"
    | "x-small"
    | "small"
    | "medium"
    | "large";
  text?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = "medium", text }) => {
  return (
    <StyledSpinner>
      <SpinnerCircle size={size} aria-label="Loading" role="status" />
      {text && <SpinnerText size={size}>{text}</SpinnerText>}
    </StyledSpinner>
  );
};

export default Spinner;
