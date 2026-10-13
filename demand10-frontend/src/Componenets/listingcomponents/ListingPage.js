'use client'

import React, { useState, useEffect } from 'react';
import { User, CheckCircle, ArrowRight, ArrowLeft, Home, RefreshCw, Star, TrendingUp, Shield, Menu, X, ShieldCheck } from 'lucide-react';
import ListingForm from './ListingForm';
import OtherSections from './OtherSections';
import dynamic from 'next/dynamic';
import { checkUserAuth } from '@/services/userApi';

// Dynamically import the AuthForm to avoid SSR issues
const AuthForm = dynamic(() => import('@/Componenets/ui/AuthForm'), { ssr: false });

const ListingPage = ({ initialUser }) => {
  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(!initialUser);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1: Intro, 2: Form Steps, 3: Success
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check if user is already logged in (in case initialUser was null)
  useEffect(() => {
    const checkUserAuthStatus = async () => {
      if (!user) {
        try {
          setLoading(true);
          const data = await checkUserAuth();
          if (data.ok) {
            setUser(data.user);
          }
        } catch (error) {
          console.error('Authentication check failed:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    checkUserAuthStatus();
  }, [user]);

  // Handle successful authentication
  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setShowAuthForm(false);
  };

  // Handle listing form completion
  const handleListingCompleted = () => {
    setCurrentStep(3); // Move to success page
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 right-10 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-10 left-1/2 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>
          <div className="relative w-full mx-auto py-16 px-4 sm:py-24">
            <div className="max-w-7xl mx-auto">
              <div className="h-16 bg-white/20 rounded-xl w-3/4 mx-auto mb-6 animate-pulse"></div>
              <div className="h-8 bg-white/20 rounded-lg w-1/2 mx-auto mb-10 animate-pulse"></div>
              <div className="flex justify-center gap-4">
                <div className="h-12 w-48 bg-white/20 rounded-xl animate-pulse"></div>
                <div className="h-12 w-48 bg-white/20 rounded-xl animate-pulse"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col gap-12">
            {/* Get Started Section Skeleton */}
            <div className="w-full">
              <div className="bg-white rounded-2xl shadow-lg p-12 border border-gray-100 max-w-3xl mx-auto">
                <div className="space-y-6">
                  <div className="h-10 bg-gray-200 rounded-xl w-1/3 mx-auto animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded-lg w-2/3 mx-auto animate-pulse"></div>
                  <div className="h-12 bg-gray-200 rounded-xl w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto animate-pulse"></div>
                </div>
              </div>
            </div>
            
            {/* Testimonials Skeleton */}
            <div className="w-full">
              <div className="text-center mb-10">
                <div className="h-10 bg-gray-200 rounded-xl w-1/3 mx-auto mb-4 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded-lg w-1/2 mx-auto animate-pulse"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse"></div>
                    <div className="ml-4">
                      <div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse"></div>
                      <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse"></div>
                    <div className="ml-4">
                      <div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse"></div>
                      <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse"></div>
                    <div className="ml-4">
                      <div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse"></div>
                      <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <OtherSections />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header with Logo and Progress Bar */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-[#265ba3] to-[#1a365d] rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold text-gray-800 hidden sm:block">List Your Company</span>
            </div>

            {/* Desktop Progress Bar */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Step 1 - Introduction */}
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  currentStep >= 1 ? "bg-[#265ba3] text-white shadow-md" : "bg-gray-200 text-gray-500"
                }`}>
                  {currentStep > 1 ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <span className="font-bold">1</span>
                  )}
                </div>
                <span className={`ml-2 text-sm font-medium transition-colors duration-300 ${
                  currentStep >= 1 ? "text-gray-800" : "text-gray-500"
                }`}>
                  Introduction
                </span>
              </div>
              
              {/* Connector */}
              <div className={`w-12 h-0.5 transition-colors duration-300 ${currentStep > 1 ? "bg-[#265ba3]" : "bg-gray-300"}`}></div>
              
              {/* Step 2 - Listing Form */}
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  currentStep >= 2 ? "bg-[#265ba3] text-white shadow-md" : "bg-gray-200 text-gray-500"
                }`}>
                  {currentStep > 2 ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <span className="font-bold">2</span>
                  )}
                </div>
                <span className={`ml-2 text-sm font-medium transition-colors duration-300 ${
                  currentStep >= 2 ? "text-gray-800" : "text-gray-500"
                }`}>
                  Company Details
                </span>
              </div>
              
              {/* Connector */}
              <div className={`w-12 h-0.5 transition-colors duration-300 ${currentStep > 2 ? "bg-[#265ba3]" : "bg-gray-300"}`}></div>
              
              {/* Step 3 - Success */}
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  currentStep >= 3 ? "bg-[#265ba3] text-white shadow-md" : "bg-gray-200 text-gray-500"
                }`}>
                  {currentStep >= 3 ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <span className="font-bold">3</span>
                  )}
                </div>
                <span className={`ml-2 text-sm font-medium transition-colors duration-300 ${
                  currentStep >= 3 ? "text-gray-800" : "text-gray-500"
                }`}>
                  Success
                </span>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-600 hover:text-gray-900 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Progress Bar */}
          <div className="md:hidden py-3 border-t border-gray-100">
            <div className="flex justify-between text-xs text-gray-600 mb-2">
              <span>Step {currentStep} of 3</span>
              <span>{currentStep === 1 ? 'Introduction' : currentStep === 2 ? 'Company Details' : 'Success'}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-[#265ba3] h-2 rounded-full transition-all duration-500" 
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3">
            <div className="flex justify-between text-sm">
              <div className={`flex items-center px-2 py-1 rounded ${currentStep === 1 ? 'bg-blue-50 text-[#265ba3]' : 'text-gray-600'}`}>
                <span className="font-medium">1. Intro</span>
              </div>
              <div className={`flex items-center px-2 py-1 rounded ${currentStep === 2 ? 'bg-blue-50 text-[#265ba3]' : 'text-gray-600'}`}>
                <span className="font-medium">2. Details</span>
              </div>
              <div className={`flex items-center px-2 py-1 rounded ${currentStep === 3 ? 'bg-blue-50 text-[#265ba3]' : 'text-gray-600'}`}>
                <span className="font-medium">3. Success</span>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content - Conditionally render based on current step */}
      <main className="w-full">
        {currentStep === 1 && (
          // Step 1: Introduction
          <div className="text-center">
            {/* Hero Section - No links to home page */}
            <section className="relative bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 right-10 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-10 left-1/2 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
              </div>
              <div className="relative w-full mx-auto py-16 px-4 sm:py-24">
                <div className="max-w-7xl mx-auto text-center">
                  <div className="inline-flex items-center bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                    Trusted by 770,000+ Professionals
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                    Welcome To <span className="text-blue-200">Demand 10!</span>
                  </h1>
                  <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-4xl mx-auto leading-relaxed">
                    Ensure that your potential customers can discover your business while they research their next purchase on Demand10. Join our growing community of trusted providers.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-2xl mx-auto">
                    <button 
                      onClick={() => {
                        if (user) {
                          setCurrentStep(2);
                          // Scroll to the listing form after a short delay to allow for rendering
                          setTimeout(() => {
                            const formElement = document.getElementById('listing-form');
                            if (formElement) {
                              formElement.scrollIntoView({ behavior: 'smooth' });
                            }
                          }, 100);
                        } else {
                          setShowAuthForm(true);
                        }
                      }}
                      className="cursor-pointer bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center"
                    >
                      {user ? 'Continue to Listing Form' : 'Sign In to List Your Product'}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => {
                        document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="bg-white text-[#1a365d] cursor-pointer font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white flex items-center justify-center"
                    >
                      How It Works
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Main Content */}
            <div className="w-full mx-auto px-4 py-8">
              <div className="max-w-7xl mx-auto">
                {/* Get Started Section - Simplified and User-Friendly */}
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-md p-8 md:p-12 border border-gray-200 mb-16 relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="text-center mb-12">
                      <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                        Join Our Community
                      </div>
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        List Your Product on <span className="text-[#265ba3]">Demand 10</span>
                      </h2>
                      <p className="text-lg text-gray-600 mt-5 max-w-3xl mx-auto leading-relaxed">
                        Join hundreds of businesses reaching more customers every day. Showcase your products to a targeted audience ready to purchase.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                      {/* Benefit Card 1 */}
                      <div className="bg-white rounded-2xl p-6 border border-gray-200 relative overflow-hidden group 
                        hover:border-[#265ba3] transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-2
                        flex flex-col h-full">
                        {/* Icon */}
                        <div className="flex justify-center mb-5">
                          <div className="w-16 h-16 rounded-2xl flex items-center justify-center 
                            bg-gradient-to-br from-blue-100 to-blue-200 border border-blue-100 shadow-sm 
                            group-hover:from-[#265ba3]/10 group-hover:to-blue-100 transition-all duration-300">
                            <TrendingUp className="w-8 h-8 text-[#265ba3]" />
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 text-center mb-3">
                          Boost Visibility
                        </h3>
                        
                        <p className="text-gray-600 text-center leading-relaxed flex-grow">
                          Get discovered by thousands of potential customers searching for your products
                        </p>
                        
                        {/* Stats */}
                        <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                          <div className="text-2xl font-bold text-[#265ba3]">85%</div>
                          <div className="text-sm text-gray-500">increase in visibility</div>
                        </div>
                      </div>
                      
                      {/* Benefit Card 2 */}
                      <div className="bg-white rounded-2xl p-6 border border-gray-200 relative overflow-hidden group 
                        hover:border-[#265ba3] transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-2
                        flex flex-col h-full">
                        {/* Icon */}
                        <div className="flex justify-center mb-5">
                          <div className="w-16 h-16 rounded-2xl flex items-center justify-center 
                            bg-gradient-to-br from-blue-100 to-blue-200 border border-blue-100 shadow-sm 
                            group-hover:from-[#265ba3]/10 group-hover:to-blue-100 transition-all duration-300">
                            <Star className="w-8 h-8 text-[#265ba3]" />
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 text-center mb-3">
                          Generate Leads
                        </h3>
                        
                        <p className="text-gray-600 text-center leading-relaxed flex-grow">
                          Connect with qualified buyers who are ready to purchase your solutions
                        </p>
                        
                        {/* Stats */}
                        <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                          <div className="text-2xl font-bold text-[#265ba3]">3x</div>
                          <div className="text-sm text-gray-500">more leads generated</div>
                        </div>
                      </div>
                      
                      {/* Benefit Card 3 */}
                      <div className="bg-white rounded-2xl p-6 border border-gray-200 relative overflow-hidden group 
                        hover:border-[#265ba3] transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-2
                        flex flex-col h-full">
                        {/* Icon */}
                        <div className="flex justify-center mb-5">
                          <div className="w-16 h-16 rounded-2xl flex items-center justify-center 
                            bg-gradient-to-br from-blue-100 to-blue-200 border border-blue-100 shadow-sm 
                            group-hover:from-[#265ba3]/10 group-hover:to-blue-100 transition-all duration-300">
                            <Shield className="w-8 h-8 text-[#265ba3]" />
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 text-center mb-3">
                          Build Credibility
                        </h3>
                        
                        <p className="text-gray-600 text-center leading-relaxed flex-grow">
                          Showcase verified reviews and ratings to build trust with buyers
                        </p>
                        
                        {/* Stats */}
                        <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                          <div className="text-2xl font-bold text-[#265ba3]">92%</div>
                          <div className="text-sm text-gray-500">of users trust reviews</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="max-w-2xl mx-auto">
                      <button
                        onClick={() => {
                          if (user) {
                            setCurrentStep(2);
                            // Scroll to the listing form after a short delay to allow for rendering
                            setTimeout(() => {
                              const formElement = document.getElementById('listing-form');
                              if (formElement) {
                                formElement.scrollIntoView({ behavior: 'smooth' });
                              }
                            }, 100);
                          } else {
                            setShowAuthForm(true);
                          }
                        }}
                        className="w-full bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center"
                      >
                        {user ? 'Continue to Listing Form' : 'Sign In to List Your Product'}
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </button>
                      <p className="text-center text-gray-600 mt-6">
                        Already have an account?{' '}
                        <button 
                          onClick={() => setShowAuthForm(true)}
                          className="text-[#265ba3] hover:underline font-medium"
                        >
                          Sign in here
                        </button>
                      </p>
                      
                      {/* Trust Indicators */}
                      <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                        <p className="text-gray-500 text-sm mb-3">Trusted by 770,000+ professionals worldwide</p>
                        <div className="flex justify-center space-x-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-[#1a365d] fill-current" />
                          ))}
                          <span className="text-gray-600 text-sm ml-2">4.9/5 from 15,000+ reviews</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* How It Works Section */}
            <section id="how-it-works" className="py-16 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                  <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                    Simple Process
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                    How It <span className="text-[#265ba3]">Works</span>
                  </h2>
                  <p className="text-lg text-gray-600 mt-5 max-w-3xl mx-auto leading-relaxed">
                    Listing your product on Demand 10 is simple and straightforward. Follow these easy steps to get started and reach more customers.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Step 1 */}
                  <div className="bg-white rounded-2xl p-8 text-center border border-gray-200 relative overflow-hidden group 
                    hover:border-[#265ba3] transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-2
                    flex flex-col h-full">
                    {/* Step Number */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      1
                    </div>
                    
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                      <div className="w-20 h-20 rounded-2xl flex items-center justify-center 
                        bg-gradient-to-br from-blue-100 to-blue-200 border border-blue-100 shadow-sm 
                        group-hover:from-[#265ba3]/10 group-hover:to-blue-100 transition-all duration-300">
                        <User className="text-[#265ba3] text-3xl" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Create Your Profile
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-base leading-relaxed flex-grow">
                      Sign up and provide detailed information about your company and products to showcase your offerings effectively.
                    </p>
                    
                    {/* CTA */}
                    <div className="mt-6">
                      <div className="inline-flex items-center text-[#265ba3] font-medium">
                        Get Started
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Step 2 */}
                  <div className="bg-white rounded-2xl p-8 text-center border border-gray-200 relative overflow-hidden group 
                    hover:border-[#265ba3] transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-2
                    flex flex-col h-full">
                    {/* Step Number */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      2
                    </div>
                    
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                      <div className="w-20 h-20 rounded-2xl flex items-center justify-center 
                        bg-gradient-to-br from-blue-100 to-blue-200 border border-blue-100 shadow-sm 
                        group-hover:from-[#265ba3]/10 group-hover:to-blue-100 transition-all duration-300">
                        <ShieldCheck className="text-[#265ba3] text-3xl" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Get Verified
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-base leading-relaxed flex-grow">
                      Our team will review and verify your listing to ensure quality and build trust with potential customers.
                    </p>
                    
                    {/* CTA */}
                    <div className="mt-6">
                      <div className="inline-flex items-center text-[#265ba3] font-medium">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Step 3 */}
                  <div className="bg-white rounded-2xl p-8 text-center border border-gray-200 relative overflow-hidden group 
                    hover:border-[#265ba3] transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-2
                    flex flex-col h-full">
                    {/* Step Number */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      3
                    </div>
                    
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                      <div className="w-20 h-20 rounded-2xl flex items-center justify-center 
                        bg-gradient-to-br from-blue-100 to-blue-200 border border-blue-100 shadow-sm 
                        group-hover:from-[#265ba3]/10 group-hover:to-blue-100 transition-all duration-300">
                        <TrendingUp className="text-[#265ba3] text-3xl" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Start Receiving Leads
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-base leading-relaxed flex-grow">
                      Once live, your listing will be visible to potential customers searching for your products and services.
                    </p>
                    
                    {/* CTA */}
                    <div className="mt-6">
                      <div className="inline-flex items-center text-[#265ba3] font-medium">
                        View Results
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* CTA Section */}
                <div className="mt-16 text-center">
                  <button 
                    onClick={() => {
                      if (user) {
                        setCurrentStep(2);
                        // Scroll to the listing form after a short delay to allow for rendering
                        setTimeout(() => {
                          const formElement = document.getElementById('listing-form');
                          if (formElement) {
                            formElement.scrollIntoView({ behavior: 'smooth' });
                          }
                        }, 100);
                      } else {
                        setShowAuthForm(true);
                      }
                    }}
                    className="px-8 py-4 bg-gradient-to-r from-[#265ba3] via-[#1e4a86] to-[#1a365d] hover:from-[#1e4a86] hover:to-blue-800 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                  >
                    {user ? 'Continue to Listing Form' : 'Sign In to Get Started'}
                  </button>
                  <p className="mt-4 text-gray-600">
                    Join our community of 770,000+ professionals today.
                  </p>
                </div>
              </div>
            </section>
            
            {/* Benefits Section */}
            <section className="py-16 bg-white relative overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                  <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                    Key Advantages
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                    Benefits of <span className="text-[#265ba3]">Listing</span>
                  </h2>
                  <p className="text-lg text-gray-600 mt-5 max-w-3xl mx-auto leading-relaxed">
                    Discover how listing your product with us can help grow your business and reach more customers.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Benefit 1 */}
                  <div className="bg-white rounded-2xl p-6 border border-gray-200 relative overflow-hidden group 
                    hover:border-[#265ba3] transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-2
                    flex flex-col h-full">
                    {/* Icon */}
                    <div className="flex justify-center mb-5">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center 
                        bg-gradient-to-br from-blue-100 to-blue-200 border border-blue-100 shadow-sm 
                        group-hover:from-[#265ba3]/10 group-hover:to-blue-100 transition-all duration-300">
                        <TrendingUp className="w-8 h-8 text-[#265ba3]" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Increased Visibility
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-base leading-relaxed flex-grow">
                      Reach millions of active buyers searching for products like yours every month.
                    </p>
                    
                    {/* Stats */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="text-2xl font-bold text-[#265ba3]">2M+</div>
                      <div className="text-sm text-gray-500">monthly visitors</div>
                    </div>
                  </div>
                  
                  {/* Benefit 2 */}
                  <div className="bg-white rounded-2xl p-6 border border-gray-200 relative overflow-hidden group 
                    hover:border-[#265ba3] transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-2
                    flex flex-col h-full">
                    {/* Icon */}
                    <div className="flex justify-center mb-5">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center 
                        bg-gradient-to-br from-blue-100 to-blue-200 border border-blue-100 shadow-sm 
                        group-hover:from-[#265ba3]/10 group-hover:to-blue-100 transition-all duration-300">
                        <Shield className="w-8 h-8 text-[#265ba3]" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Build Credibility
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-base leading-relaxed flex-grow">
                      Enhance your brand value with authentic customer reviews and verified ratings.
                    </p>
                    
                    {/* Stats */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="text-2xl font-bold text-[#265ba3]">92%</div>
                      <div className="text-sm text-gray-500">trust increase</div>
                    </div>
                  </div>
                  
                  {/* Benefit 3 */}
                  <div className="bg-white rounded-2xl p-6 border border-gray-200 relative overflow-hidden group 
                    hover:border-[#265ba3] transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-2
                    flex flex-col h-full">
                    {/* Icon */}
                    <div className="flex justify-center mb-5">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center 
                        bg-gradient-to-br from-blue-100 to-blue-200 border border-blue-100 shadow-sm 
                        group-hover:from-[#265ba3]/10 group-hover:to-blue-100 transition-all duration-300">
                        <Star className="w-8 h-8 text-[#265ba3]" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Generate Leads
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-base leading-relaxed flex-grow">
                      Connect with potential customers actively looking for your products and services.
                    </p>
                    
                    {/* Stats */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="text-2xl font-bold text-[#265ba3]">3x</div>
                      <div className="text-sm text-gray-500">more leads</div>
                    </div>
                  </div>
                  
                  {/* Benefit 4 */}
                  <div className="bg-white rounded-2xl p-6 border border-gray-200 relative overflow-hidden group 
                    hover:border-[#265ba3] transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-2
                    flex flex-col h-full">
                    {/* Icon */}
                    <div className="flex justify-center mb-5">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center 
                        bg-gradient-to-br from-blue-100 to-blue-200 border border-blue-100 shadow-sm 
                        group-hover:from-[#265ba3]/10 group-hover:to-blue-100 transition-all duration-300">
                        <svg className="w-8 h-8 text-[#265ba3]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                        </svg>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Detailed Analytics
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-base leading-relaxed flex-grow">
                      Track your listing performance with comprehensive analytics and actionable insights.
                    </p>
                    
                    {/* Stats */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="text-2xl font-bold text-[#265ba3]">95%</div>
                      <div className="text-sm text-gray-500">data accuracy</div>
                    </div>
                  </div>
                </div>
                
                {/* CTA Section */}
                <div className="mt-16 text-center">
                  <button 
                    onClick={() => {
                      if (user) {
                        setCurrentStep(2);
                        // Scroll to the listing form after a short delay to allow for rendering
                        setTimeout(() => {
                          const formElement = document.getElementById('listing-form');
                          if (formElement) {
                            formElement.scrollIntoView({ behavior: 'smooth' });
                          }
                        }, 100);
                      } else {
                        setShowAuthForm(true);
                      }
                    }}
                    className="px-8 py-4 bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                  >
                    {user ? 'Continue to Listing Form' : 'Sign In to List Your Product'}
                  </button>
                  <p className="mt-4 text-gray-600">
                    Join our community of successful businesses today.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {currentStep === 2 && (
          // Step 2: Listing Form
          <div id="listing-form" className="py-8 max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Company Listing Form</h1>
                <p className="text-[#4897de] mt-2">Fill in your company details to get started</p>
              </div>
              {user && (
                <button 
                  onClick={() => {
                    if (window.confirm('Are you sure you want to go back? Your progress will be lost.')) {
                      setCurrentStep(1);
                    }
                  }}
                  className="text-[#265ba3] hover:text-indigo-700 font-medium flex items-center bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-all"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Introduction
                </button>
              )}
            </div>
            <ListingForm onListingCompleted={handleListingCompleted} />
          </div>
        )}

        {currentStep === 3 && (
          // Step 3: Success
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-8 md:p-12 text-center border border-gray-100 max-w-3xl mx-auto my-12">
            <div className="w-24 h-24 bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
              <CheckCircle className="w-14 h-14 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Thank You!</h2>
            <p className="text-[#4897de] mb-10 text-lg max-w-2xl mx-auto leading-relaxed">
              Your company listing has been submitted successfully. Our team will review it shortly and notify you once it&apos;s live.
            </p>
            <div className="bg-blue-50 rounded-xl p-6 mb-10 border border-blue-100">
              <h3 className="font-bold text-gray-800 mb-2">What happens next?</h3>
              <p className="text-[#4897de] text-sm">
                We&apos;ll review your submission within 24-48 hours. You&apos;ll receive an email notification once your listing is approved and live on our platform.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => window.location.href = '/'}
                className="px-8 py-4 bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] text-white rounded-xl font-bold hover:from-blue-700 hover:to-indigo-800 transition-all shadow-lg hover:shadow-xl duration-300 transform hover:-translate-y-1 flex items-center justify-center"
              >
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </button>
              <button
                onClick={() => {
                  setCurrentStep(1);
                  window.location.reload();
                }}
                className="px-8 py-4 bg-white text-[#265ba3] border-2 border-[#265ba3] rounded-xl font-bold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                List Another Company
              </button>
            </div>
          </div>
        )}
      </main>
      
      {/* Other Sections - Only shown on Step 1 */}
      {currentStep === 1 && <OtherSections />}

      {/* Auth Form Popup */}
      {showAuthForm && (
        <AuthForm 
          onClose={() => setShowAuthForm(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      )}
    </div>
  );
};

export default ListingPage;