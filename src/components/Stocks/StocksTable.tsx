import { ColumnDef } from "@tanstack/react-table";
import { TableLayout } from "../TableLayout/TableLayout";
import { StockRow } from "./columns";
import { DataTable } from "../../ui/DataTable";

interface StocksTableProps {
  data: StockRow[];
  isEditing: boolean;
  editableColumns: ColumnDef<StockRow>[];
  columns: ColumnDef<StockRow>[];
}

const StocksTable = ({
  data,
  isEditing,
  editableColumns,
  columns,
}: StocksTableProps) => {
  return (
    <TableLayout isEmpty={data.length === 0}>
      <DataTable data={data} columns={isEditing ? editableColumns : columns} />
    </TableLayout>
  );
};

export default StocksTable;
