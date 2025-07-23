import { ColumnDef } from "@tanstack/react-table";
import { Control } from "react-hook-form";
import { StockFormValues } from "./Stocks";

export interface StockRow extends Record<string, unknown> {
  id: string;
  name: string;
  quantityAdded: number;
  quantitySold: number;
  control: Control<StockFormValues>;
}

export const columns: ColumnDef<StockRow>[] = [
  {
    header: "Name",
    accessorKey: "name",
    minSize: 150,
    enableSorting: false,
  },
  {
    header: "Added",
    accessorKey: "quantityAdded",
    minSize: 80,
    enableSorting: false,
  },
  {
    header: "Sold",
    accessorKey: "quantitySold",
    minSize: 80,
    enableSorting: false,
  },
];
