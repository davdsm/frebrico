import React, { useEffect, useState } from 'react';
import { ProductsHero } from '../components/products/ProductsHero';
import { ProductsServices } from '../components/products/ProductsServices';
import { ProductsGrid } from '../components/products/ProductsGrid';
import { SEO } from '../components/common/SEO';
import { useContent } from '../content/useContent';
import { fetchCategories, fetchProducts, type Category } from '../api/shop';
import { shopProductToCardProduct, type Product } from '../components/common/ProductCard';

export default function Products() {
  const seoTitle = useContent('products', 'seo', 'title');
  const seoDescription = useContent('products', 'seo', 'description');

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const [cats, prods] = await Promise.all([fetchCategories(), fetchProducts()]);
        // Top-level categories only (same set as header submenu), sorted like the API
        const roots = cats
          .filter((c) => c.parent_id == null)
          .sort((a, b) => (a.sort_order - b.sort_order) || a.name.localeCompare(b.name));
        setCategories(
          roots.map((c) => ({
            name: c.name,
            slug: c.slug,
            image: c.image,
            icon_svg: (c.icon_svg || "").trim(),
          }))
        );
        setProducts(prods.map(shopProductToCardProduct));
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Erro ao carregar');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <SEO title={seoTitle} description={seoDescription} path="/products" />
      <ProductsHero categoriesFromApi={categories} />
      <ProductsServices />
      <ProductsGrid products={products} loading={loading} error={error} />
    </>
  );
}
