import React, { useState, useCallback } from "react";
import { Link } from "react-router";
import { listUploads, uploadImage, deleteUpload, getApiBase, type UploadRecord } from "../../content/api";
import { useToast } from "../components/Toast";

/**
 * Media library
 * - Shows all uploaded images from the site (no page/section filter required)
 * - New uploads go to /uploads/shared/general
 */
export default function MediaLibrary() {
  const [list, setList] = useState<UploadRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const apiBase = getApiBase();
  const { toast } = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listUploads();
      setList(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao carregar.");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const doUpload = async (file: File) => {
    setUploading(true);
    setError(null);
    try {
      await uploadImage(file, "shared", "general");
      await load();
      toast("Imagem carregada com sucesso.");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Falha no upload.";
      setError(msg);
      toast(msg, "error");
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
    if (file && file.type.startsWith("image/")) await doUpload(file);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apagar esta imagem?")) return;
    try {
      await deleteUpload(id);
      await load();
      toast("Imagem apagada.");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Erro ao apagar.";
      setError(msg);
      toast(msg, "error");
    }
  };

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
        <h1 className="text-2xl md:text-[28px] font-semibold text-[#131313]">Media</h1>
        <p className="text-[14px] text-[#5a5a59] mt-1">
          Biblioteca com todas as imagens do site. As novas imagens são guardadas em{" "}
          <span className="font-mono text-[13px]">/uploads/shared/general</span>.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-5 flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200">
          <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          <p className="text-[13px] text-red-700">{error}</p>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Sidebar: upload only (no page/section selection needed) */}
        <div className="lg:w-56 shrink-0 space-y-4">
          {/* Upload */}
          <label
            className={`block cursor-pointer rounded-2xl border-2 border-dashed p-5 text-center transition-all ${
              dragActive
                ? "border-[#313b2e] bg-[#313b2e]/[0.04]"
                : "border-[#e5e5e3] hover:border-[#313b2e]/30 hover:bg-[#fafaf9]"
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
              <div>
                <p className="text-[13px] font-semibold text-[#131313]">
                  {uploading ? "A carregar..." : "Carregar imagem"}
                </p>
                <p className="text-[11px] text-[#5a5a59] mt-0.5">ou arraste e largue aqui</p>
              </div>
            </div>
            <input type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={uploading} />
          </label>
        </div>

        {/* Image grid */}
        <div className="flex-1">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex items-center gap-3 text-[#5a5a59]">
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span className="text-[13px]">A carregar...</span>
              </div>
            </div>
          ) : list.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#f5f5f4] flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#5a5a59]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
              <p className="text-[15px] font-medium text-[#131313] mb-1">Sem imagens</p>
              <p className="text-[13px] text-[#5a5a59]">
                Nenhuma imagem na biblioteca
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {list.map((item) => (
                <div key={item.id} className="group rounded-2xl border border-[#e5e5e3] overflow-hidden bg-white hover:shadow-[0_8px_24px_rgba(149,157,165,0.12)] hover:border-[#e5e5e3]/60 transition-all">
                  <div className="aspect-video bg-[#f5f5f4] flex items-center justify-center p-2">
                    <img src={`${apiBase}${item.path}`} alt={item.original_name} className="max-h-full max-w-full object-contain rounded-lg" />
                  </div>
                  <div className="p-3 flex items-center justify-between">
                    <p className="text-[11px] text-[#5a5a59] truncate mr-2 flex-1" title={item.original_name}>{item.original_name}</p>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 rounded-lg text-[#5a5a59] opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-600 transition-all flex-shrink-0"
                      aria-label="Apagar"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
