import useSWR from "swr";
import { LeadsAPI } from "@/lib/mock-api/leads";
import type { Lead, PaginatedData } from "@/lib/api-types";

// In real app, swrFetcher from api-client.ts is used:
// import { swrFetcher } from "@/lib/api-client";

export function useLeads(filters: {
  status: string;
  program: string;
  search: string;
  page: number;
}) {
  const key = ["leads", filters.status, filters.program, filters.search, filters.page];
  
  const { data, error, isLoading, mutate } = useSWR<PaginatedData<Lead>>(
    key,
    () => LeadsAPI.list(filters), // In real app: () => swrFetcher(`/admin/leads?${new URLSearchParams(filters)}`)
    { keepPreviousData: true }
  );

  return {
    leadsData: data,
    isLoading,
    isError: error,
    mutate,
  };
}

export function useLead(id: string) {
  const { data, error, isLoading, mutate } = useSWR<Lead>(
    id ? `lead-${id}` : null,
    () => LeadsAPI.getById(id)
  );

  return {
    lead: data,
    isLoading,
    isError: error,
    mutate,
  };
}
