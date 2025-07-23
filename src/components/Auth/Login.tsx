import styled from "styled-components";
import OAuthButtons from "./OAuthButtons";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "../Toast";
import { TextInput } from "../../ui/TextInput";
import Button from "../../ui/Button";

const LoginContainer = styled.div`
  max-width: 300px;
  margin: auto;
  margin-top: 10rem;
  padding: 2rem;
  background: var(--white);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const StyledTitle = styled.div`
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  color: var(--text-light);
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledFormFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledAction = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
`;

const ToggleText = styled.div`
  text-align: right;
  color: var(--text-secondary);
  font-size: 0.75rem;
`;

const ToggleLink = styled.button`
  background: none;
  border: none;
  color: var(--brand-primary);
  text-decoration: underline;
  cursor: pointer;
  font-size: 0.75rem;
  padding: 0;
  font-weight: 600;
`;

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = isSignUp
        ? await signUp(email, password, firstName, lastName)
        : await signIn(email, password);

      if (error) {
        showToast(error.message, "error");
      } else {
        showToast(
          isSignUp
            ? "Account created! Check your email to verify."
            : "Logged in successfully!",
          "success"
        );
        if (!isSignUp) {
          navigate("/");
        }
      }
    } catch (error) {
      showToast("An error occurred", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <StyledTitle>{isSignUp ? "Sign Up" : "Sign In"}</StyledTitle>
      <OAuthButtons />
      <StyledForm onSubmit={handleSubmit}>
        <StyledFormFields>
          {isSignUp && (
            <>
              <TextInput
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextInput
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </>
          )}
          <TextInput
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </StyledFormFields>
        <StyledAction>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <ToggleText>
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <ToggleLink type="button" onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? "Sign In" : "Sign Up"}
            </ToggleLink>
          </ToggleText>
        </StyledAction>
      </StyledForm>
    </LoginContainer>
  );
};

export default Login;
