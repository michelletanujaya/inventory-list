import styled from "styled-components";
import EditTypeButton from "./EditTypeButton";
import DeleteTypeButton from "./DeleteTypeButton";
import { Inventory } from "../../lib/supabase";

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
  return (
    <StyledInventoryItem key={item.id}>
      <StyledDetails>
        <StyledName>{item.name}</StyledName>
        <StyledPrice>Rp {item.price.toFixed(2)}</StyledPrice>
      </StyledDetails>
      <StyledActions>
        <EditTypeButton inventory={item} />
        <DeleteTypeButton itemId={item.id} />
      </StyledActions>
    </StyledInventoryItem>
  );
};

export default InventoryItem;
