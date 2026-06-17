import useSWR from "swr";
import { CareersAPI } from "@/lib/mock-api/careers";
import type { JobOpening, CareerApplication, PaginatedData } from "@/lib/api-types";

export function useOpenings() {
  const { data, error, isLoading, mutate } = useSWR<{ data: JobOpening[] }>(
    "careers-openings",
    () => CareersAPI.listOpenings()
  );

  return {
    openings: data?.data,
    isLoading,
    isError: error,
    mutate,
  };
}

export function useApplications(filters: {
  jobId: string;
  status: string;
  page: number;
}) {
  const key = ["careers-applications", filters.jobId, filters.status, filters.page];
  
  const { data, error, isLoading, mutate } = useSWR<PaginatedData<CareerApplication>>(
    key,
    () => CareersAPI.listApplications(filters),
    { keepPreviousData: true }
  );

  return {
    applicationsData: data,
    isLoading,
    isError: error,
    mutate,
  };
}
