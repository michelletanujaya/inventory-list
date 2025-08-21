import React from "react";
import { NextPage } from "next";
import Logs from "../../../src/components/Logs/Logs";
import BackButton from "../../../src/ui/BackButton/BackButton";
import { PermissionGate } from "../../../src/components/PermissionGate";
import { useProjectId } from "../../../src/hooks/useProjectId";

const LogsPage: NextPage = () => {
  const projectId = useProjectId();

  return (
    <PermissionGate
      requirement={{
        projectId,
        permissions: { canRead: true },
      }}
    >
      <BackButton href={`/project/${projectId}`} backTo="Dashboard" />
      <Logs />
    </PermissionGate>
  );
};

export default LogsPage;
