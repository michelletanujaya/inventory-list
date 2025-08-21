import { supabase } from "../lib/supabase";
import {
  UserProjectPermissions,
  CreatePermissionInput,
  UpdatePermissionInput,
} from "../types/permissions";

export const getPermissions = async (
  userId: string,
  projectId: string
): Promise<UserProjectPermissions | null> => {
  const { data, error } = await supabase
    .from("user_project_permissions")
    .select("*")
    .eq("user_id", userId)
    .eq("project_id", projectId)
    .single();

  if (error && error.code !== "PGRST116") {
    // PGRST116 is "not found" error, which is acceptable
    throw error;
  }

  return data;
};

export const getAllProjectPermissions = async (
  projectId: string
): Promise<UserProjectPermissions[]> => {
  const { data, error } = await supabase
    .from("user_project_permissions")
    .select(
      `
      *,
      users:user_id (
        email
      )
    `
    )
    .eq("project_id", projectId);

  if (error) {
    throw error;
  }

  return data || [];
};

export const getUserPermissions = async (
  userId: string
): Promise<UserProjectPermissions[]> => {
  const { data, error } = await supabase
    .from("user_project_permissions")
    .select(
      `
      *,
      projects:project_id (
        name
      )
    `
    )
    .eq("user_id", userId);

  if (error) {
    throw error;
  }

  return data || [];
};

export const createPermission = async (
  permission: CreatePermissionInput
): Promise<UserProjectPermissions> => {
  const { data, error } = await supabase
    .from("user_project_permissions")
    .insert([permission])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const updatePermission = async (
  userId: string,
  projectId: string,
  updates: UpdatePermissionInput
): Promise<UserProjectPermissions> => {
  const { data, error } = await supabase
    .from("user_project_permissions")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId)
    .eq("project_id", projectId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const deletePermission = async (
  userId: string,
  projectId: string
): Promise<void> => {
  const { error } = await supabase
    .from("user_project_permissions")
    .delete()
    .eq("user_id", userId)
    .eq("project_id", projectId);

  if (error) {
    throw error;
  }
};
