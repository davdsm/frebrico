/** Inline SVG shown when a category has no custom `icon_svg` upload. */
export function DefaultCategoryMenuIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`w-5 h-5 shrink-0 text-current opacity-90 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M4 5.5a1.5 1.5 0 011.5-1.5h4A1.5 1.5 0 0111 5.5v4A1.5 1.5 0 019.5 11h-4A1.5 1.5 0 014 9.5v-4zM13 5.5a1.5 1.5 0 011.5-1.5h4A1.5 1.5 0 0120 5.5v4a1.5 1.5 0 01-1.5 1.5h-4A1.5 1.5 0 0113 9.5v-4zM4 14.5a1.5 1.5 0 011.5-1.5h4A1.5 1.5 0 0111 14.5v4A1.5 1.5 0 019.5 20h-4A1.5 1.5 0 014 18.5v-4zM13 14.5a1.5 1.5 0 011.5-1.5h4a1.5 1.5 0 011.5 1.5v4a1.5 1.5 0 01-1.5 1.5h-4A1.5 1.5 0 0113 18.5v-4z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
