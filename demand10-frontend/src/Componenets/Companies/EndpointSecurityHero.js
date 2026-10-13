import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, HomeIcon, SearchIcon, Users, Award, Calendar} from 'lucide-react';

const EndpointSecurityHero = ({ categoryName = "Endpoint Security", description, name = "Endpoint Security Software", onSearch, totalCompanies }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationTerm, setLocationTerm] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm, locationTerm);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="pb-6">
          <nav className="flex items-center text-blue-100 text-sm" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#265ba3] transition-colors flex items-center">
              <HomeIcon className="w-4 h-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-blue-200" />
            <Link href="/" >
              Research
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-blue-200" />
            <Link href="/" >
              {categoryName}
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-blue-200" />
            <span className="text-white font-medium truncate max-w-xs md:max-w-md">
              {name}
            </span>
          </nav>
        </div>

        {/* Hero Section */}
        <div className="pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            {/* Left Content */}
            <div className="text-white">
              <div className="flex items-center mb-4">
               
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  {name}
                </h1>
              </div>
              
              <p className="text-blue-100 text-lg md:text-xl mb-8 leading-relaxed max-w-2xl">
                {description || `Discover top-rated ${name.toLowerCase()} providers with verified reviews, detailed profiles, and comprehensive comparison tools. Find the perfect solution for your business needs.`}
              </p>
              
              {/* Stats Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-lg bg-[#4897de]/20 flex items-center justify-center mr-4">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-blue-200 text-sm font-medium">Companies Listed</div>
                      <div className="text-white font-bold text-2xl">{totalCompanies?.toLocaleString() || '1,000'}</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-lg bg-[#4897de]/20 flex items-center justify-center mr-4">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-blue-200 text-sm font-medium">Verified Reviews</div>
                      <div className="text-white font-bold text-2xl">10K+</div>
                    </div>
                  </div>
                </div>
              </div>
              
             
            </div>

            {/* Right Content - Search Box */}
            <div className="bg-white rounded-2xl shadow-xl p-7 border border-gray-100">
              <div className="text-center mb-7">
              
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Find the Best Providers</h2>
                <p className="text-gray-600">Search our database of verified companies</p>
              </div>
              
              <form onSubmit={handleSearchSubmit} className="space-y-5">
                <div>
                  <label htmlFor="company-search" className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Name or Keywords
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <SearchIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="company-search"
                      placeholder="Search companies..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4897de] focus:border-transparent transition-all duration-200 text-base shadow-sm"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="location-search" className="block text-sm font-semibold text-gray-700 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <SearchIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="location-search"
                      placeholder="Enter location..."
                      value={locationTerm}
                      onChange={(e) => setLocationTerm(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4897de] focus:border-transparent transition-all duration-200 text-base shadow-sm"
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full cursor-pointer bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg text-base flex items-center justify-center"
                >
                  <SearchIcon className="w-5 h-5 mr-2" />
                  Search Companies
                </button>
                
                <div className="text-center pt-3">
                  <p className="text-gray-500 text-sm flex items-center justify-center">
                    <Calendar className="w-4 h-4 inline mr-2 text-[#4897de]" />
                    Updated September 2025
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndpointSecurityHero;