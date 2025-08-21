import { TableLayout } from "../TableLayout/TableLayout";
import { columns, StockRow } from "./columns";
import DataTable from "../../ui/DataTable";
import { editableColumns } from "./editableColumns";

interface StocksTableProps {
  data: StockRow[];
  isEditing: boolean;
}

const StocksTable = ({ data, isEditing }: StocksTableProps) => {
  return (
    <TableLayout isEmpty={!data || data.length === 0}>
      <DataTable
        data={data || []}
        columns={isEditing ? editableColumns : columns}
      />
    </TableLayout>
  );
};

export default StocksTable;
