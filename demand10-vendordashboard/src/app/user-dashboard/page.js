"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUserClaims, getVendorCompanyReviews } from '@/services/userApi';
import Link from 'next/link';
import { Building, Star, PlusCircle, Edit3, MessageSquare, Search } from 'lucide-react';

export default function UserDashboardPage() {
  const [claims, setClaims] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [primaryCompany, setPrimaryCompany] = useState(null);
  const router = useRouter();

  // Helper function to format dates safely
  const formatDate = (dateString) => {
    if (!dateString) return 'Date not available';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Date not available';
      }
      return date.toLocaleDateString();
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Date not available';
    }
  };

  // Skeleton Components
  const SkeletonClaimCard = () => (
    <div className="border border-gray-200 rounded-xl p-5 animate-pulse transition-all duration-300 hover:shadow-md">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="h-7 bg-gray-200 rounded-full w-20"></div>
      </div>
    </div>
  );

  const SkeletonReviewCard = () => (
    <div className="border border-gray-200 rounded-xl p-5 animate-pulse transition-all duration-300 hover:shadow-md">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-3 flex-1">
          <div className="h-5 bg-gray-200 rounded w-1/2"></div>
          <div className="h-6 bg-gray-200 rounded w-20"></div>
        </div>
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-5 w-5 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
      <div className="space-y-3 mb-3">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-4/5"></div>
      </div>
      <div className="flex justify-between items-center">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-4 bg-gray-200 rounded w-20"></div>
      </div>
    </div>
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [claimsData, reviewsData] = await Promise.all([
          getUserClaims(),
          getVendorCompanyReviews(1, 5) // Get first 5 reviews for preview
        ]);

        if (claimsData.ok) {
          setClaims(claimsData.claims);
          
          // Set primary company for display purposes
          const approvedClaims = claimsData.claims.filter(claim => claim.status === 'approved');
          if (approvedClaims.length > 0) {
            const listingFormCompany = approvedClaims.find(claim => 
              claim.company.submittedThroughListingForm
            );
            setPrimaryCompany(listingFormCompany || approvedClaims[0]);
          }
        }

        if (reviewsData.ok) {
          setReviews(reviewsData.reviews || []);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        {/* Welcome Section Skeleton */}
        <div className="bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] rounded-2xl shadow-xl p-8 text-white">
          <div className="animate-pulse">
            <div className="h-9 bg-white bg-opacity-20 rounded w-2/3 mb-3"></div>
            <div className="h-6 bg-white bg-opacity-15 rounded w-1/2"></div>
          </div>
        </div>

        {/* Claims and Reviews Section Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Claims Skeleton */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="h-7 bg-gray-200 rounded w-36 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded-full w-20 animate-pulse"></div>
            </div>
            
            <div className="space-y-5">
              {[...Array(3)].map((_, index) => (
                <SkeletonClaimCard key={index} />
              ))}
            </div>
            
            <div className="mt-8">
              <div className="h-5 bg-gray-200 rounded w-44 animate-pulse"></div>
            </div>
          </div>

          {/* Company Reviews Skeleton */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="h-7 bg-gray-200 rounded w-40 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded-full w-24 animate-pulse"></div>
            </div>
            
            <div className="space-y-5">
              {[...Array(3)].map((_, index) => (
                <SkeletonReviewCard key={index} />
              ))}
            </div>
            
            <div className="mt-8">
              <div className="h-5 bg-gray-200 rounded w-36 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Quick Actions Skeleton */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transition-all duration-300 hover:shadow-xl">
          <div className="h-7 bg-gray-200 rounded w-36 mb-6 animate-pulse"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            <div className="bg-gray-100 p-6 rounded-2xl animate-pulse transition-all duration-300 hover:shadow-md">
              <div className="h-10 w-10 bg-gray-200 rounded-xl mx-auto mb-3"></div>
              <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] rounded-2xl shadow-xl p-8 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          {primaryCompany 
            ? `Welcome to ${primaryCompany.company.companyName} Dashboard`
            : "Welcome to Your Dashboard"
          }
        </h1>
        <p className="text-lg md:text-xl opacity-90 max-w-3xl">
          {primaryCompany 
            ? `Manage your company listings, reviews, and business information`
            : "Manage your company claims, reviews, and listings all in one place"
          }
        </p>
      </div>

     
      {/* Claims and Reviews Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Claims */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Your Companies</h3>
            <span className="text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">{claims.length} total</span>
          </div>
          
          {claims.length > 0 ? (
            <div className="space-y-5">
              {claims.slice(0, 2).map((claim) => (
                <div key={claim._id} className="border border-gray-200 rounded-xl p-5 transition-all duration-300 hover:shadow-md hover:border-blue-300">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">{claim.companyName}</h4>
                      <p className="text-sm text-gray-600 mt-2">
                        Submitted: {formatDate(claim.createdAt)}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      claim.status === 'approved' ? 'bg-green-100 text-green-800' :
                      claim.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                    </span>
                  </div>
                  {claim.status === 'rejected' && claim.rejectionReason && (
                    <p className="text-sm text-red-600 mt-3 bg-red-50 p-3 rounded-lg">Reason: {claim.rejectionReason}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Building className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No claims yet</h3>
              <p className="text-gray-600 mb-4">Get started by submitting your first company claim.</p>
              <Link 
                href="https://demand10.com/listing"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors"
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Submit a claim
              </Link>
            </div>
          )}
          
         
        </div>

        {/* Company Reviews */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Company Reviews</h3>
            <span className="text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">{reviews.length} recent</span>
          </div>
          
          {reviews.length > 0 ? (
            <div className="space-y-5">
              {reviews.slice(0, 2).map((review) => (
                <div key={review._id} className="border border-gray-200 rounded-xl p-5 transition-all duration-300 hover:shadow-md hover:border-blue-300">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-bold text-gray-900">{review.company?.companyName}</h4>
                      <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">
                        {primaryCompany && review.company?._id === primaryCompany.company._id ? 'Your Company' : 'Company Review'}
                      </span>
                    </div>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-5 w-5 ${i < (review.overallRating || review.rating) ? 'fill-current' : ''}`} 
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 mt-3 line-clamp-2">
                    {review.reviewText || review.review}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-sm text-gray-600">
                      By {review.reviewer?.name || 'Anonymous'} • {formatDate(review.createdAt)}
                    </p>
                    {review.reviewer?.verified && (
                      <span className="text-xs text-green-600 font-semibold bg-green-100 px-2 py-1 rounded">✓ Verified</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <MessageSquare className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No reviews yet</h3>
              <p className="text-gray-600 mb-4">
                {claims.filter(c => c.status === 'approved').length > 0 
                  ? "No reviews yet for your claimed companies."
                  : "Claim a company to see its reviews here."
                }
              </p>
              <Link 
                href="https://demand10.com/review"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                {claims.filter(c => c.status === 'approved').length > 0 ? "Write a review" : "Claim a company"}
              </Link>
            </div>
          )}
          
          <div className="mt-6 pt-4 border-t border-gray-100">
            {claims.filter(c => c.status === 'approved').length > 0 ? (
              <Link 
                href="https://demand10.com/review"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                View all reviews
              </Link>
            ) : (
              <Link 
                href="https://demand10.com/review"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors"
              >
                <Building className="mr-2 h-5 w-5" />
                Claim a company first
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transition-all duration-300 hover:shadow-xl">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          <Link
            href="/user-dashboard/edit-companies"
            className="bg-gradient-to-br from-[#265ba3] to-[#1a365d] text-white p-6 rounded-2xl transition-all duration-300 text-center block shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <div className="flex justify-center mb-3">
              <Edit3 className="h-8 w-8" />
            </div>
            <div className="font-bold text-lg">Edit Companies</div>
            <p className="text-sm opacity-90 mt-1">Manage your listings</p>
          </Link>

          <Link
            href="https://demand10.com/listing"
            className="bg-gradient-to-br from-[#f59e0b] to-[#d97706] text-white p-6 rounded-2xl transition-all duration-300 text-center block shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <div className="flex justify-center mb-3">
              <PlusCircle className="h-8 w-8" />
            </div>
            <div className="font-bold text-lg">Add Company</div>
            <p className="text-sm opacity-90 mt-1">Submit new listing</p>
          </Link>

          <Link
            href="https://demand10.com/review"
            className="bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] text-white p-6 rounded-2xl transition-all duration-300 text-center block shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <div className="flex justify-center mb-3">
              <MessageSquare className="h-8 w-8" />
            </div>
            <div className="font-bold text-lg">Write Review</div>
            <p className="text-sm opacity-90 mt-1">Share your experience</p>
          </Link>

          <Link
            href="https://demand10.com"
            className="bg-gradient-to-br from-[#10b981] to-[#059669] text-white p-6 rounded-2xl transition-all duration-300 text-center block shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <div className="flex justify-center mb-3">
              <Search className="h-8 w-8" />
            </div>
            <div className="font-bold text-lg">Browse</div>
            <p className="text-sm opacity-90 mt-1">Explore companies</p>
          </Link>
        </div>
      </div>
    </div>
  );
}