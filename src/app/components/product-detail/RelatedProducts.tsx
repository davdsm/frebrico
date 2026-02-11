import React from 'react';
import { ProductCard, Product } from '../common/ProductCard';

export function RelatedProducts() {
  const products: Product[] = [
    { id: 1, name: 'Armatek', price: 5.85 },
    { id: 2, name: 'Armatek', price: 5.85 },
    { id: 3, name: 'Armatek', price: 5.85 },
    { id: 4, name: 'Armatek', price: 5.85 },
    { id: 5, name: 'Armatek', price: 5.85 }
  ];

  return (
    <section className="w-full bg-white py-12 md:py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <div className="inline-flex bg-[#f7f7f7] px-4 py-2 rounded-[100px] mb-6">
            <p className="text-sm font-medium text-[#5a5a59] leading-normal">Produtos</p>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-[72px] font-semibold text-black leading-none lg:leading-[74px]">
            Produtos Recomendados
          </h2>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
