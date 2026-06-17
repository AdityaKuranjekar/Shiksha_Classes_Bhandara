import useSWR from "swr";
import { BlogsAPI } from "@/lib/mock-api/blogs";
import type { BlogPost, PaginatedData } from "@/lib/api-types";

export function useBlogs(filters: {
  status: string;
  search: string;
  page: number;
}) {
  const key = ["blogs", filters.status, filters.search, filters.page];
  
  const { data, error, isLoading, mutate } = useSWR<PaginatedData<BlogPost>>(
    key,
    () => BlogsAPI.list(filters),
    { keepPreviousData: true }
  );

  return {
    blogsData: data,
    isLoading,
    isError: error,
    mutate,
  };
}

export function useBlog(id: string | null) {
  const { data, error, isLoading, mutate } = useSWR<BlogPost>(
    id ? `blog-${id}` : null,
    () => BlogsAPI.getById(id!)
  );

  return {
    blog: data,
    isLoading,
    isError: error,
    mutate,
  };
}
