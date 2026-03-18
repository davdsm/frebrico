const API_BASE = (() => {
  const raw = typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE != null
    ? String(import.meta.env.VITE_API_BASE).replace(/\/$/, "")
    : "";
  return raw.endsWith("/api") ? raw.slice(0, -4) : raw;
})();

export type LoginResponse = { token: string; user: { email: string; isAdmin: boolean } };
export type MeResponse = { email: string; isAdmin: boolean };

export type AdminUser = {
  id: number;
  email: string;
  isAdmin: boolean;
  createdAt: string;
};

export async function login(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.trim(), password }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { error?: string }).error ?? "Login failed");
  return data as LoginResponse;
}

export async function createAdmin(email: string, password: string, isAdmin: boolean, authToken: string): Promise<void> {
  const res = await fetch(`${API_BASE}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({ email: email.trim(), password, isAdmin }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { error?: string }).error ?? "Failed to create user");
}

export async function me(authToken: string): Promise<MeResponse> {
  const res = await fetch(`${API_BASE}/api/auth/me`, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
  if (!res.ok) throw new Error("Unauthorized");
  return res.json() as Promise<MeResponse>;
}

export async function listAdmins(authToken: string): Promise<AdminUser[]> {
  const res = await fetch(`${API_BASE}/api/auth/users`, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { error?: string }).error ?? "Failed to load users");
  return data as AdminUser[];
}

export async function updateAdminRole(id: number, isAdmin: boolean, authToken: string): Promise<void> {
  const res = await fetch(`${API_BASE}/api/auth/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({ isAdmin }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { error?: string }).error ?? "Failed to update user");
}

export async function deleteAdminUser(id: number, authToken: string): Promise<void> {
  const res = await fetch(`${API_BASE}/api/auth/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error((data as { error?: string }).error ?? "Failed to delete user");
  }
}
