import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Users, Calendar, ExternalLink, Building2 } from 'lucide-react';

const CompanyCard = ({ company, subcategoryContext }) => {
  // Function to get the full image URL
  const getFullImageUrl = (imagePath) => {
    // If it's already a full URL, return as is
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;

    // If it's a relative path, prepend the API base URL
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.demand10.com';
    // Remove /api/v1 prefix if it exists in the imagePath since uploads are served directly
    const cleanPath = imagePath.startsWith('/api/v1') ? imagePath.substring(7) : imagePath;
    // For uploads, we need to remove the /api/v1 part from the base URL
    const uploadBaseUrl = baseUrl.replace('/api/v1', '');
    return `${uploadBaseUrl}${cleanPath}`;
  };

  const renderStars = (rating) => {
    const numericRating = parseFloat(rating);
    const normalizedRating = isNaN(numericRating) ? 0 : Math.max(0, Math.min(5, numericRating));
    const fullStars = Math.floor(normalizedRating);
    const hasHalfStar = (normalizedRating - fullStars) >= 0.5;
    const stars = [];
    
    // Render full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>);
    }
    
    // Render half star if needed
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">★</span>);
    }
    
    // Render empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">★</span>);
    }
    
    return stars;
  };

  // Truncate description to a reasonable length
  const truncateDescription = (text, maxLength = 150) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  // Ensure company data is properly handled
  const companyRating = company?.averageRating !== undefined ? company.averageRating : 0;
  const reviewCount = company?.totalReviews || 0;
  const imageUrl = getFullImageUrl(company?.image);

  // Use subcategoryContext if provided, otherwise fallback to company's subcategory
  const effectiveSubcategory = subcategoryContext || company?.subcategory;

  return (
    <article
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden group relative hover:border-[#1a365d]/30"
      itemScope
      itemType="https://schema.org/Organization"
    >
      {/* Company Badge in Top Right Corner */}
      {/* {company?._id && (
        <SimpleBadges companyId={company._id} />
      )} */}
      
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Company Logo & Basic Info */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link
              href={effectiveSubcategory?.slug 
                ? `/${effectiveSubcategory.slug}/${company?.slug}` 
                : `/company/${company?.slug || "company"}`
              }
              className="block"
              itemProp="url"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0 shadow-md">
                {imageUrl ? (
                  <Image
                    width={80}
                    height={80}
                    src={getFullImageUrl(imageUrl)}
                    alt={`${company?.companyName} logo`}
                    className="w-full h-full object-cover"
                    itemProp="logo"
                  />
                ) : (
                 <div className="w-full h-full bg-gray-100 flex items-center justify-center">
        <span className="text-[11px] font-medium text-gray-500 text-center px-2">
          No logo provided
        </span>
      </div>
                )}
              </div>
            </Link>
            
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-2 mb-1">
                <Building2 className="w-4 h-4 text-[#0249aa]" />
                <span className="text-xs font-medium text-[#0249aa] uppercase tracking-wide">
                  {effectiveSubcategory?.name || 'Company'}
                </span>
              </div>
              
              {company?.industryTags &&
                company.industryTags.length > 0 && (
                  <span
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-[#0249aa] mt-1"
                    itemProp="industry"
                  >
                    {typeof company.industryTags[0] === 'object' && company.industryTags[0] !== null 
                      ? company.industryTags[0].industryName 
                      : company.industryTags[0]}
                  </span>
                )}
            </div>
          </div>
          
          {/* Company Details */}
          <div className="flex-1">
            <Link
              href={effectiveSubcategory?.slug 
                ? `/${effectiveSubcategory.slug}/${company?.slug}` 
                : `/company/${company?.slug || "company"}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="flex flex-col h-full">
                <h3
                  className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#0249aa] transition-colors"
                  itemProp="name"
                >
                  {company?.companyName}
                </h3>
                
                {/* Company Description */}
                {company?.description && (
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {truncateDescription(company.description, 200)}
                  </p>
                )}
                
                {/* Enhanced Star Rating and Review Count with context */}
                {(reviewCount > 0 || companyRating > 0) && (
                  <div className="flex items-center mt-1 mb-3">
                    <div
                      className="flex"
                      aria-label={`Rating: ${parseFloat(companyRating).toFixed(1)} out of 5 stars`}
                    >
                      {renderStars(companyRating)}
                    </div>
                    <span className="ml-2 text-gray-600 text-sm font-medium">
                      {parseFloat(companyRating).toFixed(1)}
                    </span>
                    {reviewCount > 0 && (
                      <>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-gray-600 text-sm">
                          {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
                        </span>
                      </>
                    )}
                  </div>
                )}
                
                {/* Company Info Tags */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mt-2 mb-4">
                  <div
                    className="flex items-center gap-1"
                    itemProp="address"
                    itemScope
                    itemType="https://schema.org/PostalAddress"
                  >
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span itemProp="addressCountry">
                      {company?.companyCountry}
                    </span>
                  </div>
                  {company?.employees && (
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span itemProp="numberOfEmployees">
                        {company.employees.toLocaleString()}{" "}
                        employees
                      </span>
                    </div>
                  )}
                  {company?.foundedYear && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span itemProp="foundingDate">
                        Founded {company.foundedYear}
                      </span>
                    </div>
                  )}
                </div>
                
              </div>
            </Link>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 mt-4 border-t border-gray-100">
          <Link
            href={effectiveSubcategory?.slug 
              ? `/${effectiveSubcategory.slug}/${company?.slug}` 
              : `/company/${company?.slug || "company"}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <button
              className="w-full cursor-pointer bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d]  text-white px-4 py-3 rounded-lg transition-colors font-semibold text-sm whitespace-nowrap flex items-center justify-center gap-2"
              aria-label={`View details of ${company?.companyName}`}
            >
              <span>View Profile</span>
            </button>
          </Link>
          {company?.website && (
            <Link
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
              aria-label={`Visit ${company?.companyName} website`}
            >
              <button className="w-full cursor-pointer border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 px-4 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm whitespace-nowrap bg-gray-50 hover:bg-white">
                <ExternalLink className="w-4 h-4" />
                <span>Visit Website</span>
              </button>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

export default CompanyCard;