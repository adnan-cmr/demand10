'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { verifyEmail } from '../../services/userApi';
import Link from 'next/link';

export default function VerifyEmailPage() {
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('');
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    const verifyUserEmail = async () => {
      if (!token) {
        setStatus('error');
        setMessage('No verification token provided.');
        return;
      }

      try {
        const response = await verifyEmail(token);
        
        if (response.ok) {
          setStatus('success');
          setMessage(response.message || 'Email verified successfully. You can now log in.');
        } else {
          setStatus('error');
          setMessage(response.message || 'Failed to verify email.');
        }
      } catch (error) {
        setStatus('error');
        setMessage('An error occurred during email verification.');
        console.error('Verification error:', error);
      }
    };

    verifyUserEmail();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#4897de] to-[#0249aa] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-teal-100">
              <svg className="h-10 w-10 text-[#4897de]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Email Verification
            </h2>
          </div>
          
          <div className="mt-8">
            {status === 'verifying' && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#4897de] mx-auto"></div>
                <p className="mt-6 text-gray-700 font-medium">Verifying your email...</p>
                <p className="mt-2 text-gray-500 text-sm">Please wait while we confirm your email address</p>
              </div>
            )}

            {status === 'success' && (
              <div className="text-center py-8">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                  <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-medium text-gray-900">Verification Successful!</h3>
                <p className="mt-2 text-green-600 font-medium">{message}</p>
                <div className="mt-8">
                  <Link 
                    href="/login" 
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#4897de] hover:bg-[#0249aa] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4897de] transition-all duration-200"
                  >
                    Go to Login
                  </Link>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="text-center py-8">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
                  <svg className="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-medium text-gray-900">Verification Failed</h3>
                <p className="mt-2 text-red-600 font-medium">{message}</p>
                <div className="mt-8">
                  <Link 
                    href="/" 
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#4897de] hover:bg-[#0249aa] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4897de] transition-all duration-200"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}