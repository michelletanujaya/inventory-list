import Link from "next/link";
import { ChevronLeft } from "../icons";
import styled from "styled-components";

const StyledBackButton = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--brand-primary);
  text-decoration: none;
  margin-bottom: 1rem;
  font-weight: 500;

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  &:hover {
    text-decoration: underline;
  }
`;

interface BackButtonProps {
  backTo?: string;
  href?: string;
}

const BackButton = ({ backTo = "Projects", href = "/" }: BackButtonProps) => {
  return (
    <Link href={href} passHref>
      <StyledBackButton>
        <ChevronLeft /> Back to {backTo}
      </StyledBackButton>
    </Link>
  );
};

export default BackButton;
