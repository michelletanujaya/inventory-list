import React, { useState } from "react";
import styled from "styled-components";
import { Close, Hamburger } from "../../ui/icons";
import IconButton from "../../ui/IconButton/IconButton";
import NavItem from "./NavItem";
import { useRouter } from "next/router";
import { useProjectId } from "../../hooks/useProjectId";
import { useAuth } from "../../contexts/AuthContext";
import {
  getUserDisplayName,
  getUserInitials,
} from "../../utils/getUserDisplayName";
import ProfileModal from "../Profile/ProfileModal";
import { getNavItems } from "./utils";

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: var(--brand-primary);
`;

const StyledTitle = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--white);
  align-items: center;
  display: flex;
  gap: 1rem;
  letter-spacing: 0.025em;
`;

const Sidebar = styled.nav<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: var(--white);
  transform: translateX(${(props) => (props.isOpen ? "0" : "-100%")});
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
  box-shadow: ${(props) =>
    props.isOpen ? "2px 0 10px rgba(0,0,0,0.1)" : "none"};
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  min-width: 280px;
`;

const NavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--overlay);
  z-index: 999;
  opacity: ${(props) => (props.isOpen ? "1" : "0")};
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
`;

const StyledNavHeader = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-light);
  letter-spacing: 0.025em;
`;

const StyledNavHeaderContainer = styled.div`
  padding: 1rem 1rem 0.5rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  justify-content: space-between;
`;

const StyledCloseButton = styled(IconButton)`
  color: var(--text-light);
`;

const StyledFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: auto;
`;

const StyledLogout = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary);
  padding: 1rem 1.25rem;
  text-align: left;
  cursor: pointer;
  font-size: 0.875rem;
  width: 100%;

  &:hover {
    background-color: var(--bg-secondary);
  }
`;

const StyledUserInfo = styled.div`
  padding: 0 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--brand-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const UserName = styled.span`
  color: var(--text-primary);
  font-weight: 500;
  font-size: 0.875rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UserEmail = styled.span`
  color: var(--text-secondary);
  font-size: 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ClickableUserInfo = styled(StyledUserInfo)`
  cursor: pointer;
  transition: background-color 0.2s;
`;

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);

  const { user, signOut } = useAuth();
  const router = useRouter();
  const projectId = useProjectId();

  const navItems = getNavItems(projectId);
  const activeNav = navItems.find((item) => item.to === router.asPath);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
    setIsOpen(false);
  };

  if (router.pathname === "/login") {
    return null;
  }

  return (
    <>
      <div>
        <StyledHeader>
          <StyledTitle>
            <IconButton
              aria-label="Open menu"
              icon={<Hamburger />}
              size="medium"
              onClick={toggleSidebar}
              variant="inverse"
            />
            <span>{activeNav?.label}</span>
          </StyledTitle>
          {activeNav?.action}
        </StyledHeader>

        <Overlay isOpen={isOpen} onClick={toggleSidebar} />

        <Sidebar isOpen={isOpen}>
          <StyledNavHeaderContainer>
            <StyledNavHeader>Menu</StyledNavHeader>
            <StyledCloseButton
              aria-label="Close menu"
              icon={<Close />}
              onClick={toggleSidebar}
            />
          </StyledNavHeaderContainer>

          <NavList>
            {navItems.map((item) => (
              <NavItem key={item.to} item={item} closeSidebar={toggleSidebar} />
            ))}
          </NavList>

          {user && (
            <>
              <StyledFooter>
                <ClickableUserInfo onClick={() => setShowProfileModal(true)}>
                  <UserAvatar>{getUserInitials(user)}</UserAvatar>
                  <UserDetails>
                    <UserName>{getUserDisplayName(user)}</UserName>
                    <UserEmail>{user.email}</UserEmail>
                  </UserDetails>
                </ClickableUserInfo>
                <StyledLogout onClick={handleSignOut}>Sign Out</StyledLogout>
              </StyledFooter>
            </>
          )}
        </Sidebar>
      </div>
      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />
    </>
  );
};

export default Navigation;
