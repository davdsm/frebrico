import React, { createContext, useCallback, useContext, useState, useEffect, useRef } from "react";

export type ToastType = "success" | "error" | "info";
type Toast = { id: number; type: ToastType; message: string };
type ToastContextValue = {
  toast: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);
let nextId = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: ToastType = "success") => {
    const id = ++nextId;
    setToasts((prev) => [...prev, { id, type, message }]);
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-[9999] flex flex-col-reverse gap-2 pointer-events-none">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast: t, onDismiss }: { toast: Toast; onDismiss: (id: number) => void }) {
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    timerRef.current = setTimeout(() => onDismiss(t.id), 4000);
    return () => clearTimeout(timerRef.current);
  }, [t.id, onDismiss]);

  const colors: Record<ToastType, string> = {
    success: "bg-[#313b2e] text-white",
    error: "bg-red-600 text-white",
    info: "bg-[#1e3a5f] text-white",
  };

  const icons: Record<ToastType, React.ReactNode> = {
    success: (
      <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    ),
    error: (
      <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
    ),
    info: (
      <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
      </svg>
    ),
  };

  return (
    <div
      className={`pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg text-[13px] font-medium animate-slide-in-toast ${colors[t.type]}`}
      role="alert"
    >
      {icons[t.type]}
      <span className="max-w-xs">{t.message}</span>
      <button
        type="button"
        onClick={() => onDismiss(t.id)}
        className="ml-1 p-0.5 rounded opacity-70 hover:opacity-100"
        aria-label="Fechar"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
