import { useState, useEffect } from "react";
import { breakpoints } from "../theme/mediaQueries";

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);
    const handleChange = () => setMatches(mediaQuery.matches);

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, [query]);

  return matches;
};

// Convenience hooks for common breakpoints
export const useIsMobile = () =>
  useMediaQuery(`(max-width: ${parseInt(breakpoints.md) - 1}px)`);
export const useIsTablet = () =>
  useMediaQuery(
    `(min-width: ${breakpoints.md}) and (max-width: ${
      parseInt(breakpoints.lg) - 1
    }px)`
  );
export const useIsDesktop = () =>
  useMediaQuery(`(min-width: ${breakpoints.lg})`);
export const useIsLargeScreen = () =>
  useMediaQuery(`(min-width: ${breakpoints.xl})`);
