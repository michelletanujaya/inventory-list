import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createLog,
  deleteLog,
  deleteLogByDate,
  getLogByDate,
  getLogById,
  getLogs,
  getLogsByDateRange,
  updateLog,
} from "../services/logs";
import { Log, LogUpdate } from "../lib/supabase";

// Query keys
export const logKeys = {
  all: ["logs"] as const,
  lists: () => [...logKeys.all, "list"] as const,
  list: (filters: string) => [...logKeys.lists(), { filters }] as const,
  details: () => [...logKeys.all, "detail"] as const,
  detail: (id: string) => [...logKeys.details(), id] as const,
};

// Get all logs
export const useLogs = () => {
  return useQuery({
    queryKey: logKeys.lists(),
    queryFn: getLogs, // Switch back to getLogs once function is fixed
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
export const useCreateLog = (options?: {
  onSuccess?: (data: Log) => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLog,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: logKeys.lists() });
      options?.onSuccess?.(data);
    },
    onError: options?.onError,
  });
};

// Update log
export const useUpdateLog = (options?: {
  onSuccess?: (data: Log) => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: LogUpdate }) =>
      updateLog(id, updates),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: logKeys.lists() });
      queryClient.invalidateQueries({ queryKey: logKeys.detail(data.id) });
      options?.onSuccess?.(data);
    },
    onError: options?.onError,
  });
};

// Delete log
export const useDeleteLog = (options?: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: logKeys.lists() });
      options?.onSuccess?.();
    },
    onError: options?.onError,
  });
};

export const useDeleteLogByDate = (options?: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLogByDate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: logKeys.lists() });
      options?.onSuccess?.();
    },
    onError: options?.onError,
  });
};
