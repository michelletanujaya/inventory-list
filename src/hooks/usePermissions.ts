import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import {
  getPermissions,
  getAllProjectPermissions,
  getUserPermissions,
  createPermission,
  updatePermission,
  deletePermission,
} from "../services/permissions";
import {
  CreatePermissionInput,
  UpdatePermissionInput,
  PermissionFlags,
} from "../types/permissions";

// Query Keys
export const permissionKeys = {
  all: ["permissions"] as const,
  userProject: (userId: string, projectId: string) =>
    ["permissions", "user-project", userId, projectId] as const,
  project: (projectId: string) =>
    ["permissions", "project", projectId] as const,
  user: (userId: string) => ["permissions", "user", userId] as const,
};

// Get specific user-project permissions
export const usePermissions = (projectId: string, userId?: string) => {
  const { user } = useAuth();
  const targetUserId = userId || user?.id;

  return useQuery({
    queryKey: permissionKeys.userProject(targetUserId || "", projectId),
    queryFn: () => getPermissions(targetUserId!, projectId),
    enabled: !!targetUserId && !!projectId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get current user's permissions for a project (with helper methods)
export const useCurrentUserPermissions = (projectId: string) => {
  const { user } = useAuth();

  const query = useQuery({
    queryKey: permissionKeys.userProject(user?.id || "", projectId),
    queryFn: () => getPermissions(user!.id, projectId),
    enabled: !!user?.id && !!projectId,
    staleTime: 5 * 60 * 1000,
  });

  const permissions: PermissionFlags = {
    canRead: query.data?.can_read || false,
    canAdd: query.data?.can_add || false,
    canUpdate: query.data?.can_update || false,
    canDelete: query.data?.can_delete || false,
    is_admin: query.data?.is_admin || false,
  };

  return {
    ...query,
    permissions,
    hasAnyPermission:
      permissions.canRead ||
      permissions.canAdd ||
      permissions.canUpdate ||
      permissions.canDelete,
  };
};

// Get all permissions for a project
export const useProjectPermissions = (projectId: string) => {
  return useQuery({
    queryKey: permissionKeys.project(projectId),
    queryFn: () => getAllProjectPermissions(projectId),
    enabled: !!projectId,
    staleTime: 5 * 60 * 1000,
  });
};

// Get all permissions for a user
export const useUserAllPermissions = (userId?: string) => {
  const { user } = useAuth();
  const targetUserId = userId || user?.id;

  return useQuery({
    queryKey: permissionKeys.user(targetUserId || ""),
    queryFn: () => getUserPermissions(targetUserId!),
    enabled: !!targetUserId,
    staleTime: 5 * 60 * 1000,
  });
};

// Create permission mutation
export const useCreatePermission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (permission: CreatePermissionInput) =>
      createPermission(permission),
    onSuccess: (data) => {
      // Invalidate related queries
      queryClient.invalidateQueries({
        queryKey: permissionKeys.userProject(data.user_id, data.project_id),
      });
      queryClient.invalidateQueries({
        queryKey: permissionKeys.project(data.project_id),
      });
      queryClient.invalidateQueries({
        queryKey: permissionKeys.user(data.user_id),
      });
    },
  });
};

// Update permission mutation
export const useUpdatePermission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      projectId,
      updates,
    }: {
      userId: string;
      projectId: string;
      updates: UpdatePermissionInput;
    }) => updatePermission(userId, projectId, updates),
    onSuccess: (data) => {
      // Invalidate related queries
      queryClient.invalidateQueries({
        queryKey: permissionKeys.userProject(data.user_id, data.project_id),
      });
      queryClient.invalidateQueries({
        queryKey: permissionKeys.project(data.project_id),
      });
      queryClient.invalidateQueries({
        queryKey: permissionKeys.user(data.user_id),
      });
    },
  });
};

// Delete permission mutation
export const useDeletePermission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      projectId,
    }: {
      userId: string;
      projectId: string;
    }) => deletePermission(userId, projectId),
    onSuccess: (_, variables) => {
      // Invalidate related queries
      queryClient.invalidateQueries({
        queryKey: permissionKeys.userProject(
          variables.userId,
          variables.projectId
        ),
      });
      queryClient.invalidateQueries({
        queryKey: permissionKeys.project(variables.projectId),
      });
      queryClient.invalidateQueries({
        queryKey: permissionKeys.user(variables.userId),
      });
    },
  });
};
