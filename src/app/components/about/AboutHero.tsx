import React from "react";
import { ContentLink } from "../../components/common/ContentLink";
import { useContent } from "../../content/useContent";
import { getApiBase } from "../../content/api";
import { FadeInUpInView } from "../../components/atoms/FadeInUpInView";

type HeroImageItem = { path: string; url?: string };

function parseHeroImages(raw: string): HeroImageItem[] {
  const t = (raw || "").trim();
  if (!t) return [];
  try {
    // Legacy singular path stored as plain string
    if (!t.startsWith("[")) {
      return t ? [{ path: t, url: "" }] : [];
    }
    const arr = JSON.parse(t);
    if (!Array.isArray(arr)) return [];
    return arr
      .filter((x: { path?: string }) => typeof x?.path === "string" && x.path)
      .map((x: { path: string; url?: string }) => ({
        path: x.path,
        url: typeof x?.url === "string" ? x.url.trim() : "",
      }));
  } catch {
    return t.startsWith("/") ? [{ path: t, url: "" }] : [];
  }
}

export function AboutHero() {
  const badge = useContent("about", "hero", "badge");
  const title = useContent("about", "hero", "title");
  const description = useContent("about", "hero", "description");
  const ctaPrimary = useContent("about", "hero", "cta_primary");
  const ctaPrimaryUrl = useContent("about", "hero", "cta_primary_url");
  const ctaSecondary = useContent("about", "hero", "cta_secondary");
  const ctaSecondaryUrl = useContent("about", "hero", "cta_secondary_url");
  const imageRaw = useContent("about", "hero", "image");
  const brandLogosRaw = useContent("about", "hero", "brand_logos");
  const apiBase = getApiBase();
  const heroImages = parseHeroImages(imageRaw);
  const brandLogos = parseHeroImages(brandLogosRaw);

  const renderLinkedImage = (
    item: HeroImageItem,
    className: string,
    key?: React.Key
  ) => {
    const img = (
      <img
        src={`${apiBase}${item.path}`}
        alt=""
        className={className}
      />
    );
    if (!item.url) return <React.Fragment key={key}>{img}</React.Fragment>;
    return (
      <a
        key={key}
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full h-full hover:opacity-95 transition-opacity"
      >
        {img}
      </a>
    );
  };

  return (
      <section className="w-full bg-white py-12 md:py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[100px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <FadeInUpInView>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <p className="text-[#313b2e] text-sm md:text-[14px] font-normal">
                {badge}
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-[72px] font-semibold text-black leading-none whitespace-pre-wrap">
                {title}
              </h1>
            </div>

            <p className="text-base md:text-lg text-black/40 max-w-[560px] leading-relaxed">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <ContentLink to={ctaPrimaryUrl} className="h-12 px-6 py-3 rounded-full border border-[#dcdcdc] flex items-center justify-center hover:bg-black/5 transition-colors">
                <span className="text-lg font-semibold text-black">{ctaPrimary}</span>
              </ContentLink>
              <ContentLink to={ctaSecondaryUrl} className="bg-[#313b2e] h-12 px-6 py-3 rounded-full flex items-center justify-center hover:bg-[#3d4937] transition-colors">
                <span className="text-lg font-semibold text-white">{ctaSecondary}</span>
              </ContentLink>
            </div>

            {brandLogos.length > 0 && (
              <div className="flex flex-wrap gap-x-6 gap-y-4 items-center">
                {brandLogos.map((logo, i) => {
                  const img = (
                    <img
                      src={`${apiBase}${logo.path}`}
                      alt=""
                      className="max-h-[36px] w-auto object-contain"
                    />
                  );
                  if (!logo.url) return <span key={i}>{img}</span>;
                  return (
                    <a
                      key={i}
                      href={logo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex hover:opacity-80 transition-opacity"
                    >
                      {img}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
          </FadeInUpInView>

          <FadeInUpInView delay={0.1}>
          <div className="bg-[#f1f1f1] rounded-[20px] md:rounded-[32px] h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
            {heroImages.length === 0 ? null : heroImages.length === 1 ? (
              renderLinkedImage(heroImages[0], "w-full h-full object-cover")
            ) : (
              <div className="flex h-full gap-2 p-2 overflow-x-auto scrollbar-hide">
                {heroImages.map((item, i) => (
                  <div
                    key={i}
                    className="h-full min-w-[70%] sm:min-w-[55%] flex-1 rounded-[16px] md:rounded-[24px] overflow-hidden"
                  >
                    {renderLinkedImage(item, "w-full h-full object-cover", i)}
                  </div>
                ))}
              </div>
            )}
          </div>
          </FadeInUpInView>
        </div>
      </div>
      </section>
  );
}
