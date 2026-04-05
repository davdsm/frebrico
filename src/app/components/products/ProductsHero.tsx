import React from "react";
import { Link } from "react-router";
import { Badge } from "../common/Badge";
import { ContentLink } from "../common/ContentLink";
import { PrimaryButton } from "../common/PrimaryButton";
import { SecondaryButton } from "../common/SecondaryButton";
import svgPaths from "../../../imports/svg-1kqjfus9mr";
import imgImage1 from "figma:asset/a1506335f9c1a5795534434dee96810d0a8b30ff.png";
import { useContent, useContentJson } from "../../content/useContent";
import { FadeInUpInView } from "../atoms/FadeInUpInView";
import { resolveImageUrl } from "../../api/shop";

export type CategoryItem = { name: string; slug: string; image?: string; icon_svg?: string };

interface ProductsHeroProps {
  /** When provided, overrides CMS categories for the category cards */
  categoriesFromApi?: CategoryItem[];
}

export function ProductsHero({ categoriesFromApi }: ProductsHeroProps) {
  const badge = useContent("products", "hero", "badge");
  const title = useContent("products", "hero", "title");
  const description = useContent("products", "hero", "description");
  const ctaPrimary = useContent("products", "hero", "cta_primary");
  const ctaPrimaryUrl = useContent("products", "hero", "cta_primary_url");
  const ctaSecondary = useContent("products", "hero", "cta_secondary");
  const ctaSecondaryUrl = useContent("products", "hero", "cta_secondary_url");
  const categoriesCms = useContentJson<CategoryItem[]>("products", "hero", "categories", []);
  const categoryList = Array.isArray(categoriesFromApi) && categoriesFromApi.length > 0
    ? categoriesFromApi
    : (Array.isArray(categoriesCms) ? categoriesCms : []);

  return (
      <section className="w-full bg-white py-12 px-4 md:px-8 lg:px-[160px] md:py-16 lg:py-[136px]">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-12 md:gap-16 lg:gap-20">
        {/* Top Section - Hero 50/50 horizontal split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-start">
          {/* Left 50% - Hero Text & Buttons */}
          <FadeInUpInView>
          <div className="flex flex-col gap-6 md:gap-8">
            <div className="flex flex-col gap-6">
              <Badge variant="green">{badge}</Badge>

              <h1 className="text-4xl md:text-5xl lg:text-[72px] font-semibold text-black leading-none">
                {title}
              </h1>
            </div>

            <p className="text-base md:text-lg text-black/40 max-w-[476px] leading-normal">
              {description}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <ContentLink to={ctaPrimaryUrl}><PrimaryButton>{ctaPrimary}</PrimaryButton></ContentLink>

              <ContentLink to={ctaSecondaryUrl}>
              <SecondaryButton
                icon={
                  <svg
                    className="block size-full"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      d={svgPaths.pb635400}
                      stroke="black"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </svg>
                }
              >
                {ctaSecondary}
              </SecondaryButton>
              </ContentLink>
            </div>
          </div>
          </FadeInUpInView>

          {/* Right 50% - Brand Logos (aligned bottom) */}
          <FadeInUpInView delay={0.1} className="self-end">
          <div className="flex gap-5 items-center justify-center md:justify-end flex-wrap opacity-20 min-h-[50px]">
            {[1, 2, 3, 4].map((_, i) => (
              <div
                key={i}
                className="h-[22px] w-[88px] relative overflow-hidden shrink-0"
              >
                <img
                  alt=""
                  className="absolute h-[400%] left-0 max-w-none top-[-150%] w-full"
                  src={imgImage1}
                />
              </div>
            ))}
          </div>
          </FadeInUpInView>
        </div>

        {/* Bottom Section - Category Cards (no in-view opacity-0 wrappers — always visible) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-[35px]">
          {categoryList.map((category) => (
            <Link key={category.slug} to={`/category/${category.slug}`}>
              <div className="border border-[#f1f1f1] relative bg-[#f1f1f1] rounded-[26px] h-[200px] md:h-[214px] overflow-hidden group cursor-pointer hover:bg-[#e8e8e8] transition-colors">
                {category.image && (
                  <img
                    src={resolveImageUrl(category.image)}
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity group-hover:opacity-90"
                  />
                )}
                {category.icon_svg ? (
                  <img
                    src={resolveImageUrl(category.icon_svg)}
                    alt=""
                    aria-hidden
                    className="absolute top-4 left-4 w-11 h-11 md:w-12 md:h-12 object-contain rounded-xl bg-white/95 p-1.5 shadow-sm border border-black/5"
                  />
                ) : null}
                <div className="absolute bottom-0 right-0 bg-white rounded-tl-[11px] px-6 py-4 h-[59px] flex items-center justify-center min-w-[146px]">
                  <p className="text-xl font-semibold text-black text-center">
                    {category.name}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      </section>
  );
}