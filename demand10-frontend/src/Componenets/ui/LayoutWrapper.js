// components/LayoutWrapper.tsx or LayoutWrapper.jsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/Componenets/ui/Navbar";
import Footer from "@/Componenets/ui/Footer";

export default function LayoutWrapper({ children, categories }) {

  const pathname = usePathname();

  const hideLayout =
    pathname.startsWith("/admin/dashboard") ||
    pathname.startsWith("/vendor/dashboard") ||
    pathname === "/login" ||
    pathname === "/register";
  return (
    <>
      {!hideLayout && <Navbar categories={categories} />}
      
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}
