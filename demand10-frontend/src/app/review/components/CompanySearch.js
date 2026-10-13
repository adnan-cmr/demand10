"use client";

import { useState, useEffect, useRef } from 'react';
import { searchCompanies } from '@/services/userApi';
import { toast } from 'react-toastify';
import { FaSearch, FaTimes, FaBuilding } from 'react-icons/fa';
import Image from 'next/image';

export default function CompanySearch({ onCompanySelect }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef(null);

  // Handle search input change
  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 1) {
      setIsLoading(true);
      try {
        const response = await searchCompanies(query);
        if (response.ok) {
          setSuggestions(response.companies);
          // Add a small delay to ensure proper rendering
          setTimeout(() => {
            setShowSuggestions(true);
          }, 10);
        }
      } catch (error) {
        console.error('Error searching companies:', error);
        toast.error('Failed to search companies');
      } finally {
        setIsLoading(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Handle company selection
  const handleSelectCompany = (company) => {
    onCompanySelect(company);
    setSearchQuery(company.companyName);
    setShowSuggestions(false);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full" ref={searchContainerRef}>
      <div className="search-container relative">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => searchQuery.length > 1 && setShowSuggestions(true)}
            placeholder="Search for a Product"
            className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#4897de] focus:ring-2 focus:ring-[#4897de]/20 placeholder-black bg-white"
          />
          
          {/* Search Icon */}
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#4897de]"></div>
            ) : (
              <FaSearch className="h-5 w-5 text-[#4897de]" />
            )}
          </div>
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {suggestions.map((company) => (
              <div
                key={company._id}
                onClick={() => handleSelectCompany(company)}
                className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  {company.image ? (
                    <Image
                    width={100}
                    height={100}
                      src={company.image} 
                      alt={company.companyName} 
                      className="w-10 h-10 rounded-lg object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.parentElement.innerHTML = `<span class="text-gray-600 font-medium text-sm">${company.companyName.charAt(0)}</span>`;
                      }}
                    />
                  ) : (
                    <span className="text-gray-600 font-medium text-sm">
                      {company.companyName.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="ml-3">
                  <p className="font-medium text-[#4897de]">{company.companyName}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results Message */}
        {showSuggestions && suggestions.length === 0 && searchQuery.length > 1 && !isLoading && (
          <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
            <div className="px-4 py-3 text-gray-500 text-center">
              No companies found
            </div>
          </div>
        )}
      </div>
    </div>
  );
}