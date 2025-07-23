import React from "react";
import { UseQueryResult } from "@tanstack/react-query";
import styled from "styled-components";
import Spinner from "../../ui/Spinner/Spinner";

// Styled Components
const QueryBoundaryContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  width: 100%;

  @media (max-width: 640px) {
    min-height: 150px;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: #666;

  p {
    margin: 0;
    font-size: 1rem;
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
  padding: 2rem;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  color: #dc2626;
  max-width: 400px;

  h3 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
  }

  p {
    margin: 0;
    font-size: 0.875rem;
    color: #7f1d1d;
  }

  button {
    background-color: #dc2626;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 500;
    transition: background-color 0.2s;

    &:hover {
      background-color: #b91c1c;
    }

    &:focus {
      outline: 2px solid #dc2626;
      outline-offset: 2px;
    }
  }

  @media (max-width: 640px) {
    padding: 1.5rem;
    max-width: 300px;
  }
`;

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
  padding: 2rem;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  color: #6b7280;
  max-width: 400px;

  p {
    margin: 0;
    font-size: 1rem;
  }

  @media (max-width: 640px) {
    padding: 1.5rem;
    max-width: 300px;
  }
`;

// Single query boundary
interface QueryBoundaryProps<T> {
  query: UseQueryResult<T, Error>;
  children: React.ReactNode | ((data: { data: T }) => React.ReactNode);
  loadingComponent?: React.ReactNode;
  errorComponent?: (error: Error) => React.ReactNode;
  emptyComponent?: React.ReactNode;
}

export function QueryBoundary<T>({
  query,
  children,
  loadingComponent,
  errorComponent,
  emptyComponent,
}: QueryBoundaryProps<T>) {
  const { data, isLoading, error } = query;

  if (isLoading) {
    return (
      <QueryBoundaryContainer>
        <LoadingContainer>
          {loadingComponent || <Spinner size="medium" />}
        </LoadingContainer>
      </QueryBoundaryContainer>
    );
  }

  if (error) {
    const defaultError = (
      <ErrorContainer>
        <h3>Something went wrong</h3>
        <p>{error.message}</p>
      </ErrorContainer>
    );

    return (
      <QueryBoundaryContainer>
        {errorComponent ? errorComponent(error) : defaultError}
      </QueryBoundaryContainer>
    );
  }

  // Support both render props and regular JSX children
  if (typeof children === "function") {
    return <>{children({ data: data! })}</>;
  }

  return <>{children}</>;
}

// Multiple queries boundary with better typing
interface QueryBoundariesProps {
  queries: UseQueryResult<any, Error>[];
  children: React.ReactNode | ((data: { data: any[] }) => React.ReactNode);
  loadingComponent?: React.ReactNode;
  errorComponent?: (error: Error) => React.ReactNode;
  emptyComponent?: React.ReactNode;
}

// Alternative API with query prop and direct array destructuring
interface QueryBoundariesAltProps {
  query: UseQueryResult<any, Error>[];
  children: React.ReactNode | ((data: any[]) => React.ReactNode);
  loadingComponent?: React.ReactNode;
  errorComponent?: (error: Error) => React.ReactNode;
  emptyComponent?: React.ReactNode;
}

// Generic version for better typing
interface QueryBoundariesGenericProps<
  T extends readonly UseQueryResult<any, Error>[]
> {
  query: T;
  children: React.ReactNode | ((data: QueryDataTuple<T>) => React.ReactNode);
  loadingComponent?: React.ReactNode;
  errorComponent?: (error: Error) => React.ReactNode;
  emptyComponent?: React.ReactNode;
}

// Helper type to extract data types as tuple
type QueryDataTuple<T extends readonly UseQueryResult<any, Error>[]> = {
  [K in keyof T]: T[K] extends UseQueryResult<infer U, Error> ? U : never;
};

// Combined props type
type CombinedQueryBoundariesProps =
  | (QueryBoundariesProps & { query?: never })
  | (QueryBoundariesAltProps & { queries?: never });

// Function overloads
export function QueryBoundaries<
  T extends readonly UseQueryResult<any, Error>[]
>(props: QueryBoundariesGenericProps<T>): React.ReactElement;
export function QueryBoundaries(
  props: CombinedQueryBoundariesProps
): React.ReactElement;
export function QueryBoundaries(props: any) {
  const {
    queries,
    query,
    children,
    loadingComponent,
    errorComponent,
    emptyComponent,
  } = props;

  // Support both 'queries' and 'query' props
  const queryArray = queries || query || [];

  // Check if any query is loading
  const isLoading = queryArray.some((q: any) => q.isLoading);

  // Get the first error if any
  const error = queryArray.find((q: any) => q.error)?.error;

  // Get all data
  const allData = queryArray.map((q: any) => q.data);

  // Check if all queries have data
  const hasAllData = queryArray.every((q: any) => q.data !== undefined);

  if (isLoading) {
    return (
      <QueryBoundaryContainer>
        <LoadingContainer>
          {loadingComponent || <Spinner size="medium" />}
        </LoadingContainer>
      </QueryBoundaryContainer>
    );
  }

  if (error) {
    const defaultError = (
      <ErrorContainer>
        <h3>Something went wrong</h3>
        <p>{error.message}</p>
      </ErrorContainer>
    );

    return (
      <QueryBoundaryContainer>
        {errorComponent ? errorComponent(error) : defaultError}
      </QueryBoundaryContainer>
    );
  }

  if (!hasAllData) {
    return (
      <QueryBoundaryContainer>
        <EmptyContainer>
          {emptyComponent || <p>No data available</p>}
        </EmptyContainer>
      </QueryBoundaryContainer>
    );
  }

  // Support both render props patterns
  if (typeof children === "function") {
    // If using 'query' prop, pass data directly as tuple for destructuring
    if (query) {
      return <>{children(allData as any)}</>;
    }
    // If using 'queries' prop, pass as object with data property
    return (
      <>
        {(children as (data: { data: any[] }) => React.ReactNode)({
          data: allData,
        })}
      </>
    );
  }

  return <>{children}</>;
}
