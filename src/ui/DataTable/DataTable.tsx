import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  getSortedRowModel,
  SortingState,
  getPaginationRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  ExpandedState,
} from "@tanstack/react-table";
import {
  DataTableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  SortableHeaderContainer,
  SortIconContainer,
  ExpandedTableRow,
  ExpandedTableCell,
  ExpandedContent,
} from "./styles";
import { ArrowUpDown, ChevronUp, ChevronDown } from "../icons";
import ResponsiveTableWrapper from "./ResponsiveTableWrapper";
import { useHorizontalScroll } from "../../hooks/useHorizontalScroll";

type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

interface DataTableProps<D extends NonNullable<unknown>> {
  columns: ColumnDef<D, any>[];
  data: readonly D[];
  isLoading?: boolean;
  enableSorting?: boolean;
  enablePagination?: boolean;
  enableSearch?: boolean;
  pageSize?: number;
  emptyMessage?: string;
  searchPlaceholder?: string;
  className?: string;
  renderExpandedRow?: (row: D) => React.ReactNode;
}

const DataTable = <D extends NonNullable<unknown>>({
  columns,
  data,
  isLoading = false,
  enableSorting = true,
  enablePagination = true,
  enableSearch = true,
  pageSize = 10,
  emptyMessage = "No data available",
  searchPlaceholder = "Search...",
  className = "",
  renderExpandedRow,
}: DataTableProps<D>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [animatingRows, setAnimatingRows] = useState<Set<string>>(new Set());
  const scrollRef = useHorizontalScroll();

  const table = useReactTable({
    columns: columns as Mutable<typeof columns>,
    data: data as Mutable<typeof data>,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getPaginationRowModel: enablePagination
      ? getPaginationRowModel()
      : undefined,
    getFilteredRowModel: enableSearch ? getFilteredRowModel() : undefined,
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      sorting: enableSorting ? sorting : undefined,
      globalFilter: enableSearch ? globalFilter : undefined,
      expanded,
    },
    onSortingChange: enableSorting ? setSorting : undefined,
    onGlobalFilterChange: enableSearch ? setGlobalFilter : undefined,
    onExpandedChange: (updater) => {
      setExpanded((prev) => {
        const newExpanded =
          typeof updater === "function" ? updater(prev) : updater;

        // Track which rows are animating
        Object.keys(newExpanded).forEach((rowId) => {
          const newValue = (newExpanded as any)[rowId];
          const prevValue = (prev as any)[rowId];
          if (newValue !== prevValue) {
            setAnimatingRows((current) => new Set(current).add(rowId));

            // Remove from animating set after animation completes
            setTimeout(() => {
              setAnimatingRows((current) => {
                const newSet = new Set(current);
                newSet.delete(rowId);
                return newSet;
              });
            }, 300);
          }
        });

        return newExpanded;
      });
    },
    getRowCanExpand: () => !!renderExpandedRow,
    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  if (isLoading) {
    return (
      <DataTableContainer className={className}>
        <div
          style={{
            padding: "3rem 1rem",
            textAlign: "center",
            color: "#6b7280",
          }}
        >
          Loading...
        </div>
      </DataTableContainer>
    );
  }

  return (
    <ResponsiveTableWrapper>
      <DataTableContainer ref={scrollRef} className={className}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{
                        width: header.getSize(),
                        minWidth: header.column.columnDef.minSize || 100, // Use column minSize if defined
                      }}
                    >
                      {header.isPlaceholder ? null : (
                        <SortableHeaderContainer
                          canSort={header.column.getCanSort()}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getCanSort() && (
                            <SortIconContainer>
                              {header.column.getIsSorted() === "asc" ? (
                                <ChevronUp />
                              ) : header.column.getIsSorted() === "desc" ? (
                                <ChevronDown />
                              ) : (
                                <ArrowUpDown />
                              )}
                            </SortIconContainer>
                          )}
                        </SortableHeaderContainer>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  style={{
                    textAlign: "center",
                    padding: "3rem 1rem",
                    color: "#6b7280",
                  }}
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => {
                const isExpanded = row.getIsExpanded();
                const isAnimating = animatingRows.has(row.id);
                const shouldShowExpanded = isExpanded || isAnimating;

                return (
                  <React.Fragment key={row.id}>
                    <TableRow isExpanded={isExpanded}>
                      {row.getVisibleCells().map((cell: any) => (
                        <TableCell
                          key={cell.id}
                          className={
                            cell.column.id === "entity_name_text"
                              ? "whitespace-normal"
                              : ""
                          }
                          style={{ width: cell.column.getSize() }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                    {renderExpandedRow && shouldShowExpanded && (
                      <ExpandedTableRow isExpanded={isExpanded}>
                        <ExpandedTableCell
                          colSpan={columns.length}
                          isExpanded={isExpanded}
                        >
                          <ExpandedContent isExpanded={isExpanded}>
                            {renderExpandedRow(row.original)}
                          </ExpandedContent>
                        </ExpandedTableCell>
                      </ExpandedTableRow>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </TableBody>
        </Table>
      </DataTableContainer>
    </ResponsiveTableWrapper>
  );
};

export default DataTable;
