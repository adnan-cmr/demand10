import Link from 'next/link';
import { fetchTopLists } from '@/services/publicDataApi';
import CategoryGrid from '@/Componenets/Data/CategoryGrid';
import { Trophy, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Top 10 Lists by Category | RankB2B',
  description: 'Curated top 10 company rankings across categories. Discover the industry leaders.',
  alternates: { canonical: '/categories' },
};

export default async function CategoriesPage() {
  const res = await fetchTopLists();
  const lists = res?.lists || [];

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      
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

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {!lists.length ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <Trophy className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-700">No lists published yet</h3>
            <p className="text-gray-500 mt-2">Check back soon for curated industry rankings.</p>
          </div>
        ) : (
          <CategoryGrid lists={lists} />
        )}
      </div>
    </div>
  );
}