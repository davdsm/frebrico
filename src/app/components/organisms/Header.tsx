import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import { NavItem } from "../molecules/NavItem";
import { Button } from "../atoms/Button";
import { Logo } from "../atoms/Logo";
import { ProductsSubmenu } from "./ProductsSubmenu";

export function Header() {
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  return (
    <header className="w-full max-w-[1200px] mx-auto py-4 relative">
      <div className="flex items-center justify-between">
        {/* Navigation - Hidden on mobile */}
        <nav className="hidden lg:flex items-center gap-6 group/nav">
          <NavLink
            to="/"
            end
            className="transition-opacity duration-200 group-hover/nav:opacity-20 hover:opacity-100"
          >
            {({ isActive }) => <NavItem label="Início" isActive={isActive} />}
          </NavLink>
          <NavLink
            to="/about"
            className="transition-opacity duration-200 group-hover/nav:opacity-20 hover:opacity-100"
          >
            {({ isActive }) => <NavItem label="Sobre Nós" isActive={isActive} />}
          </NavLink>
          <div
            className="relative"
            onMouseEnter={() => setIsProductsOpen(true)}
            onMouseLeave={() => setIsProductsOpen(false)}
          >
            <NavLink
              to="/products"
              onClick={() => setIsProductsOpen(false)}
              className="transition-opacity duration-200 group-hover/nav:opacity-20 hover:opacity-100"
            >
              {({ isActive }) => (
                <NavItem label="Produtos" isActive={isActive} hasDropdown isExpanded={isProductsOpen} />
              )}
            </NavLink>
            <ProductsSubmenu
              isOpen={isProductsOpen}
              onMouseEnter={() => setIsProductsOpen(true)}
              onMouseLeave={() => setIsProductsOpen(false)}
              onClose={() => setIsProductsOpen(false)}
            />
          </div>
        </nav>

        {/* Mobile menu button */}
        <button className="lg:hidden p-2" aria-label="Menu">
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Logo - centered on desktop, left on mobile */}
        <div className="lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
          <Link to="/">
            <Logo />
          </Link>
        </div>

        {/* Cart and Contact */}
        <div className="flex items-center gap-3 lg:gap-6">
          {/* Cart icon with badge */}
          <Link to="/cart" className="relative">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                d="M15.75 10.5V6C15.75 5.00544 15.3549 4.05161 14.6517 3.34835C13.9484 2.64509 12.9946 2.25 12 2.25C11.0054 2.25 10.0516 2.64509 9.34835 3.34835C8.64509 4.05161 8.25 5.00544 8.25 6V10.5M19.606 8.507L20.869 20.507C20.939 21.172 20.419 21.75 19.75 21.75H4.25C4.09221 21.7502 3.93614 21.7171 3.79195 21.6531C3.64775 21.589 3.51865 21.4953 3.41302 21.3781C3.3074 21.2608 3.22761 21.1227 3.17885 20.9726C3.13009 20.8226 3.11345 20.6639 3.13 20.507L4.394 8.507C4.42316 8.23056 4.55363 7.9747 4.76025 7.78876C4.96688 7.60281 5.23503 7.49995 5.513 7.5H18.487C19.063 7.5 19.546 7.935 19.606 8.507Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
            <div className="absolute -top-1 -right-1 bg-[#313b2e] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              3
            </div>
          </Link>
          <Link to="/contact" className="hidden sm:flex">
            <Button variant="primary">Contactos</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}