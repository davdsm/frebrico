import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { fetchAllContent, type ContentMap } from "./api";
import { defaults } from "./defaults";

/**
 * Merge API content with defaults. API (backoffice) values always win so that
 * data saved in the backoffice is shown on the frontoffice.
 */
function mergeWithDefaults(api: ContentMap): ContentMap {
  const out: ContentMap = {};
  for (const page of Object.keys(defaults)) {
    out[page] = {};
    for (const section of Object.keys(defaults[page])) {
      out[page][section] = { ...defaults[page][section] };
    }
  }
  for (const page of Object.keys(api)) {
    if (!out[page]) out[page] = {};
    for (const section of Object.keys(api[page])) {
      if (!out[page][section]) out[page][section] = {};
      for (const [field, value] of Object.entries(api[page][section])) {
        out[page][section][field] = value;
      }
    }
  }
  return out;
}

type ContentContextValue = {
  content: ContentMap;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<ContentMap>(() => mergeWithDefaults({}));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAllContent();
      setContent(mergeWithDefaults(data ?? {}));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load content");
      setContent(mergeWithDefaults({}));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const value: ContentContextValue = { content, loading, error, refetch: load };

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContentState() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContentState must be used within ContentProvider");
  return ctx;
}
