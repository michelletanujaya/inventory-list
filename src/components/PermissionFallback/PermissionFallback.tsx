import React from "react";
import styled from "styled-components";
import { RestrictedDocument } from "../../ui/icons";
import Button from "../../ui/Button";

const FallbackContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 2rem;
  text-align: center;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;

  svg {
    width: 120px;
    height: 120px;
    color: #9ca3af;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.5rem 0;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #6b7280;
  margin: 0 0 1.5rem 0;
  max-width: 400px;
  line-height: 1.5;
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

export interface PermissionFallbackProps {
  title?: string;
  description?: string;
  showContactButton?: boolean;
  showBackButton?: boolean;
  onBack?: () => void;
  onContact?: () => void;
  icon?: React.ReactNode;
}

export const PermissionFallback: React.FC<PermissionFallbackProps> = ({
  title = "Access Restricted",
  description = "You don't have permission to view this content. Please contact your administrator if you believe this is an error.",
  showContactButton = true,
  showBackButton = true,
  onBack,
  onContact,
  icon = <RestrictedDocument />,
}) => {
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      // Default behavior: go back in history
      window.history.back();
    }
  };

  // TODO: will be added later
  // const handleContact = () => {
  //   if (onContact) {
  //     onContact();
  //   } else {
  //     // Default behavior: could open contact modal or mailto
  //     window.location.href = "mailto:admin@example.com?subject=Access Request";
  //   }
  // };

  return (
    <FallbackContainer>
      <IconContainer>{icon}</IconContainer>

      <Title>{title}</Title>
      <Description>{description}</Description>

      <ActionsContainer>
        {showBackButton && (
          <Button variant="secondary" onClick={handleBack}>
            Go Back
          </Button>
        )}

        {/* TODO: Add contact button */}
        {/* {showContactButton && (
          <Button variant="primary" onClick={handleContact}>
            Request Access
          </Button>
        )} */}
      </ActionsContainer>
    </FallbackContainer>
  );
};
