import React from 'react';
import { Icon } from '../atoms/Icon';

interface NavItemProps {
  label: string;
  isActive?: boolean;
  hasDropdown?: boolean;
  isExpanded?: boolean;
  compact?: boolean;
  onClick?: () => void;
}

const navItemClassName = (isActive: boolean, compact: boolean) =>
  [
    "flex items-center gap-2 rounded-[30px] transition-all duration-500",
    compact ? "py-1.5 px-4 text-sm" : "py-2 px-5 text-md",
    isActive ? "bg-[#313b2e] text-white" : "text-black",
  ].join(" ");

export function NavItem({
  label,
  isActive = false,
  hasDropdown = false,
  isExpanded = false,
  compact = false,
  onClick,
}: NavItemProps) {
  const content = (
    <>
      <span>{label}</span>
      {hasDropdown && (
        <Icon
          name="chevron-down"
          className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""} ${isActive ? "text-white" : "text-black"}`}
        />
      )}
    </>
  );

  if (hasDropdown) {
    return <span className={navItemClassName(isActive, compact)}>{content}</span>;
  }

  return (
    <button onClick={onClick} className={navItemClassName(isActive, compact)}>
      {content}
    </button>
  );
}
