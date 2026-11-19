import Link from 'next/link';
import { fetchTopLists } from "@/services/publicDataApi";
import { Search, Database, TrendingUp, Building2, Users, ShieldCheck, Sparkles, ArrowRight, Star } from "lucide-react";
import { StatBlock, SectionHeader } from "@/Componenets/ui/UI";

export default async function Home() {
  const res = await fetchTopLists();
  const lists = (res?.lists || []).slice(0, 6);

  return (
    <main className="bg-white">
      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-b from-[#0F1B3D] via-[#1a2b55] to-[#0F1B3D] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 20%, #E11D2E 0%, transparent 50%)' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-sm font-medium mb-8">
              <Sparkles className="h-4 w-4 text-[#E11D2E]" />
              The most trusted B2B company database
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
              Find your next <span className="text-[#E11D2E]">B2B partner</span> faster
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-blue-100/90 max-w-2xl mx-auto">
              1M+ verified companies. 500+ industries. 10,000+ B2B teams trusting RankB2B every day.
            </p>

            {/* Search */}
            <form action="/data" method="GET" className="mt-10 flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto p-2 bg-white rounded-2xl shadow-2xl">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input name="q" placeholder="Company name, industry, or keyword..."
                  className="w-full pl-12 pr-4 py-3 text-gray-900 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-[#E11D2E]" />
              </div>
              <button className="bg-[#E11D2E] hover:bg-[#B91C1C] text-white px-8 py-3 rounded-xl font-bold transition-colors">
                Search
              </button>
            </form>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {['Software', 'Healthcare', 'Cloud', 'Marketing', 'Manufacturing'].map((tag) => (
                <Link key={tag} href={`/data?q=${tag}`}
                  className="px-3 py-1.5 text-sm bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-colors">
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100">
            <StatBlock value="1M+" label="Verified Companies" />
            <StatBlock value="500+" label="Industries" />
            <StatBlock value="95%" label="Data Accuracy" />
            <StatBlock value="10k+" label="B2B Teams" />
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            title="Find the right company in 3 steps"
            subtitle="From search to signed deal — RankB2B gives you the data to move fast."
          />
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Search, title: 'Search', desc: 'Use advanced filters to narrow down companies by industry, size, and location.' },
              { icon: Building2, title: 'Discover', desc: 'Dive into rich profiles to see their tech stack, revenue, and key contacts.' },
              { icon: ShieldCheck, title: 'Connect', desc: 'Get direct links to decision-makers and start your outreach immediately.' },
            ].map((f, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                    <f.icon className="h-6 w-6 text-[#E11D2E]" />
                  </div>
                  <span className="text-xs font-bold text-gray-400">STEP {i + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-[#0F1B3D] mb-2">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED TOP LISTS ── */}
      {lists.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <SectionHeader
              title="Top 10 industry leaders"
              subtitle="Hand-picked rankings from our editorial team."
              href="/categories"
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {lists.map((l) => (
                <Link key={l._id} href={`/categories/${l.slug}`}
                  className="group flex flex-col bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#E11D2E] hover:shadow-xl transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-red-50 text-[#E11D2E] text-xs font-bold">
                      TOP {l.count}
                    </span>
                    <TrendingUp className="h-5 w-5 text-gray-300 group-hover:text-[#E11D2E] transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0F1B3D] group-hover:text-[#E11D2E] transition-colors line-clamp-2">
                    {l.title}
                  </h3>
                  {l.description && <p className="text-sm text-gray-500 mt-2 line-clamp-2 flex-grow">{l.description}</p>}
                  <div className="mt-4 pt-4 border-t border-gray-50 flex items-center gap-2">
                    {l.preview?.slice(0, 3).map((p, i) => (
                      <div key={i} className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white -ml-2 first:ml-0 flex items-center justify-center text-[10px] font-bold text-gray-500 overflow-hidden">
                        {p.logo ? <img src={p.logo} alt={p.name} className="w-full h-full object-contain bg-white" /> : p.name.charAt(0)}
                      </div>
                    ))}
                    <span className="ml-2 text-xs text-gray-500">+{l.count - 3} more</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-gradient-to-br from-[#E11D2E] via-[#B91C1C] to-[#0F1B3D] rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Ready to close more deals?</h2>
            <p className="text-lg text-red-100 max-w-2xl mx-auto mb-8">
              Join thousands of B2B teams using RankB2B to find verified companies and reach decision-makers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/data" className="bg-white text-[#0F1B3D] px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-colors shadow-lg">
                Browse Database
              </Link>
              <Link href="/register" className="bg-black/20 border border-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold hover:bg-black/40 transition-colors">
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}