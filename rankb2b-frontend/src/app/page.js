import Link from "next/link";
import { fetchTopLists } from "@/services/publicDataApi";
import { 
  Search, 
  Database, 
  ShieldCheck, 
  TrendingUp, 
  Building2, 
  MapPin, 
  Users, 
  ArrowRight,
  CheckCircle2,
  BarChart3
} from "lucide-react";

export default async function Home() {
  const res = await fetchTopLists();
  const lists = (res?.lists || []).slice(0, 6);

  return (
    <main className="bg-white">
      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f8f9fa] to-white pt-20 pb-24 lg:pt-32 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-[#E11D2E] text-sm font-semibold mb-6 border border-red-100">
              <span className="flex h-2 w-2 rounded-full bg-[#E11D2E]"></span>
              Over 1 Million Verified Companies
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#0F1B3D] tracking-tight leading-[1.1]">
              Find your next <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E11D2E] to-[#B91C1C]">B2B Partner</span> faster
            </h1>
            
            <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              The most accurate database of Managed Service Providers, MSSPs, and technology vendors. 
              Search by industry, location, and company size to close deals faster.
            </p>

            {/* Search Bar */}
            <div className="mt-10 max-w-3xl mx-auto">
              <form action="/data" method="GET" className="flex flex-col sm:flex-row gap-3 p-2 bg-white rounded-2xl shadow-xl border border-gray-100">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="q"
                    placeholder="Search by company name, domain, or keyword..."
                    className="block w-full pl-11 pr-4 py-3 text-gray-900 rounded-xl border-none focus:ring-2 focus:ring-[#E11D2E] bg-transparent outline-none"
                  />
                </div>
                <button type="submit" className="bg-[#E11D2E] hover:bg-[#B91C1C] text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md">
                  Search Data
                </button>
              </form>
              <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-gray-500">
                <span className="font-medium">Popular:</span>
                <Link href="/data?q=Software" className="hover:text-[#E11D2E] underline decoration-gray-300 underline-offset-4">Software</Link>
                <Link href="/data?q=Healthcare" className="hover:text-[#E11D2E] underline decoration-gray-300 underline-offset-4">Healthcare</Link>
                <Link href="/data?q=Cloud" className="hover:text-[#E11D2E] underline decoration-gray-300 underline-offset-4">Cloud Services</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST / STATS BAR ── */}
      <section className="border-y border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
            <div>
              <p className="text-3xl font-extrabold text-[#0F1B3D]">1M+</p>
              <p className="text-sm font-medium text-gray-500 mt-1">Verified Companies</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-[#0F1B3D]">500+</p>
              <p className="text-sm font-medium text-gray-500 mt-1">Industries</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-[#0F1B3D]">95%</p>
              <p className="text-sm font-medium text-gray-500 mt-1">Data Accuracy</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-[#0F1B3D]">10k+</p>
              <p className="text-sm font-medium text-gray-500 mt-1">Active Users</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F1B3D]">Everything you need to scale</h2>
            <p className="mt-4 text-lg text-gray-600">Stop guessing. Use hard data to find your next customers, partners, or acquisition targets.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-6">
                <Database className="h-6 w-6 text-[#E11D2E]" />
              </div>
              <h3 className="text-xl font-bold text-[#0F1B3D] mb-3">Deep Company Profiles</h3>
              <p className="text-gray-600 leading-relaxed">Access detailed intelligence including employee counts, technologies used, SIC/NAICS codes, and direct social links.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-[#0F1B3D] mb-3">Curated Top 10 Lists</h3>
              <p className="text-gray-600 leading-relaxed">Instantly discover the industry leaders. We rank the top companies across hundreds of categories and locations.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-6">
                <Search className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-[#0F1B3D] mb-3">Advanced Filtering</h3>
              <p className="text-gray-600 leading-relaxed">Filter our database by location, company size, founding year, and industry to find the exact prospects you need.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED TOP 10 LISTS ── */}
      {lists.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#0F1B3D]">Featured Rankings</h2>
                <p className="mt-4 text-lg text-gray-600">Explore the leaders in specific niches and industries.</p>
              </div>
              <Link href="/categories" className="inline-flex items-center text-[#E11D2E] font-semibold hover:underline">
                View all categories <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {lists.map((l) => (
                <Link 
                  key={l._id} 
                  href={`/categories/${l.slug}`} 
                  className="group block bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#E11D2E] hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-50 text-[#E11D2E] font-bold text-sm">
                      {l.count}
                    </span>
                    <BarChart3 className="h-5 w-5 text-gray-300 group-hover:text-[#E11D2E] transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0F1B3D] group-hover:text-[#E11D2E] transition-colors line-clamp-2">
                    {l.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-3 line-clamp-2">
                    {l.preview.map((p) => p.name).join(" · ")}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 bg-[#0F1B3D] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">How RankB2B Works</h2>
            <p className="mt-4 text-lg text-gray-300">Three simple steps to find your next business opportunity.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-white/10 z-0"></div>

            <div className="relative z-10 text-center">
              <div className="w-24 h-24 mx-auto bg-[#1d2f63] rounded-full border-4 border-[#0F1B3D] shadow-[0_0_0_4px_rgba(255,255,255,0.1)] flex items-center justify-center mb-6">
                <Search className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">1. Search</h3>
              <p className="text-gray-400">Use our advanced filters to narrow down companies by industry, size, and location.</p>
            </div>

            <div className="relative z-10 text-center">
              <div className="w-24 h-24 mx-auto bg-[#1d2f63] rounded-full border-4 border-[#0F1B3D] shadow-[0_0_0_4px_rgba(255,255,255,0.1)] flex items-center justify-center mb-6">
                <Building2 className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">2. Discover</h3>
              <p className="text-gray-400">Dive into company profiles to view their technology stack, revenue estimates, and key contacts.</p>
            </div>

            <div className="relative z-10 text-center">
              <div className="w-24 h-24 mx-auto bg-[#1f3b7a] rounded-full border-4 border-[#0F1B3D] shadow-[0_0_0_4px_rgba(255,255,255,0.1)] flex items-center justify-center mb-6">
                <CheckCircle2 className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">3. Connect</h3>
              <p className="text-gray-400">Get direct links to decision-makers and websites to start your outreach immediately.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#E11D2E] via-[#B91C1C] to-[#0F1B3D] rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to find your next customer?</h2>
              <p className="text-lg text-red-100 max-w-2xl mx-auto mb-8">
                Join thousands of businesses using RankB2B to discover verified companies, build targeted lead lists, and close more deals.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/data" className="bg-white text-[#0F1B3D] px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-colors shadow-lg">
                  Start Browsing for Free
                </Link>
                <Link href="/register" className="bg-black/20 border border-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold hover:bg-black/40 transition-colors">
                  Create an Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST FEATURES ── */}
      <section className="py-12 border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60">
            <div className="flex items-center gap-2 font-semibold text-gray-700">
              <ShieldCheck className="h-5 w-5" /> GDPR Compliant
            </div>
            <div className="flex items-center gap-2 font-semibold text-gray-700">
              <Users className="h-5 w-5" /> Trusted by 10,000+ B2B teams
            </div>
            <div className="flex items-center gap-2 font-semibold text-gray-700">
              <MapPin className="h-5 w-5" /> Data from 150+ Countries
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}