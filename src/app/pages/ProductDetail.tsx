import React from 'react';
import { ProductHero } from '../components/product-detail/ProductHero';
import { ProductSpecs } from '../components/product-detail/ProductSpecs';
import { RelatedProducts } from '../components/product-detail/RelatedProducts';
import { ProductFAQ } from '../components/product-detail/ProductFAQ';

export default function ProductDetail() {
  return (
    <>
      <ProductHero />
      <ProductSpecs />
      <RelatedProducts />
      <ProductFAQ />
    </>
  );
}