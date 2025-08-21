import {
  supabase,
  type Log,
  type LogInsert,
  type LogUpdate,
} from "../lib/supabase";

// Get all logs
export const getLogs = async (projectId: string): Promise<Log[]> => {
  const { data, error } = await supabase
    .from("logs")
    .select("*")
    .eq("project_id", projectId)
    .order("date", { ascending: false });

  if (error) {
    console.error("RPC Error:", error);
    throw new Error(error.message);
  }

  return data || [];
};

// Get log by ID
export const getLogById = async (id: string): Promise<Log | null> => {
  const { data, error } = await supabase
    .from("logs")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Create new log
export const createLog = async (log: LogInsert): Promise<Log> => {
  const { data, error } = await supabase
    .from("logs")
    .insert(log)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Update log
export const updateLog = async (
  id: string,
  updates: LogUpdate
): Promise<Log> => {
  const { data, error } = await supabase
    .from("logs")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Delete log
export const deleteLog = async (id: string): Promise<void> => {
  const { error } = await supabase.from("logs").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
};

export const deleteLogByDate = async (date: string): Promise<void> => {
  const { error } = await supabase.from("logs").delete().eq("date", date);

  if (error) {
    throw new Error(error.message);
  }
};

export const getLogByDate = async (date: string): Promise<Partial<Log>[]> => {
  const { data, error } = await supabase
    .from("logs")
    .select("*")
    .eq("date", date);

  if (error) {
    throw new Error(error.message);
  }

  return data as Partial<Log>[];
};

// Get logs by date range
export const getLogsByDateRange = async (
  startDate: string,
  endDate: string
): Promise<Log[]> => {
  const { data, error } = await supabase
    .from("logs")
    .select("*")
    .gte("date", startDate)
    .lte("date", endDate)
    .order("date", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};

// Get logs with running totals (per inventory)
export const getLogsWithRunningTotals = async (
  projectId: string
): Promise<Log[]> => {
  const { data, error } = await supabase.rpc(
    "get_daily_aggregated_logs_with_totals",
    {
      p_project_id: projectId,
    }
  );

  if (error) {
    console.error("RPC Error:", error);
    throw new Error(error.message);
  }

  return data || [];
};
