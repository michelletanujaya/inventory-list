import React from "react";
import styled from "styled-components";
import { media } from "../../theme/mediaQueries";

const ScrollContainer = styled.div`
  position: relative;
  = ${media.mobile} {
    &::before {
      content: "← Scroll →";
      font-size: 0.65rem;
      top: -1.5rem;
    }
  }
`;

const ScrollIndicator = styled.div`
  ${media.maxMd} {
    margin-bottom: 0.5rem;
    text-align: center;
    font-size: 0.75rem;
    color: var(--text-secondary);

    &::before {
      content: "💡 ";
    }
  }

  ${media.lg} {
    display: none;
  }
`;

interface ResponsiveTableWrapperProps {
  children: React.ReactNode;
}

const ResponsiveTableWrapper: React.FC<ResponsiveTableWrapperProps> = ({
  children,
}) => {
  return <ScrollContainer>{children}</ScrollContainer>;
};

export default ResponsiveTableWrapper;
