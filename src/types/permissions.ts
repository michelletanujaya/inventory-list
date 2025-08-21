export interface UserProjectPermissions {
  user_id: string;
  project_id: string;
  can_read: boolean;
  can_add: boolean;
  can_update: boolean;
  can_delete: boolean;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

export interface PermissionFlags {
  canRead: boolean;
  canAdd: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  is_admin: boolean;
}

export interface CreatePermissionInput {
  user_id: string;
  project_id: string;
  can_read?: boolean;
  can_add?: boolean;
  can_update?: boolean;
  can_delete?: boolean;
  is_admin?: boolean;
}

export interface UpdatePermissionInput {
  can_read?: boolean;
  can_add?: boolean;
  can_update?: boolean;
  can_delete?: boolean;
  is_admin?: boolean;
}
