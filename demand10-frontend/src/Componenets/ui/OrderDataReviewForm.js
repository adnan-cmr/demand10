"use client";

import { useState } from 'react';
import Script from 'next/script';
import { User, Mail, Phone } from "react-feather";
import { DataSetRequest } from "@/services/api";
import { toast } from "react-toastify";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export default function OrderDataReviewForm({ onClose, onSubmit, subCategory }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  if (!RECAPTCHA_SITE_KEY) {
    toast.error("Form is not configured. Please contact support.");
    setIsSubmitting(false);
    return;
  }

    try {
      window.grecaptcha.enterprise.ready(async () => {
        try {
          const token = await window.grecaptcha.enterprise.execute(
          RECAPTCHA_SITE_KEY,
          { action: "submit" }
          );

          const data = {
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            categoryName: subCategory || "",
            recaptchaToken: token,
          };

          const response = await DataSetRequest(data);

          // Handle response
          if (response.ok) {
            const responseData = await response.json();
            
            if (responseData.success || response.status === 200) {
              toast.success("Successfully submitted!");
              setFormData({
                fullName: "",
                email: "",
                phone: "",
                message: "",
              });
              setShowPopup(true);
              
              // Close the form after a short delay
              setTimeout(() => {
                onSubmit && onSubmit(formData);
                onClose();
              }, 2000);
            } else {
              // Backend returned error message
              const errorMsg = responseData.message || "Failed to submit form. Please try again.";
              toast.error(errorMsg);
              console.error("Backend error:", responseData);
            }
          } else {
            // HTTP error status
            let errorMessage = "Failed to submit form.";
            
            try {
              const errorData = await response.json();
              errorMessage = errorData.message || errorMessage;
              console.error("Server error details:", errorData);
            } catch (jsonError) {
              // Response is not JSON, use status text
              errorMessage = `Server error (${response.status}). Please try again later.`;
            }
            
            toast.error(errorMessage);
            
            // Log to console for debugging
            console.error("Form submission failed:", {
              status: response.status,
              statusText: response.statusText,
              url: response.url
            });
          }
        } catch (innerError) {
          console.error("Submission error:", innerError);
          
          // Check if it's a network error
          if (innerError.message === "Failed to fetch" || !navigator.onLine) {
            toast.error("Network error. Please check your connection and try again.");
          } else {
            toast.error("Failed to process request. Please try again later.");
          }
        } finally {
          setIsSubmitting(false);
        }
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  // Ensure the form is properly positioned and clickable
  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/enterprise.js?render=${RECAPTCHA_SITE_KEY}`}strategy="afterInteractive"/>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4 overflow-y-auto overscroll-contain animate-fadeIn" style={{ zIndex: 9999 }}>
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-scaleIn relative my-8" style={{ zIndex: 10000 }}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Request Data</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100 z-10"
            aria-label="Close"
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {showPopup ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">🎉 Thanks for submitting!</h3>
            <p className="text-gray-600 mb-4">
              Please check your <strong>email</strong> and also your <strong>spam/junk folder</strong>. Make sure to reply to our message to complete the process.
            </p>
            <p className="text-sm text-gray-600 mb-4">
              You shown interest in: <strong>{subCategory || "Comapny Data"}</strong><br />
              We consider you a <span className="text-emerald-600 font-semibold">trusted lead</span> for this category.
            </p>
            <button
              className="mt-2 bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] text-white px-6 py-2 cursor-pointer rounded-xl hover:opacity-90 transition z-10"
              onClick={onClose}
              type="button"
            >
              Got it! I check my email
            </button>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-2">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                  Your Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#265ba3] focus:border-transparent transition-all pr-12 text-gray-900 placeholder-gray-400"
                  />
                  <User className="absolute right-4 top-4 text-gray-400 w-5 h-5" />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    required
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#265ba3] focus:border-transparent transition-all pr-12 text-gray-900 placeholder-gray-400"
                  />
                  <Mail className="absolute right-4 top-4 text-gray-400 w-5 h-5" />
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#265ba3] focus:border-transparent transition-all pr-12 text-gray-900 placeholder-gray-400"
                  />
                  <Phone className="absolute right-4 top-4 text-gray-400 w-5 h-5" />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your project or inquiry..."
                  rows={4}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#265ba3] focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#265ba3] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed z-10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#265ba3] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed z-10"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    `Submit Request`
                  )}
                </button>
              </div>
            </form>
          </>
        )}
        
        <style jsx>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes scaleIn {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          .animate-fadeIn {
            animation: fadeIn 0.2s ease-out forwards;
          }
          .animate-scaleIn {
            animation: scaleIn 0.2s ease-out forwards;
          }
        `}</style>
      </div>
    </div>
    </>
  );
}