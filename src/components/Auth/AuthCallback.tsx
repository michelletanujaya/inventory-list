import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { useToast } from "../Toast";

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          showToast("Authentication failed", "error");
          navigate("/login");
        } else if (data.session) {
          showToast("Successfully logged in!", "success");
          navigate("/");
        }
      } catch (error) {
        showToast("Authentication failed", "error");
        navigate("/login");
      }
    };

    handleAuthCallback();
  }, [navigate, showToast]);

  return <div>Completing authentication...</div>;
};

export default AuthCallback;
