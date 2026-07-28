import React from "react";
import { Outlet } from "react-router";
import { AdminSidebar } from "./components/AdminSidebar";
import {
  AdminEntryNotification,
  AdminNotificationBell,
  AdminNotificationsProvider,
} from "./components/AdminNotifications";
import { ToastProvider } from "./components/Toast";

export default function AdminLayout() {
  return (
    <ToastProvider>
      <AdminNotificationsProvider>
        <div className="min-h-screen bg-[#fafaf9]">
          <AdminSidebar />
          <main className="lg:pl-[260px] min-h-screen transition-all">
            <div className="sticky top-0 z-30 bg-[#fafaf9]/90 backdrop-blur-md border-b border-[#e5e5e3]/80">
              <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-10 h-14 flex items-center justify-end gap-3">
                <AdminNotificationBell />
              </div>
            </div>
            <div className="max-w-[1200px] mx-auto px-4 py-6 md:px-8 md:py-8 lg:px-10 lg:py-10">
              <Outlet />
            </div>
          </main>
          <AdminEntryNotification />
        </div>
      </AdminNotificationsProvider>
    </ToastProvider>
  );
}
