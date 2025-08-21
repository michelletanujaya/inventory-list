import React from "react";
import { AlertCircle } from "../icons";
import {
  AlertContainer,
  AlertContent,
  StyledIcon,
  TextContainer,
  AlertTitle,
  AlertMessage,
} from "./styles";

export type AlertVariant = "error" | "success" | "info" | "warning";

interface AlertProps {
  title: string;
  message?: string;
  variant?: AlertVariant;
  icon?: React.ReactNode;
}

const Alert = ({
  title,
  message,
  variant = "success",
  icon = <AlertCircle />,
}: AlertProps) => {
  return (
    <AlertContainer data-testid="alert" variant={variant}>
      <AlertContent>
        <StyledIcon variant={variant}>{icon}</StyledIcon>
        <TextContainer>
          <AlertTitle>{title}</AlertTitle>
          {message && <AlertMessage>{message}</AlertMessage>}
        </TextContainer>
      </AlertContent>
    </AlertContainer>
  );
};

export default Alert;
