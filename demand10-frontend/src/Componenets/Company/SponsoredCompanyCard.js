import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const SponsoredCompanyCard = ({ company }) => {
  return (
    <Link
      href={company?.subcategory?.slug 
        ? `/${company.subcategory.slug}/${company?.slug}` 
        : `/company/${company?.slug || "company"}`
      }
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-3  rounded-lg hover:bg-blue-50 transition-all duration-300 group relative overflow-hidden border border-gray-100 hover:border-[#4897de]/20 hover:shadow-sm"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-8 h-8 rounded-full border border-[#4897de] opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full border border-[#4897de] opacity-20 translate-x-1/2 translate-y-1/2"></div>
      
      <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0 shadow-sm border-2 border-[#e2e8f0]">
        {company?.image ? (
          <Image
            width={40}
            height={40}
            src={company.image}
            alt={`${company?.companyName} logo`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full bg-[#4897de] flex items-center justify-center text-white font-bold text-sm"
            aria-hidden="true"
          >
            {company?.companyName?.charAt(0) || 'C'}
          </div>
        )}
      </div>
      
      <div className="flex-1 min-w-0 relative z-10">
        <h3
          className="font-medium text-gray-900 group-hover:text-[#4897de] transition-colors truncate text-sm"
        >
          {company?.companyName}
        </h3>
        {company?.subcategory && company?.subcategory?.name && (
          <p className="text-xs text-gray-500 truncate mt-0.5">
            {company.subcategory.name}
          </p>
        )}
      </div>
      
      {/* Arrow Icon */}
      <div className="flex-shrink-0 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </div>
    </Link>
  );
};

export default SponsoredCompanyCard;