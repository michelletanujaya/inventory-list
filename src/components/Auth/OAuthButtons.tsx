import React from "react";
import styled from "styled-components";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../../ui/Button";
import { useToast } from "../Toast";

const OAuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin: 1rem 0;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 1rem 0;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  span {
    padding: 0 1rem;
    color: var(--text-secondary);
    font-size: 0.875rem;
  }
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  text-transform: none;
`;

const OAuthButtons: React.FC = () => {
  const { signInWithOAuth } = useAuth();
  const { showToast } = useToast();

  const handleOAuthSignIn = async (provider: "google") => {
    try {
      const { error } = await signInWithOAuth(provider);
      if (error) {
        showToast(error.message, "error");
      }
    } catch (error) {
      showToast("Authentication failed", "error");
    }
  };

  return (
    <>
      <OAuthContainer>
        <StyledButtonContainer>
          <StyledButton onClick={() => handleOAuthSignIn("google")}>
            Continue with Google
          </StyledButton>
        </StyledButtonContainer>
      </OAuthContainer>

      <Divider>
        <span>or</span>
      </Divider>
    </>
  );
};

export default OAuthButtons;
