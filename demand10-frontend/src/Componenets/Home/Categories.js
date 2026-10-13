'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const SoftwareCategories = ({ categories = [] }) => {
  const safeCategories = Array.isArray(categories) ? categories : [];

  const categoriesData =
    safeCategories.length > 0
      ? safeCategories.map((category) => ({
          id: category?._id || category?.slug || Math.random().toString(36).slice(2),
          category: category?.name || 'Untitled',
          subcategory: Array.isArray(category?.subcategories) ? category.subcategories : [],
        }))
      : [];

  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleCategory = (index) => {
    setExpandedCategory(expandedCategory === index ? null : index);
  };

  // Empty state — home page still renders
  if (categoriesData.length === 0) {
    return (
      <div className="min-h-[300px] flex items-center justify-center py-16 px-4 bg-white">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Categories are loading…</p>
        </div>
      </div>
    );
  }

  return (
    <div id="categories" className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="w-full mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#265ba3] mb-6 leading-tight">
            Explore Software Categories
          </h1>
          <p className="text-lg text-black max-w-3xl mx-auto">
            Discover the perfect software solutions for your business needs across various categories
          </p>
        </div>

        {/* Mobile Accordion View */}
        <div className="lg:hidden space-y-4 mb-12">
          {categoriesData.map((category, index) => (
            <div key={category.id} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleCategory(index)}
                className="w-full p-4 bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] text-white text-left font-bold flex justify-between items-center hover:bg-[#0249aa] transition-all duration-300"
              >
                <span>{category.category}</span>
                <svg
                  className={`w-5 h-5 transition-transform duration-300 ${expandedCategory === index ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {expandedCategory === index && (
                <div className="p-4 bg-white">
                  <ul className="space-y-3">
                    {category.subcategory.slice(0, 8).map((item, itemIndex) => (
                      <li key={item._id || itemIndex}>
                        <Link
                          href={`/${item.slug || item}`}
                          className="block py-2 px-3 rounded-lg text-black hover:bg-blue-100 transition-all duration-200"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{item.name || item}</span>
                            <svg className="w-4 h-4 text-[#4897de]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop Grid View */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categoriesData.map((category, index) => (
            <div
              key={category.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <div className="bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] p-4">
                <h2 className="text-md font-bold text-white text-center">{category.category}</h2>
              </div>
              <div className="p-4">
                <ul className="space-y-1">
                  {category.subcategory.slice(0, 6).map((item, itemIndex) => (
                    <li key={item._id || itemIndex}>
                      <Link
                        href={`/${item.slug || item}`}
                        className="block py-1 px-4 hover:underline"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{item.name || item}</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="text-right mt-12">
          <Link href="/categories">
            <button className="text-[#1a365d] font-semibold hover:underline cursor-pointer">
              View All Categories
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SoftwareCategories;