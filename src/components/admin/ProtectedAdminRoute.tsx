// src/components/ProtectedAdminRoute.tsx
// import React from "react";
import { Navigate } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";

export default function ProtectedAdminRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAdmin();
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return children;
}
