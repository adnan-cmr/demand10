
'use client'
import React, { useState } from "react";

const EmailSubscribe = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
      setEmail("");
      
      // Reset after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <div className="w-full">
      <section className="py-16 md:py-4 mt-14 mb-14 bg-gradient-to-r from-[#058f8c] to-[#4fd1c7] relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white/10"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-white/10"></div>
          <div className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full bg-white/5"></div>
          <div className="absolute bottom-1/3 left-1/4 w-20 h-20 rounded-full bg-white/5"></div>
          <div className="absolute top-1/4 left-1/3 w-12 h-12 rounded-full bg-white/5"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
              {/* Left Content */}
              <div className="lg:w-1/2 text-center lg:text-left">
                <div className="mb-6">
                  <div className="inline-flex items-center bg-white/20 text-white text-sm font-medium px-4 py-1 rounded-full mb-4">
                    <span className="w-2 h-2 bg-yellow-300 rounded-full mr-2"></span>
                    Exclusive Offer Inside
                  </div>
                  <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                    Stay Updated with <br className="hidden md:block" />Our Latest Insights
                  </h2>
                  <p className="text-blue-100 text-lg max-w-md">
                    Subscribe to our newsletter and never miss updates on industry trends, special offers, and new products.
                  </p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="flex items-start">
                    <div className="mr-4 mt-1">
                      <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-lg mb-1">Special Offer for Subscribers</h3>
                      <p className="text-blue-100">
                        Get <span className="text-yellow-300 font-semibold">15% off</span> your first purchase when you subscribe today!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Form */}
              <div className="lg:w-1/2 w-full max-w-lg">
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                  <h3 className="text-gray-800 text-2xl font-bold mb-6 text-center">Join Our Community</h3>
                  
                  {submitted ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold text-gray-800 mb-2">Thank You for Subscribing!</h4>
                      <p className="text-gray-600">
                        Check your inbox for a special welcome offer from us.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="mb-6">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your.email@example.com"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-blue-600 transition-colors duration-200 rounded focus:ring-blue-500"
                            required
                          />
                          <span className="ml-2 text-gray-700 text-sm">
                            I agree to receive marketing emails from demand10. I can unsubscribe at any time.
                          </span>
                        </label>
                      </div>
                      
                      <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-3 px-6 rounded-lg text-white font-medium transition-all ${
                          isLoading 
                            ? "bg-blue-400 cursor-not-allowed" 
                            : "bg-gradient-to-r from-[#058f8c] to-[#4fd1c7] hover:from-[#003f8f] hover:to-[#0c8577] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        }`}
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            Subscribe Now
                            <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </div>
                        )}
                      </button>
                    </form>
                  )}
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-gray-600">
                          We respect your privacy. Your information is secure and will never be shared.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmailSubscribe;