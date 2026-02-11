import React from 'react';
import { useParams } from 'react-router';
import { CategoryHero } from '../components/category/CategoryHero';
import { CategoryProductGrid } from '../components/category/CategoryProductGrid';
import { Product } from '../components/common/ProductCard';

// Mock product data - in a real app this would come from an API
const defaultProducts: Product[] = [
  { id: 1, name: 'Armatek', price: 5.85, featured: true },
  { id: 2, name: 'Armatek', price: 5.85 },
  { id: 3, name: 'Armatek', price: 5.85 },
  { id: 4, name: 'Armatek', price: 5.85 },
  { id: 5, name: 'Armatek', price: 5.85 },
  { id: 6, name: 'Armatek', price: 5.85 },
  { id: 7, name: 'Armatek', price: 5.85 },
  { id: 8, name: 'Armatek', price: 5.85 },
];

const categoryTitles: Record<string, string> = {
  vedacoes: 'Vedações',
  arames: 'Arames',
  correntes: 'Correntes',
  portoes: 'Portões',
  grades: 'Grades',
  'arames-rebarbado': 'Arame Rebabado',
  'arames-farpado': 'Arame Farpado',
  'arames-liso': 'Arame Liso',
  'arames-malha': 'Malha Metálica',
  'arames-galvanizado': 'Arame Galvanizado',
  'portoes-automaticos': 'Portões Automáticos',
  'portoes-manuais': 'Portões Manuais',
  'portoes-garagem': 'Portões de Garagem',
  'portoes-vedacao': 'Portões de Vedação',
  'portoes-industriais': 'Portões Industriais',
  'grades-seguranca': 'Grades de Segurança',
  'grades-varanda': 'Grades de Varanda',
  'grades-decorativas': 'Grades Decorativas',
  'grades-industriais': 'Grades Industriais',
  'grades-obra': 'Grades de Obra',
  'vedacoes-residenciais': 'Vedações Residenciais',
  'vedacoes-industriais': 'Vedações Industriais',
  'vedacoes-rede-simples': 'Rede Simples',
  'vedacoes-rede-dupla': 'Rede Dupla',
  'vedacoes-agricolas': 'Vedações Agrícolas',
  'correntes-transmissao': 'Correntes de Transmissão',
  'correntes-elevacao': 'Correntes de Elevação',
  'correntes-protecao': 'Correntes de Proteção',
  'correntes-soldadas': 'Correntes Soldadas',
  'correntes-galvanizadas': 'Correntes Galvanizadas',
};

function getProductsForSlug(slug: string): Product[] {
  return defaultProducts;
}

const categoryProducts: Record<string, Product[]> = Object.fromEntries(
  Object.keys(categoryTitles).map((slug) => [slug, getProductsForSlug(slug)])
);

export default function Category() {
  const { slug } = useParams<{ slug: string }>();
  const categorySlug = slug || 'vedacoes';
  
  const products = categoryProducts[categorySlug] || [];
  const title = categoryTitles[categorySlug] || 'Produtos';

  return (
    <>
      <CategoryHero title={title} />
      <CategoryProductGrid products={products} />
    </>
  );
}
