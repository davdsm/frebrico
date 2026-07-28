const API_BASE = (() => {
  const raw = typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE != null
    ? String(import.meta.env.VITE_API_BASE).replace(/\/$/, "")
    : "";
  return raw.endsWith("/api") ? raw.slice(0, -4) : raw;
})();

export type CustomerProfile = {
  name: string;
  address: string;
  region: string;
  district: string;
  locality: string;
  postalCode: string;
  phone: string;
  birthDate: string;
  nif: string;
};

export type CustomerUser = {
  id: number;
  email: string;
  isAdmin: false;
  approvalStatus?: "pending" | "approved" | "rejected";
  groupId?: number | null;
  profile: CustomerProfile;
};

export type CustomerLoginResponse = {
  token: string;
  user: {
    id: number;
    email: string;
    isAdmin: false;
    approvalStatus?: "pending" | "approved" | "rejected";
    groupId?: number | null;
  };
};

export type CustomerOrder = {
  id: number;
  orderNumber: string;
  status: string;
  total: number;
  createdAt: string;
};

export type CustomerOrderDetail = {
  id: number;
  orderNumber: string;
  status: string;
  email: string;
  customerName: string;
  address: string;
  region: string;
  district: string;
  locality: string;
  postalCode: string;
  phone: string;
  nif: string;
  subtotal: number;
  total: number;
  createdAt: string;
  items: CheckoutOrderItem[];
};

export type CheckoutOrderItem = {
  id: string;
  name: string;
  variant: string;
  quantity: number;
  price: number;
  image: string;
  productId?: number;
  variantKey?: string;
};

export async function customerRegister(payload: {
  email: string;
  password: string;
  name: string;
  address: string;
  region: string;
  district: string;
  locality: string;
  postalCode: string;
  phone: string;
  birthDate: string;
  nif: string;
  acceptedPrivacyPolicy: boolean;
}): Promise<CustomerLoginResponse> {
  let res = await fetch(`${API_BASE}/api/auth/customer/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (res.status === 404) {
    res = await fetch(`${API_BASE}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { error?: string }).error ?? "Falha no registo");
  return data as CustomerLoginResponse;
}

export async function customerLogin(email: string, password: string): Promise<CustomerLoginResponse> {
  let res = await fetch(`${API_BASE}/api/auth/customer/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.trim(), password }),
  });
  if (res.status === 404) {
    res = await fetch(`${API_BASE}/api/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim(), password }),
    });
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = (data as { error?: string }).error;
    if (res.status === 404) {
      throw new Error("Servico de autenticacao indisponivel. Confirme se o backend esta a correr.");
    }
    throw new Error(msg ?? "Falha no login");
  }
  return data as CustomerLoginResponse;
}

export async function customerMe(authToken: string): Promise<CustomerUser> {
  const res = await fetch(`${API_BASE}/api/auth/customer/me`, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { error?: string }).error ?? "Sessão inválida");
  return data as CustomerUser;
}

export async function updateCustomerProfile(authToken: string, profile: CustomerProfile): Promise<void> {
  const res = await fetch(`${API_BASE}/api/auth/customer/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(profile),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { error?: string }).error ?? "Falha ao atualizar perfil");
}

export async function listCustomerOrders(authToken: string): Promise<CustomerOrder[]> {
  const res = await fetch(`${API_BASE}/api/auth/customer/orders`, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
  const data = await res.json().catch(() => ([]));
  if (!res.ok) throw new Error("Falha ao carregar encomendas");
  return data as CustomerOrder[];
}

export async function createCheckoutOrder(payload: {
  email: string;
  name: string;
  address: string;
  region: string;
  district: string;
  locality: string;
  postalCode: string;
  phone: string;
  nif: string;
  items: CheckoutOrderItem[];
  subtotal: number;
  total: number;
  observations?: string;
}, authToken?: string): Promise<{ id: number; orderNumber: string }> {
  const res = await fetch(`${API_BASE}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { error?: string }).error ?? "Nao foi possivel concluir a encomenda.");
  return data as { id: number; orderNumber: string };
}

export async function getCustomerOrderById(authToken: string, id: number): Promise<CustomerOrderDetail> {
  const res = await fetch(`${API_BASE}/api/orders/${id}`, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { error?: string }).error ?? "Nao foi possivel carregar a encomenda.");
  return data as CustomerOrderDetail;
}
