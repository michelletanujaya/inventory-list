import React from "react";
import styled from "styled-components";
import { EmptyDocument } from "../icons";

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  text-align: center;
  color: var(--text-secondary);
`;

const IconContainer = styled.div`
  margin-bottom: 1.5rem;
  opacity: 0.6;

  svg {
    width: 120px;
    height: 120px;
  }
`;

const Title = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
`;

const Description = styled.p`
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0 0 1.5rem 0;
  max-width: 400px;
  line-height: 1.5;
`;

const ActionContainer = styled.div`
  margin-top: 0.5rem;
`;

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No data found",
  description = "There's nothing here yet. Start by adding some items.",
  action,
  icon,
}) => {
  return (
    <EmptyStateContainer>
      <IconContainer>{icon || <EmptyDocument />}</IconContainer>
      <Title>{title}</Title>
      <Description>{description}</Description>
      {action && <ActionContainer>{action}</ActionContainer>}
    </EmptyStateContainer>
  );
};

export default EmptyState;
