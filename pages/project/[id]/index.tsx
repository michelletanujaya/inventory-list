import React from "react";
import { NextPage } from "next";
import BackButton from "../../../src/ui/BackButton/BackButton";
import Dashboard from "../../../src/components/Dashboard";
import { PermissionGate } from "../../../src/components/PermissionGate";
import { useProjectId } from "../../../src/hooks/useProjectId";

const ProjectDashboard: NextPage = () => {
  const projectId = useProjectId();

  return (
    <PermissionGate
      requirement={{
        projectId,
        permissions: { canRead: true },
      }}
    >
      <BackButton />
      <Dashboard projectId={projectId} />
    </PermissionGate>
  );
};

export default ProjectDashboard;
