import React, { useRef } from "react";
import { useNavigate } from "react-router";

type SiteSearchBarProps = {
  className?: string;
  /** Sync controlled value with URL (search page) */
  initialQuery?: string;
  variant?: "header" | "page";
  /** Focus input on mount (e.g. after expanding header search) */
  autoFocus?: boolean;
  /** Optional close control (header expandable mode) */
  onClose?: () => void;
};

export function SiteSearchBar({
  className = "",
  initialQuery = "",
  variant = "header",
  autoFocus = false,
  onClose,
}: SiteSearchBarProps) {
  const navigate = useNavigate();
  const [q, setQ] = React.useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setQ(initialQuery);
  }, [initialQuery]);

  React.useEffect(() => {
    if (autoFocus && inputRef.current) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 50);
      return () => window.clearTimeout(t);
    }
  }, [autoFocus]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const t = q.trim();
    if (!t) {
      navigate("/search");
      return;
    }
    navigate(`/search?q=${encodeURIComponent(t)}`);
    onClose?.();
  };

  const isPage = variant === "page";
  return (
    <form onSubmit={submit} className={`w-full ${className}`.trim()}>
      <div
        className={
          isPage
            ? "flex w-full max-w-2xl rounded-2xl border border-[#e5e5e3] bg-white shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-[#313b2e]/15 focus-within:border-[#313b2e]/30"
            : "flex w-full rounded-full border border-[#dcdcdc] bg-white overflow-hidden focus-within:border-[#313b2e]/40"
        }
      >
        {onClose && (
          <button
            type="button"
            onClick={() => onClose()}
            className="shrink-0 px-2.5 py-2.5 text-[#5a5a59] hover:text-[#131313] hover:bg-black/[0.04] transition-colors"
            aria-label="Fechar pesquisa"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        <input
          ref={inputRef}
          type="search"
          name="q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Nome, ref., código…"
          autoComplete="off"
          className="flex-1 min-w-0 bg-transparent px-2 sm:px-3 py-2.5 text-sm text-[#131313] placeholder:text-[#9a9a98] outline-none"
          aria-label="Pesquisa"
        />
        <button
          type="submit"
          className="shrink-0 px-3 sm:px-4 py-2.5 bg-[#313b2e] text-white hover:bg-[#3d4937] transition-colors flex items-center justify-center"
          aria-label="Pesquisar"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </button>
      </div>
    </form>
  );
}
