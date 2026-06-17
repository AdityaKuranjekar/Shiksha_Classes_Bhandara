/**
 * API Client — Typed fetch wrapper for the Shiksha Admin Portal.
 *
 * Features:
 * - Injects Authorization header from token-store
 * - Parses the standard { success, data, error, meta } envelope
 * - Throws typed ApiError on failure
 * - Auto-refreshes access token on 401 and retries once
 * - Works in both browser (SWR hooks) and server (Server Actions)
 */

import { ApiError, ApiEnvelope } from "./api-types";
import { tokenStore } from "./token-store";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

interface FetchOptions extends RequestInit {
  /** Skip the Authorization header (e.g., login endpoint) */
  noAuth?: boolean;
  /** Skip the auto-retry on 401 (used during refresh itself) */
  noRetry?: boolean;
}

/**
 * Core typed fetch. Parses the API envelope and throws ApiError on failure.
 */
export async function apiFetch<T>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  const { noAuth = false, noRetry = false, ...fetchOptions } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(fetchOptions.headers as Record<string, string>),
  };

  const token = tokenStore.get();
  if (!noAuth && token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const url = path.startsWith("http") ? path : `${API_BASE}${path}`;

  const res = await fetch(url, { ...fetchOptions, headers });

  // 204 No Content — nothing to parse
  if (res.status === 204) {
    return undefined as unknown as T;
  }

  const envelope: ApiEnvelope<T> = await res.json();

  // Successful response
  if (envelope.success && envelope.data !== null) {
    return envelope.data as T;
  }

  const errCode = envelope.error?.code ?? "INTERNAL_ERROR";
  const errMsg = envelope.error?.message ?? "An unexpected error occurred";
  const errFields = envelope.error?.fields;
  const retryAfter = envelope.error?.retryAfter;

  // Handle 401 — attempt token refresh once
  if (res.status === 401 && !noRetry) {
    const refreshed = await tryRefreshToken();
    if (refreshed) {
      // Retry the original request with the new token
      return apiFetch<T>(path, { ...options, noRetry: true });
    }
    // Refresh failed — clear token and let the error propagate
    tokenStore.clear();
  }

  throw new ApiError(errMsg, errCode, res.status, errFields, retryAfter);
}

/**
 * Attempt to refresh the access token via the admin-app proxy route.
 * Returns true if a new token was obtained.
 */
async function tryRefreshToken(): Promise<boolean> {
  try {
    const res = await fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "include", // sends the HttpOnly refresh_token cookie
    });
    if (!res.ok) return false;
    const body = await res.json();
    if (body?.data?.accessToken) {
      tokenStore.set(body.data.accessToken);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

/**
 * Convenience helpers
 */
export const api = {
  get: <T>(path: string, opts?: FetchOptions) =>
    apiFetch<T>(path, { method: "GET", ...opts }),

  post: <T>(path: string, body: unknown, opts?: FetchOptions) =>
    apiFetch<T>(path, {
      method: "POST",
      body: JSON.stringify(body),
      ...opts,
    }),

  put: <T>(path: string, body: unknown, opts?: FetchOptions) =>
    apiFetch<T>(path, {
      method: "PUT",
      body: JSON.stringify(body),
      ...opts,
    }),

  patch: <T>(path: string, body: unknown, opts?: FetchOptions) =>
    apiFetch<T>(path, {
      method: "PATCH",
      body: JSON.stringify(body),
      ...opts,
    }),

  del: <T>(path: string, opts?: FetchOptions) =>
    apiFetch<T>(path, { method: "DELETE", ...opts }),
};

/**
 * SWR-compatible fetcher that can be used as the global fetcher.
 * Usage: useSWR("/admin/leads", swrFetcher)
 */
export const swrFetcher = <T>(path: string) =>
  api.get<T>(path);
