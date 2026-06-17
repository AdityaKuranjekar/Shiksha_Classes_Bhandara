import useSWR from "swr";
import { ResultsAPI } from "@/lib/mock-api/results";
import type { Result, PaginatedData } from "@/lib/api-types";

export function useResults(filters: {
  program: string;
  year: string;
  visibility: string;
  page: number;
}) {
  const key = ["results", filters.program, filters.year, filters.visibility, filters.page];
  
  const { data, error, isLoading, mutate } = useSWR<PaginatedData<Result>>(
    key,
    () => ResultsAPI.list(filters),
    { keepPreviousData: true }
  );

  return {
    resultsData: data,
    isLoading,
    isError: error,
    mutate,
  };
}
