import React from "react";
import { ContentLink } from "../common/ContentLink";
import { useContent } from "../../content/useContent";

export function CartHeader() {
  const backLink = useContent("cart", "header", "back_link");
  const backLinkUrl = useContent("cart", "header", "back_link_url");
  const title = useContent("cart", "header", "title");
  return (
    <div className="mb-8 md:mb-12">
      <ContentLink to={backLinkUrl} className="text-sm font-medium text-[#667085] hover:text-[#313b2e] transition-colors inline-flex items-center gap-2 mb-4">
        <svg className="w-6 h-6 shrink-0 align-middle" fill="none" viewBox="0 0 16 16">
          <path d="M10 4L6 8L10 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {backLink}
      </ContentLink>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-black">
        {title}
      </h1>
    </div>
  );
}
