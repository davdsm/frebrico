/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE?: string;
  readonly VITE_BASE_URL?: string;
  readonly VITE_OG_IMAGE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
