"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Linkedin, Facebook, Twitter, ChevronDown, ChevronUp } from "lucide-react";

const MspCompanyCards = ({ companies, onOpenForm }) => {
  const [expandedCompany, setExpandedCompany] = useState(null);
  
  const toggleCompany = (index) => {
    setExpandedCompany(expandedCompany === index ? null : index);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
      {/* Left Side - Scrollable Company List */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Table Header - Hidden on Mobile */}
          <div className="hidden md:grid bg-gray-100 text-gray-800 px-4 md:px-6 py-4 grid-cols-12 gap-2 md:gap-4 text-xs md:text-sm font-semibold border-b border-gray-200">
            <div className="col-span-3">COMPANY</div>
            <div className="col-span-3">INDUSTRY</div>
            <div className="col-span-2">LOCATION</div>
            <div className="col-span-2">EMPLOYEES</div>
            <div className="col-span-2">FOUNDED</div>
          </div>

          {/* Scrollable Company List - Hidden Scrollbar */}
          <div className="max-h-[600px] md:max-h-[700px] overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <style jsx>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {companies.map((company, index) => (
              <div key={index} className="border-b border-gray-200">
                {/* Company Row - Desktop View */}
                <div
                  onClick={() => toggleCompany(index)}
                  className={`hidden md:grid px-4 md:px-6 py-4 grid-cols-12 gap-2 md:gap-4 items-center cursor-pointer transition-all ${
                    expandedCompany === index ? 'bg-white border-l-4 border-[#265ba3]' : 'hover:bg-gray-50'
                  }`}
                >
                  {/* Company Name & Logo */}
                  <div className="col-span-3 flex items-center gap-2 md:gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0 bg-white rounded-full flex items-center justify-center border border-gray-200">
                      <Image
                        src={company.logo}
                        alt={company.name}
                        width={32}
                        height={32}
                        className="object-contain rounded-full"
                      />
                    </div>
                    <span className="font-semibold text-gray-800 text-xs md:text-sm truncate">{company.name}</span>
                  </div>

                  {/* Industry */}
                  <div className="col-span-3 text-xs md:text-sm text-gray-600 truncate">
                    {company.industry}
                  </div>

                  {/* Location */}
                  <div className="col-span-2 text-xs md:text-sm text-gray-600 truncate">
                    {company.location.split(',').pop().trim()}
                  </div>

                  {/* Employees */}
                  <div className="col-span-2 text-xs md:text-sm text-gray-600">
                    {company.employees}
                  </div>

                  {/* Founded */}
                  <div className="col-span-1 text-xs md:text-sm text-gray-600">
                    {company.founded}
                  </div>

                  {/* Expand Icon */}
                  <div className="col-span-1 flex justify-end">
                    {expandedCompany === index ? (
                      <ChevronUp className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                    ) : (
                      <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                    )}
                  </div>
                </div>

                {/* Company Card - Mobile View */}
                <div
                  onClick={() => toggleCompany(index)}
                  className={`md:hidden px-4 py-4 cursor-pointer transition-all ${
                    expandedCompany === index ? 'bg-white border-l-4 border-[#265ba3]' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="w-12 h-12 flex-shrink-0 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                        <Image
                          src={company.logo}
                          alt={company.name}
                          width={40}
                          height={40}
                          className="object-contain rounded-lg"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 text-sm mb-1 truncate">{company.name}</h4>
                        <p className="text-xs text-gray-600 mb-1 truncate">{company.industry}</p>
                        <p className="text-xs text-gray-500 truncate">{company.location ? company.location.split(',').slice(-2).join(',').trim() : ''}</p>
                        <div className="flex gap-3 mt-2">
                          <span className="text-xs text-gray-600">
                            <span className="font-semibold">{company.employees}</span> employees
                          </span>
                          <span className="text-xs text-gray-600">
                            Est. <span className="font-semibold">{company.founded}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      {expandedCompany === index ? (
                        <ChevronUp className="w-5 h-5 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedCompany === index && (
                  <div className="px-4 md:px-6 py-4 md:py-6 bg-gray-50 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      {/* General Info */}
                      <div>
                        <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4 pb-2 border-b-2 border-[#265ba3]">
                          General Info
                        </h3>
                        <div className="space-y-2 md:space-y-3">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Employees</p>
                            <p className="text-sm text-gray-800 font-semibold">{company.employees}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Location</p>
                            <p className="text-sm text-gray-800 font-semibold break-words">{company.location}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Industry</p>
                            <p className="text-sm text-gray-800 font-semibold">{company.industry}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Founded</p>
                            <p className="text-sm text-gray-800 font-semibold">{company.founded}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Description</p>
                            <p className="text-sm text-gray-700 leading-relaxed">{company.description}</p>
                          </div>
                        </div>
                      </div>

                      {/* Contact & Partnership Info */}
                      <div>
                        <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4 pb-2 border-b-2 border-[#265ba3]">
                          Contact Info
                        </h3>
                        <div className="space-y-2 md:space-y-3">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Phone</p>
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-[#265ba3] flex-shrink-0" />
                              <a href={`tel:${company.phone}`} className="text-sm text-gray-800 font-semibold hover:text-[#265ba3] transition">
                                {company.phone}
                              </a>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Address</p>
                            <div className="flex items-start gap-2">
                              <MapPin className="w-4 h-4 text-[#265ba3] flex-shrink-0 mt-0.5" />
                              <p className="text-sm text-gray-800 font-semibold break-words">{company.address}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Website</p>
                            <Link
                              href={company.website}
                              target="_blank"
                              className="text-sm text-[#265ba3] hover:underline font-semibold break-all"
                            >
                              {company.website}
                            </Link>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-2">Social Media</p>
                            <div className="flex gap-3 flex-wrap">
                              {company.linkedin && (
                                <Link href={company.linkedin} target="_blank" className="text-gray-600 hover:text-[#0077b5] transition">
                                  <Linkedin className="w-5 h-5" />
                                </Link>
                              )}
                              {company.facebook && (
                                <Link href={company.facebook} target="_blank" className="text-gray-600 hover:text-[#1877f2] transition">
                                  <Facebook className="w-5 h-5" />
                                </Link>
                              )}
                              {company.twitter && (
                                <Link href={company.twitter} target="_blank" className="text-gray-600 hover:text-[#1da1f2] transition">
                                  <Twitter className="w-5 h-5" />
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="mt-4 md:mt-6">
                          <Link
                            href={company.website}
                            target="_blank"
                            className="block text-center bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] hover:opacity-90 text-white py-2.5 md:py-3 px-4 md:px-6 rounded-lg transition duration-300 font-semibold text-sm"
                          >
                            Visit {company.name}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Descriptive Text */}
      <div className="lg:col-span-1">
        <div className="bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] rounded-xl shadow-lg p-6 md:p-8 text-white lg:sticky lg:top-4">
          <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
            Explore Top MSP Companies
          </h3>
          <p className="mb-4 text-sm leading-relaxed opacity-95">
            Discover leading Managed Service Providers from around the world. Our curated directory features verified IT companies specializing in cloud solutions, cybersecurity, and digital transformation.
          </p>
          <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
            <div className="flex items-start gap-2 md:gap-3">
              <div className="w-5 h-5 md:w-6 md:h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <p className="text-xs md:text-sm">Verified company information with real contact details</p>
            </div>
            <div className="flex items-start gap-2 md:gap-3">
              <div className="w-5 h-5 md:w-6 md:h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <p className="text-xs md:text-sm">Direct access to company websites and social profiles</p>
            </div>
            <div className="flex items-start gap-2 md:gap-3">
              <div className="w-5 h-5 md:w-6 md:h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <p className="text-xs md:text-sm">Click any company to view detailed information</p>
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <p className="text-xs font-semibold mb-2">Need Custom Data?</p>
            <p className="text-xs opacity-90 mb-3">
              Get access to our complete MSP database with advanced filtering, export capabilities, and premium insights.
            </p>
            <button 
              onClick={onOpenForm}
              className="w-full bg-white text-[#265ba3] py-2 px-4 rounded-lg font-semibold text-sm hover:bg-gray-100 transition cursor-pointer"
            >
              Request Access
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MspCompanyCards;
