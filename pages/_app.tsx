import React from "react";
import type { AppProps } from "next/app";
import { QueryProvider } from "../src/providers/QueryProvider";
import { ToastProvider } from "../src/ui/Toast";
import Navigation from "../src/components/Navigation/Navigation";
import ProtectedRoute from "../src/components/Auth/ProtectedRoute";
import styled from "styled-components";
import { useRouter } from "next/router";
import "../src/index.css";
import { AuthProvider } from "../src/contexts/AuthContext";
import { useAuthCache } from "../src/hooks/useAuthCache";
import { useMediaQuery } from "../src/hooks/useMediaQuery";
import { breakpoints } from "../src/theme/mediaQueries";
import EmptyState from "../src/ui/EmptyState/EmptyState";
import { RestrictedDocument } from "../src/ui/icons";

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledMain = styled.main`
  padding: 1.5rem;
`;

const MobileRestrictedContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: var(--background-primary, #ffffff);
`;

const AppContent = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const isLoginPage = router.pathname === "/login";
  const isMobile = useMediaQuery(
    `(max-width: ${parseInt(breakpoints.md) - 1}px)`
  );

  // Clear cache when user changes
  useAuthCache();

  // Show mobile restriction for non-login pages on mobile devices
  if (!isLoginPage && isMobile) {
    return (
      <MobileRestrictedContainer>
        <EmptyState
          title="Mobile View Not Available"
          description="This application is optimized for tablet and desktop use. Please access it from a device with a larger screen for the best experience."
          icon={<RestrictedDocument />}
        />
      </MobileRestrictedContainer>
    );
  }

  return (
    <StyledApp>
      {!isLoginPage && <Navigation />}
      <StyledMain>
        {isLoginPage ? (
          <Component {...pageProps} />
        ) : (
          <ProtectedRoute>
            <Component {...pageProps} />
          </ProtectedRoute>
        )}
      </StyledMain>
    </StyledApp>
  );
};

export default function App(props: AppProps) {
  return (
    <AuthProvider>
      <QueryProvider>
        <ToastProvider>
          <AppContent {...props} />
        </ToastProvider>
      </QueryProvider>
    </AuthProvider>
  );
}
