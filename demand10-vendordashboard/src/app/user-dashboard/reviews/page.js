"use client";

import { useState, useEffect, useCallback } from 'react';
import { getVendorCompanyReviews, getUserClaims } from '@/services/userApi';
import { Star, Calendar, User, MessageSquare, Building, ChevronLeft, ChevronRight, Loader } from 'lucide-react';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [primaryCompany, setPrimaryCompany] = useState(null);
  const [error, setError] = useState(null);

  // Memoized function to fetch user claims and set primary company
  const fetchClaims = useCallback(async () => {
    try {
      const claimsData = await getUserClaims();
      if (claimsData.ok) {
        const approvedClaims = claimsData.claims.filter(claim => claim.status === 'approved');
        setClaims(approvedClaims);
        
        // Set primary company (first company submitted through listing form, or first claimed company)
        if (approvedClaims.length > 0) {
          const listingFormCompany = approvedClaims.find(claim => 
            claim.company.submittedThroughListingForm
          );
          setPrimaryCompany(listingFormCompany || approvedClaims[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching claims:', error);
      setError('Failed to load company claims');
    }
  }, []);

  // Fetch user claims on component mount
  useEffect(() => {
    fetchClaims();
  }, [fetchClaims]);

  // Memoized function to fetch reviews for the primary company
  const fetchReviews = useCallback(async (page) => {
    setLoading(true);
    setError(null);
    try {
      // Always fetch reviews for the user's primary company (backend handles this logic)
      const reviewsData = await getVendorCompanyReviews(page, 10);
      
      if (reviewsData.ok) {
        setReviews(reviewsData.reviews);
        setTotalPages(reviewsData.totalPages || 1);
        setTotalCount(reviewsData.totalCount || 0);
      } else {
        console.error('Error fetching reviews:', reviewsData.message);
        setReviews([]);
        setTotalCount(0);
        setError(reviewsData.message || 'Failed to load reviews');
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setReviews([]);
      setTotalCount(0);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch reviews when currentPage or primaryCompany changes
  useEffect(() => {
    if (primaryCompany) {
      fetchReviews(currentPage);
    }
  }, [currentPage, primaryCompany, fetchReviews]);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      // Scroll to top when changing pages
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Skeleton Card Component
  const SkeletonCard = () => (
    <div className="p-6 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-gray-200 rounded-full w-10 h-10"></div>
          <div>
            <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 w-4 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-20"></div>
      </div>
      
      {/* Project Info Skeleton */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="h-4 bg-gray-200 rounded w-40 mb-2"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="h-3 bg-gray-200 rounded w-20"></div>
          <div className="h-3 bg-gray-200 rounded w-24"></div>
          <div className="h-3 bg-gray-200 rounded w-28"></div>
        </div>
      </div>
      
      {/* Review Text Skeleton */}
      <div className="mb-4 space-y-2">
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-4/5"></div>
        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
      </div>
      
      {/* Ratings Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="text-center">
            <div className="flex justify-center mb-1 space-x-1">
              {[...Array(5)].map((_, j) => (
                <div key={j} className="h-3 w-3 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="h-3 bg-gray-200 rounded w-12 mx-auto"></div>
          </div>
        ))}
      </div>
      
      {/* Reviewer Info Skeleton */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="h-5 w-5 bg-gray-200 rounded"></div>
          <div>
            <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
            <div className="h-3 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
        <div className="h-5 bg-gray-200 rounded w-16"></div>
      </div>
    </div>
  );

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
      />
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading && currentPage === 1) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#265ba3] to-[#1a365d] rounded-xl shadow-lg p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Company Reviews</h1>
          <p className="text-lg opacity-90">Loading reviews for your claimed company...</p>
        </div>

        {/* Company Info Skeleton */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gray-200 rounded-full w-12 h-12"></div>
              <div>
                <div className="h-5 bg-gray-200 rounded w-40 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
            <div className="h-6 bg-gray-200 rounded w-20"></div>
          </div>
        </div>

        {/* Reviews List Skeleton */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="divide-y divide-gray-200">
            {[...Array(3)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#265ba3] to-[#1a365d] rounded-xl shadow-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Company Reviews</h1>
        <p className="text-lg opacity-90">
          {primaryCompany 
            ? `Reviews for ${primaryCompany.company.companyName}`
            : "Reviews for your company"
          }
        </p>
      </div>

      {/* Company Info */}
      {primaryCompany && (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-[#265ba3] to-[#1a365d] text-white rounded-full w-12 h-12 flex items-center justify-center font-semibold text-lg">
                {primaryCompany.company.companyName.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{primaryCompany.company.companyName}</h3>
                <p className="text-sm text-gray-500">
                  {primaryCompany.company.submittedThroughListingForm ? 'Listed Company' : 'Claimed Company'}
                </p>
              </div>
            </div>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {totalCount} total reviews
            </span>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
              <div className="mt-2 text-sm text-red-700">
                <button 
                  onClick={() => fetchReviews(currentPage)}
                  className="font-medium text-red-800 underline hover:text-red-900"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        {loading ? (
          <div className="divide-y divide-gray-200">
            {[...Array(2)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : reviews.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {reviews.map((review) => (
              <div key={review._id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-br from-[#265ba3] to-[#1a365d] text-white rounded-full w-10 h-10 flex items-center justify-center font-semibold">
                      {review.company?.companyName?.charAt(0) || 'C'}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{review.company?.companyName}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex">{renderStars(review.overallRating)}</div>
                        <span className="text-sm font-medium text-gray-600">
                          {review.overallRating}/5
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(review.createdAt)}
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                {review.project && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h5 className="font-medium text-gray-900 mb-2">Project: {review.project?.title}</h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Type:</span>{' '}
                        <span className="text-gray-600">{review.project?.type}</span>
                      </div>
                      {review.project?.budget && (
                        <div>
                          <span className="font-medium text-gray-700">Budget:</span>{' '}
                          <span className="text-gray-600">{review.project.budget}</span>
                        </div>
                      )}
                      {review.project?.duration && (
                        <div>
                          <span className="font-medium text-gray-700">Duration:</span>{' '}
                          <span className="text-gray-600">{review.project.duration}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Review Text */}
                {review.reviewText && (
                  <div className="mb-4">
                    <p className="text-gray-700 leading-relaxed">{review.reviewText}</p>
                  </div>
                )}

                {/* Ratings Breakdown */}
                {review.ratings && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {review.ratings.quality && (
                      <div className="text-center">
                        <div className="flex justify-center mb-1">{renderStars(review.ratings.quality)}</div>
                        <span className="text-xs text-gray-600">Quality</span>
                      </div>
                    )}
                    {review.ratings.schedule && (
                      <div className="text-center">
                        <div className="flex justify-center mb-1">{renderStars(review.ratings.schedule)}</div>
                        <span className="text-xs text-gray-600">Schedule</span>
                      </div>
                    )}
                    {review.ratings.cost && (
                      <div className="text-center">
                        <div className="flex justify-center mb-1">{renderStars(review.ratings.cost)}</div>
                        <span className="text-xs text-gray-600">Cost</span>
                      </div>
                    )}
                    {review.ratings.willingToRefer && (
                      <div className="text-center">
                        <div className="flex justify-center mb-1">{renderStars(review.ratings.willingToRefer)}</div>
                        <span className="text-xs text-gray-600">Willing to Refer</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Reviewer Info */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">{review.reviewer?.name || 'Anonymous'}</p>
                      <p className="text-sm text-gray-600">
                        {review.reviewer?.designation} at {review.reviewer?.companyName}
                      </p>
                    </div>
                  </div>
                  
                  {review.reviewer?.verified && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Verified
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No reviews found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {primaryCompany 
                ? `No reviews yet for ${primaryCompany.company.companyName}.`
                : "No reviews yet for your claimed company."
              }
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, totalCount)} of {totalCount} reviews
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors flex items-center justify-center"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // Calculate page numbers to show (centered around current page)
                    let startPage = Math.max(1, currentPage - 2);
                    let endPage = Math.min(totalPages, startPage + 4);
                    
                    if (endPage - startPage < 4) {
                      startPage = Math.max(1, endPage - 4);
                    }
                    
                    const page = startPage + i;
                    if (page > endPage) return null;
                    
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                          currentPage === page
                            ? 'bg-[#265ba3] text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors flex items-center justify-center"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}