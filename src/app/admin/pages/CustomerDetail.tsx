import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { pricingApi, type CustomerGroup, type PriceRow, type PricingCustomer, type ProductVariantInfo } from "../api/pricingApi";
import { useAdminNotifications } from "../components/AdminNotifications";
import { useToast } from "../components/Toast";

export default function CustomerDetail() {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);
  const { toast } = useToast();
  const { refresh: refreshNotifications } = useAdminNotifications();
  const [customer, setCustomer] = useState<(PricingCustomer & { prices: PriceRow[] }) | null>(null);
  const [groups, setGroups] = useState<CustomerGroup[]>([]);
  const [products, setProducts] = useState<{ id: number; name: string; price: number }[]>([]);
  const [productId, setProductId] = useState<number | "">("");
  const [variants, setVariants] = useState<ProductVariantInfo | null>(null);
  const [variantKey, setVariantKey] = useState("");
  const [price, setPrice] = useState("");
  const [groupId, setGroupId] = useState<string>("");

  const load = async () => {
    const [c, g, p] = await Promise.all([
      pricingApi.getCustomer(userId),
      pricingApi.listGroups(false),
      pricingApi.productsList(),
    ]);
    setCustomer(c);
    setGroups(g);
    setProducts(p);
    setGroupId(c.group_id != null ? String(c.group_id) : "");
  };

  useEffect(() => {
    if (!Number.isFinite(userId)) return;
    load().catch((e) => toast(e instanceof Error ? e.message : "Erro", "error"));
  }, [userId]);

  useEffect(() => {
    if (!productId) {
      setVariants(null);
      return;
    }
    pricingApi.productVariants(Number(productId)).then((v) => {
      setVariants(v);
      setVariantKey("");
      setPrice(String(v.default_price));
    });
  }, [productId]);

  if (!customer) return <div className="py-12 text-center text-[#5a5a59]">A carregar...</div>;

  return (
    <div>
      <Link to="/admin/customers" className="text-[13px] text-[#5a5a59] hover:text-[#313b2e]">
        ← Clientes
      </Link>
      <h1 className="text-2xl font-semibold text-[#131313] mt-2">{customer.name || customer.email}</h1>
      <p className="text-[13px] text-[#5a5a59]">{customer.email} · {customer.approval_status}</p>

      <div className="bg-white rounded-2xl border border-[#e5e5e3] p-4 mt-6 mb-6 flex flex-wrap gap-3 items-end">
        <div>
          <label className="block text-[12px] font-medium mb-1">Grupo</label>
          <select
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
            className="px-3 py-2 border border-[#e5e5e3] rounded-lg text-[13px]"
          >
            <option value="">Sem grupo</option>
            {groups.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          className="px-4 py-2.5 bg-[#313b2e] text-white text-[13px] font-semibold rounded-xl"
          onClick={async () => {
            await pricingApi.setCustomerGroup(userId, groupId ? Number(groupId) : null);
            toast("Grupo atualizado.");
            await load();
          }}
        >
          Guardar grupo
        </button>
        {customer.approval_status !== "approved" && (
          <button
            type="button"
            className="px-4 py-2.5 border border-emerald-600 text-emerald-700 text-[13px] font-semibold rounded-xl"
            onClick={async () => {
              await pricingApi.approveCustomer(userId, groupId ? Number(groupId) : null);
              toast("Aprovado.");
              await load();
              await refreshNotifications();
            }}
          >
            Aprovar cliente
          </button>
        )}
      </div>

      <form
        className="bg-white rounded-2xl border border-[#e5e5e3] p-4 mb-6 space-y-3"
        onSubmit={async (e) => {
          e.preventDefault();
          if (!productId) return;
          await pricingApi.upsertCustomerPrice(userId, {
            product_id: Number(productId),
            variant_key: variantKey,
            price: Number(String(price).replace(",", ".")),
          });
          toast("Preço individual guardado.");
          await load();
        }}
      >
        <h2 className="text-[13px] font-semibold">Preço individual (maior prioridade)</h2>
        <div className="grid md:grid-cols-3 gap-3">
          <select
            value={productId}
            onChange={(e) => setProductId(e.target.value ? Number(e.target.value) : "")}
            className="px-3 py-2 border border-[#e5e5e3] rounded-lg text-[13px]"
            required
          >
            <option value="">Produto</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <select
            value={variantKey}
            onChange={(e) => {
              setVariantKey(e.target.value);
              const v = variants?.variants.find((x) => x.variant_key === e.target.value);
              if (v) setPrice(String(v.default_price));
            }}
            className="px-3 py-2 border border-[#e5e5e3] rounded-lg text-[13px]"
          >
            {(variants?.variants || [{ variant_key: "", label: "Base", default_price: 0 }]).map((v) => (
              <option key={v.variant_key || "__base"} value={v.variant_key}>
                {v.label}
              </option>
            ))}
          </select>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="px-3 py-2 border border-[#e5e5e3] rounded-lg text-[13px]"
            placeholder="Preço €"
            required
          />
        </div>
        <button type="submit" className="px-4 py-2.5 bg-[#313b2e] text-white text-[13px] font-semibold rounded-xl">
          Guardar preço individual
        </button>
      </form>

      <div className="bg-white rounded-2xl border border-[#e5e5e3] overflow-hidden">
        <table className="w-full text-left text-[13px]">
          <thead>
            <tr className="border-b border-[#e5e5e3] bg-[#fafaf9]">
              <th className="px-4 py-3">Produto</th>
              <th className="px-4 py-3">Variante</th>
              <th className="px-4 py-3">Preço</th>
              <th className="px-4 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {(customer.prices || []).map((p) => (
              <tr key={p.id} className="border-b border-[#e5e5e3]">
                <td className="px-4 py-3">#{p.product_id}</td>
                <td className="px-4 py-3 font-mono text-[12px]">{p.variant_key || "(base)"}</td>
                <td className="px-4 py-3">{Number(p.price).toFixed(2)} €</td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    className="text-red-600 hover:underline"
                    onClick={async () => {
                      await pricingApi.deleteCustomerPrice(p.id);
                      await load();
                    }}
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(customer.prices || []).length === 0 && (
          <p className="p-6 text-[#5a5a59] text-[13px]">Sem preços individuais.</p>
        )}
      </div>
    </div>
  );
}
