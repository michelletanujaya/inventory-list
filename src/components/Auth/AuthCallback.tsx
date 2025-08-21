import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabase";
import { useToast } from "../../ui/Toast";

const AuthCallback: React.FC = () => {
  const router = useRouter();
  const { showToast } = useToast();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          showToast("Authentication failed", "error");
          router.push("/login");
        } else if (data.session) {
          showToast("Successfully logged in!", "success");
          router.push("/");
        }
      } catch (error) {
        showToast("Authentication failed", "error");
        router.push("/login");
      }
    };

    handleAuthCallback();
  }, [router, showToast]);

  return <div>Completing authentication...</div>;
};

export default AuthCallback;
