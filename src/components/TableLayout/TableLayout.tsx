import React from "react";
import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import { ChevronLeft, ChevronRight } from "../../ui/icons";

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TopControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SearchWrapper = styled.div`
  width: 20rem;
`;

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PaginationInfo = styled.div`
  font-size: 0.875rem;
  color: #374151;
`;

const PaginationControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const IconLeft = styled(ChevronLeft)`
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
`;

const IconRight = styled(ChevronRight)`
  width: 1rem;
  height: 1rem;
  margin-left: 0.5rem;
`;

interface TableLayoutProps {
  children?: React.ReactNode;
  emptyState?: React.ReactNode;
  errorState?: React.ReactNode;
  filters?: React.ReactNode;
  isEmpty: boolean;
  isError?: boolean;
  isLoading?: boolean;
  pagination?: {
    count: number;
    limit: number;
    onPageChange: (page: number) => void;
    page: number;
    totalPages: number;
  };
  search?: React.ReactNode;
}

export function TableLayout({
  children,
  emptyState,
  errorState,
  filters,
  isEmpty,
  isError,
  isLoading,
  pagination,
  search,
}: TableLayoutProps) {
  let content: React.ReactNode;
  if (isLoading) {
    content = <Spinner />;
  } else if (isError) {
    content = errorState;
  } else if (isEmpty) {
    content = emptyState;
  } else {
    content = children;
  }

  return (
    <LayoutContainer>
      {search ||
        (filters && (
          <TopControls>
            <SearchWrapper>{search}</SearchWrapper>
            {filters}
          </TopControls>
        ))}
      {content}
      {pagination && (
        <PaginationContainer>
          <PaginationInfo>
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.count)} of{" "}
            {pagination.count} results
          </PaginationInfo>

          <PaginationControls>
            <Button
              variant="secondary"
              onClick={() => pagination.onPageChange(pagination.page - 1)}
              disabled={pagination.page <= 1}
            >
              <IconLeft />
              Previous
            </Button>

            <PaginationInfo>
              Page {pagination.page} of {pagination.totalPages}
            </PaginationInfo>

            <Button
              variant="secondary"
              onClick={() => pagination.onPageChange(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages}
            >
              Next
              <IconRight />
            </Button>
          </PaginationControls>
        </PaginationContainer>
      )}
    </LayoutContainer>
  );
}
