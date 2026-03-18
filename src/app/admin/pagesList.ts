/**
 * List of editable content pages for the backoffice.
 * Used by AdminSidebar (submenu) and PagesList.
 */
export const ADMIN_PAGES = [
  { slug: "home", name: "Home" },
  { slug: "about", name: "Sobre Nós" },
  { slug: "products", name: "Produtos" },
  { slug: "category", name: "Categoria" },
  { slug: "product-detail", name: "Detalhe Produto" },
  { slug: "cart", name: "Carrinho" },
  { slug: "contact", name: "Contactos" },
  { slug: "login", name: "Login" },
  { slug: "register", name: "Registo" },
  { slug: "recover-password", name: "Recuperar Password" },
] as const;
