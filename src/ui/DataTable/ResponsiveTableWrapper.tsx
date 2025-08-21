import React from "react";
import styled from "styled-components";

const ScrollContainer = styled.div`
  position: relative;
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
