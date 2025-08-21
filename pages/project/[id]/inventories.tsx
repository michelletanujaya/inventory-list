import React from "react";
import { NextPage } from "next";
import Inventories from "../../../src/components/Inventories/Inventories";
import BackButton from "../../../src/ui/BackButton/BackButton";
import { PermissionGate } from "../../../src/components/PermissionGate";
import { useProjectId } from "../../../src/hooks/useProjectId";

const InventoriesPage: NextPage = () => {
  const projectId = useProjectId();

  return (
    <PermissionGate
      requirement={{
        projectId,
        permissions: { canRead: true },
      }}
    >
      <BackButton href={`/project/${projectId}`} backTo="Dashboard" />
      <Inventories />
    </PermissionGate>
  );
};

export default InventoriesPage;
