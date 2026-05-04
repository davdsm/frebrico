import React from "react";
import { createBrowserRouter, Link, Navigate } from "react-router";
import Layout from "./Layout";
import AdminLayout from "./admin/AdminLayout";
import { AdminGuard } from "./admin/AdminGuard";
import { PageLoader } from "./components/atoms/PageLoader";

const importHome = () => import("./pages/Home");
const importAbout = () => import("./pages/About");
const importContact = () => import("./pages/Contact");
const importProducts = () => import("./pages/Products");
const importCategory = () => import("./pages/Category");
const importProductDetail = () => import("./pages/ProductDetail");
const importCart = () => import("./pages/Cart");
const importLogin = () => import("./pages/Login");
const importRecoverPassword = () => import("./pages/RecoverPassword");
const importTerms = () => import("./pages/Terms");
const importPrivacy = () => import("./pages/Privacy");
const importSearch = () => import("./pages/Search");
const importAccountRegister = () => import("./pages/AccountRegister");
const importAccountDashboard = () => import("./pages/AccountDashboard");
const importOrderSuccess = () => import("./pages/OrderSuccess");
const importAccountOrderDetail = () => import("./pages/AccountOrderDetail");

const importAdminDashboard = () => import("./admin/pages/Dashboard");
const importAdminCreateAdminPage = () => import("./admin/pages/CreateAdminPage");
const importAdminPagesList = () => import("./admin/pages/PagesList");
const importAdminPageEditor = () => import("./admin/pages/PageEditor");
const importAdminMediaLibrary = () => import("./admin/pages/MediaLibrary");
const importAdminConfiguration = () => import("./admin/pages/Configuration");
const importAdminCategoriesList = () => import("./admin/pages/CategoriesList");
const importAdminCategoryEditor = () => import("./admin/pages/CategoryEditor");
const importAdminProductsList = () => import("./admin/pages/ProductsList");
const importAdminProductEditor = () => import("./admin/pages/ProductEditor");
const importAdminAttributesList = () => import("./admin/pages/AttributesList");
const importAdminAttributeEditor = () => import("./admin/pages/AttributeEditor");
const importAdminOrdersList = () => import("./admin/pages/OrdersList");
const importAdminOrderDetail = () => import("./admin/pages/OrderDetail");

const Home = React.lazy(importHome);
const About = React.lazy(importAbout);
const Contact = React.lazy(importContact);
const Products = React.lazy(importProducts);
const Category = React.lazy(importCategory);
const ProductDetail = React.lazy(importProductDetail);
const Cart = React.lazy(importCart);
const Login = React.lazy(importLogin);
const RecoverPassword = React.lazy(importRecoverPassword);
const Terms = React.lazy(importTerms);
const Privacy = React.lazy(importPrivacy);
const Search = React.lazy(importSearch);
const AccountRegister = React.lazy(importAccountRegister);
const AccountDashboard = React.lazy(importAccountDashboard);
const OrderSuccess = React.lazy(importOrderSuccess);
const AccountOrderDetail = React.lazy(importAccountOrderDetail);

const AdminDashboard = React.lazy(importAdminDashboard);
const AdminCreateAdminPage = React.lazy(importAdminCreateAdminPage);
const AdminPagesList = React.lazy(importAdminPagesList);
const AdminPageEditor = React.lazy(importAdminPageEditor);
const AdminMediaLibrary = React.lazy(importAdminMediaLibrary);
const AdminConfiguration = React.lazy(importAdminConfiguration);
const AdminCategoriesList = React.lazy(importAdminCategoriesList);
const AdminCategoryEditor = React.lazy(importAdminCategoryEditor);
const AdminProductsList = React.lazy(importAdminProductsList);
const AdminProductEditor = React.lazy(importAdminProductEditor);
const AdminAttributesList = React.lazy(importAdminAttributesList);
const AdminAttributeEditor = React.lazy(importAdminAttributeEditor);
const AdminOrdersList = React.lazy(importAdminOrdersList);
const AdminOrderDetail = React.lazy(importAdminOrderDetail);

export async function preloadRouteChunks(): Promise<void> {
  await Promise.allSettled([
    importHome(),
    importAbout(),
    importContact(),
    importProducts(),
    importCategory(),
    importProductDetail(),
    importCart(),
    importLogin(),
    importRecoverPassword(),
    importTerms(),
    importPrivacy(),
    importSearch(),
    importAccountRegister(),
    importAccountDashboard(),
    importOrderSuccess(),
    importAccountOrderDetail(),
    importAdminDashboard(),
    importAdminCreateAdminPage(),
    importAdminPagesList(),
    importAdminPageEditor(),
    importAdminMediaLibrary(),
    importAdminConfiguration(),
    importAdminCategoriesList(),
    importAdminCategoryEditor(),
    importAdminProductsList(),
    importAdminProductEditor(),
    importAdminAttributesList(),
    importAdminAttributeEditor(),
    importAdminOrdersList(),
    importAdminOrderDetail(),
  ]);
}

const SuspenseWrap = ({ children }: { children: React.ReactNode }) => (
  <React.Suspense fallback={<PageLoader />}>{children}</React.Suspense>
);

function AdminErrorFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafaf9] p-4">
      <div className="text-center max-w-md">
        <p className="text-[#131313] font-medium mb-2">Algo correu mal no backoffice.</p>
        <p className="text-[#5a5a59] text-sm mb-4">Tente recarregar a página ou voltar ao início.</p>
        <Link to="/admin" className="text-[#313b2e] font-medium hover:underline">Voltar ao backoffice</Link>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/admin",
    element: (
      <AdminGuard>
        <AdminLayout />
      </AdminGuard>
    ),
    errorElement: <AdminErrorFallback />,
    children: [
      { index: true, element: <SuspenseWrap><AdminDashboard /></SuspenseWrap> },
      { path: "pages", element: <SuspenseWrap><AdminPagesList /></SuspenseWrap> },
      { path: "pages/:slug", element: <SuspenseWrap><AdminPageEditor /></SuspenseWrap> },
      { path: "global/header", element: <Navigate to="/admin/configuration" replace /> },
      { path: "global/footer", element: <Navigate to="/admin/configuration" replace /> },
      { path: "media", element: <SuspenseWrap><AdminMediaLibrary /></SuspenseWrap> },
      { path: "configuration", element: <SuspenseWrap><AdminConfiguration /></SuspenseWrap> },
      { path: "categories", element: <SuspenseWrap><AdminCategoriesList /></SuspenseWrap> },
      { path: "categories/new", element: <SuspenseWrap><AdminCategoryEditor /></SuspenseWrap> },
      { path: "categories/:id", element: <SuspenseWrap><AdminCategoryEditor /></SuspenseWrap> },
      { path: "products", element: <SuspenseWrap><AdminProductsList /></SuspenseWrap> },
      { path: "products/new", element: <SuspenseWrap><AdminProductEditor /></SuspenseWrap> },
      { path: "products/:id", element: <SuspenseWrap><AdminProductEditor /></SuspenseWrap> },
      { path: "attributes", element: <SuspenseWrap><AdminAttributesList /></SuspenseWrap> },
      { path: "attributes/new", element: <SuspenseWrap><AdminAttributeEditor /></SuspenseWrap> },
      { path: "attributes/:id", element: <SuspenseWrap><AdminAttributeEditor /></SuspenseWrap> },
      { path: "orders", element: <SuspenseWrap><AdminOrdersList /></SuspenseWrap> },
      { path: "orders/:id", element: <SuspenseWrap><AdminOrderDetail /></SuspenseWrap> },
      { path: "register", element: <SuspenseWrap><AdminCreateAdminPage /></SuspenseWrap> },
    ],
  },
  {
    path: "/register",
    element: <Navigate to="/admin/register" replace />,
  },
  {
    path: "/account",
    element: <Navigate to="/account/dashboard" replace />,
  },
  {
    path: "/account/register",
    element: (
      <React.Suspense fallback={<PageLoader />}>
        <AccountRegister />
      </React.Suspense>
    ),
  },
  {
    path: "/account/login",
    element: <Navigate to="/login?mode=customer" replace />,
  },
  {
    path: "/account/dashboard",
    element: (
      <React.Suspense fallback={<PageLoader />}>
        <AccountDashboard />
      </React.Suspense>
    ),
  },
  {
    path: "/account/orders/:id",
    element: (
      <React.Suspense fallback={<PageLoader />}>
        <AccountOrderDetail />
      </React.Suspense>
    ),
  },
  {
    path: "/order/success",
    element: (
      <React.Suspense fallback={<PageLoader />}>
        <OrderSuccess />
      </React.Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <React.Suspense fallback={<PageLoader />}>
        <Login />
      </React.Suspense>
    ),
  },
  {
    path: "/recover-password",
    element: (
      <React.Suspense fallback={<PageLoader />}>
        <RecoverPassword />
      </React.Suspense>
    ),
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <React.Suspense fallback={<PageLoader />}>
            <Home />
          </React.Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <React.Suspense fallback={<PageLoader />}>
            <About />
          </React.Suspense>
        ),
      },
      {
        path: "products",
        element: (
          <React.Suspense fallback={<PageLoader />}>
            <Products />
          </React.Suspense>
        ),
      },
      {
        path: "search",
        element: (
          <React.Suspense fallback={<PageLoader />}>
            <Search />
          </React.Suspense>
        ),
      },
      {
        path: "category/:slug",
        element: (
          <React.Suspense fallback={<PageLoader />}>
            <Category />
          </React.Suspense>
        ),
      },
      {
        path: "product/:idOrSlug",
        element: (
          <React.Suspense fallback={<PageLoader />}>
            <ProductDetail />
          </React.Suspense>
        ),
      },
      {
        path: "cart",
        element: (
          <React.Suspense fallback={<PageLoader />}>
            <Cart />
          </React.Suspense>
        ),
      },
      {
        path: "contact",
        element: (
          <React.Suspense fallback={<PageLoader />}>
            <Contact />
          </React.Suspense>
        ),
      },
      {
        path: "terms",
        element: (
          <React.Suspense fallback={<PageLoader />}>
            <Terms />
          </React.Suspense>
        ),
      },
      {
        path: "privacy",
        element: (
          <React.Suspense fallback={<PageLoader />}>
            <Privacy />
          </React.Suspense>
        ),
      },
    ],
  },
]);