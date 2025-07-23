import styled, { keyframes, css } from "styled-components";
import { media } from "../../theme/mediaQueries";

// Animations for expand/collapse
const expandRow = keyframes`
  from {
    opacity: 0;
    max-height: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    max-height: 500px;
    transform: translateY(0);
  }
`;

const collapseRow = keyframes`
  from {
    opacity: 1;
    max-height: 500px;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    max-height: 0;
    transform: translateY(-10px);
  }
`;

// Main container with proper scrolling
export const DataTableContainer = styled.div`
  border-radius: 6px;
  border: 1px solid var(--border);
  overflow: hidden; /* Keep hidden for desktop */

  ${media.maxMd} {
    /* Enable horizontal scroll on tablet and mobile */
    overflow-x: auto;
    overflow-y: visible;
    -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */

    /* Add scrollbar styling for webkit browsers */
    &::-webkit-scrollbar {
      height: 8px;
    }

    &::-webkit-scrollbar-track {
      background: var(--bg-secondary);
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--border);
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: var(--text-secondary);
    }
  }

  ${media.tablet} {
    border-radius: 4px;
  }

  ${media.mobile} {
    border-radius: 0;
    border-width: 0 0 1px 0;
    margin: 0 -1rem; /* Full width on mobile */
  }
`;

// Table element with minimum width
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: auto; /* Changed from fixed to auto for better mobile handling */

  ${media.maxMd} {
    /* Set minimum width to ensure table doesn't compress too much */
    min-width: 600px; /* Adjust this value based on your table content */
  }

  ${media.mobile} {
    font-size: 0.8rem;
    min-width: 500px; /* Smaller minimum on mobile */
  }
`;

// Table header
export const TableHeader = styled.thead`
  background-color: var(--bg-secondary);

  ${media.mobile} {
    background-color: var(--bg-secondary);
  }
`;

// Table body
export const TableBody = styled.tbody``;

// Table row
export const TableRow = styled.tr<{ isExpanded?: boolean }>`
  height: 4rem;
  border-bottom: 1px solid var(--border);

  &:hover {
    ${({ isExpanded }) =>
      !isExpanded &&
      css`
        background-color: var(--bg-tertiary);
      `}
  }

  ${({ isExpanded }) =>
    isExpanded &&
    css`
      background-color: var(--bg-secondary-accent);
    `}

  &:last-child {
    border-bottom: none;
  }

  ${media.tablet} {
    height: 3.25rem;
  }
  ${media.mobile} {
    height: 2.5rem;
  }
`;

// Expanded table row with proper collapse
export const ExpandedTableRow = styled.tr<{ isExpanded: boolean }>`
  ${({ isExpanded }) =>
    isExpanded
      ? css`
          animation: ${expandRow} 0.3s ease-out forwards;
        `
      : css`
          animation: ${collapseRow} 0.3s ease-out forwards;
        `}
`;

// Expanded table cell that fully collapses
export const ExpandedTableCell = styled.td<{ isExpanded: boolean }>`
  background-color: var(--white);

  border-bottom: 1px solid var(--border);
  overflow: hidden;
  padding: ${({ isExpanded }) => (isExpanded ? "1rem" : "0")};

  ${({ isExpanded }) =>
    isExpanded
      ? css`
          max-height: 500px;
          opacity: 1;
          transition: all 0.3s ease-out;
        `
      : css`
          max-height: 0;
          opacity: 0;
          transition: all 0.3s ease-out;
          border-bottom: none;
        `}

  ${media.tablet} {
    padding: ${({ isExpanded }) => (isExpanded ? "0.75rem" : "0")};
  }
  ${media.mobile} {
    padding: ${({ isExpanded }) => (isExpanded ? "0.5rem" : "0")};
  }
`;

// Animated content wrapper
export const ExpandedContent = styled.div<{ isExpanded: boolean }>`
  transition: all 0.3s ease-out;
  transform-origin: top;

  ${({ isExpanded }) =>
    isExpanded
      ? css`
          opacity: 1;
          transform: scaleY(1);
          visibility: visible;
        `
      : css`
          opacity: 0;
          transform: scaleY(0);
          visibility: hidden;
        `}
`;

// Table head cell with minimum width
export const TableHead = styled.th`
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--text-light);
  border-bottom: 1px solid var(--border);
  background-color: var(--bg-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap; /* Prevent header text wrapping */
  min-width: 100px; /* Minimum column width */

  &:first-child {
    border-top-left-radius: 6px;
    ${media.mobile} {
      position: sticky;
      left: 0;
      z-index: 1;
      background-color: var(--bg-secondary);
    }
  }

  &:last-child {
    border-top-right-radius: 6px;
  }

  ${media.tablet} {
    padding: 0.5rem 0.75rem;
    font-size: 0.8rem;
    min-width: 80px;
  }

  ${media.mobile} {
    padding: 0.4rem 0.5rem;
    font-size: 0.75rem;
    min-width: 60px;
  }
`;

// Table cell with minimum width
export const TableCell = styled.td`
  padding: 1rem;
  color: #374151;
  white-space: nowrap;
  font-size: 0.875rem;
  min-width: 100px; /* Minimum cell width */

  &.whitespace-normal {
    white-space: normal;
  }

  &.text-truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px; /* Maximum width before truncation */
  }

  /* Sticky first column on mobile */
  ${media.mobile} {
    padding: 0.5rem;
    font-size: 0.75rem;
    min-width: 60px;

    &:first-child {
      position: sticky;
      left: 0;
      background-color: var(--white);
      z-index: 1;
      border-right: 1px solid var(--border);
    }
  }

  ${media.tablet} {
    padding: 0.75rem;
    font-size: 0.8rem;
    min-width: 80px;
  }
`;

// Sortable header container
export const SortableHeaderContainer = styled.div<{ canSort: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: ${({ canSort }) => (canSort ? "pointer" : "default")};
  user-select: none;

  &:hover {
    ${({ canSort }) => canSort && "opacity: 0.7;"}
  }

  ${media.mobile} {
    gap: 0.25rem;
  }
`;

// Sort icon container
export const SortIconContainer = styled.span`
  margin-left: 0.25rem;
  display: inline-flex;
  align-items: center;
  width: 1rem;
  height: 1rem;

  ${media.mobile} {
    width: 0.8rem;
    height: 0.8rem;
    margin-left: 0.15rem;
  }
`;
