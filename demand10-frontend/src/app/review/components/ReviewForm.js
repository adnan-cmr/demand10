"use client";

import { useState, useEffect } from 'react';
import { submitReview } from '@/services/userApi';
import { toast } from 'react-toastify';
import { 
  FaStar, 
  FaRegStar, 
  FaChartLine,
  FaUserEdit,
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
  FaSpinner,
  FaProjectDiagram,
  FaDollarSign,
  FaCalendarAlt,
  FaClipboardList,
  FaMedal,
  FaClock,
  FaMoneyBillWave,
  FaThumbsUp,
  FaEdit,
  FaUser,
  FaBuilding,
  FaIndustry,
  FaMapMarkerAlt,
  FaUsers,
  FaPhone,
  FaInfoCircle
} from 'react-icons/fa';

export default function ReviewForm({ selectedCompany, user, onReviewSubmitted, onStepChange }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  
  // Enhanced form data structure (reusing from dashboard)
  const [formData, setFormData] = useState({
    // Project Details
    project: {
      title: '',
      type: '',
      budget: '',
      duration: '',
      summary: ''
    },
    
    // Overall Rating
    overallRating: 0,
    
    // Detailed Ratings
    ratings: {
      quality: 0,
      schedule: 0,
      cost: 0,
      willingToRefer: 0
    },
    
    // Review Text
    reviewText: '',
    feedbackSummary: '',
    
    // Reviewer Info
    reviewer: {
      name: '',
      designation: '',
      companyName: '',
      industry: '',
      location: '',
      employees: '',
      interviewMethod: ''
    }
  });

  // Debugging: Log the props to see what's being passed
  console.log('ReviewForm props:', { selectedCompany, user, onReviewSubmitted });
  
  // Effect to log when user changes
  useEffect(() => {
    console.log('User state updated in ReviewForm:', user);
  }, [user]);
  
  // If user is not authenticated, show sign-in prompt
  if (!user) {
    return (
      <div className="bg-white mx-auto text-center transition-all">
        <div className="bg-gradient-to-br from-[#4897de] to-[#0249aa] text-white rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <FaUserEdit className="h-10 w-10" />
        </div>
        <h2 className="text-3xl font-bold text-black mb-4">Sign In to Write Review</h2>
        <p className="text-gray-600 mb-8 text-lg max-w-xl mx-auto">
          You need to be signed in to write a review for <span className="font-semibold">{selectedCompany?.companyName || 'this company'}</span>. 
          Please sign in or create an account to continue.
        </p>
        
        <button
          onClick={() => {
            // This will be handled by the parent component
            // We'll trigger an event to show the auth form
            const event = new CustomEvent('showAuthForm');
            window.dispatchEvent(event);
          }}
          className="px-6 py-3 bg-gradient-to-br from-[#4897de] to-[#0249aa] text-white rounded-xl font-semibold hover:from-[#0249aa] hover:to-[#4897de] transition-all shadow-md hover:shadow-lg duration-300 flex items-center mx-auto"
        >
          <FaUserEdit className="mr-2" />
          Sign In to Write Review
        </button>
        
        <div className="mt-6 text-gray-600">
          <p>Already have an account? 
            <span 
              className="text-[#4897de] font-semibold cursor-pointer hover:underline ml-1"
              onClick={() => {
                const event = new CustomEvent('showAuthForm');
                window.dispatchEvent(event);
              }}
            >
              Sign in
            </span> to continue
          </p>
          <p className="mt-2">New user? 
            <span 
              className="text-[#4897de] font-semibold cursor-pointer hover:underline ml-1"
              onClick={() => {
                const event = new CustomEvent('showAuthForm');
                window.dispatchEvent(event);
              }}
            >
              Create an account
            </span> to get started
          </p>
        </div>
      </div>
    );
  }
  
  // If we have a user but no selectedCompany, show an error
  if (!selectedCompany) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto text-center border border-gray-200">
        <div className="bg-red-500 text-white rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
          <FaInfoCircle className="h-10 w-10" />
        </div>
        <h2 className="text-3xl font-bold text-black mb-4">Error Loading Company</h2>
        <p className="text-gray-600 mb-8 text-lg max-w-xl mx-auto">
          There was an error loading the company information. Please try again later.
        </p>
        
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-gradient-to-br from-[#4897de] to-[#0249aa] text-white rounded-xl font-semibold hover:from-[#0249aa] hover:to-[#4897de] transition-all shadow-md hover:shadow-lg duration-300 flex items-center mx-auto"
        >
          <FaArrowLeft className="mr-2" />
          Try Again
        </button>
      </div>
    );
  }

  // Options for dropdowns (reusing from dashboard)
  const projectTypes = [
    "Web Development",
    "Mobile App Development",
    "Software Development",
    "IT Consulting",
    "Cloud Services",
    "Cybersecurity",
    "Data Analytics",
    "AI/Machine Learning",
    "UI/UX Design",
    "DevOps",
    "Other"
  ];

  const budgetRanges = [
    "Less than $50,000",
    "$50,000 to $99,999",
    "$100,000 to $199,999",
    "$200,000 to $499,999",
    "$500,000 to $999,999",
    "$1,000,000 or more"
  ];

  const durationRanges = [
    "Less than 1 month",
    "1-3 months",
    "3-6 months",
    "6-12 months",
    "1-2 years",
    "More than 2 years"
  ];

  const industries = [
    "Technology",
    "Finance",
    "Healthcare",
    "Retail",
    "Manufacturing",
    "Education",
    "Government",
    "Media & Entertainment",
    "Telecommunications",
    "Energy",
    "Transportation",
    "Real Estate",
    "Other"
  ];

  const employeeRanges = [
    "1-10 Employees",
    "11-50 Employees",
    "51-200 Employees",
    "201-500 Employees",
    "501-1,000 Employees",
    "1,001-5,000 Employees",
    "5,001-10,000 Employees",
    "10,001+ Employees"
  ];

  const interviewMethods = [
    "In-person Meeting",
    "Phone Interview",
    "Video Conference",
    "Email Correspondence",
    "Online Survey",
    "Other"
  ];

  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      project: {
        ...formData.project,
        [name]: value
      }
    });
    
    // Clear error when user starts typing
    if (errors[`project.${name}`]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`project.${name}`];
        return newErrors;
      });
    }
  };

  const handleRatingChange = (ratingType, rating) => {
    if (ratingType === 'overall') {
      setFormData({
        ...formData,
        overallRating: rating
      });
      if (errors.overallRating) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.overallRating;
          return newErrors;
        });
      }
    } else {
      setFormData({
        ...formData,
        ratings: {
          ...formData.ratings,
          [ratingType]: rating
        }
      });
      if (errors[`ratings.${ratingType}`]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[`ratings.${ratingType}`];
          return newErrors;
        });
      }
    }
  };

  const handleReviewerChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      reviewer: {
        ...formData.reviewer,
        [name]: value
      }
    });
    
    // Clear error when user starts typing
    if (errors[`reviewer.${name}`]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`reviewer.${name}`];
        return newErrors;
      });
    }
  };

  const handleReviewTextChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Function to render star ratings with improved styling and React icons
  const renderStarRating = (currentRating, ratingType) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRatingChange(ratingType, star)}
            className={`text-2xl transition-all duration-200 ${
              star <= currentRating 
                ? 'text-yellow-400 transform scale-110' 
                : 'text-gray-300 hover:text-yellow-300'
            } focus:outline-none`}
            aria-label={`Rate ${star} out of 5 stars`}
          >
            {star <= currentRating ? (
              <FaStar />
            ) : (
              <FaRegStar />
            )}
          </button>
        ))}
      </div>
    );
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1: // Project Information
        if (!formData.project.title.trim()) {
          newErrors['project.title'] = 'Project title is required';
        }
        
        if (!formData.project.type) {
          newErrors['project.type'] = 'Project type is required';
        }
        break;
        
      case 2: // Ratings
        if (formData.overallRating === 0) {
          newErrors.overallRating = 'Please provide an overall rating';
        }
        
        if (formData.ratings.quality === 0) {
          newErrors['ratings.quality'] = 'Please rate quality';
        }
        
        if (formData.ratings.schedule === 0) {
          newErrors['ratings.schedule'] = 'Please rate schedule';
        }
        
        if (formData.ratings.cost === 0) {
          newErrors['ratings.cost'] = 'Please rate cost';
        }
        
        if (formData.ratings.willingToRefer === 0) {
          newErrors['ratings.willingToRefer'] = 'Please rate willingness to refer';
        }
        break;
        
      case 3: // Review Details & Reviewer Info
        if (!formData.reviewText.trim()) {
          newErrors.reviewText = 'Review text is required';
        }
        
        if (!formData.reviewer.name.trim()) {
          newErrors['reviewer.name'] = 'Your name is required';
        }
        break;
        
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      const nextStep = Math.min(currentStep + 1, 3);
      setCurrentStep(nextStep);
      // Notify parent about step change
      if (onStepChange) {
        onStepChange(nextStep);
      }
    } else {
        toast.error('Please fix the errors before proceeding', {
        style: {
          backgroundColor: '#4897de',
          color: 'white'
        }
      });
    }
  };

  const handlePrev = () => {
    const prevStep = Math.max(currentStep - 1, 1);
    setCurrentStep(prevStep);
    // Notify parent about step change
    if (onStepChange) {
      onStepChange(prevStep);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) {
      toast.error('Please fix the errors before submitting',{
         style: {
          backgroundColor: '#4897de',
          color: 'white'
        }
      });
       
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const reviewData = {
        companySlug: selectedCompany.slug,
        ...formData
      };
      
      const response = await submitReview(reviewData);
      
      if (response.ok) {
        toast.success('Review submitted successfully!',{
           style: {
          backgroundColor: '#4897de',
          color: 'white'
        }
        });
        // Reset form
        setFormData({
          project: {
            title: '',
            type: '',
            budget: '',
            duration: '',
            summary: ''
          },
          overallRating: 0,
          ratings: {
            quality: 0,
            schedule: 0,
            cost: 0,
            willingToRefer: 0
          },
          reviewText: '',
          feedbackSummary: '',
          reviewer: {
            name: '',
            designation: '',
            companyName: '',
            industry: '',
            location: '',
            employees: '',
            interviewMethod: ''
          }
        });
        onReviewSubmitted();
      } else {
        toast.error(response.message || 'Failed to submit review',{
           style: {
          backgroundColor: '#4897de',
          color: 'white'
        }
        });
        
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review',{
         style: {
          backgroundColor: '#4897de',
          color: 'white'
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Word count helper
  const getWordCount = (text) => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };

  // Render step content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 transition-all hover:shadow-xl">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-br from-[#4897de] to-[#0249aa] rounded-xl p-3 mr-4 shadow-md">
                <FaProjectDiagram className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-black">Project Information</h2>
                <p className="text-gray-600 text-sm mt-1">Share details about your project with this company</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label htmlFor="project.title" className="block text-sm font-semibold text-gray-800">
                  Project Title *
                </label>
                <input
                  type="text"
                  id="project.title"
                  name="title"
                  value={formData.project.title}
                  onChange={handleProjectChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#4897de] focus:border-[#4897de] transition-all ${
                    errors['project.title'] ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="e.g., Web Development for Management Consulting Firm"
                  disabled={isSubmitting}
                />
                {errors['project.title'] && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <FaInfoCircle className="mr-1 text-xs" />
                    {errors['project.title']}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="project.type" className="block text-sm font-semibold text-gray-800">
                  Project Type *
                </label>
                <select
                  id="project.type"
                  name="type"
                  value={formData.project.type}
                  onChange={handleProjectChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#4897de] focus:border-[#4897de] transition-all ${
                    errors['project.type'] ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  disabled={isSubmitting}
                >
                  <option value="">Select project type</option>
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors['project.type'] && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <FaInfoCircle className="mr-1 text-xs" />
                    {errors['project.type']}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="project.budget" className="block text-sm font-semibold text-gray-800">
                  <span className="flex items-center">
                    <FaDollarSign className="mr-2 text-xs" />
                    Project Budget
                  </span>
                </label>
                <select
                  id="project.budget"
                  name="budget"
                  value={formData.project.budget}
                  onChange={handleProjectChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4897de] focus:border-[#4897de] hover:border-gray-400 transition-all"
                  disabled={isSubmitting}
                >
                  <option value="">Select budget range</option>
                  {budgetRanges.map((range) => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="project.duration" className="block text-sm font-semibold text-gray-800">
                  <span className="flex items-center">
                    <FaCalendarAlt className="mr-2 text-xs" />
                    Project Duration
                  </span>
                </label>
                <select
                  id="project.duration"
                  name="duration"
                  value={formData.project.duration}
                  onChange={handleProjectChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4897de] focus:border-[#4897de] hover:border-gray-400 transition-all"
                  disabled={isSubmitting}
                >
                  <option value="">Select duration</option>
                  {durationRanges.map((range) => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mt-6 space-y-2">
              <label htmlFor="project.summary" className="block text-sm font-semibold text-gray-800">
                <span className="flex items-center">
                  <FaClipboardList className="mr-2 text-xs" />
                  Project Summary
                </span>
              </label>
              <textarea
                id="project.summary"
                name="summary"
                value={formData.project.summary}
                onChange={handleProjectChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4897de] focus:border-[#4897de] hover:border-gray-400 transition-all"
                placeholder="Briefly describe the project and its objectives..."
                disabled={isSubmitting}
              ></textarea>
              <div className="flex justify-end">
                <span className="text-xs text-gray-500">
                  {getWordCount(formData.project.summary)} words
                </span>
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 transition-all hover:shadow-xl">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-br from-[#4897de] to-[#0249aa] rounded-xl p-3 mr-4 shadow-md">
                <FaChartLine className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-black">Ratings</h2>
                <p className="text-gray-600 text-sm mt-1">Rate your experience with this company</p>
              </div>
            </div>
            
            {/* Overall Rating */}
            <div className="mb-8 p-6 bg-[#f8fafc] rounded-xl border border-black/20">
              <label className="block text-lg font-semibold text-black mb-4">
                Overall Rating * 
                {errors.overallRating && (
                  <span className="text-red-600 text-base font-normal ml-2 flex items-center">
                    <FaInfoCircle className="mr-1 text-sm" />
                    {errors.overallRating}
                  </span>
                )}
              </label>
              <div className="flex flex-col sm:flex-row items-start sm:items-center">
                <div className="mr-6 mb-4 sm:mb-0">
                  {renderStarRating(formData.overallRating, 'overall')}
                </div>
                <div className="text-2xl font-bold text-black bg-white px-4 py-2 rounded-lg shadow border border-gray-200">
                  {formData.overallRating}.0
                </div>
              </div>
            </div>
            
            {/* Detailed Ratings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <label className="block text-sm font-semibold text-black mb-3 flex items-center">
                  <FaMedal className="mr-2 text-[#4897de]" />
                  Quality * 
                  {errors['ratings.quality'] && (
                    <span className="text-red-600 text-sm font-normal ml-2 flex items-center">
                      <FaInfoCircle className="mr-1 text-xs" />
                      {errors['ratings.quality']}
                    </span>
                  )}
                </label>
                <div className="mt-1">
                  {renderStarRating(formData.ratings.quality, 'quality')}
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <label className="block text-sm font-semibold text-black mb-3 flex items-center">
                  <FaClock className="mr-2 text-[#4897de]" />
                  Schedule * 
                  {errors['ratings.schedule'] && (
                    <span className="text-red-600 text-sm font-normal ml-2 flex items-center">
                      <FaInfoCircle className="mr-1 text-xs" />
                      {errors['ratings.schedule']}
                    </span>
                  )}
                </label>
                <div className="mt-1">
                  {renderStarRating(formData.ratings.schedule, 'schedule')}
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <label className="block text-sm font-semibold text-black mb-3 flex items-center">
                  <FaMoneyBillWave className="mr-2 text-[#4897de]" />
                  Cost * 
                  {errors['ratings.cost'] && (
                    <span className="text-red-600 text-sm font-normal ml-2 flex items-center">
                      <FaInfoCircle className="mr-1 text-xs" />
                      {errors['ratings.cost']}
                    </span>
                  )}
                </label>
                <div className="mt-1">
                  {renderStarRating(formData.ratings.cost, 'cost')}
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <label className="block text-sm font-semibold text-black mb-3 flex items-center">
                  <FaThumbsUp className="mr-2 text-[#4897de]" />
                  Willing to Refer * 
                  {errors['ratings.willingToRefer'] && (
                    <span className="text-red-600 text-sm font-normal ml-2 flex items-center">
                      <FaInfoCircle className="mr-1 text-xs" />
                      {errors['ratings.willingToRefer']}
                    </span>
                  )}
                </label>
                <div className="mt-1">
                  {renderStarRating(formData.ratings.willingToRefer, 'willingToRefer')}
                </div>
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            {/* Review Text Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 transition-all hover:shadow-xl">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-[#4897de] to-[#0249aa] rounded-xl p-3 mr-4 shadow-md">
                  <FaEdit className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-black">Review Details</h2>
                  <p className="text-gray-600 text-sm mt-1">Share your detailed experience with this company</p>
                </div>
              </div>
              
              <div className="mb-6 space-y-2">
                <label htmlFor="reviewText" className="block text-sm font-semibold text-black">
                  Detailed Review * 
                  {errors.reviewText && (
                    <span className="text-red-600 text-sm font-normal ml-2 flex items-center">
                      <FaInfoCircle className="mr-1 text-xs" />
                      {errors.reviewText}
                    </span>
                  )}
                </label>
                <textarea
                  id="reviewText"
                  name="reviewText"
                  value={formData.reviewText}
                  onChange={handleReviewTextChange}
                  rows={6}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#4897de] focus:border-[#4897de] transition-all ${
                    errors.reviewText ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="Share your detailed experience with this company. What went well? What could have been improved?"
                  disabled={isSubmitting}
                ></textarea>
                <div className="flex justify-end">
                  <span className="text-xs text-gray-500">
                    {getWordCount(formData.reviewText)} words
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="feedbackSummary" className="block text-sm font-semibold text-black">
                  Feedback Summary
                </label>
                <textarea
                  id="feedbackSummary"
                  name="feedbackSummary"
                  value={formData.feedbackSummary}
                  onChange={handleReviewTextChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4897de] focus:border-[#4897de] hover:border-gray-400 transition-all"
                  placeholder="Provide a brief summary of your feedback..."
                  disabled={isSubmitting}
                ></textarea>
                <div className="flex justify-end">
                  <span className="text-xs text-gray-500">
                    {getWordCount(formData.feedbackSummary)} words
                  </span>
                </div>
              </div>
            </div>
            
            {/* Reviewer Information Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 transition-all hover:shadow-xl">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-[#4897de] to-[#0249aa] rounded-xl p-3 mr-4 shadow-md">
                  <FaUserEdit className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-black">Reviewer Information</h2>
                  <p className="text-gray-600 text-sm mt-1">Your details for this review</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="reviewer.name" className="block text-sm font-semibold text-black">
                    <span className="flex items-center">
                      <FaUser className="mr-2 text-xs" />
                      Your Name *
                    </span>
                  </label>
                  <input
                    type="text"
                    id="reviewer.name"
                    name="name"
                    value={formData.reviewer.name}
                    onChange={handleReviewerChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#4897de] focus:border-[#4897de] transition-all ${
                      errors['reviewer.name'] ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder="Enter your full name"
                    disabled={isSubmitting}
                  />
                  {errors['reviewer.name'] && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <FaInfoCircle className="mr-1 text-xs" />
                      {errors['reviewer.name']}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="reviewer.designation" className="block text-sm font-semibold text-black">
                    Your Designation
                  </label>
                  <input
                    type="text"
                    id="reviewer.designation"
                    name="designation"
                    value={formData.reviewer.designation}
                    onChange={handleReviewerChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4897de] focus:border-[#4897de] hover:border-gray-400 transition-all"
                    placeholder="e.g., Project Manager, CTO, etc."
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="reviewer.companyName" className="block text-sm font-semibold text-black">
                    <span className="flex items-center">
                      <FaBuilding className="mr-2 text-xs" />
                      Your Company
                    </span>
                  </label>
                  <input
                    type="text"
                    id="reviewer.companyName"
                    name="companyName"
                    value={formData.reviewer.companyName}
                    onChange={handleReviewerChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4897de] focus:border-[#4897de] hover:border-gray-400 transition-all"
                    placeholder="Enter your company name"
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="reviewer.industry" className="block text-sm font-semibold text-black">
                    <span className="flex items-center">
                      <FaIndustry className="mr-2 text-xs" />
                      Industry
                    </span>
                  </label>
                  <select
                    id="reviewer.industry"
                    name="industry"
                    value={formData.reviewer.industry}
                    onChange={handleReviewerChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4897de] focus:border-[#4897de] hover:border-gray-400 transition-all"
                    disabled={isSubmitting}
                  >
                    <option value="">Select industry</option>
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="reviewer.location" className="block text-sm font-semibold text-black">
                    <span className="flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-xs" />
                      Location
                    </span>
                  </label>
                  <input
                    type="text"
                    id="reviewer.location"
                    name="location"
                    value={formData.reviewer.location}
                    onChange={handleReviewerChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4897de] focus:border-[#4897de] hover:border-gray-400 transition-all"
                    placeholder="e.g., New York, NY or London, UK"
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="reviewer.employees" className="block text-sm font-semibold text-black">
                    <span className="flex items-center">
                      <FaUsers className="mr-2 text-xs" />
                      Company Size
                    </span>
                  </label>
                  <select
                    id="reviewer.employees"
                    name="employees"
                    value={formData.reviewer.employees}
                    onChange={handleReviewerChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4897de] focus:border-[#4897de] hover:border-gray-400 transition-all"
                    disabled={isSubmitting}
                  >
                    <option value="">Select company size</option>
                    {employeeRanges.map((range) => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                </div>
                
                <div className="md:col-span-2 space-y-2">
                  <label htmlFor="reviewer.interviewMethod" className="block text-sm font-semibold text-black">
                    <span className="flex items-center">
                      <FaPhone className="mr-2 text-xs" />
                      Interview Method
                    </span>
                  </label>
                  <select
                    id="reviewer.interviewMethod"
                    name="interviewMethod"
                    value={formData.reviewer.interviewMethod}
                    onChange={handleReviewerChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4897de] focus:border-[#4897de] hover:border-gray-400 transition-all"
                    disabled={isSubmitting}
                  >
                    <option value="">Select interview method</option>
                    {interviewMethods.map((method) => (
                      <option key={method} value={method}>{method}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            {/* Terms and Conditions */}
            <div className="bg-[#f8fafc] border border-black/20 rounded-2xl p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <FaInfoCircle className="h-5 w-5 text-[#4897de]" />
                </div>
                <div className="ml-3">
                  <h3 className="font-semibold text-black mb-2">Review Submission</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    By submitting this review, you confirm that:
                  </p>
                  <ul className="text-gray-600 text-sm space-y-1 list-disc list-inside">
                    <li>The review is based on your genuine experience</li>
                    <li>You have not been compensated for this review</li>
                    <li>The information provided is accurate and truthful</li>
                    <li>You understand this review will be publicly visible</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="w-full mx-auto">
      {/* Progress Bar */}
      <div className="mb-8 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-semibold text-black">Step {currentStep} of 3</span>
          <span className="text-sm font-semibold text-black">
            {currentStep === 1 && 'Project Information'}
            {currentStep === 2 && 'Ratings'}
            {currentStep === 3 && 'Review Details'}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-gradient-to-r from-[#4897de] to-[#0249aa] h-2.5 rounded-full transition-all duration-500 ease-in-out" 
            style={{ width: `${(currentStep / 3) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {/* Step Content */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {renderStepContent()}
        
        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              className="px-5 py-2.5 bg-white text-black border-2 border-black rounded-lg font-semibold hover:bg-[#f8fafc] transition-all flex items-center shadow-sm"
              disabled={isSubmitting}
            >
              <FaArrowLeft className="mr-2" />
              Previous
            </button>
          )}
          
          <div className="ml-auto">
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-5 py-2.5 bg-gradient-to-br from-[#4897de] to-[#0249aa] text-white rounded-lg font-semibold hover:from-[#0249aa] hover:to-[#4897de] transition-all flex items-center shadow-md hover:shadow-lg"
              >
                Next
                <FaArrowRight className="ml-2" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 bg-gradient-to-br from-[#4897de] to-[#0249aa] text-white rounded-lg font-semibold hover:from-[#0249aa] hover:to-[#4897de] transition-all flex items-center shadow-md hover:shadow-lg"
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <FaCheck className="mr-2" />
                    Submit Review
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}