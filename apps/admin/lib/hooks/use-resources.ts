import useSWR from "swr";
import { ResourcesAPI } from "@/lib/mock-api/resources";
import type { Resource, PaginatedData } from "@/lib/api-types";

export function useResources(filters: {
  category: string;
  subject: string;
  status: string;
  search: string;
  page: number;
}) {
  const key = ["resources", filters.category, filters.subject, filters.status, filters.search, filters.page];
  
  const { data, error, isLoading, mutate } = useSWR<PaginatedData<Resource>>(
    key,
    () => ResourcesAPI.list(filters),
    { keepPreviousData: true }
  );

  return {
    resourcesData: data,
    isLoading,
    isError: error,
    mutate,
  };
}

export function useResource(id: string | null) {
  const { data, error, isLoading, mutate } = useSWR<Resource>(
    id ? `resource-${id}` : null,
    () => ResourcesAPI.getById(id!)
  );

  return {
    resource: data,
    isLoading,
    isError: error,
    mutate,
  };
}
