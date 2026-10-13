"use client";
import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  SearchIcon,
  BuildingIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import CompanyCard from "../Company/CompanyCard";
import SponsoredCompanyCard from "../Company/SponsoredCompanyCard";
import SkeletonCard from "../Company/SkeletonCard";
import EndpointSecurityHero from "./EndpointSecurityHero";

export default function CompanyListingPage({
  companies = [],
  description,
  slug,
  categoryName,
  totalCompanies,
  name,
  pagination = {},
  sponsorCompanies = [],
  relatedSubcategories = [],
  content = "", // Add content prop
  faqs = [] // Add FAQs prop
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Search states
  const [locationInput, setLocationInput] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [openFAQIndex, setOpenFAQIndex] = useState(null); // Track which FAQ is open
  
  // Related subcategories state
  const [relatedSubcats, setRelatedSubcats] = useState(relatedSubcategories);
  const [loadingRelated, setLoadingRelated] = useState(false);

  // Get current parameters from URL
  const currentPage = parseInt(searchParams.get("page")) || 1;

  const [filteredCompanies, setFilteredCompanies] = useState(companies);
  const [isLoading, setIsLoading] = useState(false);

  // Debounce for search
  const searchTimeoutRef = useRef(null);

  const locationInputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Update companies when props change
  useEffect(() => {
    setFilteredCompanies(companies);
  }, [companies]);

  // Update related subcategories when props change
  useEffect(() => {
    setRelatedSubcats(relatedSubcategories);
    setLoadingRelated(false);
  }, [relatedSubcategories]);

  // Get unique locations from current companies for suggestions
  const uniqueLocations = useMemo(() => {
    const locations = companies
      .map((company) => company.companyCountry)
      .filter((location) => location && location.trim())
      .map((location) => location.trim());
    return [...new Set(locations)].sort();
  }, [companies]);

  
  // Filter companies by location
  useEffect(() => {
    let filtered = companies;

    // Filter by selected location
    if (selectedLocation.trim()) {
      const locationLower = selectedLocation.toLowerCase().trim();
      filtered = filtered.filter((company) => {
        const location = company.companyCountry?.toLowerCase() || "";
        return location.includes(locationLower);
      });
    }

    setFilteredCompanies(filtered);
  }, [companies, selectedLocation]);

  // Function to update URL with new parameters
  const updateURL = (newParams) => {
    const params = new URLSearchParams();

    // Always preserve current parameters
    searchParams.forEach((value, key) => {
      params.set(key, value);
    });

    // Update with new parameters
    Object.entries(newParams).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        params.set(key, value.toString());
      } else {
        params.delete(key);
      }
    });

    const newURL = `${window.location.pathname}?${params.toString()}`;
    router.push(newURL);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setIsLoading(true);
    window.scrollTo({ top: 0, behavior: "smooth" });

    updateURL({
      page: page,
    });
  };

  // Handle loading state when URL changes
  useEffect(() => {
    setIsLoading(false);
  }, [companies]);

  const toggleFAQ = (index) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  // Handle clicking outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        locationInputRef.current &&
        !locationInputRef.current.contains(event.target) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      // Clear timeout on unmount
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

 

  // Generate structured data for SEO
  const generateStructuredData = () => {
    if (filteredCompanies.length === 0) return null;

    const isMSP = name.toLowerCase().includes("managed service") || name.toLowerCase().includes("msp");
    const isMSSP = name.toLowerCase().includes("managed security") || name.toLowerCase().includes("mssp");

    const companiesData = filteredCompanies.map((company, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Organization",
        name: company.companyName,
        url: `https://demand10.com/${slug}/${company.slug}`,
        address: {
          "@type": "PostalAddress",
          addressCountry: company.companyCountry,
        },
        employeeCount: company.employees,
        foundingDate: company.foundedYear?.toString(),
        industry: company.industryTags?.[0],
        ...(isMSP && { 
          serviceType: "Managed Service Provider",
          keywords: "managed service provider, MSP, IT managed services, cybersecurity outsourcing, cloud service provider, 24/7 IT support, data backup and recovery"
        }),
        ...(isMSSP && { 
          serviceType: "Managed Security Service Provider",
          keywords: "managed security service provider, MSSP, cybersecurity services, security outsourcing, SOC services, penetration testing, compliance management"
        })
      },
    }));

    // Base structured data
    const baseData = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: companiesData,
      description: `Browse our comprehensive directory of ${name} companies on Demand10. Find verified ${isMSP ? "managed service providers (MSPs)" : isMSSP ? "managed security service providers (MSSPs)" : "vendors"} with detailed profiles, contact information, and client reviews. Discover top-rated providers offering ${isMSP ? "IT managed services, cloud solutions, and cybersecurity outsourcing" : isMSSP ? "cybersecurity services, threat monitoring, and compliance solutions" : "specialized services"} near you. ${isMSP ? "Compare MSP pricing, services, and client reviews to find the perfect technology partner for your business." : isMSSP ? "Evaluate MSSP security capabilities, compliance expertise, and threat detection rates to protect your organization." : "Research provider expertise, service offerings, and customer satisfaction ratings."}`,
      name: `${name} Companies Directory - Demand10`,
      ...(isMSP && { 
        category: "Managed Service Providers",
        keywords: "managed service provider, MSP, IT managed services, cloud service provider, best managed service providers, top MSP, managed IT services, IT support services"
      }),
      ...(isMSSP && { 
        category: "Managed Security Service Providers",
        keywords: "managed security service provider, MSSP, cybersecurity services, security outsourcing, best managed security providers, top MSSP, SOC monitoring, penetration testing"
      })
    };

    // Add FAQ schema if FAQs exist
    if (faqs && Array.isArray(faqs) && faqs.length > 0) {
      // Filter out FAQs with missing question or answer
      const validFaqs = faqs.filter(faq => 
        faq.question && faq.question.trim() !== '' && 
        faq.answer && faq.answer.trim() !== ''
      );
      
      if (validFaqs.length > 0) {
        baseData.mainEntity = validFaqs.map((faq, index) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }));
      }
    }

    return baseData;
  };

  const structuredData = generateStructuredData();

  // Determine if this is an MSP or MSSP category
  const isMSP = name.toLowerCase().includes("managed service") || name.toLowerCase().includes("msp");
  const isMSSP = name.toLowerCase().includes("managed security") || name.toLowerCase().includes("mssp");
  
  // Enhanced description
  const enhancedDescription = description || 
    (isMSP 
      ? `Browse our comprehensive directory of managed service providers (MSPs) on Demand10 offering IT managed services, cloud computing solutions, and cybersecurity outsourcing. Find verified MSP companies with detailed profiles, contact information, and client reviews. Discover top-rated managed service providers near you with expertise in ${name.toLowerCase().includes("cloud") ? "cloud infrastructure management" : name.toLowerCase().includes("security") ? "cybersecurity solutions" : "comprehensive IT services"}.`
      : isMSSP
      ? `Explore our curated list of managed security service providers (MSSPs) on Demand10 specializing in cybersecurity services, threat monitoring, and compliance management. Discover verified MSSP companies with security expertise and proven track records. Find top managed security service providers near you offering ${name.toLowerCase().includes("network") ? "network security services" : name.toLowerCase().includes("penetration") ? "penetration testing" : "advanced threat protection"}.`
      : `Browse our comprehensive directory of ${name} companies on Demand10. Find verified vendors with detailed profiles, contact information, and client reviews. Discover top-rated providers offering specialized services in ${name.toLowerCase().includes("data") ? "data management solutions" : name.toLowerCase().includes("cloud") ? "cloud computing services" : name.toLowerCase().includes("network") ? "network infrastructure" : "technology services"} near you.`);

  

  // Use sponsorCompanies if available, otherwise use static data
  const displayedSponsoredCompanies = sponsorCompanies;

  // Pagination component
  const Pagination = () => {
    const { totalPages } = pagination;

    if (totalPages <= 1) return null;

    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <nav
        aria-label="Pagination"
        className="flex items-center justify-center mt-12 mb-8"
      >
        <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || isLoading}
            className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors font-medium text-sm"
            aria-label="Go to previous page"
          >
            Prev
          </button>

          {startPage > 1 && (
            <>
              <button
                onClick={() => handlePageChange(1)}
                disabled={isLoading}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-sm disabled:opacity-50"
                aria-label="Go to first page"
              >
                1
              </button>
              {startPage > 2 && (
                <span className="px-2 text-gray-500" aria-hidden="true">
                  ...
                </span>
              )}
            </>
          )}

          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              disabled={isLoading}
              className={`px-3 py-2 border rounded-lg transition-colors font-medium text-sm disabled:opacity-50 ${
                currentPage === number
                  ? "bg-[#1a365d] text-white border-[#1a365d] shadow-sm"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
              aria-label={`Go to page ${number}`}
              aria-current={currentPage === number ? "page" : undefined}
            >
              {number}
            </button>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <span className="px-2 text-gray-500" aria-hidden="true">
                  ...
                </span>
              )}
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={isLoading}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-sm disabled:opacity-50"
                aria-label="Go to last page"
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || isLoading}
            className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors font-medium text-sm"
            aria-label="Go to next page"
          >
            Next
          </button>
        </div>
      </nav>
    );
  };

  // Handle search from hero section
  const handleHeroSearch = (searchTerm, locationTerm) => {
    setIsLoading(true);
    
    // Clear any existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    // Set a new timeout to debounce the search
    searchTimeoutRef.current = setTimeout(() => {
      updateURL({
        search: searchTerm,
        location: locationTerm,
        page: 1,
      });
    }, 500); // 500ms debounce delay
  };

  return (
    <div className="min-h-screen bg-white"> {/* Changed back to white for better user experience */}
      {/* Structured Data for SEO */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}

      {/* Pass search handler to hero section */}
      <EndpointSecurityHero 
        categoryName={categoryName} 
        description={description}
        name={name} 
        onSearch={handleHeroSearch}
        totalCompanies={totalCompanies}
        uniqueLocations={uniqueLocations}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          {/* Main Content - Center */}
          <div className="flex-1">
            {/* Results Header Row - Only shows company count and view options */}
            <section
              aria-labelledby="results-heading"
              className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {/* Left: Total Companies Count */}
                <div className="flex items-center gap-2">
                  <BuildingIcon className="w-5 h-5 text-[#0249aa]" />
                  <h2 className="text-xl font-bold text-gray-900">
                    {totalCompanies.toLocaleString()}{" "}
                    {(pagination.total || filteredCompanies.length) === 1
                      ? "Company"
                      : "Companies"}{" "}
                    Found
                    {pagination.searchTerm && (
                      <span className="text-sm font-normal text-gray-600">
                        {" "}
                        for {pagination.searchTerm}
                      </span>
                    )}
                    {selectedLocation && (
                      <span className="text-sm font-normal text-gray-600">
                        {" "}
                        in {selectedLocation}
                      </span>
                    )}
                  </h2>
                </div>
                {/* Right: View Toggle - Removed since we only want list view */}
                <div className="flex items-center gap-3">
                  {/* View toggle removed as we only want list view */}
                </div>
              </div>
            </section>

            {/* Loading State */}
            {isLoading && (
              <div className="space-y-6">
                {[...Array(2)].map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
              </div>
            )}

            {/* Company Cards - Changed to single column layout */}
            {!isLoading && filteredCompanies.length > 0 ? (
              <section aria-labelledby="company-list-heading">
                <h2 id="company-list-heading" className="sr-only">
                  List of Companies
                </h2>
                <div className="space-y-6"> {/* Changed from grid to space-y-6 for single column */}
                  {filteredCompanies.map((company) => (
                    <CompanyCard key={company._id} company={company} subcategoryContext={{name, slug}} viewMode="list" />
                  ))}
                </div>
              </section>
            ) : !isLoading ? (
              <section aria-labelledby="no-results-heading">
                <h2 id="no-results-heading" className="sr-only">
                  No Companies Found
                </h2>
                <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                  <div className="text-gray-300 mb-4">
                    <SearchIcon className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No companies found
                  </h3>
                  <p className="text-gray-500 mb-6 max-w-md mx-auto">
                    {selectedLocation ? (
                      <>
                        We couldn&apos;t find any companies matching your location
                        filter. Try adjusting your filter.
                      </>
                    ) : (
                      <>
                        We couldn&apos;t find any companies. Please try again
                        later.
                      </>
                    )}
                  </p>
                </div>
              </section>
            ) : null}

            {/* Pagination */}
            <Pagination />
          </div>

          {/* Right Sidebar - Sponsored Companies */}
          <aside
            aria-label="Sponsored companies"
            className="w-full lg:w-80 xl:w-96 shrink-0"
          >
            <div className="sticky top-8">
              {/* Sponsored Companies Section */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Sponsored Companies</h3>
                <div className="space-y-4">
                  {(displayedSponsoredCompanies || []).slice(0, 10).map((company) => (
                    <SponsoredCompanyCard key={company._id} company={company} />
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
         
        {/* Subcategory Content Section - Added below company listings */}
        {content && typeof content === 'string' && content.trim().length > 0 && 
         !['<p><br></p>', '<p></p>', '<br>'].includes(content.trim()) && (
          <section 
            aria-labelledby="subcategory-content-heading"
            className="bg-white rounded-xl shadow-sm border border-gray-200 mt-8"
          >
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 id="subcategory-content-heading" className="text-xl font-bold text-gray-800">
                About {name || "Category"}
              </h2>
            </div>
            <div className="p-6">
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: content.trim() }} 
              />
            </div>
            
            {/* FAQ Section - Integrated within content section */}
            {faqs && Array.isArray(faqs) && faqs.length > 0 && (
              <div className="px-6 pb-6">
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg bg-white shadow-sm">
                        <div 
                          className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => toggleFAQ(index)}
                        >
                          <div className="flex-1 flex items-center">
                            <span className="text-blue-700 font-medium mr-2">Q{index + 1}:</span>
                            <span className="font-medium text-gray-800">
                              {faq.question}
                            </span>
                          </div>
                          <div className="ml-2">
                            <svg 
                              className={`h-5 w-5 text-gray-500 transform transition-transform ${openFAQIndex === index ? 'rotate-180' : ''}`} 
                              xmlns="http://www.w3.org/2000/svg" 
                              viewBox="0 0 20 20" 
                              fill="currentColor"
                            >
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                        {openFAQIndex === index && (
                          <div className="px-4 pb-4">
                            <div className="border-t border-gray-200 pt-4">
                              <p className="text-gray-700">{faq.answer}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

       
      </main>
      
      {/* Related Subcategories Section */}
      <div className="pb-12 p-6 bg-white border-t border-gray-200 w-full mx-auto">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Explore Related {name} </h3>
        <p className="text-gray-700 mb-6 max-w-3xl">
          Looking for other technology solutions in {name.toLowerCase().includes("managed service") || name.toLowerCase().includes("msp") ? "managed IT services" : name.toLowerCase().includes("managed security") || name.toLowerCase().includes("mssp") ? "cybersecurity services" : name.toLowerCase().includes("cloud") ? "cloud computing" : name.toLowerCase().includes("network") ? "network security" : "IT services"}? Browse our comprehensive directory of specialized providers and solutions.
        </p>
        
        {loadingRelated ? (
          <div className="flex justify-center items-center h-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0249aa]"></div>
          </div>
        ) : relatedSubcats.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {relatedSubcats.map((subcategory) => (
              <Link 
                key={subcategory.slug}
                href={`/${subcategory.slug}`}
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-[#0249aa] text-white hover:bg-[#1a365d] transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
              >
                {subcategory.name}
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <p className="text-gray-500 italic text-center">No related services found.</p>
          </div>
        )}
      </div>
    </div>
  );
}