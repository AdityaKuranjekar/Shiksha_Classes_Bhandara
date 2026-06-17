import useSWR from "swr";
import { SettingsAPI } from "@/lib/mock-api/settings";
import type { SiteSettings } from "@/lib/api-types";

export function useSettings() {
  const { data, error, isLoading, mutate } = useSWR<SiteSettings>(
    "settings",
    () => SettingsAPI.get()
  );

  return {
    settings: data,
    isLoading,
    isError: error,
    mutate,
  };
}
