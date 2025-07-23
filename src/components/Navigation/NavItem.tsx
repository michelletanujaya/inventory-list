import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { NavItem as NavItemType } from "./constants";

const NavItemStyles = css`
  color: var(--bg-primary-accent);
  text-decoration: none;
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: background-color 0.3s;
  border-left: 3px solid transparent;

  &:hover {
    color: var(--white);
    background-color: var(--bg-primary-accent-dark);
    border-left-color: var(--bg-primary-accent);
  }

  span {
    font-weight: 500;
    letter-spacing: 0.025em;
  }
`;

const StyledLink = styled(Link)`
  ${NavItemStyles}
`;

const StyledIcon = styled.div`
  width: 1.5rem;
  height: 1.5rem;
`;

const StyledNavItem = styled.li`
  margin: 0;
`;

interface NavItemProps {
  closeSidebar: () => void;
  item: NavItemType;
}

const NavItem = ({ closeSidebar, item }: NavItemProps) => {
  const { icon, label, to } = item;

  const content = (
    <>
      <StyledIcon>{icon}</StyledIcon>
      <span>{label}</span>
    </>
  );

  return (
    <StyledNavItem>
      <StyledLink to={to} onClick={closeSidebar}>
        {content}
      </StyledLink>
    </StyledNavItem>
  );
};

export default NavItem;
