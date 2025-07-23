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

export type AlertVariant = "error" | "success" | "info";

interface AlertProps {
  title: string;
  message?: string;
  variant?: AlertVariant;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const Alert = ({
  title,
  message,
  variant = "success",
  icon: Icon = AlertCircle,
}: AlertProps) => {
  return (
    <AlertContainer data-testid="alert" variant={variant}>
      <AlertContent>
        <StyledIcon variant={variant}>
          <Icon aria-hidden="true" />
        </StyledIcon>
        <TextContainer>
          <AlertTitle>{title}</AlertTitle>
          {message && <AlertMessage>{message}</AlertMessage>}
        </TextContainer>
      </AlertContent>
    </AlertContainer>
  );
};

export default Alert;
