import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Home from "./components/Home";
import Logs from "./components/Logs/Logs";
import Inventories from "./components/Inventories/Inventories";
import Login from "./components/Auth/Login";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import styled from "styled-components";
import { QueryProvider } from "./providers/QueryProvider";
import { ToastProvider } from "./components/Toast";
import { AuthProvider } from "./contexts/AuthContext";
import AuthCallback from "./components/Auth/AuthCallback";

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledMain = styled.main`
  padding: 1.5rem;
`;

function App() {
  return (
    <AuthProvider>
      <QueryProvider>
        <ToastProvider>
          <Router>
            <StyledApp>
              <Navigation />
              <StyledMain>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <Home />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/logs"
                    element={
                      <ProtectedRoute>
                        <Logs />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/inventories"
                    element={
                      <ProtectedRoute>
                        <Inventories />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/auth/callback" element={<AuthCallback />} />
                </Routes>
              </StyledMain>
            </StyledApp>
          </Router>
        </ToastProvider>
      </QueryProvider>
    </AuthProvider>
  );
}

export default App;
