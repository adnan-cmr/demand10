import Head from "next/head";
import { Shield, Lock, Link, MessageCircle, Server, Cloud, Users, Building } from "lucide-react";
import NextLink from "next/link";

export const metadata = {
  title: "Benefits of Managed IT Services for Business Growth | Demand10",
  description:
    "Discover the key benefits of managed IT services for businesses, including cost savings, enhanced security, and 24/7 support. Learn how managed service providers can transform your IT operations.",
  keywords: [
    "Benefits of managed IT services",
    "managed service provider",
    "IT managed services",
    "managed IT security services",
    "co-managed IT services",
    "cloud service provider",
    "managed IT support",
    "IT services managed services",
    "managed service providers"
  ],
  metadataBase: new URL("https://demand10.com"),
  alternates: {
    canonical: "/strategies",
  },
  openGraph: {
    title: "Benefits of Managed IT Services for Business Growth | Demand10",
    description:
      "Discover the key benefits of managed IT services for businesses, including cost savings, enhanced security, and 24/7 support. Learn how managed service providers can transform your IT operations.",
    url: "https://demand10.com/strategies",
    siteName: "Demand10",
    
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Benefits of Managed IT Services for Business Growth | Demand10",
    description:
      "Discover the key benefits of managed IT services for businesses, including cost savings, enhanced security, and 24/7 support. Learn how managed service providers can transform your IT operations.",
    site: "@demand10",
  },
};

