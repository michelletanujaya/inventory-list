import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";

export const useAuthCache = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const previousUserIdRef = useRef<string | null>(null);

  useEffect(() => {
    const currentUserId = user?.id || null;
    const previousUserId = previousUserIdRef.current;

    // If user changed (including login/logout), clear all queries
    if (previousUserId !== currentUserId) {
      console.log("User changed, clearing cache:", {
        previousUserId,
        currentUserId,
      });
      queryClient.clear();
      previousUserIdRef.current = currentUserId;
    }
  }, [user?.id, queryClient]);
};
