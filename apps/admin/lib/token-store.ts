/**
 * Token Store — in-memory access token singleton.
 *
 * Stores the JWT access token in module scope (not localStorage) to prevent XSS.
 * Cleared on page refresh — auth context re-hydrates via the refresh cookie.
 */

let _accessToken: string | null = null;

export const tokenStore = {
  get: (): string | null => _accessToken,
  set: (token: string) => {
    _accessToken = token;
  },
  clear: () => {
    _accessToken = null;
  },
};
