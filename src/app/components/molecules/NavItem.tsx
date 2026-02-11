import React from 'react';
import { Icon } from '../atoms/Icon';

interface NavItemProps {
  label: string;
  isActive?: boolean;
  hasDropdown?: boolean;
  isExpanded?: boolean;
  onClick?: () => void;
}

const navItemClassName = (isActive: boolean) =>
  `flex items-center gap-2 py-2 rounded-[30px] text-lg px-5 ${isActive ? "bg-[#313b2e] text-white" : "text-black/60 hover:text-black"} transition-colors`;

export function NavItem({ label, isActive = false, hasDropdown = false, isExpanded = false, onClick }: NavItemProps) {
  const content = (
    <>
      <span>{label}</span>
      {hasDropdown && (
        <Icon
          name="chevron-down"
          className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""} ${isActive ? "text-white" : "text-black/60"}`}
        />
      )}
    </>
  );

  if (hasDropdown) {
    return <span className={navItemClassName(isActive)}>{content}</span>;
  }

  return (
    <button onClick={onClick} className={navItemClassName(isActive)}>
      {content}
    </button>
  );
}
