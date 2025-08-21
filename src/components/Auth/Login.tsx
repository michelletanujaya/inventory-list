import styled from "styled-components";
import OAuthButtons from "./OAuthButtons";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/router";
import { useToast } from "../../ui/Toast";
import { TextInput } from "../../ui/TextInput";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";

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

type FormValues = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
};

const Login: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const { signIn, signUp } = useAuth();
  const router = useRouter();
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      const { error } = isSignUp
        ? await signUp(
            data.email,
            data.password,
            data.firstName || "",
            data.lastName || ""
          )
        : await signIn(data.email, data.password);

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
          router.push("/");
        }
        reset();
      }
    } catch (error) {
      showToast("An error occurred", "error");
    }
  };

  return (
    <LoginContainer>
      <StyledTitle>{isSignUp ? "Sign Up" : "Sign In"}</StyledTitle>
      <OAuthButtons />
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledFormFields>
          {isSignUp && (
            <>
              <TextInput
                type="text"
                placeholder="First Name"
                {...register("firstName", { required: true })}
                aria-invalid={errors.firstName ? "true" : "false"}
              />
              <TextInput
                type="text"
                placeholder="Last Name"
                {...register("lastName", { required: true })}
                aria-invalid={errors.lastName ? "true" : "false"}
              />
            </>
          )}
          <TextInput
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
            aria-invalid={errors.email ? "true" : "false"}
          />
          <TextInput
            type="password"
            placeholder="Password"
            {...register("password", { required: true, minLength: 6 })}
            aria-invalid={errors.password ? "true" : "false"}
          />
        </StyledFormFields>
        <StyledAction>
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
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
