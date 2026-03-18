import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router";
import { putContent, uploadImage, getApiBase } from "../../content/api";
import { useContentState } from "../../content/ContentContext";
import { getDefault } from "../../content/defaults";
import { useToast } from "../components/Toast";
import HeaderEditor from "./HeaderEditor";
import FooterEditor from "./FooterEditor";

const PAGE_SLUG = "_settings";

function useSettingValue(content: any, section: string, field: string, fallback = "") {
  return content[PAGE_SLUG]?.[section]?.[field] ?? fallback;
}

export default function Configuration() {
  const { content, refetch } = useContentState();
  const { toast } = useToast();
  const [saving, setSaving] = useState<string | null>(null);
  const [savedKey, setSavedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"maintenance" | "notifications" | "layout" | "header" | "footer">("maintenance");

  const save = async (section: string, field: string, value: string) => {
    const key = `${section}.${field}`;
    setSaving(key);
    try {
      await putContent(PAGE_SLUG, section, field, value, "text");
      await refetch();
      setSavedKey(key);
      setTimeout(() => setSavedKey(null), 2000);
      toast("Configuração guardada.");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Erro ao guardar configuração";
      toast(msg, "error");
    } finally {
      setSaving(null);
    }
  };

  const getVal = (section: string, field: string, fallback = "") =>
    content[PAGE_SLUG]?.[section]?.[field] ?? fallback;

  const tabs = [
    { id: "maintenance" as const, label: "Manutenção", icon: (
      <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.384 5.384a2.025 2.025 0 01-2.853-2.853l5.384-5.384m2.853 2.853l5.384-5.384a2.025 2.025 0 00-2.853-2.853l-5.384 5.384m2.853 2.853L7.78 7.78m8.485 8.485L20.25 12" />
      </svg>
    )},
    { id: "notifications" as const, label: "Notificações", icon: (
      <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
      </svg>
    )},
    { id: "layout" as const, label: "Layout", icon: (
      <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    )},
    { id: "header" as const, label: "Header", icon: (
      <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    )},
    { id: "footer" as const, label: "Footer", icon: (
      <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
    )},
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <Link
          to="/admin"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#5a5a59] hover:text-[#313b2e] transition-colors mb-3 group"
        >
          <svg className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Dashboard
        </Link>
        <h1 className="text-2xl md:text-[28px] font-semibold text-[#131313]">Configuração</h1>
        <p className="text-[14px] text-[#5a5a59] mt-1">Manutenção, notificações e personalização do website.</p>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 p-1 bg-[#f0f0ef] rounded-xl w-fit mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium transition-all ${
              activeTab === tab.id
                ? "bg-white text-[#131313] shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
                : "text-[#5a5a59] hover:text-[#131313]"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Panels */}
      {activeTab === "maintenance" && (
        <MaintenancePanel getVal={getVal} save={save} saving={saving} savedKey={savedKey} refetch={refetch} />
      )}
      {activeTab === "notifications" && (
        <NotificationsPanel getVal={getVal} save={save} saving={saving} savedKey={savedKey} />
      )}
      {activeTab === "layout" && (
        <LayoutPanel getVal={getVal} save={save} saving={saving} savedKey={savedKey} refetch={refetch} />
      )}
      {activeTab === "header" && <HeaderEditor embedded />}
      {activeTab === "footer" && <FooterEditor embedded />}
    </div>
  );
}

/* ─── Maintenance Panel ─── */

function MaintenancePanel({ getVal, save, saving, savedKey, refetch }: {
  getVal: (s: string, f: string, fb?: string) => string;
  save: (s: string, f: string, v: string) => Promise<void>;
  saving: string | null;
  savedKey: string | null;
  refetch: () => Promise<void>;
}) {
  const isEnabled = getVal("maintenance", "enabled", "false") === "true";
  const imageUrl = getVal("maintenance", "image", "");
  const title = getVal("maintenance", "title", "Em manutenção");
  const message = getVal("maintenance", "message", "Estamos a melhorar o nosso website. Voltamos em breve!");
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleToggle = async () => {
    await save("maintenance", "enabled", isEnabled ? "false" : "true");
  };

  const doUpload = async (file: File) => {
    setUploading(true);
    try {
      const result = await uploadImage(file, "_settings", "maintenance");
      await save("maintenance", "image", result.path);
      await refetch();
    } finally {
      setUploading(false);
    }
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await doUpload(file);
    e.target.value = "";
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file?.type.startsWith("image/")) await doUpload(file);
  };

  return (
    <div className="max-w-2xl space-y-5">
      {/* Toggle card */}
      <div className="bg-white rounded-2xl border border-[#e5e5e3] p-5 md:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isEnabled ? "bg-amber-500/10" : "bg-[#313b2e]/8"}`}>
              {isEnabled ? (
                <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-[#313b2e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <div>
              <p className="text-[15px] font-semibold text-[#131313]">Modo de manutenção</p>
              <p className="text-[13px] text-[#5a5a59]">
                {isEnabled ? "O website está em manutenção." : "O website está ativo e visível."}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleToggle}
            disabled={saving === "maintenance.enabled"}
            className={`relative w-12 h-7 rounded-full transition-colors duration-200 ${isEnabled ? "bg-amber-500" : "bg-[#dcdcdc]"}`}
          >
            <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-200 ${isEnabled ? "translate-x-5" : "translate-x-0"}`} />
          </button>
        </div>

        {isEnabled && (
          <div className="mt-4 p-3.5 rounded-xl bg-amber-50 border border-amber-200">
            <p className="text-[12px] text-amber-800 font-medium flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              O website não está acessível ao público. Apenas administradores conseguem navegar.
            </p>
          </div>
        )}
      </div>

      {/* Maintenance content */}
      <div className="bg-white rounded-2xl border border-[#e5e5e3] p-5 md:p-6">
        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#e5e5e3]">
          <div className="w-8 h-8 rounded-lg bg-amber-500/8 flex items-center justify-center">
            <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
          </div>
          <h2 className="text-[16px] font-semibold text-[#131313]">Conteúdo da página</h2>
        </div>

        <div className="space-y-4">
          <FieldInput label="Título" value={title} onSave={(v) => save("maintenance", "title", v)} saving={saving === "maintenance.title"} justSaved={savedKey === "maintenance.title"} />
          <FieldTextarea label="Mensagem" value={message} onSave={(v) => save("maintenance", "message", v)} saving={saving === "maintenance.message"} justSaved={savedKey === "maintenance.message"} />
        </div>
      </div>

      {/* Image upload */}
      <div className="bg-white rounded-2xl border border-[#e5e5e3] p-5 md:p-6">
        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#e5e5e3]">
          <div className="w-8 h-8 rounded-lg bg-purple-500/8 flex items-center justify-center">
            <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
          <h2 className="text-[16px] font-semibold text-[#131313]">Imagem de manutenção</h2>
        </div>

        {imageUrl && (
          <div className="mb-4 rounded-xl overflow-hidden border border-[#e5e5e3] bg-[#fafaf9]">
            <img src={imageUrl.startsWith("http") ? imageUrl : getApiBase() + imageUrl} alt="Maintenance" className="w-full max-h-[280px] object-contain" />
          </div>
        )}

        <label
          className={`block cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-all ${
            dragActive ? "border-[#313b2e] bg-[#313b2e]/[0.04]" : "border-[#e5e5e3] hover:border-[#313b2e]/30 hover:bg-[#fafaf9]"
          }`}
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#313b2e]/8 flex items-center justify-center">
              <svg className="w-5 h-5 text-[#313b2e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
            </div>
            <p className="text-[13px] font-semibold text-[#131313]">{uploading ? "A carregar..." : imageUrl ? "Substituir imagem" : "Carregar imagem"}</p>
            <p className="text-[11px] text-[#5a5a59]">PNG, JPG ou SVG. Arraste ou clique.</p>
          </div>
          <input type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={uploading} />
        </label>
      </div>
    </div>
  );
}

/* ─── Notifications Panel ─── */

function NotificationsPanel({ getVal, save, saving, savedKey }: {
  getVal: (s: string, f: string, fb?: string) => string;
  save: (s: string, f: string, v: string) => Promise<void>;
  saving: string | null;
  savedKey: string | null;
}) {
  return (
    <div className="max-w-2xl space-y-5">
      <div className="bg-white rounded-2xl border border-[#e5e5e3] p-5 md:p-6">
        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#e5e5e3]">
          <div className="w-8 h-8 rounded-lg bg-blue-500/8 flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>
          <h2 className="text-[16px] font-semibold text-[#131313]">Email de notificações</h2>
        </div>
        <p className="text-[13px] text-[#5a5a59] mb-4 leading-relaxed">
          Endereço de email que receberá notificações administrativas como novos contactos, encomendas e alertas do sistema.
        </p>
        <FieldInput
          label="Email principal"
          value={getVal("notifications", "email", "")}
          placeholder="admin@frebrico.pt"
          onSave={(v) => save("notifications", "email", v)}
          saving={saving === "notifications.email"}
          justSaved={savedKey === "notifications.email"}
          type="email"
        />
        <div className="mt-4 h-px bg-[#e5e5e3]" />
        <div className="mt-4">
          <FieldInput
            label="Email secundário (CC)"
            value={getVal("notifications", "email_cc", "")}
            placeholder="equipa@frebrico.pt"
            onSave={(v) => save("notifications", "email_cc", v)}
            saving={saving === "notifications.email_cc"}
            justSaved={savedKey === "notifications.email_cc"}
            type="email"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#e5e5e3] p-5 md:p-6">
        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#e5e5e3]">
          <div className="w-8 h-8 rounded-lg bg-[#313b2e]/8 flex items-center justify-center">
            <svg className="w-4 h-4 text-[#313b2e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
          </div>
          <h2 className="text-[16px] font-semibold text-[#131313]">Tipos de notificação</h2>
        </div>
        <div className="space-y-3">
          <ToggleRow
            label="Formulários de contacto"
            description="Receber email quando alguém submete o formulário de contacto."
            value={getVal("notifications", "notify_contact", "true") === "true"}
            onToggle={(v) => save("notifications", "notify_contact", v ? "true" : "false")}
            saving={saving === "notifications.notify_contact"}
          />
          <div className="h-px bg-[#f0f0ef]" />
          <ToggleRow
            label="Novas encomendas"
            description="Receber email quando é criada uma nova encomenda."
            value={getVal("notifications", "notify_orders", "true") === "true"}
            onToggle={(v) => save("notifications", "notify_orders", v ? "true" : "false")}
            saving={saving === "notifications.notify_orders"}
          />
          <div className="h-px bg-[#f0f0ef]" />
          <ToggleRow
            label="Alertas de sistema"
            description="Erros, avisos de segurança e atualizações do sistema."
            value={getVal("notifications", "notify_system", "true") === "true"}
            onToggle={(v) => save("notifications", "notify_system", v ? "true" : "false")}
            saving={saving === "notifications.notify_system"}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Layout Panel ─── */

function LayoutPanel({ getVal, save, saving, savedKey, refetch }: {
  getVal: (s: string, f: string, fb?: string) => string;
  save: (s: string, f: string, v: string) => Promise<void>;
  saving: string | null;
  savedKey: string | null;
  refetch: () => Promise<void>;
}) {
  const apiBase = getApiBase();
  const logoDesktop = getVal("layout", "logo_desktop", "");
  const logoMobile = getVal("layout", "logo_mobile", "");
  const favicon = getVal("layout", "favicon", "");
  const [uploading, setUploading] = useState<"logo_desktop" | "logo_mobile" | "favicon" | null>(null);
  const [dragActive, setDragActive] = useState<"logo_desktop" | "logo_mobile" | "favicon" | null>(null);

  const doUpload = async (field: "logo_desktop" | "logo_mobile" | "favicon", file: File) => {
    setUploading(field);
    try {
      const result = await uploadImage(file, "_settings", "layout");
      await save("layout", field, result.path);
      await refetch();
    } finally {
      setUploading(null);
    }
  };

  const accept = (field: "logo_desktop" | "logo_mobile" | "favicon") =>
    field === "favicon" ? "image/x-icon,image/png,image/svg+xml,.ico" : "image/*";

  return (
    <div className="max-w-2xl space-y-5">
      {/* Logo & Favicon uploads */}
      <div className="bg-white rounded-2xl border border-[#e5e5e3] p-5 md:p-6">
        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#e5e5e3]">
          <div className="w-8 h-8 rounded-lg bg-purple-500/8 flex items-center justify-center">
            <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
          <h2 className="text-[16px] font-semibold text-[#131313]">Logótipo e favicon</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <LayoutUploadSlot
            label="Logo desktop"
            value={logoDesktop}
            apiBase={apiBase}
            field="logo_desktop"
            uploading={uploading}
            dragActive={dragActive}
            onDragChange={setDragActive}
            onUpload={doUpload}
            accept={accept("logo_desktop")}
          />
          <LayoutUploadSlot
            label="Logo mobile"
            value={logoMobile}
            apiBase={apiBase}
            field="logo_mobile"
            uploading={uploading}
            dragActive={dragActive}
            onDragChange={setDragActive}
            onUpload={doUpload}
            accept={accept("logo_mobile")}
          />
          <LayoutUploadSlot
            label="Favicon"
            value={favicon}
            apiBase={apiBase}
            field="favicon"
            uploading={uploading}
            dragActive={dragActive}
            onDragChange={setDragActive}
            onUpload={doUpload}
            accept={accept("favicon")}
          />
        </div>
      </div>

      {/* Colors */}
      <div className="bg-white rounded-2xl border border-[#e5e5e3] p-5 md:p-6">
        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#e5e5e3]">
          <div className="w-8 h-8 rounded-lg bg-[#313b2e]/8 flex items-center justify-center">
            <svg className="w-4 h-4 text-[#313b2e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
            </svg>
          </div>
          <h2 className="text-[16px] font-semibold text-[#131313]">Cores</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ColorField label="Cor primária" value={getVal("layout", "color_primary", "#313b2e")} onSave={(v) => save("layout", "color_primary", v)} saving={saving === "layout.color_primary"} justSaved={savedKey === "layout.color_primary"} />
          <ColorField label="Cor secundária" value={getVal("layout", "color_secondary", "#131313")} onSave={(v) => save("layout", "color_secondary", v)} saving={saving === "layout.color_secondary"} justSaved={savedKey === "layout.color_secondary"} />
          <ColorField label="Cor de fundo" value={getVal("layout", "color_background", "#ffffff")} onSave={(v) => save("layout", "color_background", v)} saving={saving === "layout.color_background"} justSaved={savedKey === "layout.color_background"} />
          <ColorField label="Cor de destaque" value={getVal("layout", "color_accent", "#00c8b3")} onSave={(v) => save("layout", "color_accent", v)} saving={saving === "layout.color_accent"} justSaved={savedKey === "layout.color_accent"} />
        </div>
      </div>

    </div>
  );
}

function LayoutUploadSlot({
  label,
  value,
  apiBase,
  field,
  uploading,
  dragActive,
  onDragChange,
  onUpload,
  accept,
}: {
  label: string;
  value: string;
  apiBase: string;
  field: "logo_desktop" | "logo_mobile" | "favicon";
  uploading: string | null;
  dragActive: string | null;
  onDragChange: (v: "logo_desktop" | "logo_mobile" | "favicon" | null) => void;
  onUpload: (f: "logo_desktop" | "logo_mobile" | "favicon", file: File) => Promise<void>;
  accept: string;
}) {
  const isActive = dragActive === field;
  const isUploading = uploading === field;
  return (
    <div>
      <p className="text-[13px] font-medium text-[#131313] mb-2">{label}</p>
      {value && (
        <div className="mb-2 rounded-xl overflow-hidden border border-[#e5e5e3] bg-[#fafaf9] h-16 flex items-center justify-center">
          {field === "favicon" || value.toLowerCase().endsWith(".ico") || value.toLowerCase().endsWith(".svg") ? (
            <img src={apiBase + value} alt="" className="max-h-10 max-w-full object-contain" />
          ) : (
            <img src={apiBase + value} alt="" className="max-h-full max-w-full object-contain" />
          )}
        </div>
      )}
      <label
        className={`block cursor-pointer rounded-xl border-2 border-dashed p-4 text-center transition-all ${isActive ? "border-[#313b2e] bg-[#313b2e]/[0.04]" : "border-[#e5e5e3] hover:border-[#313b2e]/30 hover:bg-[#fafaf9]"}`}
        onDragOver={(e) => { e.preventDefault(); onDragChange(field); }}
        onDragLeave={() => onDragChange(null)}
        onDrop={(e) => { e.preventDefault(); onDragChange(null); const f = e.dataTransfer.files?.[0]; if (f && (f.type.startsWith("image/") || f.name.endsWith(".ico"))) onUpload(field, f); }}
      >
        <p className="text-[12px] font-medium text-[#131313]">{isUploading ? "A carregar..." : value ? "Substituir" : "Carregar ficheiro"}</p>
        <input type="file" accept={accept} className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) onUpload(field, f); e.target.value = ""; }} disabled={isUploading} />
      </label>
    </div>
  );
}

/* ─── Shared Components ─── */

function FieldInput({ label, value, placeholder, onSave, saving, justSaved, type = "text" }: {
  label: string; value: string; placeholder?: string; onSave: (v: string) => void; saving: boolean; justSaved: boolean; type?: string;
}) {
  const [edit, setEdit] = useState(value);
  const [dirty, setDirty] = useState(false);
  useEffect(() => { setEdit(value); setDirty(false); }, [value]);
  return (
    <div>
      <label className="block text-[13px] font-medium text-[#131313] mb-1.5">{label}</label>
      <input
        type={type}
        value={edit}
        onChange={(e) => { setEdit(e.target.value); setDirty(e.target.value !== value); }}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 border border-[#e5e5e3] rounded-xl text-[13px] bg-[#fafaf9] focus:bg-white focus:border-[#313b2e] focus:ring-2 focus:ring-[#313b2e]/8 focus:outline-none transition-all"
      />
      <button
        type="button"
        onClick={() => { onSave(edit); setDirty(false); }}
        disabled={!dirty || saving}
        className="mt-2 px-3.5 py-1.5 bg-[#313b2e] text-white text-[12px] font-semibold rounded-lg hover:bg-[#3d4937] disabled:opacity-40 disabled:pointer-events-none transition-all"
      >
        {saving ? "A guardar..." : justSaved ? (
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            Guardado
          </span>
        ) : "Guardar"}
      </button>
    </div>
  );
}

function FieldTextarea({ label, value, onSave, saving, justSaved }: {
  label: string; value: string; onSave: (v: string) => void; saving: boolean; justSaved: boolean;
}) {
  const [edit, setEdit] = useState(value);
  const [dirty, setDirty] = useState(false);
  useEffect(() => { setEdit(value); setDirty(false); }, [value]);
  return (
    <div>
      <label className="block text-[13px] font-medium text-[#131313] mb-1.5">{label}</label>
      <textarea
        value={edit}
        onChange={(e) => { setEdit(e.target.value); setDirty(e.target.value !== value); }}
        className="w-full px-4 py-3 border border-[#e5e5e3] rounded-xl text-[13px] min-h-[80px] bg-[#fafaf9] focus:bg-white focus:border-[#313b2e] focus:ring-2 focus:ring-[#313b2e]/8 focus:outline-none transition-all resize-y"
      />
      <button
        type="button"
        onClick={() => { onSave(edit); setDirty(false); }}
        disabled={!dirty || saving}
        className="mt-2 px-3.5 py-1.5 bg-[#313b2e] text-white text-[12px] font-semibold rounded-lg hover:bg-[#3d4937] disabled:opacity-40 disabled:pointer-events-none transition-all"
      >
        {saving ? "A guardar..." : justSaved ? (
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            Guardado
          </span>
        ) : "Guardar"}
      </button>
    </div>
  );
}

function ColorField({ label, value, onSave, saving, justSaved }: {
  label: string; value: string; onSave: (v: string) => void; saving: boolean; justSaved: boolean;
}) {
  const [edit, setEdit] = useState(value);
  const [dirty, setDirty] = useState(false);
  useEffect(() => { setEdit(value); setDirty(false); }, [value]);
  return (
    <div>
      <label className="block text-[13px] font-medium text-[#131313] mb-1.5">{label}</label>
      <div className="flex gap-2">
        <input
          type="color"
          value={edit}
          onChange={(e) => { setEdit(e.target.value); setDirty(e.target.value !== value); }}
          className="w-10 h-10 rounded-lg border border-[#e5e5e3] cursor-pointer p-0.5"
        />
        <input
          type="text"
          value={edit}
          onChange={(e) => { setEdit(e.target.value); setDirty(e.target.value !== value); }}
          className="flex-1 px-4 py-2.5 border border-[#e5e5e3] rounded-xl text-[13px] font-mono bg-[#fafaf9] focus:bg-white focus:border-[#313b2e] focus:ring-2 focus:ring-[#313b2e]/8 focus:outline-none transition-all"
        />
      </div>
      <button
        type="button"
        onClick={() => { onSave(edit); setDirty(false); }}
        disabled={!dirty || saving}
        className="mt-2 px-3.5 py-1.5 bg-[#313b2e] text-white text-[12px] font-semibold rounded-lg hover:bg-[#3d4937] disabled:opacity-40 disabled:pointer-events-none transition-all"
      >
        {saving ? "A guardar..." : justSaved ? (
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            Guardado
          </span>
        ) : "Guardar"}
      </button>
    </div>
  );
}

function ToggleRow({ label, description, value, onToggle, saving }: {
  label: string; description: string; value: boolean; onToggle: (v: boolean) => void; saving: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-1">
      <div className="mr-4">
        <p className="text-[13px] font-medium text-[#131313]">{label}</p>
        <p className="text-[12px] text-[#5a5a59] mt-0.5">{description}</p>
      </div>
      <button
        type="button"
        onClick={() => onToggle(!value)}
        disabled={saving}
        className={`relative flex-shrink-0 w-10 h-6 rounded-full transition-colors duration-200 ${value ? "bg-[#313b2e]" : "bg-[#dcdcdc]"}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${value ? "translate-x-4" : "translate-x-0"}`} />
      </button>
    </div>
  );
}
