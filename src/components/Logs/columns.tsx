import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "../../ui/icons";
import styled from "styled-components";
import DeleteLogButton from "./DeleteLogButton";
import IconButton from "../../ui/IconButton";

const StyledActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: flex-end;
`;

const AnimatedChevron = styled.div<{ isExpanded: boolean }>`
  transition: transform 0.3s ease-in-out;
  transform: ${({ isExpanded }) =>
    isExpanded ? "rotate(90deg)" : "rotate(0deg)"};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export interface LogRow extends Record<string, unknown> {
  id: string;
  date: string;
  startingQuantity: number;
  quantityAdded: number;
  quantitySold: number;
  endingQuantity: number;
}

export const columns: ColumnDef<LogRow>[] = [
  {
    header: "Date",
    accessorKey: "date",
    minSize: 120,
  },
  {
    header: "Start",
    accessorKey: "startingQuantity",
    enableSorting: false,
    minSize: 80,
  },
  {
    accessorKey: "quantityAdded",
    header: "Added",
    enableSorting: false,
    minSize: 80,
    cell: ({ row }) => (
      <span className="text-green-600 font-medium">
        + {row.getValue("quantityAdded")}
      </span>
    ),
  },
  {
    accessorKey: "quantitySold",
    header: "Sold",
    enableSorting: false,
    minSize: 80,
    cell: ({ row }) => (
      <span className="text-red-600 font-medium">
        - {row.getValue("quantitySold")}
      </span>
    ),
  },
  {
    accessorKey: "endingQuantity",
    header: "Running Total",
    enableSorting: false,
    minSize: 120,
    cell: ({ row }) => (
      <span className="font-bold">{row.getValue("endingQuantity")}</span>
    ),
  },
  {
    header: "",
    accessorKey: "id",
    enableSorting: false,
    cell: ({ row }) => {
      const isExpanded = row.getIsExpanded();

      return (
        <StyledActions>
          <IconButton
            aria-label={isExpanded ? "Collapse row" : "Expand row"}
            icon={
              <AnimatedChevron isExpanded={isExpanded}>
                <ChevronRight />
              </AnimatedChevron>
            }
            onClick={() => row.toggleExpanded()}
          />
        </StyledActions>
      );
    },
  },
];
