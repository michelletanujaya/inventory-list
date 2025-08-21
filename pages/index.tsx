import React from "react";
import { NextPage } from "next";
import { useEffect } from "react";
import { useAuth } from "../src/contexts/AuthContext";
import Projects from "../src/components/Projects/Projects";

const HomePage: NextPage = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
    }
  }, [user]);

  return <Projects />;
};

export default HomePage;
