// Breakpoint values
export const breakpoints = {
  xs: "320px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

// Media query helper functions
export const media = {
  // Min-width queries (mobile-first)
  xs: `@media (min-width: ${breakpoints.xs})`,
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  "2xl": `@media (min-width: ${breakpoints["2xl"]})`,

  // Max-width queries (desktop-first)
  maxXs: `@media (max-width: ${parseInt(breakpoints.sm) - 1}px)`,
  maxSm: `@media (max-width: ${parseInt(breakpoints.md) - 1}px)`,
  maxMd: `@media (max-width: ${parseInt(breakpoints.lg) - 1}px)`,
  maxLg: `@media (max-width: ${parseInt(breakpoints.xl) - 1}px)`,
  maxXl: `@media (max-width: ${parseInt(breakpoints["2xl"]) - 1}px)`,

  // Range queries
  smToMd: `@media (min-width: ${breakpoints.sm}) and (max-width: ${
    parseInt(breakpoints.lg) - 1
  }px)`,
  mdToLg: `@media (min-width: ${breakpoints.md}) and (max-width: ${
    parseInt(breakpoints.xl) - 1
  }px)`,
  lgToXl: `@media (min-width: ${breakpoints.lg}) and (max-width: ${
    parseInt(breakpoints["2xl"]) - 1
  }px)`,

  // Custom queries
  mobile: `@media (max-width: ${parseInt(breakpoints.md) - 1}px)`,
  tablet: `@media (min-width: ${breakpoints.md}) and (max-width: ${
    parseInt(breakpoints.lg) - 1
  }px)`,
  desktop: `@media (min-width: ${breakpoints.lg})`,

  // Orientation queries
  landscape: "@media (orientation: landscape)",
  portrait: "@media (orientation: portrait)",

  // High DPI queries
  retina:
    "@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)",

  // Hover capability
  hover: "@media (hover: hover)",
  noHover: "@media (hover: none)",

  // Reduced motion
  reducedMotion: "@media (prefers-reduced-motion: reduce)",
  noReducedMotion: "@media (prefers-reduced-motion: no-preference)",

  // Dark mode
  darkMode: "@media (prefers-color-scheme: dark)",
  lightMode: "@media (prefers-color-scheme: light)",
} as const;

// Helper function for custom breakpoints
export const customMedia = (minWidth: string, maxWidth?: string) => {
  if (maxWidth) {
    return `@media (min-width: ${minWidth}) and (max-width: ${maxWidth})`;
  }
  return `@media (min-width: ${minWidth})`;
};

// Container max-widths
export const containers = {
  xs: breakpoints.xs,
  sm: breakpoints.sm,
  md: breakpoints.md,
  lg: breakpoints.lg,
  xl: breakpoints.xl,
  "2xl": breakpoints["2xl"],
  full: "100%",
} as const;
