import { externalLinkAlt, safeExternalHref } from "../../content/cmsImages";

type CmsLinkedImageProps = {
  src: string;
  href?: string;
  imgClassName?: string;
  linkClassName?: string;
};

/**
 * CMS image that becomes an external link only for a validated http(s) URL.
 * Without a safe URL the image stays decorative (empty alt).
 */
export function CmsLinkedImage({ src, href, imgClassName, linkClassName }: CmsLinkedImageProps) {
  const safeHref = safeExternalHref(href);
  const img = (
    <img src={src} alt={safeHref ? externalLinkAlt(safeHref) : ""} className={imgClassName} />
  );
  if (!safeHref) return img;
  return (
    <a
      href={safeHref}
      target="_blank"
      rel="noopener noreferrer"
      className={linkClassName}
    >
      {img}
    </a>
  );
}
