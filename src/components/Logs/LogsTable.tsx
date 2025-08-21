import React from "react";
import DataTable from "../../ui/DataTable";
import { columns, LogRow } from "./columns";
import { TableLayout } from "../TableLayout/TableLayout";
import { Log } from "../../lib/supabase";
import Stocks from "../Stocks/Stocks";

interface LogsTableProps {
  logs: Log[];
}

const LogsTable: React.FC<LogsTableProps> = ({ logs }) => {
  const renderExpandedRow = (log: Log) => {
    return <Stocks logDate={log.date} />;
  };

  const tableData: LogRow[] = logs.map((log) => ({
    id: log.id,
    date: log.date,
    startingQuantity: log.starting_quantity || 0,
    quantityAdded: log.add_quantity,
    quantitySold: log.sold_quantity,
    endingQuantity: log.ending_quantity || 0,
  }));

  return (
    <TableLayout isEmpty={tableData.length === 0}>
      <DataTable
        data={tableData}
        columns={columns}
        renderExpandedRow={(rowData) => {
          const originalLog = logs.find((log) => log.id === rowData.id);
          return originalLog ? renderExpandedRow(originalLog) : null;
        }}
      />
    </TableLayout>
  );
};

export default LogsTable;
