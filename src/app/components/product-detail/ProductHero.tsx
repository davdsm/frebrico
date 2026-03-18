import React from 'react';
import { Link, useNavigate } from 'react-router';
import { ContentLink } from '../common/ContentLink';
import svgPaths from '../../../imports/svg-1y6ddsd0a6';
import { FadeInUpInView } from '../atoms/FadeInUpInView';
import { useCart } from '../../cart/CartContext';
import type { Product } from '../../api/shop';

type AttributeValueItem = { name: string; image_url?: string };
type AttributeGroup = { attribute_id: number; attribute_name: string; values: AttributeValueItem[] };
type DownloadItem = { label?: string; url?: string };

function parseAttributeGroups(raw: string): AttributeGroup[] {
  try {
    const a = JSON.parse(raw ?? '[]');
    if (!Array.isArray(a) || a.length === 0) return [];
    const first = a[0];
    if (first && typeof first === 'object' && 'attribute_id' in first && 'attribute_name' in first && 'values' in first) {
      return a.map((x: Record<string, unknown>) => ({
        attribute_id: Number(x.attribute_id) || 0,
        attribute_name: String(x.attribute_name ?? ''),
        values: Array.isArray(x.values)
          ? (x.values as AttributeValueItem[]).map((v) => ({ name: String(v?.name ?? ''), image_url: v?.image_url != null ? String(v.image_url) : undefined }))
          : [],
      }));
    }
    if (first && typeof first === 'object' && 'name' in first) {
      return [{ attribute_id: 0, attribute_name: 'Variante', values: a as AttributeValueItem[] }];
    }
    return [];
  } catch {
    return [];
  }
}

function parseDownloads(raw: string): DownloadItem[] {
  try {
    const a = JSON.parse(raw);
    return Array.isArray(a) ? a : [];
  } catch {
    return [];
  }
}

interface ProductHeroProps {
  product: Product;
  categoryName?: string;
  categorySlug?: string;
}

