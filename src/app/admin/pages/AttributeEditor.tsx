import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";
import {
  fetchAttributeById,
  createAttributeApi,
  updateAttributeApi,
  type Attribute,
  type AttributeValue,
} from "../../api/shop";
import { ImageUploadField } from "../components/ImageUploadField";
import { useToast } from "../components/Toast";

const inputClass =
  "w-full px-4 py-2.5 border border-[#e5e5e3] rounded-xl text-[13px] bg-[#fafaf9] focus:bg-white focus:border-[#313b2e] focus:ring-2 focus:ring-[#313b2e]/8 outline-none";
const labelClass = "block text-[13px] font-medium text-[#131313] mb-1.5";

function parseValues(raw: string): AttributeValue[] {
  try {
    const a = JSON.parse(raw || "[]");
    return Array.isArray(a) ? a : [];
  } catch {
    return [];
  }
}

export default function AttributeEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isNew = !id || id === "new";

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [values, setValues] = useState<AttributeValue[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(!isNew);

  const sectionSlug = isNew ? "new" : String(id);

  useEffect(() => {
    if (isNew) {
      setLoading(false);
      return;
    }
    const numId = Number(id);
    if (!Number.isFinite(numId)) {
      setLoading(false);
      return;
    }
    (async () => {
      const attr = await fetchAttributeById(numId);
      if (attr) {
        setName(attr.name);
        setSlug(attr.slug);
        setValues(parseValues(attr.values));
      }
      setLoading(false);
    })();
  }, [id, isNew]);

  const updateValue = (index: number, patch: Partial<AttributeValue>) => {
    setValues((prev) => prev.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  };

  const addValue = () => setValues((prev) => [...prev, { name: "", image_url: "" }]);
  const removeValue = (index: number) => setValues((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const slugNorm = slug.trim() || name.toLowerCase().replace(/\s+/g, "-");
      const valuesPayload = JSON.stringify(values);
      if (isNew) {
        const created = await createAttributeApi({ name: name.trim() || "Atributo", slug: slugNorm, values: valuesPayload });
        toast(`Atributo "${created.name}" criado com sucesso.`);
        const createdId = created?.id;
        if (typeof createdId === "number" && Number.isFinite(createdId)) {
          navigate(`/admin/attributes/${createdId}`, { replace: true });
        } else {
          navigate("/admin/attributes", { replace: true });
        }
      } else {
        await updateAttributeApi(Number(id), { name: name.trim() || "Atributo", slug: slugNorm, values: valuesPayload });
        toast(`Atributo "${name}" guardado com sucesso.`);
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Erro ao guardar";
      setError(msg);
      toast(msg, "error");
    } finally {
      setSaving(false);
    }
  };

  if (!isNew && loading) {
    return <div className="py-12 text-center text-[#5a5a59]">A carregar...</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          to="/admin/attributes"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#5a5a59] hover:text-[#313b2e] transition-colors mb-3"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Atributos
        </Link>
        <h1 className="text-2xl md:text-[28px] font-semibold text-[#131313]">
          {isNew ? "Novo atributo" : "Editar atributo"}
        </h1>
      </div>

      {error && (
        <div className="mb-4 p-4 rounded-xl bg-red-50 text-red-700 text-sm">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="bg-white rounded-2xl border border-[#e5e5e3] p-6 max-w-xl">
          <h2 className="text-lg font-semibold text-[#131313] mb-4">Básico</h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Nome *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Ex: Acabamento"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Slug (URL)</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="Ex: acabamento (deixar vazio para gerar a partir do nome)"
                className={inputClass}
              />
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-[#e5e5e3] p-6 max-w-xl">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-[#131313]">Valores</h2>
            <button
              type="button"
              onClick={addValue}
              className="text-[12px] font-medium text-[#313b2e] hover:underline"
            >
              + Adicionar valor
            </button>
          </div>
          <p className="text-[12px] text-[#5a5a59] mb-4">
            Cada valor tem um nome e opcionalmente uma imagem (ex.: Galvanizado, Lacado).
          </p>
          <div className="space-y-4">
            {values.map((item, index) => (
              <div
                key={index}
                className="flex flex-wrap items-start gap-3 p-4 rounded-xl border border-[#e5e5e3] bg-[#fafaf9]"
              >
                <div className="flex-1 min-w-[160px]">
                  <label className="block text-[11px] font-medium text-[#5a5a59] mb-1">Nome</label>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateValue(index, { name: e.target.value })}
                    placeholder="Ex: Galvanizado"
                    className={inputClass}
                  />
                </div>
                <div className="flex-1 min-w-[200px]">
                  <ImageUploadField
                    label="Imagem"
                    value={item.image_url ?? ""}
                    onChange={(path) => updateValue(index, { image_url: path })}
                    page="attributes"
                    section={sectionSlug}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeValue(index)}
                  className="mt-6 p-2 text-red-600 hover:bg-red-50 rounded-lg text-[12px]"
                  aria-label="Remover"
                >
                  Remover
                </button>
              </div>
            ))}
          </div>
          {values.length === 0 && (
            <p className="text-[12px] text-[#5a5a59] py-2">
              Nenhum valor. Clique em &quot;Adicionar valor&quot; para criar um.
            </p>
          )}
        </section>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving || !name.trim()}
            className="px-4 py-2.5 bg-[#313b2e] text-white text-[13px] font-semibold rounded-xl hover:bg-[#3d4937] disabled:opacity-50 transition-colors"
          >
            {saving ? "A guardar..." : "Guardar"}
          </button>
          <Link
            to="/admin/attributes"
            className="px-4 py-2.5 border border-[#e5e5e3] text-[13px] font-medium text-[#5a5a59] rounded-xl hover:bg-[#f5f5f4] transition-colors"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
