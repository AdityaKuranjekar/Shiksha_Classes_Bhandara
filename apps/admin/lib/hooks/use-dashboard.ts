import useSWR from "swr";
import { DashboardAPI } from "@/lib/mock-api/dashboard";
import type { DashboardStats } from "@/lib/api-types";

export function useDashboard() {
  const { data, error, isLoading, mutate } = useSWR<DashboardStats>(
    "dashboard-stats",
    () => DashboardAPI.getStats(),
    { refreshInterval: 60000 } // Poll every minute
  );

  return {
    stats: data,
    isLoading,
    isError: error,
    mutate,
  };
}
