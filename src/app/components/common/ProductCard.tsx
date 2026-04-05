import React from 'react';
import { Link } from 'react-router';
import { resolveImageUrl } from '../../api/shop';

export interface Product {
  id: number;
  name: string;
  price: number;
  featured?: boolean;
  image?: string;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const imgSrc = resolveImageUrl(product.image);

  return (
    <Link to={`/product/${product.id}`}>
      <div className="flex flex-col gap-4">
        <div className="bg-[#f1f1f1] rounded-[24px] aspect-[5/6] relative overflow-hidden group cursor-pointer hover:bg-[#e8e8e8] transition-colors flex items-center justify-center">
          {imgSrc && (
            <img src={imgSrc} alt={product.name} className="w-[68%] h-auto object-contain" />
          )}
          {product.featured && (
            <div className="absolute top-3 left-3 bg-white px-6 py-3 rounded-2xl">
              <p className="text-base font-normal text-black leading-normal">Destaque 🔥</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-lg font-medium text-black leading-normal">
            {product.name}
          </p>
          <p className="text-base font-normal text-black leading-normal whitespace-nowrap">
            {product.price.toFixed(2)} <span className="text-[#7c818f]">€</span>
          </p>
        </div>
      </div>
    </Link>
  );
}