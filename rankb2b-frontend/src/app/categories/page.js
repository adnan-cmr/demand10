import Link from "next/link";
import { fetchTopLists } from "@/services/publicDataApi";
import { 
  Trophy, 
  ArrowRight, 
  Layers, 
  Building2, 
  ChevronRight,
  TrendingUp,
  Award
} from "lucide-react";

export const metadata = {
  title: "Top 10 Lists by Category | RankB2B",
  description: "Curated top 10 company rankings across categories. Discover the industry leaders.",
  alternates: { canonical: "/categories" },
};

export default async function CategoriesPage() {
  const res = await fetchTopLists();
  const lists = res?.lists || [];
  
  // Use the first list for the right sidebar preview
  const featuredList = lists[0];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ── HEADER ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-red-50 rounded-xl">
              <Trophy className="h-8 w-8 text-[#E11D2E]" />
            </div>
            <h1 className="text-4xl font-extrabold text-[#0F1B3D]">Top 10 by Category</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl">
            Hand-picked rankings of the leading companies. Use these curated lists to discover top MSPs, MSSPs, and technology providers in specific niches.
          </p>
        </div>
      </div>

      {/* ── MAIN LAYOUT (3 Columns) ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT SIDEBAR (Navigation) */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
                <Layers className="h-5 w-5 text-gray-400" />
                <h2 className="font-bold text-[#0F1B3D]">All Categories</h2>
              </div>
              <ul className="space-y-1 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                {lists.map((l) => (
                  <li key={l._id}>
                    <Link
                      href={`/categories/${l.slug}`}
                      className="flex items-center justify-between px-3 py-2.5 text-sm text-gray-600 rounded-lg hover:bg-gray-50 hover:text-[#E11D2E] transition-colors group"
                    >
                      <span className="truncate pr-2">{l.title}</span>
                      <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
                {!lists.length && (
                  <p className="text-sm text-gray-500 italic">No categories yet.</p>
                )}
              </ul>
            </div>
          </aside>

          {/* MIDDLE CONTENT (Grid of Cards) */}
          <div className="lg:col-span-6">
            {!lists.length ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                <Trophy className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-700">No lists published yet</h3>
                <p className="text-gray-500 mt-2">Check back soon for curated industry rankings.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {lists.map((l) => (
                  <Link
                    key={l._id}
                    href={`/categories/${l.slug}`}
                    className="group flex flex-col bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#E11D2E] hover:shadow-lg transition-all duration-300 h-full"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-red-50 text-[#E11D2E] text-xs font-bold uppercase tracking-wider">
                        Top {l.count}
                      </div>
                      <Award className="h-6 w-6 text-gray-200 group-hover:text-[#E11D2E] transition-colors" />
                    </div>
                    
                    <h2 className="text-xl font-bold text-[#0F1B3D] group-hover:text-[#E11D2E] transition-colors line-clamp-2 mb-2">
                      {l.title}
                    </h2>
                    
                    {l.description && (
                      <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-grow">
                        {l.description}
                      </p>
                    )}

                    {/* Preview of companies (Logos if available) */}
                    <div className="mt-auto pt-4 border-t border-gray-50">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Featured Companies</p>
                      <div className="flex flex-wrap gap-2">
                        {l.preview?.slice(0, 3).map((p, i) => (
                          <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-full pr-3 pl-1 py-1 border border-gray-100">
                            {p.logo ? (
                              <img src={p.logo} alt={p.name} className="w-6 h-6 rounded-full object-contain bg-white" />
                            ) : (
                              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500">
                                {p.name.charAt(0)}
                              </div>
                            )}
                            <span className="text-xs text-gray-600 font-medium truncate max-w-[80px]">{p.name}</span>
                          </div>
                        ))}
                        {l.count > 3 && (
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 border border-gray-100 text-xs font-bold text-gray-400">
                            +{l.count - 3}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR (Leaderboard Preview) */}
          <aside className="hidden lg:block lg:col-span-3">
            {featuredList ? (
              <div className="sticky top-24 bg-gradient-to-b from-[#0F1B3D] to-[#1d2f63] rounded-2xl p-6 text-white shadow-xl">
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="h-5 w-5 text-[#E11D2E]" />
                  <h2 className="font-bold text-lg">Top 10 Spotlight</h2>
                </div>
                
                <h3 className="font-semibold text-blue-100 mb-4">{featuredList.title}</h3>
                
                <ul className="space-y-4">
                  {featuredList.preview?.map((company, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <span className="text-2xl font-black text-white/20 w-6 italic">#{idx + 1}</span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold truncate">{company.name}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/categories/${featuredList.slug}`}
                  className="mt-8 flex items-center justify-center w-full bg-[#E11D2E] hover:bg-red-700 text-white text-sm font-bold py-3 rounded-xl transition-colors"
                >
                  View Full Ranking <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ) : (
              <div className="sticky top-24 bg-gray-100 rounded-2xl p-6 text-center border border-gray-200">
                <Building2 className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-500">Rankings will appear here once published.</p>
              </div>
            )}
          </aside>

        </div>
      </div>
    </div>
  );
}