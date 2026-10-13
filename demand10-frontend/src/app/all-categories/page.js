import React from 'react';
import { fetchCategories } from '@/services/api';

export const metadata = {
  title: "All Categories - Demand10",
  description: "Browse all technology categories and subcategories on Demand10. Find managed service providers, cybersecurity solutions, cloud services, and more.",
  keywords: [
    "technology categories",
    "managed service providers",
    "cybersecurity solutions",
    "cloud services",
    "IT services",
    "technology vendors",
    "business solutions"
  ],
  metadataBase: new URL("https://demand10.com"),
  alternates: {
    canonical: "/all-categories",
  },
  openGraph: {
    title: "All Categories - Demand10",
    description: "Browse all technology categories and subcategories on Demand10. Find managed service providers, cybersecurity solutions, cloud services, and more.",
    url: "https://demand10.com/all-categories",
    siteName: "Demand10",
   
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Categories - Demand10",
    description: "Browse all technology categories and subcategories on Demand10. Find managed service providers, cybersecurity solutions, cloud services, and more.",
    site: "@demand10",
  },
};
const SoftwareCategoriesPage = async () => {
  const categories = await fetchCategories();



  

  return (
    <div className="min-h-screen bg-[#f3f3f3] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto p-5 bg-white shadow-lg ">
        {/* Header */}
        <div className="mt-4 p-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-3">
            Find Your Categories
          </h1>
          <p className="text-lg text-gray-600">
            Select the type of Categories you&apos;re looking for below:
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-10 pl-10 pr-10">
          {categories?.map((category) => (
            <div key={category._id}>
              {/* Category Name */}
              <h2 className="text-xl font-semibold text-[#797979] mb-4">
                {category.name}
              </h2>

              {/* Subcategories */}
              <div className="flex flex-wrap text-base text-[#596a9b]">
                {category.subcategories?.map((subcategory, index) => (
                  <React.Fragment key={subcategory._id}>
                    <a
                      href={`/${subcategory.slug}`}
                      className="hover:text-blue-800 hover:underline transition-colors duration-200"
                    >
                      {subcategory.name}
                    </a>
                    {index < category.subcategories.length - 1 && (
                      <span className="mx-2 text-gray-400">|</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {(!categories || categories.length === 0) && (
          <div className="text-center p-12">
            <div className="text-[#797979] mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No categories found
            </h3>
            <p className="text-gray-500">
              There are currently no categories available.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SoftwareCategoriesPage;
