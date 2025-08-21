import { User } from "@supabase/supabase-js";

export const getUserDisplayName = (user: User | null): string => {
  if (!user) return "Guest";

  // Try different name fields in order of preference
  const possibleNames = [
    user.user_metadata?.display_name,
    user.user_metadata?.full_name,
    user.user_metadata?.name,
    user.user_metadata?.first_name,
    user.identities?.[0]?.identity_data?.full_name,
    user.identities?.[0]?.identity_data?.name,
    user.identities?.[0]?.identity_data?.first_name,
  ];

  // Return the first non-empty name found
  for (const name of possibleNames) {
    if (name && typeof name === "string" && name.trim().length > 0) {
      return name.trim();
    }
  }

  // Fallback to email (before @ symbol)
  if (user.email) {
    return user.email.split("@")[0];
  }

  // Final fallback
  return "User";
};

export const getUserInitials = (user: User | null): string => {
  const displayName = getUserDisplayName(user);

  if (displayName === "Guest" || displayName === "User") {
    return displayName.charAt(0).toUpperCase();
  }

  // Generate initials from name
  const words = displayName.split(" ").filter((word) => word.length > 0);
  if (words.length >= 2) {
    return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
  } else if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }

  return "U";
};
