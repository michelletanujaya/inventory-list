import { Home, Log, Inventory } from "../../ui/icons";
import AddInventoryButton from "../Inventories/AddInventoryButton";
import LogDayButton from "../Logs/LogDayButton";

export interface NavItem {
  label: string;
  icon: React.ReactNode;
  to: string;
  action?: React.ReactNode;
}

export const NAV_ITEMS: NavItem[] = [
  {
    to: "/",
    label: "Home",
    icon: <Home />,
  },
  {
    to: "/logs",
    label: "Logs",
    icon: <Log />,
    action: <LogDayButton />,
  },
  {
    to: "/inventories",
    label: "Inventories",
    icon: <Inventory />,
    action: <AddInventoryButton />,
  },
];