const RobustDataStrategies = () => {
  return (
    <>
      <div>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-[#314158] to-[#253347] overflow-hidden min-h-[50vh] flex items-center">
          {/* Top Left Circles */}
          <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 opacity-20">
            <svg width="600" height="600" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="300" cy="300" r="100" stroke="#8d9fbe" strokeWidth="1" />
              <circle cx="300" cy="300" r="200" stroke="#8d9fbe" strokeWidth="1" />
              <circle cx="300" cy="300" r="300" stroke="#8d9fbe" strokeWidth="1" />
              <circle cx="300" cy="300" r="400" stroke="#8d9fbe" strokeWidth="1" />
            </svg>
          </div>

          {/* Bottom Right Circles */}
          <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 opacity-20">
            <svg width="600" height="600" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="300" cy="300" r="100" stroke="#8d9fbe" strokeWidth="1" />
              <circle cx="300" cy="300" r="200" stroke="#8d9fbe" strokeWidth="1" />
              <circle cx="300" cy="300" r="300" stroke="#8d9fbe" strokeWidth="1" />
              <circle cx="300" cy="300" r="400" stroke="#8d9fbe" strokeWidth="1" />
            </svg>
          </div>

          {/* Main Content */}
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="text-center lg:text-left">
                  {/* Main Heading */}
                  <div className="mb-8">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
                      Benefits of{" "}
                      <span className="text-blue-200">Managed IT Services</span>
                    </h1>
                    <div className="w-24 h-1 bg-blue-300 mx-auto lg:mx-0 rounded-full mb-6"></div>
                    <h2 className="text-xl sm:text-2xl text-blue-100 font-light">
                      Transform Your Business with Professional MSP Solutions
                    </h2>
                  </div>
                  {/* Description */}
                  <p className="text-lg text-blue-50 mb-8 leading-relaxed">
                    Discover how managed IT services can revolutionize your business operations with cost savings, enhanced security, and expert support from qualified managed service providers.
                  </p>
                  {/* CTA Button */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <NextLink href="/contact">
                      <button className="flex items-center justify-center px-8 py-4 bg-white text-[#314158] font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        <MessageCircle className="w-5 h-5 mr-2" />
                        Contact Us
                      </button>
                    </NextLink>
                  </div>
                </div>
                
                {/* Right Content - Icons Grid */}
                <div className="hidden lg:block">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                          <Server className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-white font-semibold">IT Managed Services</h3>
                      </div>
                      <p className="text-blue-100 text-sm">Comprehensive IT support from qualified managed service providers</p>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                          <Shield className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-white font-semibold">Security Services</h3>
                      </div>
                      <p className="text-blue-100 text-sm">Advanced cybersecurity from verified managed security service providers</p>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                          <Cloud className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-white font-semibold">Cloud Solutions</h3>
                      </div>
                      <p className="text-blue-100 text-sm">Scalable cloud services from top managed cloud service providers</p>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-white font-semibold">Expert Support</h3>
                      </div>
                      <p className="text-blue-100 text-sm">24/7 support from experienced IT managed services providers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg
              viewBox="0 0 1440 120"
              className="w-full h-20 fill-current text-white"
            >
              <path d="M0,64L48,69.3C96,75,192,85,288,85.3C384,85,480,75,576,69.3C672,64,768,64,864,69.3C960,75,1056,85,1152,85.3C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
            </svg>
          </div>
        </section>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 md:px-8 py-16">
          <article className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-gray-800 space-y-12">
            {/* Introduction */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-[#314158]">
                Why Your Business Needs Managed IT Services
              </h2>
              <p className="text-lg leading-relaxed text-gray-700">
                In today{`'`}s digital landscape, businesses of all sizes need robust IT infrastructure to remain competitive. Managed IT services offer a comprehensive solution that allows organizations to access enterprise-level technology support without the overhead of maintaining an in-house IT department. Whether you{`'`}re a small business looking for managed IT services for small businesses or a large enterprise seeking specialized managed IT security services, partnering with the right managed service provider can transform your operations.
              </p>
            </section>

            {/* Strategic Points */}
            <div className="space-y-10">
              {/* Point 1 */}
              <section className="bg-blue-50 p-6 rounded-xl border border-blue-100 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start">
                  <div className="bg-[#314158]/10 p-3 rounded-lg mr-4">
                    <Shield className="w-6 h-6 text-[#314158]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-[#314158]">
                      1. Enhanced Security and Compliance
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Working with a managed security service provider ensures your organization benefits from advanced cybersecurity measures. These managed IT security services include:
                    </p>
                    <ul className="space-y-2 pl-5 text-gray-700 mt-3">
                      <li className="flex items-start">
                        <span className="text-[#314158] mr-2">•</span>
                        <span>
                          <strong>24/7 Threat Monitoring:</strong> Continuous surveillance by managed security service providers to detect and mitigate threats in real-time.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#314158] mr-2">•</span>
                        <span>
                          <strong>Incident Response:</strong> Rapid response to security breaches by experienced managed IT security services teams to minimize impact.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#314158] mr-2">•</span>
                        <span>
                          <strong>Data Backup and Recovery:</strong> Secure data backup solutions from managed cloud service providers to ensure business continuity.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#314158] mr-2">•</span>
                        <span>
                          <strong>Compliance Support:</strong> Assistance in meeting industry-specific regulations through comprehensive compliance and risk management strategies.
                        </span>
                      </li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed mt-3">
                      Learn more about how our <NextLink href="/compliance-risk-management" className="text-[#314158] hover:underline font-medium">compliance and risk management</NextLink> solutions can protect your business.
                    </p>

                  </div>
                </div>
              </section>

              {/* Point 2 */}
              <section className="bg-blue-50 p-6 rounded-xl border border-blue-100 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start">
                  <div className="bg-[#314158]/10 p-3 rounded-lg mr-4">
                    <Lock className="w-6 h-6 text-[#314158]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-[#314158]">
                      2. Cost Savings and Predictable Budgeting
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Managed IT services provide significant cost advantages over traditional in-house IT departments:
                    </p>
                    <ul className="space-y-2 pl-5 text-gray-700 mt-3">
                      <li className="flex items-start">
                        <span className="text-[#314158] mr-2">•</span>
                        <span>
                          <strong>Reduced Labor Costs:</strong> Access to a team of IT managed services providers without the expense of full-time employees.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#314158] mr-2">•</span>
                        <span>
                          <strong>Lower Infrastructure Costs:</strong> Managed cloud service providers offer scalable solutions that eliminate the need for expensive hardware investments.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#314158] mr-2">•</span>
                        <span>
                          <strong>Predictable Monthly Expenses:</strong> Fixed-rate managed IT services pricing allows for better budget planning.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#314158] mr-2">•</span>
                        <span>
                          <strong>Reduced Downtime Costs:</strong> Proactive monitoring by managed service providers minimizes costly system outages.
                        </span>
                      </li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed mt-3">
                      Discover how our <NextLink href="/data-backup-recovery" className="text-[#314158] hover:underline font-medium">data backup and recovery</NextLink> solutions protect your business assets.
                    </p>

                  </div>
                </div>
              </section>

              {/* Point 3 */}
              <section className="bg-blue-50 p-6 rounded-xl border border-blue-100 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start">
                  <div className="bg-[#314158]/10 p-3 rounded-lg mr-4">
                    <Cloud className="w-6 h-6 text-[#314158]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-[#314158]">
                      3. Access to Expertise and Advanced Technology
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Partnering with managed service providers gives you access to specialized knowledge and cutting-edge technology:
                    </p>
                    <ul className="space-y-2 pl-5 text-gray-700 mt-3">
                      <li className="flex items-start">
                        <span className="text-[#314158] mr-2">•</span>
                        <span>
                          <strong>Specialized Skills:</strong> Work with experienced managed IT service providers who stay current with the latest technologies and best practices.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#314158] mr-2">•</span>
                        <span>
                          <strong>Advanced Tools:</strong> Access to enterprise-grade tools and technologies that would be cost-prohibitive for most businesses to purchase independently.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#314158] mr-2">•</span>
                        <span>
                          <strong>Continuous Training:</strong> Managed service providers invest in ongoing education to maintain their expertise.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#314158] mr-2">•</span>
                        <span>
                          <strong>Industry Best Practices:</strong> Benefit from proven methodologies developed through experience with diverse clients.
                        </span>
                      </li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed mt-3">
                      Explore our <NextLink href="/managed-security-service-providers" className="text-[#314158] hover:underline font-medium">managed security service providers</NextLink> network for specialized cybersecurity expertise.
                    </p>

                  </div>
                </div>
              </section>

              {/* Point 4 */}
              <section className="bg-blue-50 p-6 rounded-xl border border-blue-100 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start">
                  <div className="bg-[#314158]/10 p-3 rounded-lg mr-4">
                    <Building className="w-6 h-6 text-[#314158]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-[#314158]">
                      4. Scalability and Flexibility
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Managed IT services offer unparalleled scalability to support your business growth:
                    </p>
                    <ul className="space-y-2 pl-5 text-gray-700 mt-3">
                      <li className="flex items-start">
                        <span className="text-[#314158] mr-2">•</span>
                        <span>
                          <strong>Elastic Resources:</strong> Scale services up or down based on your changing business needs with flexible managed IT services.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#314158] mr-2">•</span>
                        <span>
                          <strong>Geographic Expansion:</strong> Easily extend IT managed services to new locations without significant infrastructure investments.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#314158] mr-2">•</span>
                        <span>
                          <strong>Service Customization:</strong> Tailor managed IT services to meet specific requirements for different departments or business units.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#314158] mr-2">•</span>
                        <span>
                          <strong>Technology Updates:</strong> Stay current with the latest innovations without major capital expenditures.
                        </span>
                      </li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed mt-3">
                      Learn about our <NextLink href="/penetration-testing" className="text-[#314158] hover:underline font-medium">penetration testing</NextLink> services to ensure your security infrastructure remains robust.
                    </p>

                  </div>
                </div>
              </section>

              {/* Point 5 */}
              <section className="bg-blue-50 p-6 rounded-xl border border-blue-100 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start">
                  <div className="bg-[#314158]/10 p-3 rounded-lg mr-4">
                    <Server className="w-6 h-6 text-[#314158]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-[#314158]">
                      5. Proactive Monitoring and Support
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      One of the key benefits of managed IT services is the proactive approach to system maintenance:
                    </p>
                    <ul className="space-y-2 pl-5 text-gray-700 mt-3">
                      <li className="flex items-start">
                        <span className="text-[#314158] mr-2">•</span>
                        <span>
                          <strong>24/7 System Monitoring:</strong> Continuous oversight by managed service providers to identify and resolve issues before they impact operations.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#314158] mr-2">•</span>
                        <span>
                          <strong>Preventive Maintenance:</strong> Regular system updates and maintenance to prevent problems rather than simply reacting to them.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#314158] mr-2">•</span>
                        <span>
                          <strong>Rapid Response Times:</strong> Dedicated support from managed IT services providers with guaranteed response time SLAs.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#314158] mr-2">•</span>
                        <span>
                          <strong>Performance Optimization:</strong> Ongoing tuning and optimization to ensure systems operate at peak efficiency.
                        </span>
                      </li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed mt-3">
                      Understand how our <NextLink href="/network-security" className="text-[#314158] hover:underline font-medium">network security</NextLink> solutions keep your infrastructure protected.
                    </p>

                  </div>
                </div>
              </section>
            </div>

            {/* Service Highlights Section */}
            <section className="mt-16 pt-8 border-t border-gray-200">
              <h2 className="text-3xl font-bold mb-8 text-[#314158]">
                Specialized Managed IT Services for Every Business Need
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="bg-[#314158]/10 p-3 rounded-lg mr-4">
                      <Server className="h-6 w-6 text-[#314158]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#314158]">Co-Managed IT Services</h3>
                  </div>
                  <p className="text-gray-700">
                    Collaborative approach where managed service providers work alongside your internal IT team to enhance capabilities.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="bg-[#314158]/10 p-3 rounded-lg mr-4">
                      <Building className="h-6 w-6 text-[#314158]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#314158]">Industry-Specific Solutions</h3>
                  </div>
                  <p className="text-gray-700">
                    Specialized managed IT services for small businesses, law firms, healthcare, finance, and manufacturing sectors.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="bg-[#314158]/10 p-3 rounded-lg mr-4">
                      <Users className="h-6 w-6 text-[#314158]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#314158]">Local Provider Networks</h3>
                  </div>
                  <p className="text-gray-700">
                    Connect with managed service providers near you in major cities like Chicago, New York, NYC, and New Jersey.
                  </p>
                </div>
              </div>
            </section>

            {/* Why Choose Demand10 Section */}
            <section className="mt-16 pt-8 border-t border-gray-200">
              <h2 className="text-3xl font-bold mb-8 text-[#314158]">
                Why Choose Demand10 for Managed IT Services?
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="bg-[#314158]/10 p-3 rounded-lg mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-[#314158]"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-[#314158]">Verified Providers</h3>
                  </div>
                  <p className="text-gray-700">
                    Access to thoroughly vetted managed service providers with proven track records in delivering managed IT services.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="bg-[#314158]/10 p-3 rounded-lg mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-[#314158]"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-[#314158]">Custom Solutions</h3>
                  </div>
                  <p className="text-gray-700">
                    Tailored managed IT services that align with your specific business requirements and growth objectives.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="bg-[#314158]/10 p-3 rounded-lg mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-[#314158]"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-[#314158]">Proven Results</h3>
                  </div>
                  <p className="text-gray-700">
                    Demonstrated success in helping businesses achieve their IT objectives through comprehensive managed IT services.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="bg-[#314158]/10 p-3 rounded-lg mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-[#314158]"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-[#314158]">Ongoing Support</h3>
                  </div>
                  <p className="text-gray-700">
                    Continuous assistance from experienced managed IT services providers to ensure your systems operate optimally.
                  </p>
                </div>
              </div>
            </section>

            {/* Call to Action */}
            <section className="mt-16 pt-8 border-t border-gray-200 text-center">
              <h2 className="text-3xl font-bold mb-6 text-[#314158]">
                Ready to Experience the Benefits of Managed IT Services?
              </h2>
              <p className="text-gray-700 mb-8 max-w-2xl mx-auto text-lg">
                Contact us today to learn how Demand10 can connect you with the right managed service providers to transform your IT operations and drive business growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <NextLink href="/contact">
                  <button className="px-8 py-4 bg-[#314158] text-white font-medium rounded-lg hover:bg-[#253347] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                    Contact Our Team
                  </button>
                </NextLink>
                <NextLink href="/managed-service-providers">
                  <button className="px-8 py-4 bg-white text-[#314158] border-2 border-[#314158] font-medium rounded-lg hover:bg-[#314158]/5 transition-all duration-300">
                    Find MSPs Near You
                  </button>
                </NextLink>
              </div>
            </section>
          </article>
        </main>
      </div>
    </>
  );
};

export default RobustDataStrategies;