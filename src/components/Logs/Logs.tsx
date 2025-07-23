import React from "react";
import LogsTable from "./LogsTable";
import { useLogs } from "../../hooks/useLogs";
import { QueryBoundary } from "../QueryBoundary";

const Logs: React.FC = () => {
  const logsQuery = useLogs();

  return (
    <QueryBoundary query={logsQuery}>
      {({ data: logs }) => <LogsTable logs={logs} />}
    </QueryBoundary>
  );
};

export default Logs;
