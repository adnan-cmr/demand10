import { useState, useEffect, useMemo, useCallback } from 'react';
import { getCompanyReviews, getCompanyReviewsById } from '@/services/api';
import { checkUserAuth } from '@/services/userApi';
import { useRouter } from 'next/navigation';
import { FaBriefcase, FaUserCircle, FaIndustry, FaMapMarkerAlt, FaUsers, FaPhoneAlt, FaCheckCircle } from 'react-icons/fa';
import Link from 'next/link';

const CompanyReviews = ({ companyId, companySlug, initialReviewsData }) => {
  const [reviews, setReviews] = useState(initialReviewsData?.reviews || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(initialReviewsData?.currentPage || 1);
  const [hasMore, setHasMore] = useState((initialReviewsData?.currentPage || 1) < (initialReviewsData?.totalPages || 1));
  const [averageRating, setAverageRating] = useState(initialReviewsData?.averageRating || 0);
  const [totalReviews, setTotalReviews] = useState(initialReviewsData?.totalReviews || 0);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const router = useRouter();

  const fetchReviews = useCallback(async () => {
    // Skip fetching if we already have initial data for page 1
    if (page === 1 && initialReviewsData && initialReviewsData.ok) {
      return;
    }

    try {
      setLoading(true);
      
      let response;
      if (companySlug) {
        response = await getCompanyReviews(companySlug, page, 10);
      } else if (companyId) {
        response = await getCompanyReviewsById(companyId, page, 10);
      } else {
        setError('Company ID or slug is required to fetch reviews');
        setLoading(false);
        return;
      }
      
      if (response.ok) {
        if (page === 1) {
          setReviews(response.reviews);
          setAverageRating(response.averageRating || 0);
          setTotalReviews(response.totalReviews || response.reviews.length);
        } else {
          setReviews(prev => [...prev, ...response.reviews]);
        }
        setHasMore(response.currentPage < response.totalPages);
      } else {
        setError(response.message || 'Failed to fetch reviews');
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError('Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  }, [page, companySlug, companyId, initialReviewsData]);

   // Fetch reviews when component mounts or page changes
  useEffect(() => {
    fetchReviews();
  }, [page, fetchReviews]);
  
  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const handleWriteReviewClick = async () => {
    try {
      const authData = await checkUserAuth();
      if (authData.ok) {
        // User is authenticated, redirect to user dashboard
        router.push("/review");
      } else {
        // User is not authenticated, show login popup
        setShowLoginPopup(true);
      }
    } catch (err) {
      console.error('Authentication check failed:', err);
      // Show login popup on error as well
      setShowLoginPopup(true);
    }
  };


  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-[#4897de]" aria-label="Full star">★</span>);
    }
    
    const emptyStars = 5 - fullStars;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300" aria-label="Empty star">★</span>);
    }
    
    return stars;
  };

  

  // Memoize the review items to prevent unnecessary re-renders
  const reviewItems = useMemo(() => {
    return reviews.map((review) => (
      <article key={review._id} className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white">
        {/* Title */}
        <div className="bg-white p-5 border-b border-gray-200 rounded-t-xl">
          <h3 className="text-xl font-semibold text-gray-900">
            {review.project?.title || 'Web Development for Management Consulting Firm'}
          </h3>
        </div>

        {/* Main Review Card */}
        <div className="rounded-b-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* THE PROJECT Section */}
            <div className="lg:col-span-3 bg-white p-5 border-r border-gray-200">
              <h4 className="text-xs font-semibold text-black uppercase tracking-wider mb-3">
                THE PROJECT
              </h4>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-700">Project Type</div>
                  <div className="text-sm text-gray-500 mt-1">{review.project?.type || 'Web Development'}</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-700">Project Budget</div>
                  <div className="text-sm text-gray-500 mt-1">{review.project?.budget || '$200,000 to $999,999'}</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-700">Project Duration</div>
                  <div className="text-sm text-gray-500 mt-1">{review.project?.duration || 'Sep. 2021 - Aug. 2022'}</div>
                </div>
              </div>

              <div className="mt-6">
                <h5 className="text-xs font-semibold text-black uppercase tracking-wider mb-2">
                  PROJECT SUMMARY
                </h5>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {review.project?.summary || 'Denologix developed a website for a consulting firm\'s end client. Denologix developed the site using Java, which collects and systematizes data. They also created the DRO and other work documentation.'}
                </p>
              </div>
            </div>

            {/* THE REVIEW Section - Updated Design */}
            <div className="lg:col-span-6 p-5 bg-white">
              <div className="grid lg:grid-cols-[1.5fr_2fr] gap-6">
                {/* Left Column: Rating & Stats */}
               <div className="flex flex-col items-center">
  {/* Rating Table Container */}
  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden w-full max-w-md shadow-sm">
    
    {/* Rating Display */}
    <div className="flex flex-col items-center text-center border-b border-gray-200 p-6 bg-blue-50">
      <div className="text-5xl font-bold text-black mb-2">
        {(review.overallRating || 5.0).toFixed(1)}
      </div>
      <div className="flex text-2xl">
        {renderStars(review.overallRating || 5.0)}
      </div>
    </div>

    {/* Rating Table */}
    <table className="w-full text-center">
      <tbody>
        {[
          { label: "Quality", value: review.ratings?.quality || 5.0 },
          { label: "Schedule", value: review.ratings?.schedule || 4.5 },
          { label: "Cost", value: review.ratings?.cost || 5.0 },
          { label: "Willing to Refer", value: review.ratings?.willingToRefer || 5.0 },
        ].map((item, index) => (
          <tr
            key={item.label}
            className={index < 3 ? "border-b border-gray-200" : ""}
          >
            <td className="px-4 py-3 text-left">
              <span className="text-gray-700 text-sm font-medium">
                {item.label}
              </span>
            </td>
            <td className="px-4 py-3 text-right">
              <div className="flex items-center justify-end">
                <span className="font-semibold text-black mr-2 text-base">
                  {item.value.toFixed(1)}
                </span>
                <div className="text-black text-base">★</div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

                {/* Right Column: Review Quote & Feedback */}
                <div className="flex flex-col justify-start">
                  <h4 className="text-xs font-semibold text-black uppercase tracking-wider mb-2">
                    THE REVIEW
                  </h4>
                  {/* Review Quote */}
                  <div className="mb-4">
                    <blockquote className="text-gray-800 text-base leading-relaxed italic bg-blue-50 p-4 rounded-lg border-l-4 border-black break-words">
                      &#34;{review.reviewText || review.review || 'They had an in-house team and an offshore team, so they were able to work almost all day.'}&#34;
                    </blockquote>
                  </div>

                  {/* Feedback Summary */}
                  <div>
                    <h5 className="text-xs font-semibold text-black uppercase tracking-wider mb-2">
                      FEEDBACK SUMMARY
                    </h5>
                    <p className="text-gray-700 text-sm leading-relaxed break-words">
                      {review.feedbackSummary || 'The site Denologix developed met the end client&#39;s expectations, and they haven&#39;t had any issues since the site was delivered. Denologix was flexible in dealing with the project&#39;s ambiguity. They met deadlines and communicated effectively through Microsoft Teams meetings and phone calls. This review is an update by the client company. The original content is located below the new review.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* THE REVIEWER Section */}
            <div className="lg:col-span-3 bg-white p-5 border-l border-gray-200">
              <h4 className="text-xs font-semibold text-black uppercase tracking-wider mb-3">
                THE REVIEWER
              </h4>

              <div className="space-y-4">
               <div>
      {/* Reviewer's Name with Icon */}
      <div className="font-semibold text-black flex items-center">
        <FaUserCircle className="mr-2 text-[#4897de]" /> {/* Icon before the name */}
        {review.reviewer?.name || review.reviewerName || 'Claude Collavoli'}
      </div>

      {/* Designation with Icon */}
      <div className="text-sm text-gray-700 mt-1 flex items-center">
        <FaBriefcase className="mr-2 text-[#4897de]" /> {/* Icon before the designation */}
        {review.reviewer?.designation || 'Engagement Manager'}, {review.reviewer?.companyName || 'Solutia SDO'}
      </div>
     
    </div>

                <div className="space-y-3">
                  <div className="flex items-start">
                    <FaIndustry className="w-4 h-4 text-[#4897de] mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">
                      {review.reviewer?.industry || 'Business services'}
                    </span>
                  </div>

                  <div className="flex items-start">
                    <FaMapMarkerAlt className="w-4 h-4 text-[#4897de] mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">
                      {review.reviewer?.location || 'Toronto, Ontario'}
                    </span>
                  </div>

                  <div className="flex items-start">
                    <FaUsers className="w-4 h-4 text-[#4897de] mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">
                      {review.reviewer?.employees || '51-200'} 
                    </span>
                  </div>

                  <div className="flex items-start">
                    <FaPhoneAlt className="w-4 h-4 text-[#4897de] mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">
                      {review.reviewer?.interviewMethod || 'Phone Interview'}
                    </span>
                  </div>

                  <div className="flex items-center pt-2">
                    <FaCheckCircle className="w-4 h-4 text-[#4897de] mr-2 flex-shrink-0" />
                    <span className="text-[#4897de] text-sm font-medium">Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    ));
  }, [reviews]);

  if (loading && reviews.length === 0) {
    return (
      <div className="space-y-6">
        {/* Write Review Section */}
        <div className="bg-[#265ba3] rounded-xl p-6 border border-[#4897de]/20 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white">Share Your Experience</h3>
              <p className="text-gray-200 mt-1">Help others by sharing your experience with this company</p>
            </div>
            <button 
              onClick={handleWriteReviewClick}
              className="bg-white text-black cursor-pointer px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Write a Review
            </button>
          </div>
        </div>
        
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        {/* Write Review Section */}
        <div className="bg-[#4897de] rounded-xl p-6 border border-[#4897de]/20 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white">Share Your Experience</h3>
              <p className="text-gray-200 mt-1">Help others by sharing your experience with this company</p>
            </div>
            <button 
              onClick={handleWriteReviewClick}
              className="bg-white text-black cursor-pointer px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Write a Review
            </button>
          </div>
        </div>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">Error loading reviews: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Write Review Section */}
      <div className="bg-[#265ba3] rounded-xl p-6 border border-[#4897de]/20 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white">Share Your Experience</h3>
            <p className="text-gray-200 mt-1">Help others by sharing your experience with this company</p>
          </div>
          <button 
            onClick={handleWriteReviewClick}
            className="bg-white text-black cursor-pointer px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Write a Review
          </button>
        </div>
      </div>

      {/* Login Popup */}
      {showLoginPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-scaleIn">
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Login Required</h3>
              <p className="text-gray-600 mb-6">You must be logged in to write a review.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLoginPopup(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowLoginPopup(false)}
                  className="flex-1 px-4 py-3 bg-black text-white rounded-lg hover:bg-[#4897de] transition-all shadow-md font-medium"
                >
                  <Link href="/login" className="block w-full h-full text-center">
                    Go to Login
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Show "No reviews yet" message when there are no reviews */}
      {reviews.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
          <p className="text-gray-600">Be the first to review this company!</p>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            {reviewItems}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="text-center pt-4">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="bg-black text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#4897de] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm shadow-md"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Loading more reviews...</span>
                  </div>
                ) : (
                  'Show More Reviews'
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CompanyReviews;