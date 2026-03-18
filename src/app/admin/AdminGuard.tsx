import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../auth/AuthContext";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
        <p className="text-[#5a5a59]">A carregar...</p>
      </div>
    );
  }

  if (!user || !user.isAdmin) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
}
