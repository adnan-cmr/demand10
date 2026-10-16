"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkCurrentUser } from "@/services/adminApi";
import Sidebar from "@/Componenets/Dashboard/Sidebar";
import Header from "@/Componenets/Dashboard/Header";
import AllBlogs from "@/Componenets/Dashboard/AllBlogs";
import AddBlogs from "@/Componenets/Dashboard/AddBlogs"; // Fixed import name
import DataRequest from "@/Componenets/Dashboard/DataRequest";
import AddUser from "@/Componenets/Dashboard/AddUser";
import AllUsers from "@/Componenets/Dashboard/Users"; // Fixed import path
import Categories from "@/Componenets/Dashboard/Categories";
import SubCategorySheet from "@/Componenets/Dashboard/Sheet";
import AllCompanies from "@/Componenets/Dashboard/AllCompanies";
import CompanyClaims from "@/Componenets/Dashboard/CompanyClaims";
import CompanyListings from "@/Componenets/Dashboard/CompanyListings";
import Reviews from "@/Componenets/Dashboard/Reviews";
import SubcategoryManagement from "@/Componenets/Dashboard/SubcategoryManagement"; // Updated import
import SubcategoryDetails from "@/Componenets/Dashboard/SubcategoryDetails"; // New import
import WebsiteUsers from "@/Componenets/Dashboard/WebsiteUsers"; // New import
import Badges from "@/Componenets/Dashboard/Badges"; // New import
import SubcategoryContent from "@/Componenets/Dashboard/SubcategoryContent";
import SubcategoryFAQs from "@/Componenets/Dashboard/SubcategoryFAQs"; // New import

export default function Dashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("blog");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    let mounted = true;
    checkCurrentUser().then((result) => {
      if (!mounted) return;
      if (!result.ok || !['admin', 'superadmin'].includes(result.user?.role)) {
        router.replace('/login');
        return;
      }
      setAuthorized(true);
    }).catch(() => router.replace('/login'));
    return () => {
      mounted = false;
    };
  }, [router]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNavigate = (tab) => {
    setActiveTab(tab);
    setMobileOpen(false);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "blog":
        return <AllBlogs />;
      case "Addblog":
        return <AddBlogs />; // Fixed component name
      case "DataRequest":
        return <DataRequest />;
      case "AddUser":
        return <AddUser />;
      case "Users":
        return <AllUsers />;
      case "WebsiteUsers": // New case
        return <WebsiteUsers />;
      case "Categories":
        return <Categories />;
      case "SubCategory":
        return <SubCategorySheet />;
      case "SubcategoryManagement": // New case
        return <SubcategoryManagement />;
      case "SubcategoryDetails": // New case
        return <SubcategoryDetails />;
        case "SubcategoryContent": // New case
        return <SubcategoryContent />;
      case "SubcategoryFAQs": // New case
        return <SubcategoryFAQs />;
      case "allCompanies":
        return <AllCompanies />;
      case "CompanyClaims":
        return <CompanyClaims />;
      case "CompanyListings":
        return <CompanyListings />;
      case "Reviews":
        return <Reviews />;
      case "Badges": // New case
        return <Badges />;
      default:
        return <AllBlogs />;
    }
  };

  if (!authorized) {
    return <div className="min-h-screen bg-gray-100" />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile/tablet backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar: off-canvas drawer on mobile & tablet, static on desktop */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-40 transform transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <Sidebar
          activeTab={activeTab}
          setActiveTab={handleNavigate}
          sidebarOpen={sidebarOpen}
          toggleSidebar={() => {
            if (typeof window !== "undefined" && window.innerWidth < 1024) {
              setMobileOpen(false);
            } else {
              toggleSidebar();
            }
          }}
        />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Header toggleSidebar={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto p-2 sm:p-4 bg-gray-100">
          {renderActiveTab()}
        </main>
      </div>
    </div>
  );
}