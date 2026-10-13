"use client";
import Marquee from "react-fast-marquee";
import { useState, useEffect, useRef, useCallback } from 'react';
import { searchHeroCompanies } from "@/services/api";
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";

export default function HeroSection({ homepageCompanies = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const searchCompanies = useCallback(async () => {
    if (searchQuery.trim() === '') return;
    
    setIsLoading(true);
    try {
      // Use the new hero search service function
      const data = await searchHeroCompanies(searchQuery.trim());
      
      if (data.ok && Array.isArray(data.data)) {
        // Limit to 10 results
        setSearchResults(data.data.slice(0, 10));
        setShowDropdown(data.data.length > 0);
      } else {
        setSearchResults([]);
        setShowDropdown(false);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
      setShowDropdown(false);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery]);

  // Search companies when user types
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set new timeout to debounce API calls
    searchTimeoutRef.current = setTimeout(() => {
      searchCompanies();
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery, searchCompanies]);

  const handleCompanySelect = (company) => {
    setSearchQuery('');
    setSearchResults([]);
    setShowDropdown(false);
    
    // Navigate to company profile
    if (company.subcategory && company.subcategory.slug) {
      window.location.href = `/${company.subcategory.slug}/${company.slug}`;
    } else {
      window.location.href = `/company/${company.slug}`;
    }
  };

  return (
    <section className="bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] text-white">
      {/* Hero Content */}
      <div className="max-w-6xl mx-auto px-4 py-10 sm:py-10 md:py-10">
        <div className="text-center">
          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Find Your Perfect Business Software
          </h1>
          
          {/* Subheading */}
          <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto mb-10">
            Discover trusted solutions from our curated selection of verified providers
          </p>
          
          {/* Search Bar - Central Element */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative" ref={dropdownRef}>
              <div className="flex rounded-xl bg-white shadow-xl border border-gray-200 overflow-hidden">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery.trim() !== '' && searchResults.length > 0 && setShowDropdown(true)}
                  placeholder="Search for software, services or providers..."
                  className="flex-grow px-6 py-4 text-black placeholder-gray-500 focus:outline-none text-base"
                />
                <button className="bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] hover:bg-[#0249aa] px-6 flex items-center justify-center transition-colors duration-200">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </button>
              </div>
              
              {/* Search Results Dropdown */}
              {showDropdown && (
                <div className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-200 max-h-80 overflow-y-auto">
                  {isLoading ? (
                    <div className="py-4 px-5 text-black">
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#265ba3]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Searching...</span>
                      </div>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <ul>
                      {searchResults.map((company) => (
                        <li 
                          key={company._id}
                          onClick={() => handleCompanySelect(company)}
                          className="px-5 py-4 hover:bg-gray-50 cursor-pointer text-black border-b border-gray-100 last:border-b-0 transition-colors duration-150"
                        >
                          <div className="flex items-center">
                            {company.image ? (
                              <Image
                              width={40} 
                                height={40}
                                src={company.image} 
                                alt={company.companyName}
                                className="w-10 h-10 rounded-full object-contain mr-4 border border-gray-200"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4 border border-gray-200">
                                <span className="text-[#265ba3] font-bold">
                                  {company.companyName.charAt(0)}
                                </span>
                              </div>
                            )}
                            <div>
                              <div className="font-semibold">{company.companyName}</div>
                              {company.subcategory && (
                                <div className="text-sm text-gray-600 mt-1">
                                  {company.subcategory.name}
                                </div>
                              )}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="py-6 px-5 text-black text-center">
                      <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <p className="font-medium">No companies found</p>
                      <p className="text-sm mt-1">Try a different search term</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Supporting Text */}
            <p className="text-blue-200 text-sm mt-4 flex items-center justify-center">
              <svg className="w-4 h-4 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Trusted by thousands of businesses worldwide
            </p>
          </div>
          
          {/* Quick Category Links */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-blue-200 text-sm font-semibold mb-3">POPULAR CATEGORIES</h3>
            <div className="flex flex-wrap justify-center gap-3">
               <Link 
                href="/managed-service-providers"
                target="_blank"
                className="px-4 py-2 bg-white hover:bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] text-black hover:text-white rounded-full text-sm transition-colors duration-200 border border-gray-200"
              >
                Managed Service Provider
              </Link>
              <Link 
                href="/managed-security-service-providers"
                target="_blank"
                className="px-4 py-2 bg-white hover:bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] text-black hover:text-white rounded-full text-sm transition-colors duration-200 border border-gray-200"
              >
                 Managed Security Service Provider
              </Link>
              <Link 
                href="/crm-software"
                target="_blank"
                className="px-4 py-2 bg-white hover:bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] text-black hover:text-white rounded-full text-sm transition-colors duration-200 border border-gray-200"
              >
                CRM Software
              </Link>
              <Link 
                href="/accounting-software"
                target="_blank"
                className="px-4 py-2 bg-white hover:bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] text-black hover:text-white rounded-full text-sm transition-colors duration-200 border border-gray-200"
              >
                Accounting Software
              </Link>
             
              
            </div>
          </div>
        </div>
      </div>

     {/* Enhanced Bottom Marquee Section */}
<div className="relative bg-white py-3 shadow-sm border-t border-gray-100">
  <div className="w-full mx-auto px-4">
    {/* Section Heading */}
    <div className="flex items-center ">
      <div className="h-8 w-1 bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] rounded-full mr-3"></div>
      <h2 className="text-xl font-bold text-gray-800">Sponsored Companies</h2>
    </div>

    <Marquee gradient={false} speed={40} pauseOnHover className="py-1">
      {homepageCompanies.length > 0 ? (
        homepageCompanies.map((company) => {
          // Get company URL
          const companyUrl = company.subcategory?.slug
            ? `/${company.subcategory.slug}/${company.slug}`
            : `/company/${company.slug}`;

                    // Function to get the full image URL
                const getImageUrl = (imagePath) => {
                  // If it's already a full URL, return as is
                  if (!imagePath) return "";
                  if (imagePath.startsWith('http')) return imagePath;
                  
                  // If it's a relative path, prepend the API base URL
                  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.demand10.com/api/v1';
                  // Remove /api/v1 prefix if it exists in the imagePath since uploads are served directly
                  const cleanPath = imagePath.startsWith('/api/v1') ? imagePath.substring(7) : imagePath;
                  // For uploads, we need to remove the /api/v1 part from the base URL
                  const uploadBaseUrl = baseUrl.replace('/api/v1', '');
                  return `${uploadBaseUrl}${cleanPath}`;
                };
          // Get image URL
          const imageUrl = getImageUrl(company.image);

          return (
            <Link href={companyUrl} key={company._id}>
              <div
                className="bg-white rounded-xl border border-gray-200 px-5 py-4 mx-3 flex items-center gap-4 
                hover:shadow-lg hover:border-[#4897de] hover:-translate-y-0.5 
                transition-all duration-300 ease-in-out"
                style={{ minWidth: "260px", maxWidth: "260px" }}
              >
                {/* Company Logo */}
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-white flex items-center justify-center border border-gray-200 shadow-sm">
                    <Image
                      src={imageUrl}
                      alt={company.companyName}
                      width={56}
                      height={56}
                      className="object-contain p-1"
                    />
                  </div>
                </div>

                {/* Company Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 truncate">
                    {company.companyName}
                  </h3>

                  {company.subcategory?.name && (
                    <p className="text-xs text-[#4897de] font-medium truncate mt-0.5">
                      {company.subcategory.name}
                    </p>
                  )}

                  {/* Rating Section */}
                  <div className="flex items-center mt-2">
                    {company.totalReviews > 0 ? (
                      <>
                        <div className="flex gap-0.5 mr-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < Math.floor(company.averageRating)
                                  ? "text-[#1d4276] fill-[#1d4276]"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                     
                      </>
                    ) : (
                      <span className="text-xs text-gray-400 italic"></span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <div className="flex items-center mx-6">
          <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 mr-4 flex items-center justify-center shadow-sm">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              ></path>
            </svg>
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-800">Managed Service Providers</h3>
            <p className="text-sm text-gray-600">Discover top-rated providers</p>
          </div>
        </div>
      )}
    </Marquee>
  </div>
</div>

    </section>
  );
}
