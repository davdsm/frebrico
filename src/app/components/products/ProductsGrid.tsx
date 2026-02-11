import React from 'react';
import { ProductCard, Product } from '../common/ProductCard';

export function ProductsGrid() {
  const products: Product[] = [
    { id: 1, name: 'Armatek', price: 5.85, featured: true },
    { id: 2, name: 'Armatek', price: 5.85 },
    { id: 3, name: 'Armatek', price: 5.85 },
    { id: 4, name: 'Armatek', price: 5.85 },
    { id: 5, name: 'Armatek', price: 5.85 },
    { id: 6, name: 'Armatek', price: 5.85 },
    { id: 7, name: 'Armatek', price: 5.85 },
    { id: 8, name: 'Armatek', price: 5.85 },
    { id: 9, name: 'Armatek', price: 5.85 },
    { id: 10, name: 'Armatek', price: 5.85 }
  ];

  return (
    <section className="w-full bg-white py-12 md:py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20">
        
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