export function ProductHero({ product, categoryName, categorySlug }: ProductHeroProps) {
  const attributeGroups = React.useMemo(() => parseAttributeGroups(product.variants ?? '[]'), [product.variants]);
  const [selectedByGroup, setSelectedByGroup] = React.useState<number[]>(() => attributeGroups.map(() => -1));
  const [showDownloads, setShowDownloads] = React.useState(false);
  const [justAdded, setJustAdded] = React.useState(false);
  const { addItem } = useCart();
  const navigate = useNavigate();

  React.useEffect(() => {
    setSelectedByGroup(attributeGroups.map(() => -1));
  }, [attributeGroups.length]);

  const downloads = parseDownloads(product.downloads ?? '[]');
  const mainImage = product.image || '';
  const hasAttributes = attributeGroups.length > 0;
  const allSelected =
    !hasAttributes ||
    attributeGroups.every((g, i) => selectedByGroup[i] >= 0 && selectedByGroup[i] < g.values.length);
  const canOrder = allSelected && !justAdded;

  const selectGroupValue = (groupIndex: number, valueIndex: number) => {
    setSelectedByGroup((prev) => {
      const next = [...prev];
      next[groupIndex] = valueIndex;
      return next;
    });
  };

  const variantLabel =
    hasAttributes && allSelected
      ? attributeGroups
          .map((g, i) => g.values[selectedByGroup[i]]?.name)
          .filter(Boolean)
          .join(' / ')
      : undefined;

  React.useEffect(() => {
    const handleClickOutside = () => { if (showDownloads) setShowDownloads(false); };
    if (showDownloads) document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showDownloads]);

  return (
      <section className="w-full bg-white py-8 md:py-12 lg:py-16">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 md:mb-12 lg:mb-16">
          <Link to="/" className="text-sm font-medium text-[#667085] hover:text-[#313b2e] transition-colors">Início</Link>
          <svg className="w-6 h-6 shrink-0 align-middle" fill="none" viewBox="0 0 16 16"><path d="M6 4L10 8L6 12" stroke="#667085" strokeLinecap="round" strokeLinejoin="round" /></svg>
          {categorySlug && categoryName ? (
            <>
              <Link to={`/category/${categorySlug}`} className="text-sm font-medium text-[#313b2e] hover:text-[#313b2e]/80 transition-colors">{categoryName}</Link>
              <svg className="w-6 h-6 shrink-0 align-middle" fill="none" viewBox="0 0 16 16"><path d="M6 4L10 8L6 12" stroke="#667085" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </>
          ) : null}
          <span className="text-sm font-medium text-[#313b2e]">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[128px]">
          <FadeInUpInView>
          <div className="relative">
            <div className="bg-[#f1f1f1] rounded-[53px] w-full aspect-square max-w-[620px] relative flex items-center justify-center">
              {mainImage ? <img src={mainImage} alt={product.name} className="w-[68%] h-auto object-contain" /> : <div className="w-[68%] aspect-square bg-[#e5e5e3] rounded-xl" />}
              {product.availability && (
                <div className="absolute top-8 left-8 bg-[#00c8b3] px-6 py-3 rounded-[53px]">
                  <p className="text-lg font-semibold text-white leading-normal">{product.availability}</p>
                </div>
              )}
            </div>
          </div>
          </FadeInUpInView>

          <FadeInUpInView delay={0.1}>
          <div className="flex flex-col gap-10 lg:pt-0">
            {(product.badge || product.type_label) && (
              <div className="inline-flex">
                <div className="bg-[#f7f7f7] px-4 py-2 rounded-[100px] border border-[rgba(19,19,19,0.1)]">
                  <p className="text-sm font-medium text-[#5a5a59] leading-normal">{product.badge || product.type_label}</p>
                </div>
              </div>
            )}

            <h1 className="text-[42px] font-semibold text-[#1e1b13] leading-[74px]">{product.name}</h1>

            {product.description && <p className="text-lg text-[#5a5a59] leading-normal">{product.description}</p>}

            {(product.type_label || product.type_text) && (
              <div className="flex flex-col gap-4">
                {product.type_label && <h3 className="text-[22px] font-semibold text-[#1e1b13] leading-normal">{product.type_label}</h3>}
                {product.type_text && <p className="text-lg text-[#5a5a59] leading-normal">{product.type_text}</p>}
              </div>
            )}

            {hasAttributes && (
              <>
                {attributeGroups.map((group, groupIndex) => (
                  <div key={groupIndex} className="flex flex-col gap-3">
                    <p className="text-sm font-medium text-[#5a5a59]">{group.attribute_name}</p>
                    <div className="flex flex-wrap items-center gap-6">
                      {group.values.map((val, valueIndex) => (
                        <button
                          key={valueIndex}
                          type="button"
                          onClick={() => selectGroupValue(groupIndex, valueIndex)}
                          className="flex flex-col items-center gap-3 group"
                        >
                          <div
                            className={`w-[60px] h-[60px] rounded-full border-[5px] transition-colors overflow-hidden ${
                              selectedByGroup[groupIndex] === valueIndex ? 'border-[#36474f]' : 'border-[#f1f1f1] group-hover:border-[#dcdcdc]'
                            }`}
                          >
                            {val.image_url ? (
                              <img src={val.image_url} alt={val.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full bg-[#e5e5e3]" />
                            )}
                          </div>
                          <p
                            className={`text-base leading-normal text-center ${
                              selectedByGroup[groupIndex] === valueIndex ? 'font-semibold' : 'font-normal'
                            } text-black`}
                          >
                            {val.name.split(' / ').length >= 2 ? (
                              <>{val.name.split(' / ')[0]} /<br />{val.name.split(' / ')[1]}</> 
                            ) : (
                              val.name
                            )}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                {!allSelected && <p className="text-sm text-[#b91c1c]">Por favor selecione uma opção em cada atributo antes de encomendar.</p>}
              </>
            )}

            <div className="flex items-center gap-4 relative">
              <button
                type="button"
                onClick={() => {
                  if (!canOrder) return;
                  const variantName = variantLabel ?? '—';
                  addItem({
                    id: String(product.id),
                    name: product.name,
                    variant: variantName ?? '—',
                    price: Number(product.price),
                    image: mainImage,
                  });
                  setJustAdded(true);
                  window.setTimeout(() => { setJustAdded(false); navigate('/cart'); }, 900);
                }}
                disabled={!canOrder}
                className={`px-8 py-4 rounded-[40px] inline-flex items-center justify-center gap-2.5 transition-colors text-white ${justAdded ? "bg-emerald-600 hover:bg-emerald-700" : "bg-[#313b2e] hover:bg-[#3d4937]"} ${!canOrder ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                {justAdded ? (
                  <><span className="text-base font-bold leading-normal">Adicionado ao carrinho</span>
                    <svg className="w-6 h-6 shrink-0 align-middle" viewBox="0 0 16 16" fill="none"><path d="M3 8.5L6.5 12L13 4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></>
                ) : (
                  <><span className="text-base font-bold leading-normal">Encomendar Produto</span>
                    <svg className="w-6 h-6 shrink-0 align-middle" fill="none" viewBox="0 0 16 16">
                      <path d={svgPaths.p39ee6532} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      <path d="M5.66667 8H9.66667" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      <path d={svgPaths.p26542a40} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    </svg></>
                )}
              </button>

              {downloads.length > 0 && (
                <div className="relative">
                  <button onClick={() => setShowDownloads(!showDownloads)} className="px-8 py-4 rounded-[40px] border border-[#dcdcdc] hover:border-[#313b2e] transition-colors">
                    <span className="text-lg font-semibold text-black leading-normal">Downloads</span>
                  </button>
                  {showDownloads && (
                    <div className="absolute top-full mt-2 bg-white border border-[#eee] rounded-[10px] p-6 w-[211px] shadow-lg z-10">
                      <div className="flex flex-col gap-2">
                        {downloads.map((d, index) => (
                          <ContentLink key={index} to={d.url || '#'} className="text-sm text-black hover:text-[#313b2e] transition-colors leading-normal">
                            {d.label || d.url || 'Download'}
                          </ContentLink>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          </FadeInUpInView>
        </div>
      </div>
      </section>
  );
}
