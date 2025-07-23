import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getInventories,
  getInventoryById,
  createInventory,
  updateInventory,
  deleteInventory,
} from "../services/inventories";
import type { InventoryInsert, InventoryUpdate } from "../lib/supabase";

// Query keys
export const inventoryKeys = {
  all: ["inventories"] as const,
  lists: () => [...inventoryKeys.all, "list"] as const,
  list: (filters: string) => [...inventoryKeys.lists(), { filters }] as const,
  details: () => [...inventoryKeys.all, "detail"] as const,
  detail: (id: string) => [...inventoryKeys.details(), id] as const,
};

// Get all inventories
export const useInventories = () => {
  return useQuery({
    queryKey: inventoryKeys.lists(),
    queryFn: getInventories,
  });
};

// Get inventory by ID
export const useInventory = (id: string) => {
  return useQuery({
    queryKey: inventoryKeys.detail(id),
    queryFn: () => getInventoryById(id),
    enabled: !!id,
  });
};

// Create inventory mutation
export const useCreateInventory = (options?: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createInventory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: inventoryKeys.lists() });

      options?.onSuccess?.();
    },
  });
};

// Update inventory mutation
export const useUpdateInventory = (options?: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: InventoryUpdate }) =>
      updateInventory(id, updates),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: inventoryKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: inventoryKeys.detail(data.id),
      });

      options?.onSuccess?.();
    },
  });
};

// Delete inventory mutation
export const useDeleteInventoryById = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteInventory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: inventoryKeys.lists() });
    },
  });
};
