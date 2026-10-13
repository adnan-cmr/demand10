"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { submitCompanyClaim, checkUserAuth } from '@/services/userApi';
import { toast } from 'react-toastify';
import { isBusinessEmail, isValidEmail } from '@/utils/emailValidation';

export default function ClaimForm({ company, user, onClose }) {
  const [formData, setFormData] = useState({
    companyId: company?._id || '',
    userName: user?.name || '',
    userEmail: user?.email || '',
    userPhone: '',
    companyName: company?.companyName || '',
    issue: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [businessEmail, setBusinessEmail] = useState('');
  const [showBusinessEmailForm, setShowBusinessEmailForm] = useState(false);
  const [verificationToken, setVerificationToken] = useState('');
  const [showVerificationForm, setShowVerificationForm] = useState(false);
  const router = useRouter();

  // Check if user is authenticated when component mounts
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authData = await checkUserAuth();
        if (authData.ok) {
          setIsAuthenticated(true);
          // Pre-fill form with user data if available
          setFormData(prev => ({
            ...prev,
            userName: authData.user?.email.split('@')[0] || prev.userName,
            userEmail: authData.user?.email || prev.userEmail
          }));
        }
      } catch (err) {
        console.error('Authentication check failed:', err);
      } finally {
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, []);

  const handleChange = useCallback((e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }, [formData]);

  const handleBusinessEmailChange = (e) => {
    setBusinessEmail(e.target.value);
  };

  const handleTokenChange = (e) => {
    setVerificationToken(e.target.value);
  };

  const submitBusinessEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate business email
    if (!isValidEmail(businessEmail)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    if (!isBusinessEmail(businessEmail)) {
      setError('Please enter a valid business email address. Personal email providers are not accepted.');
      setLoading(false);
      return;
    }

    try {
      // First, submit the claim with business email to trigger verification
      const result = await submitCompanyClaim({
        ...formData,
        businessEmail: businessEmail
      });

      if (result.ok && result.verificationRequired) {
        // Verification required, show token input form
        setShowBusinessEmailForm(false);
        setShowVerificationForm(true);
        toast.info('Verification code sent to your business email', {
          style: {
            backgroundColor: '#4897de',
            color: 'white'
          }
        });
      } else if (result.ok) {
        // No verification required, claim submitted successfully
        toast.success('Claim submitted successfully!', {
          style: {
            backgroundColor: '#4897de',
            color: 'white'
          }
        });
        setSuccess(true);
        setTimeout(() => {
          router.push('/user-dashboard');
        }, 2000);
      } else {
        toast.error(result.message || 'Failed to submit claim', {
          style: {
            backgroundColor: '#4897de',
            color: 'white'
          }
        });
        setError(result.message || 'Failed to submit claim');
      }
    } catch (err) {
      toast.error('Network error. Please try again.', {
        style: {
          backgroundColor: '#4897de',
          color: 'white'
        }
      });
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const verifyBusinessEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!verificationToken) {
      setError('Please enter the verification code');
      setLoading(false);
      return;
    }

    try {
      // Submit the claim with the verification token
      const result = await submitCompanyClaim({
        ...formData,
        businessEmail: businessEmail,
        businessEmailToken: verificationToken
      });

      if (result.ok) {
        toast.success('Business email verified and claim submitted successfully!', {
          style: {
            backgroundColor: '#4897de',
            color: 'white'
          }
        });
        setSuccess(true);
        setTimeout(() => {
          router.push('/user-dashboard');
        }, 2000);
      } else {
        toast.error(result.message || 'Failed to verify business email', {
          style: {
            backgroundColor: '#4897de',
            color: 'white'
          }
        });
        setError(result.message || 'Failed to verify business email');
      }
    } catch (err) {
      toast.error('Network error. Please try again.', {
        style: {
          backgroundColor: '#4897de',
          color: 'white'
        }
      });
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check authentication again before submitting
    try {
      const authData = await checkUserAuth();
      if (!authData.ok) {
        toast.error('You must be logged in to submit a claim. Redirecting to login...', {
          style: {
            backgroundColor: '#4897de',
            color: 'white'
          }
        });
        setTimeout(() => {
          router.push('/');
        }, 2000);
        return;
      }
    } catch (err) {
      toast.error('Authentication error. Please try again.', {
        style: {
          backgroundColor: '#4897de',
          color: 'white'
        }
      });
      return;
    }
    
    // Show business email form first
    setShowBusinessEmailForm(true);
  };

  // Add a function to refresh the parent page
  const refreshParentPage = () => {
    // Dispatch a custom event that the parent can listen to
    window.dispatchEvent(new CustomEvent('companyClaimed', { detail: { companyId: company?._id } }));
    // Close the form
    onClose();
  };

  // If authentication check is still loading
  if (!authChecked) {
    return (
      <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-scaleIn">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0249aa] mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Checking Authentication</h3>
            <p className="text-gray-600">Please wait while we verify your account...</p>
          </div>
        </div>
      </div>
    );
  }

  // If user is not authenticated, show login prompt
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-scaleIn">
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#0249aa]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Login Required</h3>
            <p className="text-gray-600 mb-6">You must be logged in to claim a company.</p>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => router.push('/')}
                className="flex-1 px-4 py-3 bg-[#0249aa] text-white rounded-lg hover:bg-[#1a365d] transition-colors font-medium"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scaleIn">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Claim This Company</h2>
              <p className="text-gray-600 text-sm mt-1">Verify your association with this business</p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {success && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Claim Submitted!</h3>
              <p className="text-gray-600 mb-6">Your claim has been submitted successfully. Our team will review it and contact you.</p>
              <button
                onClick={refreshParentPage}
                className="px-4 py-2 bg-[#0249aa] text-white rounded-lg hover:bg-[#1a365d] transition-colors font-medium"
              >
                Close
              </button>
            </div>
          )}

          {showVerificationForm ? (
            <form onSubmit={verifyBusinessEmail} className="space-y-5">
              <div className="bg-blue-100 p-4 rounded-lg border border-blue-200">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#0249aa] mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="ml-3 text-sm text-[#0249aa]">
                    We&apos;ve sent a verification code to <strong>{businessEmail}</strong>. Please enter the code below to verify your business email.
                  </p>
                </div>
              </div>
              
              <div>
                <label htmlFor="verificationToken" className="block text-sm font-medium text-gray-700 mb-2">
                  Verification Code
                </label>
                <input
                  type="text"
                  id="verificationToken"
                  value={verificationToken}
                  onChange={handleTokenChange}
                  className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-[#0249aa] focus:border-[#0249aa]"
                  placeholder="Enter verification code"
                  required
                />
              </div>
              
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowVerificationForm(false);
                    setShowBusinessEmailForm(true);
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-3 bg-[#0249aa] text-white rounded-lg hover:bg-[#1a365d] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verifying...
                    </>
                  ) : (
                    'Verify Email'
                  )}
                </button>
              </div>
              
              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
            </form>
          ) : showBusinessEmailForm ? (
            <form onSubmit={submitBusinessEmail} className="space-y-5">
              <div className="bg-blue-100 p-4 rounded-lg border border-blue-200">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#0249aa] mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="ml-3 text-sm text-[#0249aa]">
                    Please provide your business email address for verification. We&apod;ll send a verification code to this email.
                  </p>
                </div>
              </div>
              
              <div>
                <label htmlFor="businessEmail" className="block text-sm font-medium text-gray-700 mb-2">
                  Business Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    id="businessEmail"
                    value={businessEmail}
                    onChange={handleBusinessEmailChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-[#0249aa] focus:border-[#0249aa]"
                    placeholder="you@yourcompany.com"
                    required
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Please use your official business email address. Personal email providers (Gmail, Yahoo, etc.) are not accepted.
                </p>
              </div>
              
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowBusinessEmailForm(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-3 bg-[#0249aa] text-white rounded-lg hover:bg-[#1a365d] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Verification'
                  )}
                </button>
              </div>
              
              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="bg-blue-50 p-4 rounded-lg border border-[#0249aa]">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#0249aa] mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="ml-3 text-sm text-[#0249aa]">
                    Please provide accurate information to verify your association with this company. Our team will review your claim and contact you.
                  </p>
                </div>
              </div>
              
              <div>
                <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="userName"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-[#0249aa] focus:border-[#0249aa]"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    id="userEmail"
                    name="userEmail"
                    value={formData.userEmail}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-[#0249aa] focus:border-[#0249aa]"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="userPhone" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <input
                    type="tel"
                    id="userPhone"
                    name="userPhone"
                    value={formData.userPhone}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-[#0249aa] focus:border-[#0249aa]"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-[#0249aa] focus:border-[#0249aa]"
                  placeholder="Company Name"
                  required
                  readOnly
                />
              </div>
              
              <div>
                <label htmlFor="issue" className="block text-sm font-medium text-gray-700 mb-2">
                  Describe Your Relationship
                </label>
                <textarea
                  id="issue"
                  name="issue"
                  value={formData.issue}
                  onChange={handleChange}
                  rows={4}
                  className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-[#0249aa] focus:border-[#0249aa]"
                  placeholder="Please describe your relationship with this company (e.g., owner, employee, representative, etc.)"
                  required
                />
              </div>
              
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-3 bg-[#0249aa] text-white rounded-lg hover:bg-[#1a365d] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Continue to Business Email'
                  )}
                </button>
              </div>
              
              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
