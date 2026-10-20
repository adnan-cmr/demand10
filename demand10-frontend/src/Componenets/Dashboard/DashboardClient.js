"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkUserAuth } from "@/services/userApi";
import Sidebar from "@/Componenets/Dashboard/Sidebar";
import Header from "@/Componenets/Dashboard/Header";
import AddUser from "@/Componenets/Dashboard/AddUser";
import AllUsers from "@/Componenets/Dashboard/Users";
import WebsiteUsers from "@/Componenets/Dashboard/WebsiteUsers";
import DataImport from "@/Componenets/Dashboard/DataImport";
import TopLists from "@/Componenets/Dashboard/TopLists";

const TAB_COMPONENTS = {
  DataImport,
  TopLists,
  AddUser,
  Users: AllUsers,
  WebsiteUsers,
};

const isAdmin = (user) => ["admin", "superadmin"].includes(user?.role);

// `verified` is true when the server already validated the session (see page.js);
// otherwise (e.g. access token expired, API hiccup) the session is checked here.
export default function DashboardClient({ verified = false }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("DataImport");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [state, setState] = useState(verified ? "ok" : "checking");

  const verify = useCallback(async () => {
    setState("checking");
    const result = await checkUserAuth();
    if (result.ok) {
      if (isAdmin(result.user)) return setState("ok");
      return router.replace("/login");
    }
    // only a real 401/403 means signed out; a 5xx must not bounce an admin to /login
    if (result.unauthenticated) return router.replace("/login");
    setState("error");
  }, [router]);

  useEffect(() => {
    if (!verified) verify();
  }, [verified, verify]);

  const ActiveTab = TAB_COMPONENTS[activeTab] || DataImport;

  if (state === "error") {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-3">
        <p className="text-gray-700">The server is not responding. Your session is still valid.</p>
        <button onClick={verify} className="bg-[#E11D2E] text-white px-4 py-2 rounded-lg font-semibold">
          Retry
        </button>
      </div>
    );
  }

  if (state !== "ok") {
    return <div className="min-h-screen bg-gray-100" />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {mobileOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setMobileOpen(false)} />}

      <div
        className={`fixed lg:static inset-y-0 left-0 z-40 transform transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <Sidebar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setMobileOpen(false);
          }}
          sidebarOpen={sidebarOpen}
          toggleSidebar={() => {
            if (typeof window !== "undefined" && window.innerWidth < 1024) setMobileOpen(false);
            else setSidebarOpen(!sidebarOpen);
          }}
        />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Header toggleSidebar={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto p-2 sm:p-4 bg-gray-100">
          <ActiveTab />
        </main>
      </div>
    </div>
  );
}
