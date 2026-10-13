"use client";
import React, { useState, useMemo, lazy, useEffect } from "react";
import {
  Calendar,
  Facebook,
  Linkedin,
  Twitter,
  Globe,
  MapPin,
  Users,

  Star,
  Clock,
  DollarSign,
  Award
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ClaimForm from "@/Componenets/ui/ClaimForm";
import CompanyReviews from "../Company/CompanyReviews";
import CompanyBadges from "../Company/CompanyBadges";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

// Lazy load heavy components
const ContactFormCompany = lazy(() => import("../ui/ContactFormCompany"));

// Tab Panel Component for the right side chart
const TabPanel = ({ activeTab, services, focus, industries, industryTags, clients }) => {
  // Generic static placeholder data that works for all company categories
  const staticServices = [
    { serviceName: 'Consulting', percentage: 30 },
    { serviceName: 'Implementation', percentage: 25 },
    { serviceName: 'Support & Maintenance', percentage: 20 },
    { serviceName: 'Training', percentage: 15 },
    { serviceName: 'Custom Development', percentage: 10 }
  ];

  const staticFocus = [
    { focusName: 'Small Business', percentage: 35 },
    { focusName: 'Mid Market', percentage: 30 },
    { focusName: 'Enterprise', percentage: 25 },
    { focusName: 'Startups', percentage: 10 }
  ];

  const staticIndustries = [
    { industryName: 'Technology', percentage: 25 },
    { industryName: 'Finance', percentage: 20 },
    { industryName: 'Healthcare', percentage: 15 },
    { industryName: 'Retail', percentage: 15 },
    { industryName: 'Manufacturing', percentage: 10 },
    { industryName: 'Education', percentage: 10 },
    { industryName: 'Government', percentage: 5 }
  ];

  const staticClients = [
    { clientSegment: 'B2B', percentage: 50 },
    { clientSegment: 'B2C', percentage: 30 },
    { clientSegment: 'Hybrid', percentage: 20 }
  ];

  // Chart options matching reference design
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide legend as per reference
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.parsed}%`;
          }
        }
      }
    },
    elements: {
      arc: {
        borderWidth: 2,
        borderColor: '#ffffff'
      }
    }
  };

  // Get data for the active tab
  const getActiveData = () => {
    // Helper function to convert simple string arrays to formatted objects
    const convertToFormattedData = (dataArray, labelKey) => {
      // Check if dataArray is valid
      if (!dataArray || !Array.isArray(dataArray) || dataArray.length === 0) return [];
      
      try {
        // Check if data is already in the correct format
        if (dataArray[0] && typeof dataArray[0] === 'object' && 
            dataArray[0].hasOwnProperty(labelKey) && dataArray[0].hasOwnProperty('percentage')) {
          // Validate that all items have the required properties
          const validData = dataArray.filter(item => 
            item && typeof item === 'object' && 
            item.hasOwnProperty(labelKey) && 
            item.hasOwnProperty('percentage')
          );
          
          if (validData.length > 0) {
            return validData;
          }
        } 
        // If data is simple strings, convert them to the required format
        else if (typeof dataArray[0] === 'string') {
          // Calculate equal percentages for all items
          const percentage = Math.round(100 / dataArray.length);
          return dataArray.map((item, index) => ({
            [labelKey]: item,
            // Distribute any remainder to the first items
            percentage: index < (100 % dataArray.length) ? percentage + 1 : percentage
          }));
        }
      } catch (error) {
        // If there's any error in processing, return empty array
        console.warn(`Error processing ${labelKey} data:`, error);
        return [];
      }
      
      return [];
    };

    switch(activeTab) {
      case 'Services':
        // Services should be in the format { serviceName, percentage }
        const formattedServices = convertToFormattedData(services, 'serviceName');
        return formattedServices.length > 0 ? formattedServices : staticServices;
      case 'Focus':
        // Focus should be in the format { focusName, percentage }
        const formattedFocus = convertToFormattedData(focus, 'focusName');
        return formattedFocus.length > 0 ? formattedFocus : staticFocus;
      case 'Industries':
        // Industries should be in the format { industryName, percentage }
        const formattedIndustries = convertToFormattedData(industries, 'industryName');
        return formattedIndustries.length > 0 ? formattedIndustries : staticIndustries;
      case 'Clients':
        // Clients should be in the format { clientSegment, percentage }
        const formattedClients = convertToFormattedData(clients, 'clientSegment');
        return formattedClients.length > 0 ? formattedClients : staticClients;
      default:
        return [];
    }
  };

  // Get label key based on active tab
  const getLabelKey = () => {
    switch(activeTab) {
      case 'Services':
        return 'serviceName';
      case 'Focus':
        return 'focusName';
      case 'Industries':
        return 'industryName';
      case 'Clients':
        return 'clientSegment';
      default:
        return '';
    }
  };

  // Get chart data with reference image colors
  const getChartData = () => {
    const data = getActiveData();
    const labelKey = getLabelKey();
    
    // Always return chart data, even for static data
    if (!data || data.length === 0) {
      return null;
    }

    // Colors matching reference image with new color scheme
     const colors = [
      '#4897de', // Primary button color
      '#0249aa', // Secondary color
      '#3b82f6', // Replaced #a6871c with blue shade
      '#60a5fa', // Light blue
      '#93c5fd', // Lighter blue
      '#059669', // Green
      '#10b981', // Light green
      '#34d399'  // Lighter green
    ];

    // Filter out any invalid data points
    const validData = data.filter(item => 
      item && 
      typeof item === 'object' && 
      item.hasOwnProperty(labelKey) && 
      item[labelKey] && 
      item.hasOwnProperty('percentage') && 
      typeof item.percentage === 'number' && 
      !isNaN(item.percentage)
    );

    if (validData.length === 0) {
      return null;
    }

    return {
      labels: validData.map(item => item[labelKey]),
      datasets: [
        {
          data: validData.map(item => {
            // Ensure percentage is a valid number
            const percentage = parseFloat(item.percentage);
            return isNaN(percentage) ? 0 : percentage;
          }),
          backgroundColor: colors.slice(0, validData.length),
          borderColor: '#ffffff',
          borderWidth: 2,
        },
      ],
    };
  };

  const activeData = getActiveData();
  const chartData = getChartData();
  const labelKey = getLabelKey();

  // Get the correct heading based on active tab
  const getHeading = () => {
    switch(activeTab) {
      case 'Services':
        return 'Service Lines';
      case 'Focus':
        return 'Focus Areas';
      case 'Industries':
        return 'Industries';
      case 'Clients':
        return 'Client Segments';
      default:
        return 'Data';
    }
  };


 // Colors for legend items
  const colors = ['#4897de', '#0249aa', '#3b82f6', '#60a5fa', '#93c5fd', '#059669', '#10b981', '#34d399'];

  return (
    <div className="bg-white">
      {/* Mobile Layout - Stacked */}
      <div className="md:hidden space-y-6">
        {/* Chart */}
        <div className="w-full h-64 flex-shrink-0">
          {chartData ? <Pie data={chartData} options={chartOptions} /> : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">No data available</p>
            </div>
          )}
        </div>
        
        {/* Data List or Sidebar */}
        {activeData && activeData.length > 0 ? (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{getHeading()}</h3>
            
              <div className="space-y-3">
                {activeData.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: colors[index % colors.length] }}
                    ></div>
                    <span className="text-sm text-gray-700 flex-1">{item[labelKey]}</span>
                    <span className="text-sm font-medium text-gray-900">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-500">No data available</p>
          </div>
        )}
      </div>
      
      {/* Desktop Layout - Side by side */}
      <div className="hidden md:block">
        {chartData ? (
          
            <div className="flex items-start gap-6 ">
              {/* Chart */}
              <div className="w-64 h-64 flex-shrink-0">
                <Pie data={chartData} options={chartOptions} />
              </div>
              
              {/* Data List */}
              <div className="flex-1 mt-12 h-46 overflow-y-auto custom-scrollbar">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{getHeading()}</h3>
                <div className="space-y-2">
                  {activeData.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: colors[index % colors.length] }}
                      ></div>
                      <span className="text-sm text-gray-700 flex-1">{item[labelKey]}</span>
                      <span className="text-sm font-medium text-gray-900">{item.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          
        ) : (
          <div className="flex items-center justify-center p-12">
            <div className="text-center">
              <p className="text-gray-500 mb-2">
                Company hasn&apos;t added {activeTab.toLowerCase()} data yet.
              </p>
              <p className="text-sm text-gray-600">
                Claim this profile to update company information.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CompanyDetail = ({ sampleCompanyData = {}, reviewsData = null }) => {
  const [showAllTeamMembers, setShowAllTeamMembers] = useState(false);
  const [showClaimForm, setShowClaimForm] = useState(false);
  const [activeTab, setActiveTab] = useState('Services');
  const [companyData, setCompanyData] = useState(sampleCompanyData);

  // Add custom scrollbar styles
  
// Add custom scrollbar styles
  const scrollbarStyle = `
    .custom-scrollbar {
      scrollbar-width: thin;
      scrollbar-color: #4897de #ffffff;
    }
    
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
    }
    
    .custom-scrollbar::-webkit-scrollbar-track {
      background: #ffffff;
      border-radius: 3px;
    }
    
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background-color: #4897de;
      border-radius: 3px;
    }
    
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background-color: #0249aa;
    }
    
    /* Hide scrollbar buttons (arrows) */
    .custom-scrollbar::-webkit-scrollbar-button {
      display: none;
    }
  `;

  // Update company data when sampleCompanyData changes
  useEffect(() => {
    setCompanyData(sampleCompanyData);
  }, [sampleCompanyData]);

  // Listen for company claim events
  useEffect(() => {
    const handleCompanyClaimed = (event) => {
      // If the claimed company matches this company, refresh the data
      if (event.detail.companyId === companyData?._id) {
        // In a real implementation, you would fetch updated company data from the server
        // For now, we'll just update the local state to show the company as claimed
        setCompanyData(prevData => ({
          ...prevData,
          claimedBy: "claimed" // Set a non-null value to indicate the company is now claimed
        }));
      }
    };

    window.addEventListener('companyClaimed', handleCompanyClaimed);
    
    return () => {
      window.removeEventListener('companyClaimed', handleCompanyClaimed);
    };
  }, [companyData?._id]);

  // Function to get the full image URL
  const getImageUrl = (imagePath) => {
    // If it's already a full URL, return as is
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    
    // If it's a relative path, prepend the API base URL
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.demand10/api/v1';
    // Remove /api/v1 prefix if it exists in the imagePath since uploads are served directly
    const cleanPath = imagePath.startsWith('/api/v1') ? imagePath.substring(7) : imagePath;
    // For uploads, we need to remove the /api/v1 part from the base URL
    const uploadBaseUrl = baseUrl.replace('/api/v1', '');
    return `${uploadBaseUrl}${cleanPath}`;
  };

  // Memoize processed company data
  const processedCompanyData = useMemo(() => {
    if (!companyData || Object.keys(companyData).length === 0) {
      return {
        companyName: "Default Company",
        image: "/placeholder-logo.png",
        employees: 0,
        industryTags: [], // Simple string array for tags
        foundedYear: null,
        website: "#",
        linkedinUrl: "",
        facebookUrl: "",
        twitterUrl: "",
        teamLeads: [],
        companyCountry: "Not specified",
        description: "Company description not available.",
        email: "",
        phone: "",
        rating: 0,
        reviewCount: 0,
        services: [],
        focus: [],
        industries: [], // Complex object array for chart data
        clients: [],
        minimumProjectSize: null,
        hourlyRate: null,
        // Verification fields
        submittedThroughListingForm: false,
        claimedBy: null,
        _id: null
      };
    }
    
    return {
      ...companyData,
      companyName: companyData.companyName || "Unknown Company",
      employees: companyData.employees || 0,
      industryTags: Array.isArray(companyData.industryTags) ? companyData.industryTags : [], // Simple string array for tags
      foundedYear: companyData.foundedYear || null,
      teamLeads: Array.isArray(companyData.teamLeads) ? companyData.teamLeads : [],
      companyCountry: companyData.companyCountry || "Not specified",
      description: companyData.description || "Company description not available.",
      email: companyData.email || "",
      phone: companyData.phone || "",
      rating: companyData.rating || 0,
      reviewCount: companyData.reviewCount || 0,
      services: Array.isArray(companyData.services) ? companyData.services : [],
      focus: Array.isArray(companyData.focus) ? companyData.focus : [],
      industries: Array.isArray(companyData.industries) ? companyData.industries : [], // Complex object array for chart data
      clients: Array.isArray(companyData.clients) ? companyData.clients : [],
      minimumProjectSize: companyData.minimumProjectSize || null,
      hourlyRate: companyData.hourlyRate || null,
      // Verification fields
      submittedThroughListingForm: companyData.submittedThroughListingForm || false,
      claimedBy: companyData.claimedBy || null,
      _id: companyData._id || null
    };
  }, [companyData]);

  // Memoize social links
  const socialLinks = useMemo(() => {
    const links = [];
    if (processedCompanyData.website)
      links.push({ href: processedCompanyData.website, icon: Globe, label: "Website" });
    if (processedCompanyData.linkedinUrl)
      links.push({
        href: processedCompanyData.linkedinUrl,
        icon: Linkedin,
        label: "LinkedIn",
      });
    if (processedCompanyData.twitterUrl)
      links.push({
        href: processedCompanyData.twitterUrl,
        icon: Twitter,
        label: "Twitter",
      });
    if (processedCompanyData.facebookUrl)
      links.push({
        href: processedCompanyData.facebookUrl,
        icon: Facebook,
        label: "Facebook",
      });
    return links;
  }, [
    processedCompanyData.website,
    processedCompanyData.linkedinUrl,
    processedCompanyData.twitterUrl,
    processedCompanyData.facebookUrl,
  ]);

  const {
    companyName = '',
    image = '',
    employees = 0,
    industryTags = [], // Simple string array for tags
    foundedYear = '',
    website = '#',
    teamLeads = [],
    companyCountry = '',
    description = '',
    email = '',
    phone = '',
    rating = 0,
    reviewCount = 0,
    services = [],
    focus = [],
    industries = [], // Complex object array for chart data
    clients = [],
    minimumProjectSize = null,
    hourlyRate = null,
    // Verification fields
    submittedThroughListingForm = false,
    claimedBy = null,
    _id = null
  } = processedCompanyData || {};

  // Get the full image URL
  const imageUrl = getImageUrl(image);

  // Determine if company is verified
  // A company is verified if:
  // 1. It was submitted through the listing form (submittedThroughListingForm = true), OR
  // 2. It has been claimed and approved (claimedBy is not null)
  const isVerified = submittedThroughListingForm || (claimedBy !== null);

  // Define tabs
  const tabs = ['Services', 'Focus', 'Industries', 'Clients'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Add custom scrollbar styles */}
      <style>{scrollbarStyle}</style>
      
      {/* Header Section - Simplified with solid colors */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Company Logo */}
<div className="flex-shrink-0">
  <div className="w-20 h-20 rounded-lg bg-gray-50 border-2 border-gray-200 flex items-center justify-center overflow-hidden shadow-sm">
    {imageUrl && imageUrl !== "" ? (
      <Image
        width={80}
        height={80}
        src={imageUrl}
        alt={`${companyName} logo`}
        className="w-full h-full object-contain"
        loading="eager"
        priority
        onError={(e) => {
          e.target.onerror = null;
          e.target.parentElement.innerHTML = `
            <div class="w-full h-full bg-gray-100 flex items-center justify-center">
              <span class="text-[11px] font-medium text-gray-500 text-center px-2">No logo provided</span>
            </div>`;
        }}
      />
    ) : (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
        <span className="text-[11px] font-medium text-gray-500 text-center px-2">
          No logo provided
        </span>
      </div>
    )}
  </div>
</div>


            {/* Company Name and Details */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-[#1a365d]">
                  {companyName}
                </h1>
                {/* Verified Badge - Only show if company is verified */}
                {isVerified && (
                  <div className="flex items-center gap-1 bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] text-white px-2 py-1 rounded-full text-xs font-medium">
                    <Award size={12} />
                    <span>Verified</span>
                  </div>
                )}
                {/* Company Badges - Show if company has badges */}
                {processedCompanyData?._id && (
                  <div className="flex items-center">
                    <CompanyBadges companyId={processedCompanyData._id} inline={true} />
                  </div>
                )}
              </div>
              
              {/* Rating - Only show if rating > 0 */}
              {rating > 0 && (
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(rating)
                            ? "text-[#265ba3] fill-[#265ba3]"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 font-medium">
                    {reviewCount} reviews
                  </span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={website || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  prefetch={false}
                >
                  <button className="bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] text-white px-6 py-2 rounded-md font-medium text-sm transition-colors shadow-sm hover:shadow hover:bg-[#3eb0a3]">
                    Visit Website
                  </button>
                </Link>
                
                {/* Claim Profile Button - Only show if company is NOT verified */}
                {!isVerified && (
                  <button 
                    onClick={() => setShowClaimForm(true)}
                    className="border border-[#1e4a86] text-[#1e4a86] hover:bg-[#1e4a86] hover:text-white cursor-pointer px-5 py-2.5 rounded-lg font-medium text-sm transition-colors"
                  >
                    Claim Profile
                  </button>
                )}
              </div>
            </div>

            
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Side - Company Description */}
          <div className="col-span-12 md:col-span-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
             About {companyName}
              </h2>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>{description}</p>
              </div>

                {/* Company Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-8">
                <div className="bg-blue-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-2 text-gray-700 mb-1">
                    <DollarSign size={16} />
                    <span className="text-sm font-medium">Min project size</span>
                  </div>
                  <p className="font-semibold text-[#4897de]">
                    {minimumProjectSize?.toLocaleString() || '50,000+'}
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-2 text-gray-700 mb-1">
                    <Clock size={16} />
                    <span className="text-sm font-medium">Hourly rate</span>
                  </div>
                  <p className="font-semibold text-[#4897de]">
                    {hourlyRate || '50'} / hr
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-2 text-gray-700 mb-1">
                    <Users size={16} />
                    <span className="text-sm font-medium">Employees</span>
                  </div>
                  <p className="font-semibold text-[#4897de]">
                    {employees || '10'}   
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-2 text-gray-700 mb-1">
                    <MapPin size={16} />
                    <span className="text-sm font-medium">Locations</span>
                  </div>
                  <p className="font-semibold text-[#4897de]">{companyCountry}</p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-2 text-gray-700 mb-1">
                    <Calendar size={16} />
                    <span className="text-sm font-medium">Year founded</span>
                  </div>
                  <p className="font-semibold text-[#4897de]">
                    Founded {foundedYear || '2003'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Tabs and Chart */}
          <div className="col-span-12 md:col-span-6">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
              {/* Tab Content - Reorganized for mobile with integrated dropdown */}
              <div className="p-4 md:p-6">
                {/* Mobile Dropdown - Inside the content area */}
                <div className="md:hidden mb-6 w-full">
                  <label htmlFor="tab-select" className="block text-sm font-medium text-gray-700 mb-1">
                    Select Category
                  </label>
                  <div className="relative">
                    <select
                      id="tab-select"
                      value={activeTab}
                      onChange={(e) => setActiveTab(e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#4897de] focus:ring-[#4897de] sm:text-sm p-2 border box-border appearance-none bg-white"
                    >
                      {tabs.map((tab) => {
                        return (
                          <option key={tab} value={tab}>
                            {tab}
                          </option>
                        );
                      })}
                    </select>
                    {/* Custom dropdown arrow */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Desktop Tabs - Only visible on md and larger screens */}
                <div className="hidden md:block mb-6">
                  <nav className="flex overflow-x-auto border-b border-gray-200" aria-label="Tabs">
                    {tabs.map((tab) => {
                      // Show all tabs but mark active one
                      return (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`flex-1 py-3 px-4 text-sm font-medium text-center whitespace-nowrap min-w-[80px] ${
                            activeTab === tab
                              ? 'border-b-2 border-[#4897de] text-black bg-blue-50'
                              : 'border-transparent text-gray-500 hover:text-black hover:border-gray-300'
                          } transition-colors`}
                        >
                          {tab}
                        </button>
                      );
                    })}
                  </nav>
                </div>
                
                {/* Tab Content */}
                <TabPanel 
                  activeTab={activeTab}
                  services={services}
                  focus={focus}
                  industries={industries}
                  industryTags={industryTags}
                  clients={clients}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section - If team members exist */}
      {teamLeads && teamLeads.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Leadership Team</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamLeads.slice(0, showAllTeamMembers ? teamLeads.length : 6).map((member, index) => (
                <div key={`member-${index}`} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow bg-white">
                  <div className="w-12 h-12 rounded-full bg-[#4ecfc5] flex items-center justify-center text-white font-semibold">
                    {member?.name?.charAt(0) || 'U'}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-black">{member?.name}</h4>
                    <p className="text-sm text-gray-600">{member?.position}</p>
                  </div>
                  <div className="flex gap-2">
                    {member?.linkedinUrl && (
                      <a
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-[#4ecfc5] rounded flex items-center justify-center text-white hover:bg-[#3eb0a3] transition-colors"
                      >
                        <Linkedin size={14} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {teamLeads.length > 6 && (
              <div className="text-center mt-6">
                <button
                  onClick={() => setShowAllTeamMembers(!showAllTeamMembers)}
                  className="bg-[#4ecfc5] hover:bg-[#3eb0a3] text-white font-medium text-sm px-4 py-2 rounded-md transition-colors"
                >
                  {showAllTeamMembers ? 'Show Less' : `Show More (${teamLeads.length - 6} more)`}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Company Reviews Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <CompanyReviews 
            companyId={companyData._id} 
            companySlug={companyData.slug} 
            initialReviewsData={reviewsData}
          />
        </div>
      </section>

      {/* CLAIM FORM MODAL */}
      {showClaimForm && (
        <ClaimForm 
          company={companyData}
          onClose={() => setShowClaimForm(false)}
        />
      )}
    </div>
  );
};

export default CompanyDetail;