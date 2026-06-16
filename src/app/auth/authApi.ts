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

export type AdminOrder = {
  id: number;
  orderNumber: string;
  status: string;
  email: string;
  customerName: string;
  phone: string;
  nif: string;
  total: number;
  createdAt: string;
};

export type AdminOrderDetail = AdminOrder & {
  address: string;
  region: string;
  district: string;
  locality: string;
  postalCode: string;
  subtotal: number;
  observations: string;
  items: Array<{ id: string; name: string; variant: string; quantity: number; price: number; image: string }>;
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

export async function listAdminOrders(authToken: string): Promise<AdminOrder[]> {
  const res = await fetch(`${API_BASE}/api/orders/admin`, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
  const data = await res.json().catch(() => ([]));
  if (!res.ok) throw new Error("Failed to load orders");
  return data as AdminOrder[];
}

export async function getAdminOrderById(authToken: string, id: number): Promise<AdminOrderDetail> {
  const res = await fetch(`${API_BASE}/api/orders/${id}`, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { error?: string }).error ?? "Failed to load order");
  return data as AdminOrderDetail;
}

export async function deleteAdminOrder(authToken: string, id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/api/orders/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${authToken}` },
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error((data as { error?: string }).error ?? "Failed to delete order");
  }
}

export type AdminOrderStatus = "pending" | "shipped" | "completed" | "Canceled";

export async function updateAdminOrderStatus(
  authToken: string,
  id: number,
  status: AdminOrderStatus
): Promise<void> {
  const res = await fetch(`${API_BASE}/api/orders/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({ status }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { error?: string }).error ?? "Failed to update order status");
}
