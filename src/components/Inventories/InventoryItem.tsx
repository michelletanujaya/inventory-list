import styled from "styled-components";
import EditInventoryButton from "./EditInventoryButton";
import DeleteInventoryButton from "./DeleteInventoryButton";
import { Inventory } from "../../lib/supabase";
import { useProjectId } from "../../hooks/useProjectId";
import { usePermissions } from "../../hooks/usePermissions";

const StyledInventoryItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border);
`;

const StyledDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledName = styled.span`
  font-size: 1rem;
  font-weight: 600;
`;

const StyledPrice = styled.span`
  font-size: 0.875rem;
  color: var(--text-secondary);
`;

const StyledActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

interface InventoryItemProps {
  item: Inventory;
}

const InventoryItem = ({ item }: InventoryItemProps) => {
  const projectId = useProjectId();
  const { data: permissions } = usePermissions(projectId);

  const getActions = () => {
    if (permissions?.is_admin) {
      return (
        <StyledActions>
          <DeleteInventoryButton itemId={item.id} />
          <EditInventoryButton inventory={item} />
        </StyledActions>
      );
    }
  };

  return (
    <StyledInventoryItem>
      <StyledDetails>
        <StyledName>{item.name}</StyledName>
        <StyledPrice>Rp {item.price.toFixed(2)}</StyledPrice>
      </StyledDetails>
      {getActions()}
    </StyledInventoryItem>
  );
};

export default InventoryItem;
