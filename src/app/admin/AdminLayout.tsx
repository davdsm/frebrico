import React from "react";
import { Outlet } from "react-router";
import { AdminSidebar } from "./components/AdminSidebar";
import { ToastProvider } from "./components/Toast";

export default function AdminLayout() {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#fafaf9]">
        <AdminSidebar />
        <main className="lg:pl-[260px] min-h-screen transition-all">
          <div className="max-w-[1200px] mx-auto px-4 py-6 md:px-8 md:py-8 lg:px-10 lg:py-10">
            <Outlet />
          </div>
        </main>
      </div>
    </ToastProvider>
  );
}
