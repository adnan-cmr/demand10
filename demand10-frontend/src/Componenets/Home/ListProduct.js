import React from 'react';
import Image from "next/image";
import Link from 'next/link';

export default function ListProductSection() {
  return (
    <div className="bg-gray-50 py-16 px-4 relative overflow-hidden">
      {/* Enhanced Decorative SVG Background Elements */}
      {/* Top Left Decorative Element */}
      <div className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3 opacity-5">
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="200" r="200" fill="#265ba3" fillOpacity="0.1"/>
          <circle cx="200" cy="200" r="160" fill="#265ba3" fillOpacity="0.15"/>
          <circle cx="200" cy="200" r="120" fill="#265ba3" fillOpacity="0.2"/>
          <circle cx="200" cy="200" r="80" fill="#265ba3" fillOpacity="0.25"/>
          <circle cx="200" cy="200" r="40" fill="#265ba3" fillOpacity="0.3"/>
        </svg>
      </div>

      {/* Top Right Decorative Element */}
      <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 opacity-5">
        <svg width="250" height="250" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="125" cy="125" r="125" fill="#265ba3" fillOpacity="0.1"/>
          <circle cx="125" cy="125" r="100" fill="#265ba3" fillOpacity="0.15"/>
          <circle cx="125" cy="125" r="75" fill="#265ba3" fillOpacity="0.2"/>
          <circle cx="125" cy="125" r="50" fill="#265ba3" fillOpacity="0.25"/>
          <circle cx="125" cy="125" r="25" fill="#265ba3" fillOpacity="0.3"/>
        </svg>
      </div>

      <div className="absolute bottom-1/3 left-1/3 opacity-5">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="30,8 52,30 30,52 8,30" fill="#265ba3"/>
        </svg>
      </div>

      <div className="w-full mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Left Column - Content */}
          <div className="space-y-8 lg:pl-8 lg:pr-4 lg:w-5/12">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-5xl font-bold text-[#265ba3] mb-6 leading-tight">
                List Your Product
              </h2>
              
              <div className="space-y-6">
                <h3 className="text-xl md:text-2xl font-semibold text-black mb-4">
                  Boost Your Reach at Zero Cost
                </h3>
                
                <div className="space-y-4">
                  {[
                    "Expand your reach to a larger audience",
                    "Generate leads that convert",
                    "Accelerate profit growth strategically"
                  ].map((text, i) => (
                    <div key={i} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
                          <svg className="w-4 h-4 text-[#265ba3]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-lg text-black leading-relaxed">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link href='/listing'>
                  <button className="bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] cursor-pointer  text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg inline-flex items-center text-lg w-full sm:w-auto justify-center">
                    Get Listed
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </Link>
                <Link href='/contact'>
                  <button className="border-2 border-[#1a365d] text-[#1a365d] hover:bg-[#1a365d] hover:text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 inline-flex items-center text-lg w-full sm:w-auto justify-center">
                    Contact Sales
                  </button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Right Column - Logos */}
          <div className="space-y-6 lg:pr-8 lg:pl-4 lg:w-7/12">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-[#265ba3] mb-2">
                Trusted by 500+ Vendors
              </h3>
              <p className="text-lg text-black max-w-2xl mx-auto">
                Join leading companies that trust us to showcase their products
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {[
                { src: "/images/monday.avif", alt: "Monday.com" },
                { src: "/images/salesforce.avif", alt: "Salesforce" },
                { src: "/images/pipedrive.avif", alt: "Pipedrive" },
                { src: "/images/wrike.avif", alt: "Wrike" },
                { src: "/images/hubspot.avif", alt: "HubSpot" },
                { src: "/images/ninjaone.avif", alt: "NinjaOne" },
                { src: "/images/apollo-io.avif", alt: "Apollo.io" },
                { src: "/images/zoho.avif", alt: "Zoho" },
              ].map((logo, i) => (
                <div key={i} className="bg-white rounded-xl flex items-center justify-center p-4 border border-gray-200 hover:border-[#265ba3]/50 transition-all duration-300 hover:shadow-md aspect-square">
                  <div className="relative w-full h-full">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      fill
                      className="transition-transform duration-300 hover:scale-105 object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}