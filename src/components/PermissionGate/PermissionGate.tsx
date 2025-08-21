import React from "react";
import { useCurrentUserPermissions } from "../../hooks/usePermissions";
import {
  PermissionFallback,
  PermissionFallbackProps,
} from "../PermissionFallback";
import Spinner from "../../ui/Spinner";

export interface PermissionRequirement {
  projectId: string;
  permissions: {
    canRead?: boolean;
    canAdd?: boolean;
    canUpdate?: boolean;
    canDelete?: boolean;
    isAdmin?: boolean;
  };
  requireAll?: boolean; // If true, user must have ALL specified permissions. If false, user needs ANY of them.
}

export interface PermissionGateProps {
  children: React.ReactNode;
  requirement: PermissionRequirement;
  fallback?: React.ReactNode;
  fallbackProps?: Partial<PermissionFallbackProps>;
  loadingComponent?: React.ReactNode;
  showLoadingSpinner?: boolean;
}

export const PermissionGate: React.FC<PermissionGateProps> = ({
  children,
  requirement,
  fallback,
  fallbackProps = {},
  loadingComponent,
  showLoadingSpinner = true,
}) => {
  const { permissions, hasAnyPermission, isLoading, error } =
    useCurrentUserPermissions(requirement.projectId);

  // Show loading state
  if (isLoading) {
    if (loadingComponent) {
      return <>{loadingComponent}</>;
    }

    if (showLoadingSpinner) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem",
          }}
        >
          <Spinner />
        </div>
      );
    }

    return null;
  }

  // Handle error state - treat as no permission
  if (error || !hasAnyPermission) {
    return (
      fallback || (
        <PermissionFallback
          title="Access Restricted"
          description="You don't have permission to access this content."
          {...fallbackProps}
        />
      )
    );
  }

  // Check specific permission requirements
  const hasRequiredPermissions = checkPermissions(permissions, requirement);

  if (!hasRequiredPermissions) {
    return (
      fallback || (
        <PermissionFallback
          title="Insufficient Permissions"
          description="You don't have the required permissions to perform this action."
          {...fallbackProps}
        />
      )
    );
  }

  // User has required permissions, render children
  return <>{children}</>;
};

// Helper function to check if user has required permissions
function checkPermissions(
  userPermissions: {
    canRead: boolean;
    canAdd: boolean;
    canUpdate: boolean;
    canDelete: boolean;
    is_admin: boolean;
  },
  requirement: PermissionRequirement
): boolean {
  const { permissions: requiredPerms, requireAll = false } = requirement;

  // Admin users have all permissions
  if (userPermissions.is_admin) {
    return true;
  }

  // Check each required permission
  const permissionChecks: boolean[] = [];

  if (requiredPerms.canRead !== undefined) {
    permissionChecks.push(userPermissions.canRead === requiredPerms.canRead);
  }

  if (requiredPerms.canAdd !== undefined) {
    permissionChecks.push(userPermissions.canAdd === requiredPerms.canAdd);
  }

  if (requiredPerms.canUpdate !== undefined) {
    permissionChecks.push(
      userPermissions.canUpdate === requiredPerms.canUpdate
    );
  }

  if (requiredPerms.canDelete !== undefined) {
    permissionChecks.push(
      userPermissions.canDelete === requiredPerms.canDelete
    );
  }

  if (requiredPerms.isAdmin !== undefined) {
    permissionChecks.push(userPermissions.is_admin === requiredPerms.isAdmin);
  }

  // If no specific permissions were checked, allow access
  if (permissionChecks.length === 0) {
    return true;
  }

  // Return based on requireAll flag
  return requireAll
    ? permissionChecks.every((check) => check) // ALL permissions required
    : permissionChecks.some((check) => check); // ANY permission required
}
