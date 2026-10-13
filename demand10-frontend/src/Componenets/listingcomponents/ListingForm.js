'use client'
import React, { useState, useEffect } from "react";
import { FaArrowRight, FaArrowLeft, FaCheck, FaLinkedin, FaFacebook, FaTwitter } from "react-icons/fa";
import { getCategoriesWithSubcategories, submitCompanyListing } from '@/services/userApi';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { checkUserAuth } from '@/services/userApi';
import ServiceLines from './ServiceLines';
import FocusLines from './FocusLines';
import Industries from './Industries';
import Clients from './Clients';

// Skeleton component for loading state
const ListingFormSkeleton = () => (
  <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
    <div className="animate-pulse space-y-4">
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
      <div className="h-32 bg-gray-200 rounded mt-4"></div>
    </div>
  </div>
);

export default function ListingForm({ onListingCompleted }) {
  // State for form steps
  const [currentStep, setCurrentStep] = useState(1);
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  
  // Form state with all required fields from the schema
  const [formData, setFormData] = useState({
    // Company basic info
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    website: '',
    companyCountry: '',
    
    // Company details
    description: '',
    foundedYear: '',
    employees: '',
    
    // New fields
    minimumProjectSize: '',
    hourlyRate: '',
    
    // Social media
    linkedinUrl: '',
    facebookUrl: '',
    twitterUrl: '',
    
    // Categories
    categoryId: '',
    subcategoryId: '',
    
    // Services
    services: [],
    
    // Focus
    focus: [],
    
    // Industries
    industries: [],
    
    // Clients
    clients: [],
    
    // Image
    image: null
  });
  
  const [imagePreview, setImagePreview] = useState('');
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load user and categories on component mount
  useEffect(() => {
    const initializeForm = async () => {
      // Check user authentication
      try {
        const userData = await checkUserAuth();
        if (userData.ok) {
          setUser(userData.user);
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
      } finally {
        setLoadingUser(false);
      }

      // Load categories
      setLoading(true);
      try {
        const response = await getCategoriesWithSubcategories();
        if (response.ok) {
          setCategories(response.categories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    initializeForm();
  }, []);

  // Handle category change to populate subcategories
  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setFormData({
      ...formData,
      categoryId,
      subcategoryId: ''
    });

    // Find the selected category and update subcategories
    const category = categories.find(cat => cat._id === categoryId);
    if (category) {
      setSubcategories(category.subcategories || []);
    } else {
      setSubcategories([]);
    }
  };

  // Handle form input changes for simple fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file
      });
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle step navigation
  const nextStep = () => {
    // Add validation for required fields in current step
    if (currentStep === 1) {
      if (!formData.companyName || !formData.companyEmail || !formData.companyPhone) {
        toast.error('Please fill in all required fields');
        return;
      }
    }
    
    if (currentStep === 7) { // Categories step
      if (!formData.categoryId || !formData.subcategoryId) {
        toast.error('Please select both category and subcategory');
        return;
      }
    }
    
    setCurrentStep(prev => Math.min(prev + 1, 7)); // 7 steps total
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Final validation
    if (!formData.categoryId || !formData.subcategoryId) {
      toast.error('Please select both category and subcategory');
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Create FormData object for submission
      const formDataToSend = new FormData();
      
      // Append all form fields
      Object.keys(formData).forEach(key => {
        if (key !== 'image' && key !== 'services' && key !== 'focus' && key !== 'industries' && key !== 'clients' && formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      });
      
      // Append services as JSON string
      if (formData.services && formData.services.length > 0) {
        formDataToSend.append('services', JSON.stringify(formData.services));
      }
      
      // Append focus as JSON string
      if (formData.focus && formData.focus.length > 0) {
        formDataToSend.append('focus', JSON.stringify(formData.focus));
      }
      
      // Append industries as JSON string
      if (formData.industries && formData.industries.length > 0) {
        formDataToSend.append('industries', JSON.stringify(formData.industries));
      }
      
      // Append clients as JSON string
      if (formData.clients && formData.clients.length > 0) {
        formDataToSend.append('clients', JSON.stringify(formData.clients));
      }
      
      // Append image if provided
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }
      
      const result = await submitCompanyListing(formDataToSend);
      
      if (result.ok) {
        toast.success('Company listing submitted successfully! Our team will review it shortly.');
        // Reset form
        setFormData({
          companyName: '',
          companyEmail: '',
          companyPhone: '',
          website: '',
          companyCountry: '',
          description: '',
          foundedYear: '',
          employees: '',
          minimumProjectSize: '',
          hourlyRate: '',
          linkedinUrl: '',
          facebookUrl: '',
          twitterUrl: '',
          categoryId: '',
          subcategoryId: '',
          services: [],
          focus: [],
          industries: [],
          image: null
        });
        setImagePreview('');
        setCurrentStep(1);
        
        // Notify parent component that listing is completed
        if (onListingCompleted) {
          onListingCompleted();
        }
      } else {
        toast.error(result.message || 'Failed to submit company listing');
      }
    } catch (err) {
      console.error('Error submitting company listing:', err);
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state while checking authentication
  if (loadingUser) {
    return <ListingFormSkeleton />;
  }

  // If user is not authenticated, show message
  if (!user) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 max-w-xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Authentication Required</h2>
        <p className="text-[#4897de] mb-6">
          You need to be signed in to list your company. Please sign in to continue.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 p-4 md:p-6 border border-gray-100 w-full mx-auto rounded-xl">
   
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Company Info and Details */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Company Information</h3>
              <p className="text-[#4897de] mb-6">Tell us about your company basics</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="companyName" className="block text-gray-700 mb-2 font-medium">
                    Company Name *
                  </label>
                  <input 
                    type="text" 
                    id="companyName" 
                    name="companyName" 
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition shadow-sm"
                    placeholder="Your Company Inc."
                  />
                </div>
                
                <div>
                  <label htmlFor="companyEmail" className="block text-gray-700 mb-2 font-medium">
                    Company Email *
                  </label>
                  <input 
                    type="email" 
                    id="companyEmail" 
                    name="companyEmail" 
                    value={formData.companyEmail}
                    onChange={handleInputChange}
                    required 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition shadow-sm"
                    placeholder="contact@company.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="companyPhone" className="block text-gray-700 mb-2 font-medium">
                    Company Phone *
                  </label>
                  <input 
                    type="tel" 
                    id="companyPhone" 
                    name="companyPhone" 
                    value={formData.companyPhone}
                    onChange={handleInputChange}
                    required 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition shadow-sm"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                
                <div>
                  <label htmlFor="website" className="block text-gray-700 mb-2 font-medium">
                    Company Website
                  </label>
                  <input 
                    type="url" 
                    id="website" 
                    name="website" 
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition shadow-sm"
                    placeholder="https://yourcompany.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="companyCountry" className="block text-gray-700 mb-2 font-medium">
                    Company Country
                  </label>
                  <input
                    type="text"
                    id="companyCountry"
                    name="companyCountry"
                    value={formData.companyCountry}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition shadow-sm"
                    placeholder="United States"
                  />
                </div>
                
                <div>
                  <label htmlFor="employees" className="block text-gray-700 mb-2 font-medium">
                    Number of Employees
                  </label>
                  <select 
                    id="employees" 
                    name="employees"
                    value={formData.employees}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition appearance-none bg-white shadow-sm"
                  >
                    <option value="">Select Range</option>
                    <option value="1-10">1-10</option>
                    <option value="11-50">11-50</option>
                    <option value="51-200">51-200</option>
                    <option value="201-500">201-500</option>
                    <option value="501-1000">501-1000</option>
                    <option value="1000+">1000+</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Company Details</h3>
              <p className="text-[#4897de] mb-6">Tell us more about your company</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-gray-700 mb-2 font-medium">
                    Company Description
                  </label>
                  <textarea 
                    id="description" 
                    name="description" 
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition shadow-sm"
                    placeholder="Briefly describe your company and what you do..."
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="foundedYear" className="block text-gray-700 mb-2 font-medium">
                    Founded Year
                  </label>
                  <input 
                    type="number" 
                    id="foundedYear" 
                    name="foundedYear" 
                    value={formData.foundedYear}
                    onChange={handleInputChange}
                    min="1900" 
                    max={new Date().getFullYear()}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition shadow-sm"
                    placeholder="2010"
                  />
                </div>
                
                <div>
                  <label htmlFor="minimumProjectSize" className="block text-gray-700 mb-2 font-medium">
                    Minimum Project Size ($)
                  </label>
                  <input 
                    type="number" 
                    id="minimumProjectSize" 
                    name="minimumProjectSize" 
                    value={formData.minimumProjectSize}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition shadow-sm"
                    placeholder="1000"
                  />
                </div>
                
                <div>
                  <label htmlFor="hourlyRate" className="block text-gray-700 mb-2 font-medium">
                    Hourly Rate ($)
                  </label>
                  <input 
                    type="number" 
                    id="hourlyRate" 
                    name="hourlyRate" 
                    value={formData.hourlyRate}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition shadow-sm"
                    placeholder="50.00"
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Company Logo</h3>
              
              <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                {imagePreview && (
                  <div className="relative">
                    <Image 
                      src={imagePreview} 
                      alt="Preview" 
                      width={100}
                      height={100}
                      className="w-24 h-24 object-cover rounded-lg border-2 border-blue-500"
                    />
                  </div>
                )}
                <div className="flex-1 w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0">
                    <label className="bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] text-white px-5 py-3 rounded-lg cursor-pointer transition-all duration-300 shadow-md">
                      Choose Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                    <span className="text-sm text-gray-600 truncate max-w-[200px] sm:ml-4">
                      {formData.image ? formData.image.name : 'No file chosen'}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-gray-500">
                    Upload a company logo (JPG, PNG, GIF)
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button 
                type="button" 
                onClick={nextStep}
                className="bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center shadow-md hover:shadow-lg"
              >
                Next
                <FaArrowRight className="ml-2" />
              </button>
            </div>
          </div>
        )}
        
        {/* Step 2: Social Media */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Social Media</h3>
              <p className="text-[#4897de] mb-6">Share your company&apos;s social media profiles</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="linkedinUrl" className="block text-gray-700 mb-2 font-medium flex items-center">
                    <FaLinkedin className="text-[#0077b5] mr-2" /> LinkedIn
                  </label>
                  <input 
                    type="url" 
                    id="linkedinUrl" 
                    name="linkedinUrl" 
                    value={formData.linkedinUrl}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition shadow-sm"
                    placeholder="https://linkedin.com/company/yourcompany"
                  />
                </div>
                
                <div>
                  <label htmlFor="facebookUrl" className="block text-gray-700 mb-2 font-medium flex items-center">
                    <FaFacebook className="text-[#1877f2] mr-2" /> Facebook
                  </label>
                  <input 
                    type="url" 
                    id="facebookUrl" 
                    name="facebookUrl" 
                    value={formData.facebookUrl}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition shadow-sm"
                    placeholder="https://facebook.com/yourcompany"
                  />
                </div>
                
                <div>
                  <label htmlFor="twitterUrl" className="block text-gray-700 mb-2 font-medium flex items-center">
                    <FaTwitter className="text-[#1da1f2] mr-2" /> Twitter
                  </label>
                  <input 
                    type="url" 
                    id="twitterUrl" 
                    name="twitterUrl" 
                    value={formData.twitterUrl}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition shadow-sm"
                    placeholder="https://twitter.com/yourcompany"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <button 
                type="button" 
                onClick={prevStep}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors flex items-center shadow-sm"
              >
                <FaArrowLeft className="mr-2" />
                Back
              </button>
              
              <button 
                type="button" 
                onClick={nextStep}
                className="bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center shadow-md hover:shadow-lg"
              >
                Next
                <FaArrowRight className="ml-2" />
              </button>
            </div>
          </div>
        )}
        
        {/* Step 3: Services */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Services</h3>
              <p className="text-[#4897de] mb-6">What services does your company provide?</p>
              
              <ServiceLines 
                services={formData.services} 
                onServicesChange={(services) => setFormData(prev => ({ ...prev, services }))}
              />
            </div>
            
            <div className="flex justify-between">
              <button 
                type="button" 
                onClick={prevStep}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors flex items-center shadow-sm"
              >
                <FaArrowLeft className="mr-2" />
                Back
              </button>
              
              <button 
                type="button" 
                onClick={nextStep}
                className="bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center shadow-md hover:shadow-lg"
              >
                Next
                <FaArrowRight className="ml-2" />
              </button>
            </div>
          </div>
        )}
        
        {/* Step 4: Focus */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Focus Areas</h3>
              <p className="text-[#4897de] mb-6">What are your company&apos;s focus areas?</p>
              
              <FocusLines 
                focus={formData.focus} 
                onFocusChange={(focus) => setFormData(prev => ({ ...prev, focus }))}
              />
            </div>
            
            <div className="flex justify-between">
              <button 
                type="button" 
                onClick={prevStep}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors flex items-center shadow-sm"
              >
                <FaArrowLeft className="mr-2" />
                Back
              </button>
              
              <button 
                type="button" 
                onClick={nextStep}
                className="bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center shadow-md hover:shadow-lg"
              >
                Next
                <FaArrowRight className="ml-2" />
              </button>
            </div>
          </div>
        )}
        
        {/* Step 5: Industries */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Industries</h3>
              <p className="text-[#4897de] mb-6">Which industries does your company serve?</p>
              
              <Industries 
                industries={formData.industries} 
                onIndustriesChange={(industries) => setFormData(prev => ({ ...prev, industries }))}
              />
            </div>
            
            <div className="flex justify-between">
              <button 
                type="button" 
                onClick={prevStep}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors flex items-center shadow-sm"
              >
                <FaArrowLeft className="mr-2" />
                Back
              </button>
              
              <button 
                type="button" 
                onClick={nextStep}
                className="bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center shadow-md hover:shadow-lg"
              >
                Next
                <FaArrowRight className="ml-2" />
              </button>
            </div>
          </div>
        )}
        
        {/* Step 6: Clients */}
        {currentStep === 6 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Clients</h3>
              <p className="text-[#4897de] mb-6">What types of clients does your company work with?</p>
              
              <Clients 
                clients={formData.clients} 
                onClientsChange={(clients) => {
                  setFormData(prev => ({ ...prev, clients }));
                }}
              />
            </div>
            
            <div className="flex justify-between">
              <button 
                type="button" 
                onClick={prevStep}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors flex items-center shadow-sm"
              >
                <FaArrowLeft className="mr-2" />
                Back
              </button>
              
              <button 
                type="button" 
                onClick={nextStep}
                className="bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center shadow-md hover:shadow-lg"
              >
                Next
                <FaArrowRight className="ml-2" />
              </button>
            </div>
          </div>
        )}
        
        {/* Step 7: Categories and Submit (Congratulations) */}
        {currentStep === 7 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Categories</h3>
              <p className="text-[#4897de] mb-6">Select your company&apos;s primary category and subcategory</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="categoryId" className="block text-gray-700 mb-2 font-medium">
                    Primary Category *
                  </label>
                  <select 
                    id="categoryId" 
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleCategoryChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition appearance-none bg-white shadow-sm"
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="subcategoryId" className="block text-gray-700 mb-2 font-medium">
                    Subcategory *
                  </label>
                  <select 
                    id="subcategoryId" 
                    name="subcategoryId"
                    value={formData.subcategoryId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition appearance-none bg-white shadow-sm"
                    disabled={!formData.categoryId}
                  >
                    <option value="">Select Subcategory</option>
                    {subcategories.map(subcategory => (
                      <option key={subcategory._id} value={subcategory._id}>
                        {subcategory.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                <FaCheck className="text-green-500 mr-2" /> Review Your Details
              </h3>
              <div className="text-sm text-[#4897de] space-y-2">
                <p><span className="font-medium">User:</span> {user?.email}</p>
                <p><span className="font-medium">Company:</span> {formData.companyName}</p>
                <p><span className="font-medium">Website:</span> {formData.website || 'Not provided'}</p>
                <p><span className="font-medium">Category:</span> {categories.find(c => c._id === formData.categoryId)?.name || 'Not selected'}</p>
                <p><span className="font-medium">Subcategory:</span> {subcategories.find(s => s._id === formData.subcategoryId)?.name || 'Not selected'}</p>
              </div>
            </div>
            
            <div className="flex items-center bg-gray-50 p-4 rounded-lg">
              <input 
                type="checkbox" 
                id="terms" 
                name="terms" 
                required 
                className="w-5 h-5 text-[#4897de] border-gray-300 rounded focus:ring-blue-500 mr-3"
              />
              <label htmlFor="terms" className="text-gray-700">
                I agree to the <a href="#terms" className="text-[#4897de] hover:underline font-medium">Terms of Use</a> and <a href="#privacy" className="text-[#4897de] hover:underline font-medium">Privacy Policy</a>
              </label>
            </div>
            
            <div className="flex justify-between">
              <button 
                type="button" 
                onClick={prevStep}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors flex items-center shadow-sm"
              >
                <FaArrowLeft className="mr-2" />
                Back
              </button>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center shadow-md hover:shadow-lg disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <FaCheck className="mr-2" />
                    Submit Listing
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}