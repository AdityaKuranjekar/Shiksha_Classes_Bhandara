import useSWR from "swr";
import { GalleryAPI } from "@/lib/mock-api/gallery";
import type { GalleryImage } from "@/lib/api-types";

export function useGallery(category: string) {
  const key = ["gallery", category];
  
  const { data, error, isLoading, mutate } = useSWR<{ data: GalleryImage[] }>(
    key,
    () => GalleryAPI.list(category)
  );

  return {
    galleryData: data?.data,
    isLoading,
    isError: error,
    mutate,
  };
}
