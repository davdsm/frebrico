import React, { useEffect, useState } from "react";
import { getAuthHeaders } from "../../auth/authStore";
import { useToast } from "../components/Toast";

const API_BASE = (() => {
  const raw =
    typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE != null
      ? String(import.meta.env.VITE_API_BASE).replace(/\/$/, "")
      : "";
  return raw.endsWith("/api") ? raw.slice(0, -4) : raw;
})();

type Coupon = {
  id: number;
  code: string;
  description: string;
  type: "percent" | "fixed";
  value: number;
  active: number;
  min_subtotal: number;
  max_uses: number | null;
  used_count: number;
  valid_from: string;
  valid_to: string;
};

async function couponsApi<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}/api/coupons${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
      ...(init?.headers || {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { error?: string }).error || "Erro nos cupões");
  return data as T;
}

export default function CouponsList() {
  const { toast } = useToast();
  const [list, setList] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"percent" | "fixed">("percent");
  const [value, setValue] = useState("10");
  const [minSubtotal, setMinSubtotal] = useState("0");
  const [maxUses, setMaxUses] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      setList(await couponsApi<Coupon[]>("/"));
    } catch (e) {
      toast(e instanceof Error ? e.message : "Erro", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await couponsApi("/", {
        method: "POST",
        body: JSON.stringify({
          code,
          description,
          type,
          value: Number(String(value).replace(",", ".")),
          min_subtotal: Number(String(minSubtotal).replace(",", ".")) || 0,
          max_uses: maxUses.trim() === "" ? null : Number(maxUses),
        }),
      });
      setCode("");
      setDescription("");
      setValue("10");
      setMinSubtotal("0");
      setMaxUses("");
      toast("Cupão criado.");
      await load();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Erro", "error");
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#131313]">Cupões</h1>
        <p className="text-[14px] text-[#5a5a59] mt-1">
          Códigos de desconto aplicáveis no checkout (percentagem ou valor fixo).
        </p>
      </div>

      <form onSubmit={create} className="bg-white rounded-2xl border border-[#e5e5e3] p-4 mb-6 grid md:grid-cols-3 gap-3 items-end">
        <div>
          <label className="block text-[12px] font-medium mb-1">Código</label>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            className="w-full px-3 py-2 border border-[#e5e5e3] rounded-lg text-[13px]"
            placeholder="VERAO10"
            required
          />
        </div>
        <div>
          <label className="block text-[12px] font-medium mb-1">Descrição</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-[#e5e5e3] rounded-lg text-[13px]"
          />
        </div>
        <div>
          <label className="block text-[12px] font-medium mb-1">Tipo</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as "percent" | "fixed")}
            className="w-full px-3 py-2 border border-[#e5e5e3] rounded-lg text-[13px]"
          >
            <option value="percent">Percentagem %</option>
            <option value="fixed">Valor fixo €</option>
          </select>
        </div>
        <div>
          <label className="block text-[12px] font-medium mb-1">Valor</label>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full px-3 py-2 border border-[#e5e5e3] rounded-lg text-[13px]"
            required
          />
        </div>
        <div>
          <label className="block text-[12px] font-medium mb-1">Subtotal mínimo €</label>
          <input
            value={minSubtotal}
            onChange={(e) => setMinSubtotal(e.target.value)}
            className="w-full px-3 py-2 border border-[#e5e5e3] rounded-lg text-[13px]"
          />
        </div>
        <div>
          <label className="block text-[12px] font-medium mb-1">Máx. utilizações (vazio = ilimitado)</label>
          <input
            value={maxUses}
            onChange={(e) => setMaxUses(e.target.value)}
            className="w-full px-3 py-2 border border-[#e5e5e3] rounded-lg text-[13px]"
          />
        </div>
        <button type="submit" className="px-4 py-2.5 bg-[#313b2e] text-white text-[13px] font-semibold rounded-xl md:col-span-3 justify-self-start">
          Criar cupão
        </button>
      </form>

      {loading ? (
        <p className="text-[#5a5a59]">A carregar...</p>
      ) : (
        <div className="bg-white rounded-2xl border border-[#e5e5e3] overflow-hidden">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-[#e5e5e3] bg-[#fafaf9]">
                <th className="px-4 py-3">Código</th>
                <th className="px-4 py-3">Desconto</th>
                <th className="px-4 py-3">Usos</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {list.map((c) => (
                <tr key={c.id} className="border-b border-[#e5e5e3]">
                  <td className="px-4 py-3">
                    <p className="font-semibold font-mono">{c.code}</p>
                    {c.description && <p className="text-[12px] text-[#5a5a59]">{c.description}</p>}
                  </td>
                  <td className="px-4 py-3">
                    {c.type === "percent" ? `${c.value}%` : `€${Number(c.value).toFixed(2)}`}
                    {c.min_subtotal > 0 && (
                      <span className="text-[11px] text-[#5a5a59] block">mín. €{Number(c.min_subtotal).toFixed(2)}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {c.used_count}
                    {c.max_uses != null ? ` / ${c.max_uses}` : ""}
                  </td>
                  <td className="px-4 py-3">{c.active ? "Ativo" : "Inativo"}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      type="button"
                      className="text-[#5a5a59] hover:underline"
                      onClick={async () => {
                        await couponsApi(`/${c.id}`, {
                          method: "PATCH",
                          body: JSON.stringify({ active: !c.active }),
                        });
                        await load();
                      }}
                    >
                      {c.active ? "Desativar" : "Ativar"}
                    </button>
                    <button
                      type="button"
                      className="text-red-600 hover:underline"
                      onClick={async () => {
                        if (!window.confirm(`Apagar cupão ${c.code}?`)) return;
                        await couponsApi(`/${c.id}`, { method: "DELETE" });
                        toast("Cupão removido.");
                        await load();
                      }}
                    >
                      Apagar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {list.length === 0 && <p className="p-6 text-[#5a5a59]">Ainda não há cupões.</p>}
        </div>
      )}
    </div>
  );
}
