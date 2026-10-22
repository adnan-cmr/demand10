"use client";

import Link from "next/link";
import { 
  Mail, 
  Globe, 
  Linkedin, 
  Twitter, 
  Github,
  ArrowRight
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B1533] text-slate-300">
      {/* ── TOP SECTION ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-extrabold text-white tracking-tight">
                Rank<span className="text-[#E11D2E]">B2B</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              The most accurate database of Managed Service Providers, MSSPs, and technology vendors. 
              Find your next B2B partner faster.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-[#E11D2E] hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-[#E11D2E] hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-[#E11D2E] hover:text-white transition-colors" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h3 className="text-white font-semibold mb-6 tracking-wide uppercase text-sm">Platform</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/data" className="hover:text-[#E11D2E] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E]/50"></span> Browse Data
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-[#E11D2E] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E]/50"></span> Top 10 Lists
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-[#E11D2E] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E]/50"></span> Create Account
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-[#E11D2E] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E]/50"></span> Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h3 className="text-white font-semibold mb-6 tracking-wide uppercase text-sm">Company</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/privacy-policy" className="hover:text-[#E11D2E] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E]/50"></span> Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/term-policies" className="hover:text-[#E11D2E] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E]/50"></span> Terms of Service
                </Link>
              </li>
              <li>
                <a href="mailto:support@rankb2b.com" className="hover:text-[#E11D2E] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E]/50"></span> Contact Support
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="text-white font-semibold mb-6 tracking-wide uppercase text-sm">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Get the latest data updates and new top 10 lists delivered to your inbox.
            </p>
            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#E11D2E] focus:ring-1 focus:ring-[#E11D2E] transition-all"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-[#E11D2E] hover:bg-[#B91C1C] text-white text-sm font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                Subscribe <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} RankB2B. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Globe className="h-4 w-4" />
            <span>English (US)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}