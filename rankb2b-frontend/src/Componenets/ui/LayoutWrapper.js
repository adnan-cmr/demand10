"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/Componenets/ui/Navbar";
import Footer from "@/Componenets/ui/Footer";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const hideLayout =
    pathname.startsWith("/admin/dashboard") || pathname === "/login" || pathname === "/register";

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}
