import styled from "styled-components";
import { Inventory, Log } from "../../ui/icons";
import { useRouter } from "next/router";
import Button from "../../ui/Button";

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const DashboardCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const CardIcon = styled.div`
  height: 2rem;
  width: 2rem;
  margin: 0 auto;
`;

const CardTitle = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
`;

const CardDescription = styled.div`
  font-size: 0.875rem;
  color: var(--text-secondary);
`;

const StyledAction = styled.div`
  display: flex;
  justify-content: center;
`;

interface DashboardProps {
  projectId: string;
}

const Dashboard: React.FC<DashboardProps> = ({ projectId }) => {
  const router = useRouter();
  return (
    <DashboardGrid>
      <DashboardCard>
        <CardIcon>
          <Log />
        </CardIcon>
        <CardTitle>Logs</CardTitle>
        <CardDescription>
          Track daily operations, stock movements, and running totals.
        </CardDescription>
        <StyledAction>
          <Button onClick={() => router.push(`/project/${projectId}/logs`)}>
            View Logs
          </Button>
        </StyledAction>
      </DashboardCard>

      <DashboardCard>
        <CardIcon>
          <Inventory />
        </CardIcon>
        <CardTitle>Inventories</CardTitle>
        <CardDescription>
          Manage your inventory items, add new products, and track stock levels.
        </CardDescription>
        <StyledAction>
          <Button
            onClick={() => router.push(`/project/${projectId}/inventories`)}
          >
            View Inventories
          </Button>
        </StyledAction>
      </DashboardCard>
    </DashboardGrid>
  );
};

export default Dashboard;
