import React from 'react';
import { ProductCard, Product } from '../common/ProductCard';
import { FadeInUpInView } from '../atoms/FadeInUpInView';
import { StaggeredFadeInUpInView } from '../atoms/StaggeredFadeInUpInView';

interface CategoryProductGridProps {
  products: Product[];
  loading?: boolean;
}

export function CategoryProductGrid({ products, loading }: CategoryProductGridProps) {
  if (loading) {
    return (
      <FadeInUpInView>
        <section className="w-full bg-white pt-2 md:pt-4 lg:pt-6 pb-12 md:pb-16 lg:pb-20">
          <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20">
            <p className="text-[#5a5a59]">A carregar produtos...</p>
          </div>
        </section>
      </FadeInUpInView>
    );
  }
  return (
    <FadeInUpInView>
      <section className="w-full bg-white pt-2 md:pt-4 lg:pt-6 pb-12 md:pb-16 lg:pb-20">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20">
          {/* Products Grid - 5 columns on desktop */}
          <StaggeredFadeInUpInView className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8" stagger={0.1}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </StaggeredFadeInUpInView>
        </div>
      </section>
    </FadeInUpInView>
  );
}
