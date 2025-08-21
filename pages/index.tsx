import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../src/contexts/AuthContext";
import Projects from "../src/components/Projects/Projects";

const HomePage: NextPage = () => {
  const router = useRouter();
  const { user } = useAuth();

  // Auto-redirect to first project or show project selection
  useEffect(() => {
    if (user) {
      // You can implement logic to redirect to the user's default project
      // For now, we'll show a project list
    }
  }, [user]);

  return <Projects />;
};

export default HomePage;
