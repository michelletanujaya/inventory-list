import React from "react";
import LogsTable from "./LogsTable";
import { useLogs, useLogsWithRunningTotals } from "../../hooks/useLogs";
import { QueryBoundary } from "../QueryBoundary";
import EmptyState from "../../ui/EmptyState";
import LogDayButton from "./LogDayButton";
import { useProjectId } from "../../hooks/useProjectId";

const Logs: React.FC = () => {
  const projectId = useProjectId();
  const logsQuery = useLogsWithRunningTotals(projectId);

  return (
    <QueryBoundary query={logsQuery}>
      {({ data: logs }) => {
        if (!logs || logs.length === 0) {
          return (
            <EmptyState
              title="No logs yet"
              description="Start managing your logs by adding your first log."
              action={<LogDayButton />}
            />
          );
        }

        return <LogsTable logs={logs} />;
      }}
    </QueryBoundary>
  );
};

export default Logs;
