"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Menu, X, User } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { checkUserAuth, userLogout } from "@/services/userApi";
import { fetchTopLists, TOP_LISTS_CHANGED } from "@/services/publicDataApi";

const AuthForm = dynamic(() => import("@/Componenets/ui/AuthForm"), { ssr: false });

const NAV = [
  { href: "/", label: "Home" },
  { href: "/data", label: "Data" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [user, setUser] = useState(null);
  const [lists, setLists] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileCats, setMobileCats] = useState(false);

  useEffect(() => {
    const load = () => fetchTopLists().then((res) => res?.ok && setLists(res.lists || []));
    load();
    window.addEventListener(TOP_LISTS_CHANGED, load);
    return () => window.removeEventListener(TOP_LISTS_CHANGED, load);
  }, []);

  useEffect(() => {
    const check = () =>
      checkUserAuth()
        .then((data) => {
          if (data?.ok) setUser(data.user);
          else if (data?.unauthenticated) setUser(null);
        })
        .catch(() => {});
    check();
    window.addEventListener("auth:changed", check);
    return () => window.removeEventListener("auth:changed", check);
  }, []);

  const isAdmin = ["admin", "superadmin"].includes(user?.role);

  const signOut = async () => {
    try {
      await userLogout();
    } finally {
      setUser(null);
      window.location.href = "/";
    }
  };

  const link = "text-lg font-semibold text-black hover:text-[#E11D2E] transition-colors duration-300 px-3 py-2";

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
          <Link href="/" className="flex-shrink-0">
            <Image src="/images/logo.png" width={140} height={60} alt="Logo" className="w-40 h-auto object-contain" />
          </Link>

          <nav className="hidden lg:flex items-center space-x-4">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className={link}>{n.label}</Link>
            ))}
            <div
              className="relative"
              onMouseEnter={() => setMenuOpen(true)}
              onMouseLeave={() => setMenuOpen(false)}
              onKeyDown={(e) => e.key === "Escape" && setMenuOpen(false)}
            >
              <Link
                href="/categories"
                className={`${link} inline-flex items-center gap-1 border-b-2 ${menuOpen ? "border-[#E11D2E]" : "border-transparent"}`}
                aria-haspopup="true"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(false)}
              >
                Categories <ChevronDown className={`h-4 w-4 transition-transform ${menuOpen ? "rotate-180" : ""}`} />
              </Link>
              {menuOpen && (
                <div className="fixed left-0 right-0 top-20 z-50 pt-0">
                  <div className="max-w-6xl mx-auto bg-white rounded-b-2xl shadow-2xl border border-gray-100 p-8 max-h-[70vh] overflow-y-auto">
                    <div className="grid grid-cols-3 gap-x-10 gap-y-6">
                      {[0, 1, 2].map((col) => (
                        <div key={col}>
                          <p className="text-xs font-bold tracking-[0.2em] text-slate-500 border-b border-indigo-100 pb-2 mb-5">
                            {col === 0 ? "TOP 10 CATEGORIES" : "\u00A0"}
                          </p>
                          <ul className="space-y-5">
                            {lists.filter((_, i) => i % 3 === col).map((l) => (
                              <li key={l._id}>
                                <Link href={`/categories/${l.slug}`} onClick={() => setMenuOpen(false)} className="group block">
                                  <span className="block text-base text-slate-800 group-hover:text-[#E11D2E]">{l.title}</span>
                                  <span className="block text-xs text-slate-500 line-clamp-1">
                                    {l.description || `Top ${l.count} companies`}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    {!lists.length && <p className="text-sm text-gray-500">No categories yet.</p>}
                    <div className="mt-6 -mx-8 -mb-8 px-8 py-4 bg-slate-50 rounded-b-2xl">
                      <Link href="/categories" onClick={() => setMenuOpen(false)} className="text-sm font-semibold text-[#0F1B3D] hover:text-[#E11D2E]">
                        View all categories →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>            {isAdmin && <Link href="/admin/dashboard" className={link}>Dashboard</Link>}
            {user ? (
              <button onClick={signOut} className="flex items-center gap-2 bg-gray-100 px-5 py-2 rounded-full font-semibold">
                <User className="h-5 w-5" /> Sign out
              </button>
            ) : (
              <button
                className="bg-gradient-to-br from-[#E11D2E] via-[#B91C1C] to-[#0F1B3D] text-white px-7 py-2.5 rounded-full font-semibold"
                onClick={() => setShowAuthForm(true)}
              >
                Sign In
              </button>
            )}
          </nav>

          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-gray-600" aria-label="Menu">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden border-t bg-white px-4 py-3 flex flex-col">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-3 text-lg font-medium text-gray-800">
                {n.label}
              </Link>
            ))}
            <button onClick={() => setMobileCats(!mobileCats)} className="py-3 text-left text-lg font-medium text-gray-800 flex items-center gap-1">
              Categories <ChevronDown className={`h-4 w-4 transition-transform ${mobileCats ? "rotate-180" : ""}`} />
            </button>
            {mobileCats && (
              <div className="pl-4 flex flex-col">
                {lists.map((l) => (
                  <Link key={l._id} href={`/categories/${l.slug}`} onClick={() => setOpen(false)} className="py-2 text-gray-700">
                    {l.title}
                  </Link>
                ))}
                <Link href="/categories" onClick={() => setOpen(false)} className="py-2 font-semibold text-[#E11D2E]">View all →</Link>
              </div>
            )}
            {isAdmin && (
              <Link href="/admin/dashboard" onClick={() => setOpen(false)} className="py-3 text-lg font-medium text-gray-800">
                Dashboard
              </Link>
            )}
            {user ? (
              <button onClick={signOut} className="py-3 text-left text-lg font-medium text-gray-800">Sign out</button>
            ) : (
              <button
                onClick={() => { setOpen(false); setShowAuthForm(true); }}
                className="py-3 text-left text-lg font-medium text-[#E11D2E]"
              >
                Sign In
              </button>
            )}
          </div>
        )}
      </header>

      {showAuthForm && (
        <AuthForm
          onClose={() => setShowAuthForm(false)}
          onAuthSuccess={(u) => {
            setUser(u);
            setShowAuthForm(false);
          }}
        />
      )}
    </>
  );
};

export default Navbar;
