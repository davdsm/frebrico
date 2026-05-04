import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { SEO } from "../components/common/SEO";
import { ProductCard, shopProductToCardProduct } from "../components/common/ProductCard";
import { SiteSearchBar } from "../components/common/SiteSearchBar";
import { fetchSiteSearch, type Category, type Product as ShopProduct } from "../api/shop";

export default function SearchPage() {
  const [params] = useSearchParams();
  const q = params.get("q")?.trim() ?? "";

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<ShopProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!q) {
      setCategories([]);
      setProducts([]);
      setError(null);
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchSiteSearch(q);
        if (!cancelled) {
          setCategories(Array.isArray(data.categories) ? data.categories : []);
          setProducts(Array.isArray(data.products) ? data.products : []);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Erro ao pesquisar");
          setCategories([]);
          setProducts([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [q]);

  const productCards = products.map(shopProductToCardProduct);
  const title = q ? `Pesquisa: ${q}` : "Pesquisa";

  return (
    <>
      <SEO
        title={title}
        description={q ? `Resultados da pesquisa por «${q}» na Frebrico.` : "Pesquisar produtos e categorias na Frebrico."}
        path="/search"
      />
      <div className="w-full bg-white py-10 md:py-14">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-[#131313] mb-6">Pesquisa</h1>
          <div className="mb-10">
            <SiteSearchBar variant="page" initialQuery={q} />
          </div>

          {!q && (
            <p className="text-[#5a5a59] text-base">
              Escreva um termo acima — nome de produto, referência, código ou palavras da descrição ou da tabela de especificações.
            </p>
          )}

          {q && loading && <p className="text-[#5a5a59]">A pesquisar…</p>}
          {error && <p className="text-red-600 text-sm">{error}</p>}

          {q && !loading && !error && (
            <>
              {categories.length > 0 && (
                <section className="mb-12">
                  <h2 className="text-lg font-semibold text-[#131313] mb-4">Categorias</h2>
                  <ul className="flex flex-wrap gap-3">
                    {categories.map((c) => (
                      <li key={c.id}>
                        <Link
                          to={`/category/${encodeURIComponent(c.slug)}`}
                          className="inline-flex items-center rounded-full border border-[#e5e5e3] bg-[#fafaf9] px-4 py-2 text-sm font-medium text-[#313b2e] hover:bg-[#313b2e] hover:text-white transition-colors"
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <section>
                <h2 className="text-lg font-semibold text-[#131313] mb-4">Produtos</h2>
                {productCards.length === 0 ? (
                  <p className="text-[#5a5a59]">Nenhum resultado para «{q}». Experimente outras palavras ou confira a ortografia.</p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {productCards.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                )}
              </section>
            </>
          )}
        </div>
      </div>
    </>
  );
}
