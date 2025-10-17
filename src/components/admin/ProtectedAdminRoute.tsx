// src/components/ProtectedAdminRoute.tsx
// import React from "react";
import { Navigate } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";
import type { ReactNode } from "react";


export default function ProtectedAdminRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAdmin();
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return children;
}
