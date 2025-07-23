import React from "react";
import styled from "styled-components";
import InventoryItem from "./InventoryItem";
import { useInventories } from "../../hooks/useInventories";
import { QueryBoundary } from "../QueryBoundary";

const StyledInventories = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Inventories: React.FC = () => {
  const inventoriesQuery = useInventories();

  return (
    <StyledInventories>
      <QueryBoundary
        query={inventoriesQuery}
        errorComponent={() => <div>Error</div>}
      >
        {({ data }) =>
          data.map((inventory) => (
            <InventoryItem key={inventory.id} item={inventory} />
          ))
        }
      </QueryBoundary>
    </StyledInventories>
  );
};

export default Inventories;
