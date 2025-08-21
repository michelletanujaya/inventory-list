import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createLog,
  deleteLog,
  deleteLogByDate,
  getLogByDate,
  getLogById,
  getLogs,
  getLogsByDateRange,
  getLogsWithRunningTotals,
  updateLog,
} from "../services/logs";
import { Log, LogUpdate } from "../lib/supabase";

// Query keys
export const logKeys = {
  all: ["logs"] as const,
  lists: () => [...logKeys.all, "list"] as const,
  list: (projectId: string) => [...logKeys.lists(), projectId] as const,
  details: () => [...logKeys.all, "detail"] as const,
  detail: (id: string) => [...logKeys.details(), id] as const,
};

// Get logs with running totals
export const useLogsWithRunningTotals = (projectId: string) => {
  return useQuery({
    queryKey: logKeys.list(projectId),
    queryFn: () => getLogsWithRunningTotals(projectId),
    enabled: !!projectId,
  });
};

// Get all logs
export const useLogs = (projectId: string) => {
  return useQuery({
    queryKey: logKeys.list(projectId),
    queryFn: () => getLogs(projectId),
    enabled: !!projectId,
  });
};

// Get log by ID
export const useLogById = (id: string) => {
  return useQuery({
    queryKey: logKeys.detail(id),
    queryFn: () => getLogById(id),
    enabled: !!id,
  });
};

// Get logs by date
export const useLogsByDate = (date: string) => {
  return useQuery({
    queryKey: logKeys.list(date),
    queryFn: () => getLogByDate(date),
    enabled: !!date,
  });
};

// Get logs by date range
export const useLogsByDateRange = (startDate: string, endDate: string) => {
  return useQuery({
    queryKey: logKeys.list(`${startDate}-${endDate}`),
    queryFn: () => getLogsByDateRange(startDate, endDate),
    enabled: !!startDate && !!endDate,
  });
};

// Create log
export const useCreateLog = (
  projectId: string,
  options?: {
    onSuccess?: (data: Log) => void;
    onError?: (error: Error) => void;
  }
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLog,
    onSuccess: (data) => {
      // Invalidate project logs list
      queryClient.invalidateQueries({ queryKey: logKeys.list(projectId) });
      // Invalidate logs by date (for Stocks component)
      queryClient.invalidateQueries({ queryKey: logKeys.list(data.date) });
      options?.onSuccess?.(data);
    },
    onError: options?.onError,
  });
};

// Update log
export const useUpdateLog = (
  projectId: string,
  options?: {
    onSuccess?: (data: Log) => void;
    onError?: (error: Error) => void;
  }
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: LogUpdate }) =>
      updateLog(id, updates),
    onSuccess: (data) => {
      // Invalidate project logs list
      queryClient.invalidateQueries({ queryKey: logKeys.list(projectId) });
      // Invalidate specific log detail
      queryClient.invalidateQueries({ queryKey: logKeys.detail(data.id) });
      // Invalidate logs by date (for Stocks component)
      queryClient.invalidateQueries({ queryKey: logKeys.list(data.date) });
      options?.onSuccess?.(data);
    },
    onError: options?.onError,
  });
};

// Delete log
export const useDeleteLog = (
  projectId: string,
  options?: {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
  }
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLog,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: logKeys.list(projectId) });
      options?.onSuccess?.();
    },
    onError: options?.onError,
  });
};

export const useDeleteLogByDate = (
  projectId: string,
  options?: {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
  }
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLogByDate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: logKeys.list(projectId) });
      options?.onSuccess?.();
    },
    onError: options?.onError,
  });
};
