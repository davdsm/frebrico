import React from "react";
import { Link } from "react-router";

/** True if URL should open in new tab (external). */
export function isExternalUrl(url: string): boolean {
  const t = (url || "").trim();
  return t.startsWith("http://") || t.startsWith("https://") || t.startsWith("//");
}

interface ContentLinkProps {
  /** URL from CMS: path (e.g. /contact) or full URL (opens in new tab). */
  to: string;
  children?: React.ReactNode;
  className?: string;
  /** Only for internal links; external links always get target="_blank" and rel="noopener noreferrer". */
  onClick?: () => void;
}

/**
 * Renders a link that respects admin-editable URLs: internal paths use React Router Link,
 * external URLs use <a> with target="_blank" and rel="noopener noreferrer".
 */
export function ContentLink({ to, children, className, onClick }: ContentLinkProps) {
  const href = (to || "").trim() || "/";
  if (isExternalUrl(href)) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer" onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link to={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
