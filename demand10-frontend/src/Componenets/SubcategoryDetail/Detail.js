'use client';
import React from 'react';
import { ChevronRight, Home, MapPin, Users, DollarSign, TrendingUp, BarChart3, Building2, Contact, Globe } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const SubCategoryDetailPage = ({ subcategory }) => {
  // If no subcategory data is provided, show a coming soon message
  if (!subcategory) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Detailed Information Coming Soon</h1>
              <p className="text-gray-600">
                We&apos;re working on providing comprehensive details for this category. Please check back later for in-depth market insights, 
                company breakdowns, and industry trends.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If subcategory has no details, show a coming soon message
  const details = subcategory.details;
  if (!details) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Detailed Information Coming Soon</h1>
              <p className="text-gray-600">
                We&apos;re working on providing comprehensive details for {subcategory.name || "this category"}. Please check back later for in-depth market insights, 
                company breakdowns, and industry trends.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Reusable Metric Card Component
  const MetricCard = ({ icon: Icon, title, value, subtitle, color = "teal" }) => {
    const colorClasses = {
      teal: "bg-teal-50 text-teal-700",
      blue: "bg-blue-50 text-blue-700",
      orange: "bg-orange-50 text-orange-700",
      purple: "bg-purple-50 text-purple-700"
    };
    
    return (
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex items-center">
        <div className={`rounded-lg p-3 mr-4 ${colorClasses[color]}`}>
          <Icon size={20} />
        </div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-lg font-semibold">{value}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
        </div>
      </div>
    );
  };

  // Reusable Table Component with improved styling
  const DataTable = ({ headers, data, keyExtractor, className = "", title = "", icon: Icon }) => {
    if (!data || data.length === 0) return null;
    
    return (
      <div className={`bg-white rounded-xl shadow-sm border border-gray-200 ${className}`}>
        {title && (
          <div className="px-5 py-4 border-b border-gray-200 bg-white rounded-t-xl flex items-center">
            {Icon && <Icon size={18} className="text-teal-600 mr-2" />}
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                {headers.map((header, index) => (
                  <th 
                    key={index} 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                  >
                    {typeof header === 'object' ? header.label || header.key : header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((item, index) => {
                const rowKey = keyExtractor ? keyExtractor(item, index) : index;
                const key = Array.isArray(rowKey) ? rowKey.join('-') : rowKey;
                
                return (
                  <tr key={key} className="hover:bg-gray-50 transition-colors">
                    {headers.map((header, headerIndex) => {
                      let cellValue;
                      if (typeof header === 'object' && header.key) {
                        cellValue = item[header.key];
                      } else if (typeof header === 'string') {
                        const normalizedHeader = header.toLowerCase().replace(/\s+/g, '');
                        if (header === "Employee Range" || header === "Revenue Range") {
                          cellValue = item.range || '';
                        } else if (header === "Percentage") {
                          cellValue = item.percentage !== undefined ? item.percentage : item[header] || '';
                        } else if (header === "Contacts") {
                          cellValue = item.contacts !== undefined ? item.contacts : item[header] || '';
                        } else {
                          cellValue = item[normalizedHeader] || 
                                      item[header.replace(/\s+/g, '')] || 
                                      item[header] || 
                                      '';
                        }
                      } else {
                        cellValue = '';
                      }
                      
                      if (typeof header === 'object' && header.render) {
                        cellValue = header.render(item);
                      } else if (typeof cellValue === 'number' && (header === "Percentage" || (typeof header === 'string' && header.includes('Percentage')))) {
                        cellValue = `${cellValue}%`;
                      } else if (typeof cellValue === 'number' && (header === "Contacts" || (typeof header === 'string' && (header.includes('Companies') || header.includes('Contacts'))))) {
                        cellValue = cellValue.toLocaleString();
                      }
                      
                      return (
                        <td key={headerIndex} className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                          {cellValue}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header with Breadcrumbs and Internal Links */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <nav className="flex items-center text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
              <ol className="flex items-center">
                <li>
                  <Link href="/" className="text-teal-600 hover:text-teal-700 flex items-center">
                    <Home className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">Home</span>
                  </Link>
                </li>
                
                <li className="flex items-center">
                  <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
                  <span className="font-medium text-gray-900 capitalize">{subcategory?.name || "Subcategory"}</span>
                </li>
              </ol>
            </nav>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 capitalize">
                  {details?.heading || subcategory.name} 
                </h1>
                <p className="mt-2 text-gray-600 max-w-3xl text-sm sm:text-base">
                  {details?.metaDescription || "Explore companies in this category"}
                </p>
              </div>
              
              {/* Internal linking to related categories */}
              <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
                {subcategory?.name && (
                  <>
                    {subcategory.name.toLowerCase().includes('cloud') && (
                      <>
                        <Link 
                          href="/category/aws-partners" 
                          className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-orange-50 text-orange-700 hover:bg-orange-100 transition-colors border border-orange-200"
                        >
                          AWS Partners
                        </Link>
                        <Link 
                          href="/category/microsoft-partners" 
                          className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors border border-blue-200"
                        >
                          Microsoft Partners
                        </Link>
                      </>
                    )}
                    {subcategory.name.toLowerCase().includes('security') && (
                      <Link 
                        href="/category/cybersecurity-services" 
                        className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-red-50 text-red-700 hover:bg-red-100 transition-colors border border-red-200"
                      >
                        Cybersecurity
                      </Link>
                    )}
                    <Link 
                      href="/msp" 
                      className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-teal-50 text-teal-700 hover:bg-teal-100 transition-colors border border-teal-200"
                    >
                      Learn More
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <MetricCard 
            icon={Building2} 
            title="Total Companies" 
            value={subcategory?.totalCompanies ? subcategory.totalCompanies.toLocaleString() : "0"} 
            color="teal"
          />
          {details?.employeeSizeBreakdown && (
            <MetricCard 
              icon={Users} 
              title="Avg. Company Size" 
              value={details.employeeSizeBreakdown[0]?.range || "N/A"} 
              color="blue"
            />
          )}
          {details?.revenueSizeBreakdown && (
            <MetricCard 
              icon={DollarSign} 
              title="Avg. Revenue" 
              value={details.revenueSizeBreakdown[0]?.range || "N/A"} 
              color="orange"
            />
          )}
          {details?.countries && details.countries.length > 0 && (
            <MetricCard 
              icon={Globe} 
            title="Top Country" 
            value={details.countries[0]?.country || "N/A"} 
            subtitle={`${details.countries[0]?.percentage || 0}%`} 
            color="purple"
          />
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 space-y-8">
            
            {/* Geographic Distribution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {details?.countries?.length > 0 && (
                <DataTable 
                  headers={["Country", "Percentage"]}
                  data={details.countries}
                  keyExtractor={(item) => [item.country, `${item.percentage}%`]}
                  title="Countries Distribution"
                  icon={MapPin}
                />
              )}
              
              {details?.regions?.length > 0 && (
                <DataTable 
                  headers={["Region", "Percentage"]}
                  data={details.regions}
                  keyExtractor={(item) => [item.region, `${item.percentage}%`]}
                  title="Regional Distribution"
                  icon={Globe}
                />
              )}
            </div>

            {/* Company Size Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {details?.employeeSizeBreakdown?.length > 0 && (
                <DataTable 
                  headers={["Employee Range", "Percentage"]}
                  data={details.employeeSizeBreakdown}
                  keyExtractor={(item) => [item.range, `${item.percentage}%`]}
                  title="Employee Size Breakdown"
                  icon={Users}
                />
              )}
              
              {details?.revenueSizeBreakdown?.length > 0 && (
                <DataTable 
                  headers={["Revenue Range", "Percentage"]}
                  data={details.revenueSizeBreakdown}
                  keyExtractor={(item) => [item.range, `${item.percentage}%`]}
                  title="Revenue Size Breakdown"
                  icon={DollarSign}
                />
              )}
            </div>

            {/* Services & Technology */}
            {details?.servicesOffered?.length > 0 && (
              <DataTable 
                headers={["Service", "Percentage"]}
                data={details.servicesOffered}
                keyExtractor={(item) => [item.service, `${item.percentage}%`]}
                title="Primary Services Offered"
                icon={BarChart3}
              />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {details?.technologyAdoption?.cloudProviders?.length > 0 && (
                <DataTable 
                  headers={["Provider", "Percentage"]}
                  data={details.technologyAdoption.cloudProviders}
                  keyExtractor={(item) => [item.provider, `${item.percentage}%`]}
                  title="Cloud Platforms"
                  icon={TrendingUp}
                />
              )}
              
              {(details?.technologyAdoption?.rmmTools?.length > 0 || 
                details?.technologyAdoption?.securityTools?.length > 0) && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="px-5 py-4 border-b border-gray-200 bg-white rounded-t-xl flex items-center">
                    <BarChart3 size={18} className="text-teal-600 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-800">Popular Tools</h3>
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap gap-2">
                      {details.technologyAdoption?.rmmTools?.map((tool, index) => (
                        <span key={index} className="px-3 py-1.5 bg-teal-50 text-teal-700 rounded-lg text-xs sm:text-sm border border-teal-100">
                          {tool}
                        </span>
                      ))}
                      {details.technologyAdoption?.securityTools?.map((tool, index) => (
                        <span key={`sec-${index}`} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs sm:text-sm border border-blue-100">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Decision Makers */}
            {details?.decisionMakers?.length > 0 && (
              <DataTable 
                headers={["Role", "Contacts"]}
                data={details.decisionMakers}
                keyExtractor={(item) => [item.role, item.contacts?.toLocaleString()]}
                title="Key Decision Makers & Contacts"
                icon={Contact}
              />
            )}

            {/* Benchmark Insights */}
            {details?.benchmarkInsights && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="px-5 py-4 border-b border-gray-200 bg-white rounded-t-xl flex items-center">
                  <TrendingUp size={18} className="text-teal-600 mr-2" />
                  <h2 className="text-xl font-bold text-gray-800">Market Insights & Trends</h2>
                </div>
                <div className="p-5">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {details.benchmarkInsights.cagr !== undefined && (
                      <div className="bg-teal-50 rounded-lg p-4 text-center border border-teal-100">
                        <h3 className="font-semibold text-gray-700 mb-1 text-sm">Market CAGR</h3>
                        <p className="text-xl font-bold text-teal-600">{details.benchmarkInsights.cagr}%</p>
                        <p className="text-xs text-gray-500 mt-1">Annual growth rate</p>
                      </div>
                    )}
                    
                    {details.benchmarkInsights.hiringTrends !== undefined && (
                      <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-100">
                        <h3 className="font-semibold text-gray-700 mb-1 text-sm">Hiring Growth</h3>
                        <p className="text-xl font-bold text-blue-600">{details.benchmarkInsights.hiringTrends}%</p>
                        <p className="text-xs text-gray-500 mt-1">Year-over-year</p>
                      </div>
                    )}
                    
                    {details.benchmarkInsights.acquisitions !== undefined && (
                      <div className="bg-orange-50 rounded-lg p-4 text-center border border-orange-100">
                        <h3 className="font-semibold text-gray-700 mb-1 text-sm">M&A Activities</h3>
                        <p className="text-xl font-bold text-orange-600">{details.benchmarkInsights.acquisitions}</p>
                        <p className="text-xs text-gray-500 mt-1">Acquisitions in 2024</p>
                      </div>
                    )}
                    
                    {details.benchmarkInsights.cloudShift !== undefined && (
                      <div className="bg-purple-50 rounded-lg p-4 text-center border border-purple-100">
                        <h3 className="font-semibold text-gray-700 mb-1 text-sm">Cloud Adoption</h3>
                        <p className="text-xl font-bold text-purple-600">{details.benchmarkInsights.cloudShift}%</p>
                        <p className="text-xs text-gray-500 mt-1">Hybrid/multi-cloud shift</p>
                      </div>
                    )}
                    
                    {details.benchmarkInsights.remoteWorkImpact !== undefined && (
                      <div className="bg-green-50 rounded-lg p-4 text-center border border-green-100">
                        <h3 className="font-semibold text-gray-700 mb-1 text-sm">Remote Work Impact</h3>
                        <p className="text-xl font-bold text-green-600">{details.benchmarkInsights.remoteWorkImpact}%</p>
                        <p className="text-xs text-gray-500 mt-1">Demand increase</p>
                      </div>
                    )}
                    
                    {details.benchmarkInsights.securityInvestment !== undefined && (
                      <div className="bg-red-50 rounded-lg p-4 text-center border border-red-100">
                        <h3 className="font-semibold text-gray-700 mb-1 text-sm">Security Investment</h3>
                        <p className="text-xl font-bold text-red-600">{details.benchmarkInsights.securityInvestment}</p>
                        <p className="text-xs text-gray-500 mt-1">Industry spending</p>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {details.benchmarkInsights.trends?.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Key Industry Trends</h3>
                        <ul className="space-y-2">
                          {details.benchmarkInsights.trends.map((trend, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-teal-600 mr-2 mt-1">•</span>
                              <span className="text-gray-700 text-sm">{trend}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {details.benchmarkInsights.growthRegions?.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Growth Regions</h3>
                        <div className="flex flex-wrap gap-2">
                          {details.benchmarkInsights.growthRegions.map((region, index) => (
                            <span key={index} className="px-3 py-1.5 bg-teal-50 text-teal-700 rounded-lg text-xs sm:text-sm border border-teal-100">
                              {region}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Top Companies */}
            {(details?.topCompanies?.length > 0 || details?.sponsorCompanies?.length > 0) && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="px-5 py-4 border-b border-gray-200 bg-white rounded-t-xl flex items-center">
                  <Building2 size={18} className="text-teal-600 mr-2" />
                  <h2 className="text-xl font-bold text-gray-800">Top Companies</h2>
                </div>
                <div className="p-5">
                  {/* Display first 5 companies in one line */}
                  {(details.topCompanies || []).slice(0, 5).length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
                      {(details.topCompanies || []).slice(0, 5).map((company, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow text-center bg-gray-50">
                          <div className="flex flex-col items-center justify-center">
                            <div className="w-10 h-10 flex items-center justify-center mb-2 bg-white rounded-lg border border-gray-200">
                              {company.logo ? (
                                <Image 
                                  src={company.logo} 
                                  alt={company.name} 
                                  width={32} 
                                  height={32}
                                  className="w-6 h-6 object-contain"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                  }}
                                />
                              ) : (
                                <div className="w-6 h-6 rounded bg-teal-100 flex items-center justify-center text-teal-800 text-xs font-bold">
                                  {company.name?.charAt(0)?.toUpperCase() || 'C'}
                                </div>
                              )}
                            </div>
                            <h3 className="font-semibold text-gray-900 text-xs truncate w-full">{company.name}</h3>
                            {company.website && (
                              <a 
                                href={company.website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-xs text-teal-600 hover:underline truncate block mt-1"
                              >
                                Visit
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Display remaining companies below */}
                  {(details.topCompanies || []).slice(5).length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(details.topCompanies || []).slice(5).map((company, index) => (
                        <div key={`remaining-${index}`} className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow bg-gray-50">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 flex items-center justify-center bg-white rounded-lg border border-gray-200 flex-shrink-0">
                              {company.logo ? (
                                <Image 
                                  src={company.logo} 
                                  alt={company.name} 
                                  width={24}
                                  height={24}
                                  className="w-5 h-5 object-contain"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                  }}
                                />
                              ) : (
                                <div className="w-5 h-5 rounded bg-teal-100 flex items-center justify-center text-teal-800 text-xs font-bold">
                                  {company.name?.charAt(0)?.toUpperCase() || 'C'}
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 text-sm truncate">{company.name}</h3>
                              {company.website && (
                                <a 
                                  href={company.website} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-xs text-teal-600 hover:underline truncate block"
                                >
                                  {company.website.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:w-80 w-full">
  <div className="sticky top-8 space-y-6">
    {/* Sponsored Companies */}
    {subcategory?.sponsorCompanies?.length > 0 && (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-5 py-4 border-b border-gray-200 bg-white rounded-t-xl">
          <h2 className="text-lg font-semibold text-gray-800">Sponsored Companies</h2>
        </div>
        <div className="p-5 space-y-3">
          {subcategory.sponsorCompanies.map((company) => (
            <div 
              key={company._id} 
              className="border border-teal-100 rounded-lg p-3 hover:shadow-md transition-shadow bg-teal-50"
            >
              <div className="flex items-center gap-3">
                {/* Company Image (Clickable) */}
                <Link 
                  href={`/${subcategory.slug}/${company.slug}`} 
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-white border border-teal-200"
                >
                  {company.image ? (
                    <Image 
                      src={company.image} 
                      alt={company.companyName} 
                      width={20}
                      height={20}
                      className="w-5 h-5 object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : (
                    <div className="w-5 h-5 rounded bg-teal-100 flex items-center justify-center text-teal-800 text-xs font-bold">
                      {company.companyName?.charAt(0)?.toUpperCase() || 'C'}
                    </div>
                  )}
                </Link>

                {/* Company Info */}
                <div className="flex-1 min-w-0">
                  {/* Company Name (Clickable) */}
                  <Link 
                    href={`/${subcategory.slug}/${company.slug}`} 
                    className="break-words whitespace-normal font-medium text-gray-900 text-sm truncate hover:underline"
                  >
                    {company.companyName}
                  </Link>

                  {/* Website Link (Text only) */}
                  {company.website && (
                    <a 
                      href={company.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-teal-600 font-medium mt-1 block hover:underline"
                    >
                      Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Quick Actions */}
    <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-5 shadow-sm border border-teal-200">
      <h3 className="font-bold text-gray-800 mb-3">Get Company List</h3>
      <p className="text-sm text-gray-600 mb-4">
        Access a comprehensive list of companies in this category with detailed contact information
      </p>
      <div className="space-y-3">
        <Link 
          href={`/${subcategory?.slug || subcategory?.name || ''}`}
          className="w-full border border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-colors text-center block shadow-sm"
        >
          Get Companies List
        </Link>
      </div>
    </div>
  </div>
</div>

        </div>
      </div>
    </div>
  );
};

export default SubCategoryDetailPage;