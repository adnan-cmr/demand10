'use client'
import React, { useState } from "react";
import { ArrowRight, CheckCircle, TrendingUp, Eye, Users, BarChart, Star, Shield, Zap } from 'lucide-react';
import Image from "next/image";

export default function OtherSections() {
  // State for service type selection
  const [serviceType, setServiceType] = useState('custom');

  // Function to handle button clicks
  const handleButtonClick = (action) => {
    console.log(`Button clicked: ${action}`);
    // In a real app, you would implement the actual functionality here
    // For example, navigate to a page, open a modal, or make an API call
  };

  // Service data
  const services = {
    custom: [
      {
        title: "Pay Per Click",
        description: "Boost your website traffic and increase sales by adopting our PPC services at lowest pricing",
        icon: <TrendingUp className="w-6 h-6 text-white" />,
        features: ["Targeted Advertising", "Real-time Analytics", "Budget Control"]
      },
      {
        title: "Marketing Qualified Lead",
        description: "Ensure that your sales representatives pursue the best quality leads with our MQL services",
        icon: <Users className="w-6 h-6 text-white" />,
        features: ["Lead Scoring", "Behavioral Tracking", "Conversion Optimization"]
      },
      {
        title: "Premium Listing",
        description: "Get listed on our Demand10 platform to get exposed to monthly traffic of 1M+",
        icon: <Star className="w-6 h-6 text-white" />,
        features: ["Enhanced Visibility", "Priority Placement", "Detailed Analytics"]
      }
    ],
    'value-added': [
      {
        title: "SEO Optimization",
        description: "Improve your search engine rankings and drive more organic traffic to your website",
        icon: <TrendingUp className="w-6 h-6 text-white" />,
        features: ["Keyword Research", "On-page Optimization", "Performance Tracking"]
      },
      {
        title: "Content Marketing",
        description: "Engage your audience with compelling content that drives conversions and builds brand loyalty",
        icon: <Zap className="w-6 h-6 text-white" />,
        features: ["Content Strategy", "Blog Writing", "Social Media Content"]
      },
      {
        title: "Social Media Management",
        description: "Build and engage your community across all major social platforms with our expert management",
        icon: <Users className="w-6 h-6 text-white" />,
        features: ["Profile Management", "Content Creation", "Engagement Tracking"]
      }
    ]
  };

  // Benefits data
  const benefits = [
    {
      title: "Trusted Platform",
      description: "Join thousands of companies who trust our platform for growth",
      icon: <Shield className="h-6 w-6 text-blue-600" />
    },
    {
      title: "Increased Visibility",
      description: "Reach millions of active buyers searching for your solutions",
      icon: <Eye className="h-6 w-6 text-blue-600" />
    },
    {
      title: "Expand Reach",
      description: "Connect with potential customers across multiple industries",
      icon: <TrendingUp className="h-6 w-6 text-blue-600" />
    },
    {
      title: "Track Performance",
      description: "Monitor your listing performance with detailed analytics",
      icon: <BarChart className="h-6 w-6 text-blue-600" />
    }
  ];

  // Customer logos
  const customerLogos = [
    { src: "/images/monday.avif", alt: "Monday.com" },
    { src: "/images/salesforce.avif", alt: "Salesforce" },
    { src: "/images/pipedrive.avif", alt: "Pipedrive" },
    { src: "/images/wrike.avif", alt: "Wrike" },
    { src: "/images/hubspot.avif", alt: "HubSpot" },
    { src: "/images/ninjaone.avif", alt: "NinjaOne" }
  ];

  return (
    <div className="space-y-20">
      {/* Request A Free Estimate Section */}
      <div className="py-16 bg-white relative overflow-hidden">
        

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
              No Obligation
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Request A <span className="text-[#265ba3]">Free</span> Estimate
            </h2>
            <p className="text-lg text-gray-600 mt-5 max-w-3xl mx-auto leading-relaxed">
              Ready to take the first step? Request a free estimate and let&apos;s explore how we can work together to achieve your vision.
            </p>
          </div>
          
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white rounded-xl border border-gray-200 overflow-hidden shadow-md p-1">
              <button 
                className={`py-3 px-6 font-semibold rounded-lg transition-all duration-300 ${
                  serviceType === 'custom' 
                    ? 'bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] text-white shadow-md' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setServiceType('custom')}
              >
                Custom Services
              </button>
              <button 
                className={`py-3 px-6 font-semibold rounded-lg transition-all duration-300 ${
                  serviceType === 'value-added' 
                    ? 'bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] text-white shadow-md' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setServiceType('value-added')}
              >
                Value Added Services
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services[serviceType].map((service, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl p-8 border border-gray-200 relative overflow-hidden group 
                  hover:border-[#265ba3] transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-2
                  flex flex-col h-full"
              >
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center 
                    bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] border border-blue-100 shadow-sm 
                     transition-all duration-300">
                    {service.icon}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                  {service.title}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed flex-grow text-center">
                  {service.description}
                </p>

                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-600">
                      <CheckCircle className="w-5 h-5 text-[#265ba3] mr-3 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => handleButtonClick(`get-estimate-${service.title.toLowerCase().replace(/\s+/g, '-')}`)}
                  className="w-full bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] hover:from-[#1e4a86] hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center group mt-auto"
                >
                  Get a Free Estimate
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
          
          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center bg-blue-50 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              Trusted by 770,000+ Professionals
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join our community of successful businesses who have transformed their growth with our services.
            </p>
          </div>
        </div>
      </div>

      {/* List Your Product Section */}
      <div className="py-16 bg-white relative overflow-hidden">
       
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              Maximize Your Business Potential
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              List Your Product & Boost Your <span className="text-[#265ba3]">Market Presence</span>
            </h2>
            <p className="text-lg text-gray-600 mt-5 max-w-3xl mx-auto leading-relaxed">
              Follow these simple steps to get started and maximize your business potential with our platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl p-6 border border-gray-200 relative overflow-hidden group 
                  hover:border-[#265ba3] transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-2
                  flex flex-col h-full"
              >
                {/* Icon */}
                <div className="flex justify-center mb-5">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center 
                    bg-gradient-to-br from-blue-100 to-blue-200 border border-blue-100 shadow-sm 
                    group-hover:from-[#265ba3]/10 group-hover:to-blue-100 transition-all duration-300">
                    {benefit.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                
                <p className="text-gray-600 text-base leading-relaxed flex-grow">
                  {benefit.description}
                </p>
                
                {/* Stats */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="text-2xl font-bold text-[#265ba3]">
                    {index === 0 && '2M+'}
                    {index === 1 && '92%'}
                    {index === 2 && '3x'}
                    {index === 3 && '24/7'}
                  </div>
                  <div className="text-sm text-gray-500">
                    {index === 0 && 'monthly visitors'}
                    {index === 1 && 'trust increase'}
                    {index === 2 && 'more leads'}
                    {index === 3 && 'support available'}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          
        </div>
      </div>

      {/* Happy Customers Section */}
      <div className="py-16 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
              Trusted by 770,000+ Professionals
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Trusted by Thousands of Happy <span className="text-[#265ba3]">Customers</span>
            </h2>
            <p className="text-lg text-gray-600 mt-5 max-w-3xl mx-auto leading-relaxed">
              Join the growing community of businesses that have transformed their growth with our platform and services.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {customerLogos.map((logo, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl p-6 flex items-center justify-center h-32 border border-gray-200 
                  hover:border-[#265ba3] transition-all duration-300 hover:-translate-y-2 shadow-sm hover:shadow-xl cursor-pointer group"
                onClick={() => handleButtonClick(`customer-logo-${index+1}`)}
              >
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-100 rounded-xl w-20 h-20 flex items-center justify-center 
                  group-hover:from-[#265ba3]/10 group-hover:to-blue-100 transition-all duration-300">
                  <Image
                    width={100} 
                    height={100}
                    src={logo.src} 
                    alt={logo.alt}
                    className="max-w-full max-h-full object-contain p-2"
                  />
                </div>
              </div>
            ))}
          </div>
          
          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center shadow-sm">
              <div className="text-3xl font-bold text-[#265ba3] mb-2">770K+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center shadow-sm">
              <div className="text-3xl font-bold text-[#265ba3] mb-2">95%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center shadow-sm">
              <div className="text-3xl font-bold text-[#265ba3] mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}