/**
 * Central place for the auth token so API calls can attach it.
 * Set by AuthContext after login; cleared on logout.
 */
let token: string | null = null;

export function setAuthToken(t: string | null): void {
  token = t;
}

export function getAuthToken(): string | null {
  return token;
}

export function getAuthHeaders(): Record<string, string> {
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}
