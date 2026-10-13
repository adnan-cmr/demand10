"use client";

import React from 'react';
import Link from 'next/link';
import { Check, Star, ArrowRight, Download, Mail, Phone, MapPin } from 'lucide-react';
import MspForm from '@/Componenets/MspForm';

const CityMspPage = ({ city, cityData }) => {
  // Format city name for display
  const formattedCity = city.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  // Sample MSP data for the table (from cityData)
  const mspData = cityData.mspData || [];

  // Define all available cities from the JSON file
  const allCities = [
    { slug: 'managed-it-services-new-york', name: 'New York City' },
    { slug: 'managed-it-services-miami', name: 'Miami' },
    { slug: 'new-jersey-managed-service-providers', name: 'New Jersey' },
    { slug: 'managed-service-provider-los-angeles', name: 'Los Angeles' },
    { slug: 'it-managed-service-providers-los-angeles', name: 'Los Angeles (Premium)' },
    { slug: 'managed-it-services-chicago', name: 'Chicago' },
    { slug: 'managed-it-services-boston', name: 'Boston' },
    { slug: 'managed-it-services-orlando', name: 'Orlando' },
    { slug: 'columbus-managed-it-services', name: 'Columbus' },
    { slug: 'managed-it-services-charlotte', name: 'Charlotte' },
    { slug: 'managed-it-services-philadelphia', name: 'Philadelphia' },
    { slug: 'managed-services-milwaukee', name: 'Milwaukee' },
    { slug: 'managed-it-services-indianapolis', name: 'Indianapolis' },
    { slug: 'managed-it-services-nyc', name: 'NYC' }
  ];

  // Define related cities for internal linking (only using cities that exist in the JSON)
  const relatedCitiesMap = {
    'managed-it-services-new-york': [
      'managed-it-services-chicago',
      'managed-it-services-miami',
      'managed-service-provider-los-angeles',
      'managed-it-services-boston'
    ],
    'managed-it-services-miami': [
      'managed-it-services-new-york',
      'managed-it-services-orlando',
      'managed-service-provider-los-angeles',
      'managed-it-services-philadelphia'
    ],
    'new-jersey-managed-service-providers': [
      'managed-it-services-new-york',
      'managed-it-services-philadelphia',
      'managed-it-services-boston',
      'managed-it-services-chicago'
    ],
    'managed-service-provider-los-angeles': [
      'managed-it-services-new-york',
      'managed-it-services-miami',
      'it-managed-service-providers-los-angeles',
      'managed-it-services-chicago'
    ],
    'it-managed-service-providers-los-angeles': [
      'managed-service-provider-los-angeles',
      'managed-it-services-new-york',
      'managed-it-services-miami',
      'managed-it-services-chicago'
    ],
    'managed-it-services-chicago': [
      'managed-it-services-new-york',
      'managed-it-services-boston',
      'columbus-managed-it-services',
      'managed-it-services-indianapolis'
    ],
    'managed-it-services-boston': [
      'managed-it-services-new-york',
      'managed-it-services-chicago',
      'managed-it-services-philadelphia',
      'managed-it-services-nyc'
    ],
    'managed-it-services-orlando': [
      'managed-it-services-miami',
      'managed-it-services-charlotte',
      'managed-it-services-philadelphia',
      'managed-service-provider-los-angeles'
    ],
    'columbus-managed-it-services': [
      'managed-it-services-chicago',
      'managed-it-services-indianapolis',
      'managed-it-services-philadelphia',
      'managed-it-services-new-york'
    ],
    'managed-it-services-charlotte': [
      'managed-it-services-philadelphia',
      'managed-it-services-new-york',
      'managed-it-services-chicago',
      'managed-it-services-boston'
    ],
    'managed-it-services-philadelphia': [
      'managed-it-services-new-york',
      'new-jersey-managed-service-providers',
      'managed-it-services-boston',
      'managed-it-services-nyc'
    ],
    'managed-services-milwaukee': [
      'managed-it-services-chicago',
      'managed-it-services-indianapolis',
      'managed-it-services-minneapolis', // This doesn't exist, will be filtered out
      'managed-it-services-detroit' // This doesn't exist, will be filtered out
    ],
    'managed-it-services-indianapolis': [
      'managed-it-services-chicago',
      'columbus-managed-it-services',
      'managed-it-services-philadelphia',
      'managed-it-services-new-york'
    ],
    'managed-it-services-nyc': [
      'managed-it-services-new-york',
      'managed-it-services-chicago',
      'managed-it-services-miami',
      'managed-it-services-boston'
    ]
  };

  // Function to get related cities that actually exist in the JSON
  const getRelatedCities = (currentCitySlug) => {
    const relatedSlugs = relatedCitiesMap[currentCitySlug] || [];
    
    // Filter to only include cities that exist in our allCities array
    const validRelatedCities = relatedSlugs
      .map(slug => allCities.find(city => city.slug === slug))
      .filter(city => city !== undefined)
      .slice(0, 4); // Limit to 4 cities
    
    // If we don't have enough valid cities, add some from the main list (excluding current city)
    if (validRelatedCities.length < 4) {
      const additionalCities = allCities
        .filter(city => city.slug !== currentCitySlug && !validRelatedCities.some(related => related.slug === city.slug))
        .slice(0, 4 - validRelatedCities.length);
      
      return [...validRelatedCities, ...additionalCities];
    }
    
    return validRelatedCities;
  };

  // Get related cities for current page
  const currentPageRelatedCities = getRelatedCities(city);

  // Create descriptions for each city based on their slug
  const getCityDescription = (slug) => {
    const descriptions = {
      'managed-it-services-new-york': 'IT solutions for Manhattan, Brooklyn & Queens',
      'managed-it-services-miami': 'Managed services for South Florida businesses',
      'new-jersey-managed-service-providers': 'IT services for Garden State businesses',
      'managed-service-provider-los-angeles': 'Tech solutions for LA & surrounding areas',
      'it-managed-service-providers-los-angeles': 'Enterprise IT solutions for LA businesses',
      'managed-it-services-chicago': 'Managed services for the Loop & suburbs',
      'managed-it-services-boston': 'IT services for the Greater Boston area',
      'managed-it-services-orlando': 'Managed IT for Central Florida businesses',
      'columbus-managed-it-services': 'IT solutions for Ohio businesses',
      'managed-it-services-charlotte': 'Managed services for North Carolina',
      'managed-it-services-philadelphia': 'IT services for the City of Brotherly Love',
      'managed-services-milwaukee': 'IT solutions for Southeastern Wisconsin',
      'managed-it-services-indianapolis': 'Managed IT for Indiana businesses',
      'managed-it-services-nyc': 'IT solutions for New York City businesses'
    };
    
    return descriptions[slug] || 'Managed IT services';
  };

  // Add descriptions to the related cities
  const relatedCitiesWithDescriptions = currentPageRelatedCities.map(city => ({
    ...city,
    description: getCityDescription(city.slug)
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] py-8 md:py-14 relative overflow-hidden">
       
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up">
              {cityData.heroTitle}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-10 animate-fade-in-up animation-delay-200">
              {cityData.heroDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
              <Link href="#msp-table" className="px-8 py-4 bg-white text-[#1a365d] font-bold rounded-lg hover:bg-gray-100 transition-all shadow-lg transform hover:-translate-y-1 duration-300">
                View Top MSPs
              </Link>
              <Link href="#contact-form" className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all transform hover:-translate-y-1 duration-300">
                Get Recommendations
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content and Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content (70%) */}
          <div className="lg:w-2/3">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6 text-gray-700">
                {cityData.introduction}
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6 border-l-4 border-[#265ba3] pl-4">Why {formattedCity} Businesses Need Managed IT Services</h2>
              
              <p className="mb-6 text-gray-700">
                {formattedCity} businesses face unique technology challenges that require specialized managed IT services. From cybersecurity threats to infrastructure management, having a reliable IT partner is essential for business continuity and growth.
              </p>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl my-8 border-l-4 border-[#265ba3] shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Statistics for {formattedCity} Businesses:</h3>
                <ul className="space-y-2">
                  {cityData.statistics?.map((stat, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="text-[#265ba3] mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{stat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6 border-l-4 border-[#265ba3] pl-4">Challenges with Local IT Infrastructure & Cybersecurity</h2>
              
              <p className="mb-6 text-gray-700">
                {formattedCity} businesses face unique IT infrastructure and cybersecurity challenges that require specialized solutions:
              </p>
              
              {cityData.challenges?.map((challenge, index) => (
                <React.Fragment key={index}>
                  <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-[#265ba3] flex items-center justify-center text-white mr-3 text-sm">
                      {index + 1}
                    </div>
                    {challenge.title}
                  </h3>
                  <p className="mb-6 text-gray-700">
                    {challenge.description}
                  </p>
                </React.Fragment>
              ))}

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6 border-l-4 border-[#265ba3] pl-4">Benefits of Hiring an MSP in {formattedCity}</h2>
              
              <div className="grid md:grid-cols-2 gap-6 my-8">
                {cityData.benefits?.map((benefit, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:border-[#265ba3]">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[#265ba3] flex items-center justify-center text-white mr-3 text-sm">
                        <Check className="w-4 h-4 text-white  " />
                      </div>
                      {benefit.title}
                    </h3>
                    <p className="text-gray-700">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6 border-l-4 border-[#265ba3] pl-4">Top 10 Features to Look for in a {formattedCity} MSP</h2>
              
              <ol className="space-y-4 my-8 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                {cityData.features?.map((feature, index) => (
                  <li key={index} className="font-medium text-gray-800 pl-2">
                    <span className="font-bold text-[#265ba3] mr-2">{index + 1}.</span> {feature}
                  </li>
                ))}
              </ol>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6 border-l-4 border-[#265ba3] pl-4">Industry-Specific MSP Needs in {formattedCity}</h2>
              
              {cityData.industries?.map((industry, index) => (
                <React.Fragment key={index}>
                  <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-[#265ba3] flex items-center justify-center text-white mr-3 text-sm">
                      {String.fromCharCode(65 + index)}
                    </div>
                    {industry.title}
                  </h3>
                  <p className="mb-6 text-gray-700">
                    {industry.description}
                  </p>
                </React.Fragment>
              ))}

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6 border-l-4 border-[#265ba3] pl-4">Top Managed Service Providers in {formattedCity} (2025)</h2>
              
              <p className="mb-6 text-gray-700">
                After extensive research and analysis of client reviews, service offerings, and industry expertise, we&apos;ve identified the top managed service providers in {formattedCity} for 2025. These providers have demonstrated excellence in delivering comprehensive IT services tailored to {formattedCity}&apos;s unique business environment.
              </p>

              {/* MSP Table */}
              <div id="msp-table" className="my-12">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gradient-to-r from-[#265ba3] to-[#1e4a86]">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Company Name</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Industry</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Founded</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Website</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {mspData.map((msp, index) => (
                          <tr key={index} className={`hover:bg-blue-50 transition-colors duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{msp.name}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{msp.industry || 'Technology Services'}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{msp.founded || '2010'}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <a href={`${msp.website}`} target="_blank" rel="noopener noreferrer" className="text-[#265ba3] hover:text-[#1a365d] font-medium flex items-center">
                                Visit Site
                                <ArrowRight className="ml-1 w-4 h-4" />
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6 border-l-4 border-[#265ba3] pl-4">How to Choose the Right MSP for Your {formattedCity} Business</h2>
              
              <p className="mb-6 text-gray-700">
                Selecting the right managed service provider in {formattedCity} requires careful evaluation of several key factors:
              </p>
              
              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4 flex items-center">
                <div className="w-8 h-8 rounded-full bg-[#265ba3] flex items-center justify-center text-white mr-3 text-sm">
                  1
                </div>
                Industry Expertise
              </h3>
              <p className="mb-6 text-gray-700">
                Look for MSPs with proven experience in your specific industry. A healthcare MSP will understand HIPAA requirements, while a financial services MSP will be familiar with SOX compliance.
              </p>
              
              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4 flex items-center">
                <div className="w-8 h-8 rounded-full bg-[#265ba3] flex items-center justify-center text-white mr-3 text-sm">
                  2
                </div>
                Local Presence
              </h3>
              <p className="mb-6 text-gray-700">
                While remote monitoring is standard, having an MSP with a physical presence in {formattedCity} ensures faster response times for on-site issues and better understanding of local business challenges.
              </p>
              
              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4 flex items-center">
                <div className="w-8 h-8 rounded-full bg-[#265ba3] flex items-center justify-center text-white mr-3 text-sm">
                  3
                </div>
                Security Capabilities
              </h3>
              <p className="mb-6 text-gray-700">
                Evaluate the MSP&apos;s cybersecurity offerings, including threat detection, incident response, and compliance support. Request details on their security frameworks and certifications.
              </p>
              
              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4 flex items-center">
                <div className="w-8 h-8 rounded-full bg-[#265ba3] flex items-center justify-center text-white mr-3 text-sm">
                  4
                </div>
                Scalability
              </h3>
              <p className="mb-6 text-gray-700">
                Ensure the MSP can grow with your business. Discuss their approach to scaling services as your company expands or adopts new technologies.
              </p>
              
              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4 flex items-center">
                <div className="w-8 h-8 rounded-full bg-[#265ba3] flex items-center justify-center text-white mr-3 text-sm">
                  5
                </div>
                References and Reviews
              </h3>
              <p className="mb-6 text-gray-700">
                Request references from similar businesses in your industry. Check online reviews and case studies to validate their claims and service quality.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6 border-l-4 border-[#265ba3] pl-4">{formattedCity} MSP Market Trends (2025)</h2>
              
              <p className="mb-6 text-gray-700">
                The managed service provider landscape in {formattedCity} continues to evolve rapidly, driven by new technologies and changing business needs:
              </p>
              
              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4 flex items-center">
                <div className="w-8 h-8 rounded-full bg-[#265ba3] flex items-center justify-center text-white mr-3 text-sm">
                  <Star className="w-4 h-4" />
                </div>
                Cloud-First Approach
              </h3>
              <p className="mb-6 text-gray-700">
                {formattedCity} MSPs are increasingly adopting cloud-first strategies, helping businesses migrate to platforms like AWS, Azure, and Google Cloud. This shift enables more flexible, scalable solutions for growing companies.
              </p>
              
              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4 flex items-center">
                <div className="w-8 h-8 rounded-full bg-[#265ba3] flex items-center justify-center text-white mr-3 text-sm">
                  <Star className="w-4 h-4" />
                </div>
                AI-Powered Security
              </h3>
              <p className="mb-6 text-gray-700">
                Advanced threat detection using artificial intelligence and machine learning is becoming standard among top-tier {formattedCity} MSPs. These technologies enable proactive security measures that adapt to evolving threats.
              </p>
              
              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4 flex items-center">
                <div className="w-8 h-8 rounded-full bg-[#265ba3] flex items-center justify-center text-white mr-3 text-sm">
                  <Star className="w-4 h-4" />
                </div>
                Remote Work Support
              </h3>
              <p className="mb-6 text-gray-700">
                With the permanent shift to hybrid work models, MSPs are enhancing their remote work support capabilities, including secure VPN solutions, endpoint management, and collaboration platform optimization.
              </p>

              {/* Internal Links Section */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl my-12 border border-gray-200">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 border-l-4 border-[#265ba3] pl-4">Related Managed IT Services Resources</h2>
                <p className="mb-6 text-gray-700">
                  Explore our comprehensive resources on managed IT services, cybersecurity, and technology solutions:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link 
                    href="/managed-service-providers" 
                    className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all hover:border-[#265ba3] flex items-start"
                  >
                    <div className="bg-[#265ba3] p-2 rounded-lg mr-3">
                      <Download className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#265ba3]">Managed Service Providers</h3>
                      <p className="text-sm text-gray-600">Comprehensive guide to MSPs and their services</p>
                    </div>
                  </Link>
                  <Link 
                    href="/managed-security-service-providers" 
                    className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all hover:border-[#265ba3] flex items-start"
                  >
                    <div className="bg-[#265ba3] p-2 rounded-lg mr-3">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#265ba3]">Managed Security Service Providers</h3>
                      <p className="text-sm text-gray-600">Specialized cybersecurity services and solutions</p>
                    </div>
                  </Link>
                  <Link 
                    href="/network-security" 
                    className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all hover:border-[#265ba3] flex items-start"
                  >
                    <div className="bg-[#265ba3] p-2 rounded-lg mr-3">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#265ba3]">Network Security</h3>
                      <p className="text-sm text-gray-600">Protecting your business from cyber threats</p>
                    </div>
                  </Link>
                  <Link 
                    href="/data-backup-recovery" 
                    className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all hover:border-[#265ba3] flex items-start"
                  >
                    <div className="bg-[#265ba3] p-2 rounded-lg mr-3">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#265ba3]">Data Backup & Recovery</h3>
                      <p className="text-sm text-gray-600">Ensuring business continuity with reliable backups</p>
                    </div>
                  </Link>
                  <Link 
                    href="/global-msp" 
                    className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all hover:border-[#265ba3] flex items-start"
                  >
                    <div className="bg-[#265ba3] p-2 rounded-lg mr-3">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#265ba3]">Global MSP Services</h3>
                      <p className="text-sm text-gray-600">International managed service solutions</p>
                    </div>
                  </Link>
                  <Link 
                    href="/services" 
                    className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all hover:border-[#265ba3] flex items-start"
                  >
                    <div className="bg-[#265ba3] p-2 rounded-lg mr-3">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#265ba3]">All Services</h3>
                      <p className="text-sm text-gray-600">Complete overview of our service offerings</p>
                    </div>
                  </Link>
                 
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6 border-l-4 border-[#265ba3] pl-4">FAQs About Managed Service Providers in {formattedCity}</h2>
              
              <div className="space-y-6 my-8">
                {cityData.faq?.map((faq, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-start">
                      <div className="bg-[#265ba3] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-1 flex-shrink-0">
                        ?
                      </div>
                      {faq.question}
                    </h3>
                    <p className="text-gray-700">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>

              {/* Internal Linking Section - Added for SEO */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl my-12 border border-gray-200">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 border-l-4 border-[#265ba3] pl-4">Managed IT Services in Other Major Cities</h2>
                <p className="mb-6 text-gray-700">
                  Explore our comprehensive guides to managed IT services in other major metropolitan areas across the United States:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relatedCitiesWithDescriptions.map((relatedCity, index) => (
                    <Link 
                      key={index} 
                      href={`/msp/${relatedCity.slug}`} 
                      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all hover:border-[#265ba3] flex"
                    >
                    
                      <div>
                        <h3 className="font-bold text-[#265ba3]">{relatedCity.name}</h3>
                        <p className="text-sm text-gray-600">{relatedCity.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6 border-l-4 border-[#265ba3] pl-4">Conclusion: Choosing the Right {formattedCity} MSP</h2>
              
              <p className="mb-6 text-gray-700">
                {cityData.conclusion}
              </p>
              
              <div className="bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] p-8 rounded-xl text-white my-12 shadow-lg">
                <h3 className="text-2xl font-bold mb-4">Ready to Find Your Perfect {formattedCity} MSP?</h3>
                <p className="mb-6">
                  Let Demand10 match you with pre-vetted managed service providers in {formattedCity} who specialize in your industry and business size.
                </p>
                <Link href="#contact-form" className="inline-flex items-center px-6 py-3 bg-white text-[#1a365d] font-bold rounded-lg hover:bg-gray-100 transition-all transform hover:-translate-y-1 duration-300">
                  Get Free Recommendations
                  <ArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar (30%) */}
          <div className="lg:w-1/3 lg:sticky lg:top-4 lg:self-start">
            {/* Contact Form CTA - now using the separate component with city specific settings */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-200 p-6 mb-8 transition-all duration-300 hover:shadow-xl">
              <MspForm city={formattedCity} />
            </div>
            
            {/* Benefits List */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-200 p-6 mb-8 transition-all duration-300 hover:shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-[#265ba3] pl-2">Why Choose Managed IT Services?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-[#265ba3] p-2 rounded-lg mr-3 flex-shrink-0">
                    <Check className="text-white w-5 h-5" />
                  </div>
                  <span className="text-gray-700">Reduce IT costs by up to 35%</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-[#265ba3] p-2 rounded-lg mr-3 flex-shrink-0">
                    <Check className="text-white   w-5 h-5" />
                  </div>
                  <span className="text-gray-700">24/7 proactive monitoring & support</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-[#265ba3] p-2 rounded-lg mr-3 flex-shrink-0">
                    <Check className="text-white w-5 h-5" />
                  </div>
                  <span className="text-gray-700">Expert cybersecurity protection</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-[#265ba3] p-2 rounded-lg mr-3 flex-shrink-0">
                    <Check className="text-white w-5 h-5" />
                  </div>
                  <span className="text-gray-700">Predictable monthly IT expenses</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-[#265ba3] p-2 rounded-lg mr-3 flex-shrink-0">
                    <Check className="text-white w-5 h-5" />
                  </div>
                  <span className="text-gray-700">Access to enterprise-level expertise</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-[#265ba3] p-2 rounded-lg mr-3 flex-shrink-0">
                    <Check className="text-white w-5 h-5" />
                  </div>
                  <span className="text-gray-700">Focus on core business activities</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default CityMspPage;