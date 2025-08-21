import React from "react";
import styled from "styled-components";
import InventoryItem from "./InventoryItem";
import { useInventories } from "../../hooks/useInventories";
import { QueryBoundary } from "../QueryBoundary";
import { useProjectId } from "../../hooks/useProjectId";
import EmptyState from "../../ui/EmptyState";
import AddInventoryButton from "./AddInventoryButton";

const StyledInventories = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Inventories: React.FC = () => {
  const projectId = useProjectId();
  const inventoriesQuery = useInventories(projectId);

  return (
    <StyledInventories>
      <QueryBoundary
        query={inventoriesQuery}
        errorComponent={() => <div>Error loading inventories</div>}
      >
        {({ data }) => {
          if (!data || data.length === 0) {
            return (
              <EmptyState
                title="No inventory items yet"
                description="Start managing your inventory by adding your first item."
                action={<AddInventoryButton />}
              />
            );
          }

          return data.map((inventory) => (
            <InventoryItem key={inventory.id} item={inventory} />
          ));
        }}
      </QueryBoundary>
    </StyledInventories>
  );
};

export default Inventories;
