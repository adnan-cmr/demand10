"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { checkUserAuth, getCompanyBySlug } from '@/services/userApi';
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic';
import ReviewForm from '../components/ReviewForm';
import { FaRegStar } from 'react-icons/fa';

// Dynamically import the AuthForm to avoid SSR issues
const AuthForm = dynamic(() => import('@/Componenets/ui/AuthForm'), { ssr: false });

export default function CompanyReviewPage({ params }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [company, setCompany] = useState(null);

  // Check if user is already logged in and fetch company data
  useEffect(() => {
    const initializePage = async () => {
      try {
        // Resolve params promise to get the actual params
        const resolvedParams = await params;
        console.log('Resolved params:', resolvedParams);
        
        // Check user authentication
        const authData = await checkUserAuth();
        console.log('Auth data:', authData); // Debugging
        if (authData.ok) {
          setUser(authData.user);
        }
        
        // Fetch company data using the resolved params
        if (resolvedParams.slug) {
          const companyData = await getCompanyBySlug(resolvedParams.slug);
          console.log('Company data:', companyData); // Debugging
          if (companyData.ok) {
            // Fix: Use companyData.data instead of companyData.company
            setCompany(companyData.data);
          } else {
            toast.error('Company not found');
            router.push('/review');
          }
        }
      } catch (error) {
        console.error('Error initializing page:', error);
        toast.error('Failed to load page');
        router.push('/review');
      } finally {
        setLoading(false);
      }
    };

    initializePage();
  }, [params, router]);

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
    console.log('Auth success:', userData); // Debugging
    setUser(userData);
    setShowAuthForm(false);
    toast.success('Welcome! You are now logged in.');
    // Don't redirect to dashboard, stay on the review page
  };

  // Handle review submitted
  const handleReviewSubmitted = () => {
    toast.success('Thank you for your review! It has been submitted successfully.');
    // Redirect to company page - we need to get the subcategory slug from the company data
    if (company && company.subcategory && company.subcategory.slug) {
      router.push(`/${company.subcategory.slug}/${company.slug}`);
    } else {
      router.push('/');
    }
  };

  // Debugging: Log state values
  console.log('CompanyReviewPage state:', { user, company, loading });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc]">
        {/* Hero Section Skeleton */}
        <section className="relative bg-[#1a365d] text-white py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="h-8 bg-blue-900/30 rounded w-1/4 mx-auto mb-4 animate-pulse"></div>
            <div className="h-10 bg-blue-900/30 rounded w-2/3 mx-auto mb-6 animate-pulse"></div>
            <div className="h-4 bg-blue-900/30 rounded w-1/2 mx-auto animate-pulse"></div>
          </div>
        </section>

        {/* Main Content Skeleton */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex justify-center mb-8">
              <div className="h-12 w-12 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-12 w-12 bg-gray-200 rounded-full mx-4 animate-pulse"></div>
              <div className="h-12 w-12 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
            <div className="space-y-6">
              <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If company not found, redirect
  if (!company) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#4897de] to-[#0249aa] text-white shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Review {company.companyName}
            </h1>
            <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
              Share your experience to help others make better business decisions
            </p>
            <div className="flex justify-center text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FaRegStar key={i} className="h-5 w-5" />
              ))}
              <span className="ml-2 text-blue-100">Be the first to review</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 transition-all">
          <ReviewForm 
            selectedCompany={company} 
            user={user} 
            onReviewSubmitted={handleReviewSubmitted} 
          />
        </div>
      </div>

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