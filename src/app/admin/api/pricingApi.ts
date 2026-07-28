import { getAuthHeaders } from "../../auth/authStore";

const API_BASE = (() => {
  const raw =
    typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE != null
      ? String(import.meta.env.VITE_API_BASE).replace(/\/$/, "")
      : "";
  return raw.endsWith("/api") ? raw.slice(0, -4) : raw;
})();

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}/api/pricing${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
      ...(init?.headers || {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { error?: string }).error || "Erro na API de preços");
  return data as T;
}

export type CustomerGroup = {
  id: number;
  name: string;
  description: string;
  active: number;
  memberCount?: number;
  created_at: string;
};

export type PricingCustomer = {
  id: number;
  email: string;
  approval_status: "pending" | "approved" | "rejected";
  group_id: number | null;
  group_name?: string | null;
  name?: string;
  phone?: string;
  nif?: string;
  locality?: string;
  created_at: string;
  rejection_reason?: string;
};

export type PriceRow = {
  id: number;
  product_id: number;
  variant_key: string;
  price: number;
  valid_from: string;
  valid_to: string;
};

export type ProductVariantInfo = {
  product_id: number;
  name: string;
  default_price: number;
  variants: { variant_key: string; label: string; default_price: number }[];
};

export const pricingApi = {
  dashboard: () =>
    api<{ groups: number; pending: number; approved: number; groupPrices: number; customerPrices: number }>(
      "/dashboard"
    ),
  audit: (limit = 100) => api<unknown[]>(`/audit?limit=${limit}`),
  listGroups: (all = true) => api<CustomerGroup[]>(`/groups${all ? "?all=1" : ""}`),
  createGroup: (name: string, description = "") =>
    api<CustomerGroup>("/groups", { method: "POST", body: JSON.stringify({ name, description }) }),
  updateGroup: (id: number, data: { name?: string; description?: string; active?: boolean }) =>
    api<CustomerGroup>(`/groups/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  deleteGroup: (id: number) => api<{ ok: boolean }>(`/groups/${id}`, { method: "DELETE" }),
  getGroup: (id: number) =>
    api<CustomerGroup & { prices: PriceRow[]; memberCount: number }>(`/groups/${id}`),
  listGroupPrices: (id: number) => api<PriceRow[]>(`/groups/${id}/prices`),
  upsertGroupPrice: (
    groupId: number,
    data: { product_id: number; variant_key?: string; price: number; valid_from?: string; valid_to?: string }
  ) => api<PriceRow>(`/groups/${groupId}/prices`, { method: "PUT", body: JSON.stringify(data) }),
  deleteGroupPrice: (id: number) => api<{ ok: boolean }>(`/group-prices/${id}`, { method: "DELETE" }),
  importGroupPrices: (groupId: number, rows: unknown[]) =>
    api<{ imported: number; errors: string[] }>(`/groups/${groupId}/prices/import`, {
      method: "POST",
      body: JSON.stringify({ rows }),
    }),
  listCustomers: (status?: string) =>
    api<PricingCustomer[]>(`/customers${status ? `?status=${status}` : ""}`),
  getCustomer: (id: number) =>
    api<PricingCustomer & { prices: PriceRow[] }>(`/customers/${id}`),
  approveCustomer: (id: number, groupId?: number | null) =>
    api<{ ok: boolean }>(`/customers/${id}/approve`, {
      method: "POST",
      body: JSON.stringify({ group_id: groupId ?? null }),
    }),
  rejectCustomer: (id: number, reason = "") =>
    api<{ ok: boolean }>(`/customers/${id}/reject`, {
      method: "POST",
      body: JSON.stringify({ reason }),
    }),
  setCustomerGroup: (id: number, groupId: number | null) =>
    api<{ ok: boolean }>(`/customers/${id}/group`, {
      method: "PATCH",
      body: JSON.stringify({ group_id: groupId }),
    }),
  upsertCustomerPrice: (
    userId: number,
    data: { product_id: number; variant_key?: string; price: number; valid_from?: string; valid_to?: string }
  ) => api<PriceRow>(`/customers/${userId}/prices`, { method: "PUT", body: JSON.stringify(data) }),
  deleteCustomerPrice: (id: number) =>
    api<{ ok: boolean }>(`/customer-prices/${id}`, { method: "DELETE" }),
  productVariants: (id: number) => api<ProductVariantInfo>(`/products/${id}/variants`),
  productsList: () => api<{ id: number; name: string; slug: string | null; price: number }[]>("/products-list"),
};
