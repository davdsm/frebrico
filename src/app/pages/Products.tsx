import React from 'react';
import { ProductsHero } from '../components/products/ProductsHero';
import { ProductsServices } from '../components/products/ProductsServices';
import { ProductsGrid } from '../components/products/ProductsGrid';

export default function Products() {
  return (
    <>
      <ProductsHero />
      <ProductsServices />
      <ProductsGrid />
    </>
  );
}
