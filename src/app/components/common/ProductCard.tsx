import React from 'react';
import { Link } from 'react-router';
import { resolveImageUrl, type Product as ShopProduct } from '../../api/shop';

export interface Product {
  id: number;
  slug?: string | null;
  name: string;
  price: number;
  featured?: boolean;
  image?: string;
}

/** Same shape used by category, products listing, and related products grids. */
export function shopProductToCardProduct(p: ShopProduct): Product {
  return {
    id: p.id,
    slug: p.slug ?? null,
    name: p.name,
    price: Number(p.price),
    featured: Boolean(p.featured),
    image: p.image,
  };
}

/** Home carousel / CMS JSON items (ContentProductsPicker, StructuredJsonField). */
export function cmsProductItemToCardProduct(item: Record<string, unknown>): Product {
  const priceRaw = item.price;
  const price =
    typeof priceRaw === 'number'
      ? priceRaw
      : parseFloat(String(priceRaw ?? '').replace(',', '.')) || 0;
  const id = typeof item.id === 'number' ? item.id : 0;
  const slug =
    typeof item.slug === 'string' && item.slug.trim() ? item.slug.trim() : null;
  return {
    id,
    slug,
    name: String(item.name ?? ''),
    price,
    featured: Boolean(item.featured),
    image: typeof item.image === 'string' ? item.image : undefined,
  };
}

export function cmsProductItemKey(item: Record<string, unknown>, index: number): string {
  if (typeof item.id === 'number' && item.id > 0) return `id-${item.id}`;
  if (typeof item.slug === 'string' && item.slug.trim()) return `slug-${item.slug.trim()}`;
  return `i-${index}`;
}

function isProductLinkable(product: Product): boolean {
  const slug = product.slug != null ? String(product.slug).trim() : "";
  if (slug.length > 0) return true;
  return typeof product.id === "number" && product.id > 0;
}

interface ProductCardProps {
  product: Product;
  /** When false, card is not wrapped in a link (e.g. teaser without shop id/slug). Default true. */
  linkable?: boolean;
  /** Outer wrapper (e.g. carousel slide width). */
  className?: string;
}

export function ProductCard({ product, linkable = true, className }: ProductCardProps) {
  const imgSrc = resolveImageUrl(product.image);
  const productUrl = `/product/${encodeURIComponent(product.slug || String(product.id))}`;
  const canLink = linkable && isProductLinkable(product);

  const card = (
    <div className="flex flex-col gap-4">
      <div
        className={
          "bg-[#f1f1f1] rounded-[24px] aspect-[5/6] relative overflow-hidden group transition-colors flex items-end justify-center " +
          (canLink ? "cursor-pointer hover:bg-[#e8e8e8]" : "cursor-default")
        }
      >
        {imgSrc ? (
          <img src={imgSrc} alt={product.name} className="w-full h-[80%] object-contain" />
        ) : null}
        {product.featured ? (
          <div className="absolute top-3 left-3 bg-white px-6 py-3 rounded-2xl">
            <p className="text-base font-normal text-black leading-normal">Destaque 🔥</p>
          </div>
        ) : null}
      </div>

      <div className="flex items-start justify-between gap-2">
        <p className="text-sm md:text-base font-medium text-black leading-snug line-clamp-2 min-w-0 flex-1">{product.name}</p>
        {product.price > 0 && (
          <p className="text-sm md:text-base font-normal text-black leading-normal whitespace-nowrap shrink-0">
            {product.price.toFixed(2)} <span className="text-[#7c818f]">€</span>
          </p>
        )}
      </div>
    </div>
  );

  const outerClass = [className, 'block'].filter(Boolean).join(' ');
  return canLink ? (
    <Link to={productUrl} className={outerClass}>
      {card}
    </Link>
  ) : (
    <div className={outerClass}>{card}</div>
  );
}