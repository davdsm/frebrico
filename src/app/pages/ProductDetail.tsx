import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ProductHero } from '../components/product-detail/ProductHero';
import { ProductSpecs } from '../components/product-detail/ProductSpecs';
import { RelatedProducts } from '../components/product-detail/RelatedProducts';
import { ProductFAQ } from '../components/product-detail/ProductFAQ';
import { SEO } from '../components/common/SEO';
import { DominoFadeInDown } from '../components/atoms/DominoFadeInDown';
import { fetchProductByIdOrSlug, fetchCategoryById, fetchProducts, type Product } from '../api/shop';
import type { Product as CardProduct } from '../components/common/ProductCard';

function toCardProduct(p: Product): CardProduct {
  return { id: p.id, name: p.name, price: Number(p.price), featured: Boolean(p.featured), image: p.image };
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const productId = id ?? '';

  const [product, setProduct] = useState<Product | null>(null);
  const [categoryName, setCategoryName] = useState<string>('');
  const [categorySlug, setCategorySlug] = useState<string>('');
  const [relatedProducts, setRelatedProducts] = useState<CardProduct[]>([]);
  const [loading, setLoading] = useState(!!productId);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;
    }
    (async () => {
      setLoading(true);
      setNotFound(false);
      try {
        const p = await fetchProductByIdOrSlug(productId);
        if (!p) {
          setProduct(null);
          setNotFound(true);
          setRelatedProducts([]);
          setLoading(false);
          return;
        }
        setProduct(p);
        if (p.category_id) {
          const cat = await fetchCategoryById(p.category_id);
          setCategoryName(cat?.name ?? '');
          setCategorySlug(cat?.slug ?? '');
        } else {
          setCategoryName('');
          setCategorySlug('');
        }
        const allProducts = await fetchProducts();
        let related: Product[] = allProducts.filter(
          (x) => x.id !== p.id && x.category_id === p.category_id
        );
        if (related.length < 4) {
          const others = allProducts.filter(
            (x) => x.id !== p.id && !related.some((r) => r.id === x.id)
          );
          const shuffled = [...others].sort(() => Math.random() - 0.5);
          related = [...related, ...shuffled].slice(0, 5);
        } else {
          related = related.slice(0, 5);
        }
        setRelatedProducts(related.map(toCardProduct));
      } catch {
        setProduct(null);
        setNotFound(true);
        setRelatedProducts([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [productId]);

  if (!productId) {
    return (
      <>
        <SEO title="Produto" description="Detalhes do produto." path="/product" />
        <div className="w-full bg-white py-16 px-4 text-center">
          <p className="text-[#5a5a59]">ID do produto em falta.</p>
        </div>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <SEO title="Produto" description="A carregar..." path={`/product/${productId}`} />
        <div className="w-full bg-white py-16 px-4 text-center text-[#5a5a59]">A carregar...</div>
      </>
    );
  }

  if (notFound || !product) {
    return (
      <>
        <SEO title="Produto não encontrado" path={`/product/${productId}`} />
        <div className="w-full bg-white py-16 px-4 text-center">
          <h1 className="text-2xl font-semibold text-[#131313]">Produto não encontrado</h1>
          <p className="text-[#5a5a59] mt-2">O produto solicitado não existe.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title={product.name}
        description={product.description ? product.description.slice(0, 160) : `Detalhes do produto ${product.name} na Frebrico.`}
        path={`/product/${product.id}`}
      />
      <DominoFadeInDown initialDelay={0.15} stagger={0.05}>
        <ProductHero product={product} categoryName={categoryName} categorySlug={categorySlug} />
        <ProductSpecs product={product} />
        <RelatedProducts products={relatedProducts} />
        <ProductFAQ product={product} />
      </DominoFadeInDown>
    </>
  );
}
