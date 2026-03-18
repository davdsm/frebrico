import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { CategoryHero } from '../components/category/CategoryHero';
import { CategoryProductGrid } from '../components/category/CategoryProductGrid';
import { Product } from '../components/common/ProductCard';
import { SEO } from '../components/common/SEO';
import { DominoFadeInDown } from '../components/atoms/DominoFadeInDown';
import { fetchCategoryBySlug, fetchProducts } from '../api/shop';

function toCardProduct(p: { id: number; name: string; price: number; featured?: number; image?: string }): Product {
  return { id: p.id, name: p.name, price: Number(p.price), featured: Boolean(p.featured), image: p.image };
}

export default function Category() {
  const { slug } = useParams<{ slug: string }>();
  const categorySlug = slug ?? '';

  const [title, setTitle] = useState('Produtos');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(!!categorySlug);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!categorySlug) {
      setLoading(false);
      return;
    }
    (async () => {
      setLoading(true);
      setNotFound(false);
      try {
        const [cat, prods] = await Promise.all([
          fetchCategoryBySlug(categorySlug),
          fetchProducts(categorySlug),
        ]);
        if (cat) {
          setTitle(cat.name);
          setProducts(prods.map(toCardProduct));
        } else {
          setNotFound(true);
          setProducts([]);
        }
      } catch {
        setNotFound(true);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [categorySlug]);

  if (!categorySlug) {
    return (
      <>
        <SEO title="Categoria" description="Produtos por categoria." path="/category" />
        <DominoFadeInDown initialDelay={0.15} stagger={0.05}>
          <CategoryHero title="Produtos" />
          <CategoryProductGrid products={[]} />
        </DominoFadeInDown>
      </>
    );
  }

  if (notFound && !loading) {
    return (
      <>
        <SEO title="Categoria não encontrada" path={`/category/${categorySlug}`} />
        <div className="w-full bg-white py-16 px-4 text-center">
          <h1 className="text-2xl font-semibold text-[#131313]">Categoria não encontrada</h1>
          <p className="text-[#5a5a59] mt-2">A categoria &quot;{categorySlug}&quot; não existe.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title={`Categoria: ${title}`}
        description={`Veja produtos da categoria ${title} na Frebrico, com soluções em vedações, portões, arames e muito mais.`}
        path={`/category/${categorySlug}`}
      />
      <DominoFadeInDown initialDelay={0.15} stagger={0.05}>
        <CategoryHero title={loading ? '...' : title} />
        <CategoryProductGrid products={products} loading={loading} />
      </DominoFadeInDown>
    </>
  );
}
