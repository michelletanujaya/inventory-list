import { ColumnDef } from "@tanstack/react-table";
import { StockRow } from "./columns";
import { Controller } from "react-hook-form";
import { TextInput } from "../../ui/TextInput";

export const editableColumns: ColumnDef<StockRow>[] = [
  {
    header: "Name",
    accessorKey: "name",
    enableSorting: false,
    minSize: 150,
  },
  {
    header: "Added",
    accessorKey: "quantityAdded",
    enableSorting: false,
    minSize: 80,
    cell: ({ row }) => {
      const { control } = row.original;
      return (
        <Controller
          control={control}
          name={`stocks.${row.original.id}.quantityAdded`}
          render={({ field }) => <TextInput {...field} type="number" />}
        />
      );
    },
  },
  {
    header: "Sold",
    accessorKey: "quantitySold",
    enableSorting: false,
    minSize: 80,
    cell: ({ row }) => {
      const { control } = row.original;
      return (
        <Controller
          control={control}
          name={`stocks.${row.original.id}.quantitySold`}
          render={({ field }) => <TextInput {...field} type="number" />}
        />
      );
    },
  },
];
