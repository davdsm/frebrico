import React from "react";
import { Helmet } from "react-helmet-async";

type SEOProps = {
  title: string;
  description: string;
  path?: string;
};

const BASE_URL = typeof import.meta !== "undefined" && import.meta.env?.VITE_BASE_URL
  ? String(import.meta.env.VITE_BASE_URL).replace(/\/$/, "")
  : "https://www.frebrico.com";
const DEFAULT_IMAGE = typeof import.meta !== "undefined" && import.meta.env?.VITE_OG_IMAGE
  ? String(import.meta.env.VITE_OG_IMAGE)
  : `${BASE_URL}/og-image.jpg`;

export function SEO({ title, description, path = "/" }: SEOProps) {
  const url = `${BASE_URL}${path}`;
  const fullTitle = `${title} | Frebrico`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={DEFAULT_IMAGE} />

      {/* Twitter */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={DEFAULT_IMAGE} />

      {/* Canonical */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
}

