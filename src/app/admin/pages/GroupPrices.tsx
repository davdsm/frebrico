import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { pricingApi, type PriceRow, type ProductVariantInfo } from "../api/pricingApi";
import { useToast } from "../components/Toast";

export default function GroupPrices() {
  const { id } = useParams<{ id: string }>();
  const groupId = Number(id);
  const { toast } = useToast();
  const [groupName, setGroupName] = useState("");
  const [prices, setPrices] = useState<PriceRow[]>([]);
  const [products, setProducts] = useState<{ id: number; name: string; price: number }[]>([]);
  const [productId, setProductId] = useState<number | "">("");
  const [variants, setVariants] = useState<ProductVariantInfo | null>(null);
  const [variantKey, setVariantKey] = useState("");
  const [price, setPrice] = useState("");
  const [csv, setCsv] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!Number.isFinite(groupId)) return;
    setLoading(true);
    try {
      const [g, plist] = await Promise.all([pricingApi.getGroup(groupId), pricingApi.productsList()]);
      setGroupName(g.name);
      setPrices(g.prices || []);
      setProducts(plist);
    } catch (e) {
      toast(e instanceof Error ? e.message : "Erro", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [groupId]);

  useEffect(() => {
    if (!productId) {
      setVariants(null);
      return;
    }
    pricingApi
      .productVariants(Number(productId))
      .then((v) => {
        setVariants(v);
        setVariantKey("");
        setPrice(String(v.default_price));
      })
      .catch(() => setVariants(null));
  }, [productId]);

  const productNameById = useMemo(() => {
    const m = new Map<number, string>();
    products.forEach((p) => m.set(p.id, p.name));
    return m;
  }, [products]);

  const savePrice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId) return;
    try {
      await pricingApi.upsertGroupPrice(groupId, {
        product_id: Number(productId),
        variant_key: variantKey,
        price: Number(String(price).replace(",", ".")),
      });
      toast("Preço guardado.");
      await load();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Erro", "error");
    }
  };

  const importCsv = async () => {
    const lines = csv
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    const rows: unknown[] = [];
    for (const line of lines) {
      if (line.toLowerCase().startsWith("product_id")) continue;
      const [product_id, variant_key, priceVal] = line.split(/[;,]/).map((x) => x.trim());
      rows.push({
        product_id: Number(product_id),
        variant_key: variant_key || "",
        price: priceVal,
      });
    }
    try {
      const result = await pricingApi.importGroupPrices(groupId, rows);
      toast(`Importados: ${result.imported}. Erros: ${result.errors.length}`);
      await load();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Erro", "error");
    }
  };

  if (loading) return <div className="py-12 text-center text-[#5a5a59]">A carregar...</div>;

  return (
    <div>
      <div className="mb-6">
        <Link to="/admin/groups" className="text-[13px] text-[#5a5a59] hover:text-[#313b2e]">
          ← Grupos
        </Link>
        <h1 className="text-2xl font-semibold text-[#131313] mt-2">Preços — {groupName}</h1>
      </div>

      <form onSubmit={savePrice} className="bg-white rounded-2xl border border-[#e5e5e3] p-4 mb-6 space-y-3">
        <div className="grid md:grid-cols-3 gap-3">
          <div>
            <label className="block text-[12px] font-medium mb-1">Produto</label>
            <select
              value={productId}
              onChange={(e) => setProductId(e.target.value ? Number(e.target.value) : "")}
              className="w-full px-3 py-2 border border-[#e5e5e3] rounded-lg text-[13px]"
              required
            >
              <option value="">— Selecionar —</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} (#{p.id})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[12px] font-medium mb-1">Variante / linha</label>
            <select
              value={variantKey}
              onChange={(e) => {
                setVariantKey(e.target.value);
                const v = variants?.variants.find((x) => x.variant_key === e.target.value);
                if (v) setPrice(String(v.default_price));
              }}
              className="w-full px-3 py-2 border border-[#e5e5e3] rounded-lg text-[13px]"
              disabled={!variants}
            >
              {(variants?.variants || [{ variant_key: "", label: "Preço base", default_price: 0 }]).map((v) => (
                <option key={v.variant_key || "__base"} value={v.variant_key}>
                  {v.label} ({v.default_price}€)
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[12px] font-medium mb-1">Preço grupo (€)</label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 border border-[#e5e5e3] rounded-lg text-[13px]"
              required
            />
          </div>
        </div>
        <button type="submit" className="px-4 py-2.5 bg-[#313b2e] text-white text-[13px] font-semibold rounded-xl">
          Guardar preço
        </button>
      </form>

      <div className="bg-white rounded-2xl border border-[#e5e5e3] p-4 mb-6">
        <h2 className="text-[13px] font-semibold mb-2">Importar CSV / Excel-like</h2>
        <p className="text-[12px] text-[#5a5a59] mb-2">
          Formato: <code>product_id;variant_key;price</code> (variant_key vazio = preço base do produto)
        </p>
        <textarea
          value={csv}
          onChange={(e) => setCsv(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-[#e5e5e3] rounded-lg text-[12px] font-mono mb-2"
          placeholder={"product_id;variant_key;price\n51;0301040005;10.50"}
        />
        <button
          type="button"
          onClick={importCsv}
          className="px-4 py-2 border border-[#e5e5e3] rounded-xl text-[13px] font-medium hover:bg-[#fafaf9]"
        >
          Importar
        </button>
      </div>

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
            {prices.map((p) => (
              <tr key={p.id} className="border-b border-[#e5e5e3]">
                <td className="px-4 py-3">{productNameById.get(p.product_id) ?? p.product_id}</td>
                <td className="px-4 py-3 font-mono text-[12px]">{p.variant_key || "(base)"}</td>
                <td className="px-4 py-3">{p.price.toFixed(2)} €</td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    className="text-red-600 hover:underline"
                    onClick={async () => {
                      await pricingApi.deleteGroupPrice(p.id);
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
        {prices.length === 0 && <p className="p-6 text-[#5a5a59] text-[13px]">Ainda sem preços neste grupo.</p>}
      </div>
    </div>
  );
}
