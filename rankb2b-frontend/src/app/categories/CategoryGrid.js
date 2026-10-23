'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Trophy, Award, ChevronRight, Layers } from 'lucide-react';

export default function CategoryGrid({ lists }) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter lists based on the search query
  const filteredLists = lists.filter((l) => 
    l.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (l.description && l.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
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
          </ul>
        </div>
      </aside>

      {/* MIDDLE CONTENT (Search + Grid) */}
      <div className="lg:col-span-9">
        
        {/* Search Bar */}
        <div className="relative mb-8 max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search categories (e.g., Software, Healthcare)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-white shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#E11D2E] focus:border-transparent transition-all"
          />
        </div>

        {/* Grid */}
        {filteredLists.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-700">No categories found</h3>
            <p className="text-gray-500 mt-2">We couldn't find any lists matching "{searchQuery}".</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredLists.map((l) => (
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

                <div className="mt-auto pt-4 border-t border-gray-50">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Featured</p>
                  <div className="flex flex-wrap gap-2">
                    {l.preview?.slice(0, 2).map((p, i) => (
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
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}