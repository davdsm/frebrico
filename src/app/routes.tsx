import React from "react";
import { createBrowserRouter, Link, Navigate } from "react-router";
import Layout from "./Layout";
import AdminLayout from "./admin/AdminLayout";
import { AdminGuard } from "./admin/AdminGuard";
import { PageLoader } from "./components/atoms/PageLoader";

const Home = React.lazy(() => import("./pages/Home"));
const About = React.lazy(() => import("./pages/About"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Products = React.lazy(() => import("./pages/Products"));
const Category = React.lazy(() => import("./pages/Category"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));
const Cart = React.lazy(() => import("./pages/Cart"));
const Login = React.lazy(() => import("./pages/Login"));
const RecoverPassword = React.lazy(() => import("./pages/RecoverPassword"));
const Terms = React.lazy(() => import("./pages/Terms"));
const Privacy = React.lazy(() => import("./pages/Privacy"));

const AdminDashboard = React.lazy(() => import("./admin/pages/Dashboard"));
const AdminCreateAdminPage = React.lazy(() => import("./admin/pages/CreateAdminPage"));
const AdminPagesList = React.lazy(() => import("./admin/pages/PagesList"));
const AdminPageEditor = React.lazy(() => import("./admin/pages/PageEditor"));
const AdminMediaLibrary = React.lazy(() => import("./admin/pages/MediaLibrary"));
const AdminConfiguration = React.lazy(() => import("./admin/pages/Configuration"));
const AdminCategoriesList = React.lazy(() => import("./admin/pages/CategoriesList"));
const AdminCategoryEditor = React.lazy(() => import("./admin/pages/CategoryEditor"));
const AdminProductsList = React.lazy(() => import("./admin/pages/ProductsList"));
const AdminProductEditor = React.lazy(() => import("./admin/pages/ProductEditor"));
const AdminAttributesList = React.lazy(() => import("./admin/pages/AttributesList"));
const AdminAttributeEditor = React.lazy(() => import("./admin/pages/AttributeEditor"));

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
      { path: "register", element: <SuspenseWrap><AdminCreateAdminPage /></SuspenseWrap> },
    ],
  },
  {
    path: "/register",
    element: <Navigate to="/admin/register" replace />,
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
        path: "category/:slug",
        element: (
          <React.Suspense fallback={<PageLoader />}>
            <Category />
          </React.Suspense>
        ),
      },
      {
        path: "product/:id",
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