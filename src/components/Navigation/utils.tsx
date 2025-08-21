import { Home, Log, Inventory } from "../../ui/icons";
import LogDayButton from "../Logs/LogDayButton";
import AddInventoryButton from "../Inventories/AddInventoryButton";
import NewProjectButton from "../Projects/NewProjectButton";

export interface NavItemType {
  to: string;
  label: string;
  icon: React.ReactNode;
  action?: React.ReactNode;
}

export const getNavItems = (projectId: string): NavItemType[] => {
  if (!projectId) {
    return [
      {
        to: "/",
        label: "Shops",
        icon: <Home />,
        action: <NewProjectButton>New Shop</NewProjectButton>,
      },
    ];
  }

  return [
    { to: `/project/${projectId}`, label: "Dashboard", icon: <Home /> },
    {
      to: `/project/${projectId}/logs`,
      label: "Logs",
      icon: <Log />,
      action: <LogDayButton />,
    },
    {
      to: `/project/${projectId}/inventories`,
      label: "Inventories",
      icon: <Inventory />,
      action: <AddInventoryButton />,
    },
  ];
};
