"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { checkUserAuth } from '@/services/userApi';
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic';
import CompanySearch from './components/CompanySearch';
import HowItWorks from './components/HowItWorks';
import WhyReviewMatters from './components/WhyReviewMatters';
import ReviewTips from './components/ReviewTips';
import ReviewForm from './components/ReviewForm';

// Dynamically import the AuthForm to avoid SSR issues
const AuthForm = dynamic(() => import('@/Componenets/ui/AuthForm'), { ssr: false });

export default function WriteReviewPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [currentStep, setCurrentStep] = useState(1); // 1: Select Product, 2: Project Info, 3: Ratings, 4: Review Details, 5: Finished
  const [reviewFormStep, setReviewFormStep] = useState(1); // Track ReviewForm sub-steps

  // Check if user is already logged in
  useEffect(() => {
    const checkUserAuthStatus = async () => {
      try {
        const data = await checkUserAuth();
        if (data.ok) {
          setUser(data.user);
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUserAuthStatus();
  }, []);

  // Listen for showAuthForm event from ReviewForm
  useEffect(() => {
    const handleShowAuthForm = () => {
      setShowAuthForm(true);
    };

    window.addEventListener('showAuthForm', handleShowAuthForm);
    return () => {
      window.removeEventListener('showAuthForm', handleShowAuthForm);
    };
  }, []);

  // Handle successful authentication
  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setShowAuthForm(false);
    toast.success('Welcome! You are now logged in.');
  };

  // Handle review form step changes
  const handleReviewFormStepChange = (step) => {
    setReviewFormStep(step);
    // Update the main step to reflect the review form steps
    if (currentStep === 2) { // We're in the review process
      if (step === 1) {
        setCurrentStep(2); // Project Information
      } else if (step === 2) {
        setCurrentStep(3); // Ratings
      } else if (step === 3) {
        setCurrentStep(4); // Review Details
      }
    }
  };

  // Handle company selection - stay on the same page but move to next step
  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
    setCurrentStep(2); // Move to "Project Information" step
    setReviewFormStep(1);
  };

  // Handle review submitted
  const handleReviewSubmitted = () => {
    setCurrentStep(5); // Move to "Finished!" step
  };

  // Handle going back to company selection
  const handleBackToSelection = () => {
    setCurrentStep(1);
    setSelectedCompany(null);
    setReviewFormStep(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f0f4f8] to-[#e2e8f0]">
        {/* Hero Section Skeleton */}
        <section className="relative bg-gradient-to-br from-[#f0f4f8] to-[#e2e8f0] py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-8 animate-pulse"></div>
            <div className="max-w-2xl mx-auto">
              <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Main Content Skeleton */}
        <div className="w-full mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-6 animate-pulse"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f4f8] to-[#e2e8f0]">
       <div className="bg-gradient-to-br from-[#f0f4f8] to-[#e2e8f0]">
      {/* Header with Logo and Progress Bar */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
             
              <span className="ml-3 text-xl font-medium text-black">Write a Review</span>
            </div>

            {/* Progress Bar - Updated to match landing page design */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Step 1 - Select Product */}
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded-full ${
                  currentStep >= 1 ? "bg-[#4897de]" : "bg-gray-300"
                }`}></div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= 1 ? "text-black" : "text-gray-500"
                }`}>
                  {currentStep > 1 ? "Product Selected" : "Select Product"}
                </span>
              </div>
              
              {/* Connector */}
              <div className={`w-16 h-0.5 ${currentStep > 2 ? "bg-[#4897de]" : "bg-gray-300"}`}></div>
              
              {/* Step 2 - Project Information */}
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded-full ${
                  currentStep >= 2 ? "bg-[#4897de]" : "bg-gray-300"
                }`}></div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= 2 ? "text-black" : "text-gray-500"
                }`}>
                  {currentStep >= 2 ? (
                    currentStep > 2 ? "Project Info Complete" : "Project Information"
                  ) : (
                    "Project Information"
                  )}
                </span>
              </div>
              
              {/* Connector */}
              <div className={`w-16 h-0.5 ${currentStep > 3 ? "bg-[#4897de]" : "bg-gray-300"}`}></div>
              
              {/* Step 3 - Ratings */}
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded-full ${
                  currentStep >= 3 ? "bg-[#4897de]" : "bg-gray-300"
                }`}></div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= 3 ? "text-black" : "text-gray-500"
                }`}>
                  {currentStep >= 3 ? (
                    currentStep > 3 ? "Ratings Complete" : "Ratings"
                  ) : (
                    "Ratings"
                  )}
                </span>
              </div>
              
              {/* Connector */}
              <div className={`w-16 h-0.5 ${currentStep > 4 ? "bg-[#4897de]" : "bg-gray-300"}`}></div>
              
              {/* Step 4 - Review Details */}
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded-full ${
                  currentStep >= 4 ? "bg-[#4897de]" : "bg-gray-300"
                }`}></div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= 4 ? "text-black" : "text-gray-500"
                }`}>
                  {currentStep >= 4 ? (
                    currentStep > 4 ? "Review Submitted" : "Review Details"
                  ) : (
                    "Review Details"
                  )}
                </span>
              </div>
              
              {/* Connector */}
              <div className="w-16 h-0.5 bg-gray-300"></div>
              
              {/* Step 5 - Finished */}
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded-full ${
                  currentStep >= 5 ? "bg-[#0249aa]" : "bg-gray-300"
                }`}></div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= 5 ? "text-black" : "text-gray-500"
                }`}>
                  Finished!
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Conditionally render based on current step */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentStep === 1 && (
          // Step 1: Select Product
          <div className="text-center">
            {/* Main Heading */}
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Your feedback can make a BIG impact
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Share your experiences by writing reviews of the software and services you use at work.
            </p>

            {/* Search Section */}
            <div className="max-w-2xl mx-auto">
              <CompanySearch onCompanySelect={handleCompanySelect} />
            </div>
          </div>
        )}

        {currentStep >= 2 && currentStep <= 4 && selectedCompany && (
          // Steps 2-4: Review Form Steps
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-black">
                Review {selectedCompany.companyName}
              </h1>
              <button 
                onClick={handleBackToSelection}
                className="text-[#4897de] hover:text-[#0249aa] font-medium"
              >
                Change Product
              </button>
            </div>
            <ReviewForm 
              selectedCompany={selectedCompany} 
              user={user} 
              onReviewSubmitted={handleReviewSubmitted} 
              onStepChange={handleReviewFormStepChange}
            />
          </div>
        )}

        {currentStep === 5 && (
          // Step 5: Finished
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="bg-[#0249aa] text-white rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-black mb-4">Thank You!</h2>
            <p className="text-[#4897de] mb-8 text-lg max-w-2xl mx-auto">
              Your review has been submitted successfully. Thank you for taking the time to share your experience.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => router.push('/')}
                className="px-6 py-3 bg-gradient-to-r from-[#4897de] to-[#0249aa] text-white rounded-xl font-semibold hover:from-[#0249aa] hover:to-[#4897de] transition-all shadow-md hover:shadow-lg duration-300"
              >
                Back to Home
              </button>
              <button
                onClick={handleBackToSelection}
                className="px-6 py-3 bg-white text-black border-2 border-[#4897de] rounded-xl font-semibold hover:bg-[#f0f4f8] transition-all"
              >
                Write Another Review
              </button>
            </div>
          </div>
        )}
      </main>
    </div>

    {/* Additional Sections - Only shown on Step 1 */}
    {currentStep === 1 && (
      <div className="bg-white py-16">
        <div className="w-full mx-auto px-4 space-y-16">
          {/* How It Works Section */}
          <HowItWorks />
          
          {/* Why Reviews Matter Section */}
          <WhyReviewMatters />
          
          {/* Review Tips Section */}
          <ReviewTips />
        </div>
      </div>
    )}

      {/* Auth Form Popup */}
      {showAuthForm && (
        <AuthForm 
          onClose={() => setShowAuthForm(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      )}
    </div>
  );
}