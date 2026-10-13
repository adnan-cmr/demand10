"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaServer, FaShieldAlt, FaCloud, FaHeadset, FaCheckCircle } from "react-icons/fa";
import { Plus, Minus, Check } from "lucide-react";
import ManagedServiceProviders from "@/Componenets/MspPage/MspTabel";
import Image from "next/image";
 import { DollarSign, Shield, TrendingUp, Target } from "lucide-react";

const MSPPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };


const benefits = [
  {
    title: "Cost Efficiency with Managed IT Services",
    description:
      "Reduce operational expenses by up to 40% compared to in-house IT teams. Predictable monthly costs eliminate unexpected technology expenses and provide access to enterprise-grade solutions without capital investment. Our managed IT services help you optimize your technology budget while accessing top-tier expertise.",
    icon: <DollarSign className="w-6 h-6 text-[#314158]" />
  },
  {
    title: "Enhanced Security & Compliance",
    description:
      "24/7 threat monitoring and incident response with managed security service providers expertise in compliance. Advanced cybersecurity tools and threat intelligence protect your business. Our managed security service providers offer comprehensive cybersecurity outsourcing solutions including SOC monitoring and penetration testing.",
    icon: <Shield className="w-6 h-6 text-[#314158]" />
  },
  {
    title: "Scalable Cloud Solutions",
    description:
      "Flexible solutions that adapt to changing business needs. Seamless scaling of IT infrastructure as you grow with access to latest technologies and best practices. Our cloud service providers offer multi-cloud and hybrid infrastructure management for businesses of all sizes.",
    icon: <TrendingUp className="w-6 h-6 text-[#314158]" />
  },
  {
    title: "24/7 IT Support & Business Focus",
    description:
      "Free up internal resources for core business activities. Expert management of complex technology infrastructure with proactive maintenance prevents costly downtime. Our IT support services include 24/7 help desk and technical support to keep your business running smoothly.",
    icon: <Target className="w-6 h-6 text-[#314158]" />
  }
];


  const serviceCategories = [
    {
      icon: <FaShieldAlt className="text-[#314158]" />,
      category: "Cybersecurity & Network Security Services",
      description: "Managed security service providers offer specialized protection including:",
      services: [
        "Security Operations Center (SOC) monitoring",
        "Vulnerability assessments and penetration testing",
        "Compliance management (HIPAA, SOX, PCI-DSS)",
        "Incident response and forensic analysis",
        "Network security services and threat hunting"
      ]
    },
    {
      icon: <FaCloud className="text-[#314158]" />,
      category: "Cloud Computing & Data Backup Services",
      description: "Comprehensive cloud management and optimization:",
      services: [
        "Cloud migration planning and execution",
        "Multi-cloud and hybrid infrastructure management",
        "Cost optimization and performance monitoring",
        "Backup and disaster recovery solutions",
        "Data backup and recovery services"
      ]
    },
    {
      icon: <FaHeadset className="text-[#314158]" />,
      category: "IT Support & Consulting Services",
      description: "Strategic technology support and guidance:",
      services: [
        "24/7 help desk and technical support",
        "Strategic IT planning and consulting",
        "Network design and infrastructure management",
        "Digital transformation initiatives",
        "Business continuity services"
      ]
    }
  ];

  const partnerships = [
    {
      category: "Microsoft Partners",
      services: [
        "Microsoft 365 optimization and migration",
        "Azure cloud infrastructure management",
        "Advanced security and compliance solutions"
      ]
    },
    {
      category: "AWS Partners",
      services: [
        "Cloud migration and DevOps implementation",
        "Cost optimization and infrastructure management",
        "Scalable enterprise cloud solutions"
      ]
    },
    {
      category: "Security Partnerships",
      services: [
        "CrowdStrike, Fortinet, and Palo Alto integrations",
        "Managed security service providers with SOC capabilities",
        "Advanced threat detection and response platforms"
      ]
    },
    {
      category: "Cisco & VMware Partners",
      services: [
        "Network infrastructure design and management",
        "Virtualization and data center solutions",
        "Enterprise networking and communication systems"
      ]
    }
  ];

  const industries = [
    {
      name: "Healthcare IT Solutions",
      description: "Managed service providers specializing in healthcare offer:",
      services: [
        "HIPAA-compliant infrastructure management",
        "Electronic health record (EHR) support",
        "Medical device connectivity and security",
        "Telehealth technology implementation",
        "Healthcare data backup and recovery"
      ]
    },
    {
      name: "Financial Services IT",
      description: "Specialized solutions for financial institutions:",
      services: [
        "SOX compliance and regulatory reporting",
        "Core banking system management",
        "Fraud detection and prevention",
        "Secure payment processing solutions",
        "Financial data protection services"
      ]
    },
    {
      name: "Manufacturing Technology",
      description: "Technology solutions for manufacturing operations:",
      services: [
        "Industrial IoT and operational technology",
        "Supply chain technology integration",
        "Quality management systems",
        "Production line connectivity solutions",
        "Manufacturing business continuity services"
      ]
    }
  ];

  const faqData = [
    {
      question: "What is a managed service provider and how can it benefit my business?",
      answer: "A managed service provider (MSP) is a third-party company that remotely manages and maintains your IT infrastructure under a service-level agreement (SLA). Managed service providers operate on subscription-based models, delivering predictable costs and enterprise-level technology capabilities. MSPs help businesses reduce IT costs, enhance security, and focus on core operations while accessing expert IT managed services."
    },
    {
      question: "What is a managed security service provider and when do I need one?",
      answer: "A managed security service provider (MSSP) is a specialized cybersecurity company that focuses exclusively on protecting your organization's IT infrastructure from cyber threats through dedicated Security Operations Centers (SOCs), 24/7 monitoring, and advanced threat detection. You need an MSSP when you require specialized cybersecurity outsourcing, compliance management, or advanced threat protection beyond standard MSP services."
    },
    {
      question: "What services do managed service providers offer for small businesses?",
      answer: "Managed service providers typically offer IT support, network monitoring, cybersecurity, cloud services, data backup, and strategic IT consulting under subscription-based agreements. For small businesses, MSPs provide access to enterprise-level technology at a fraction of the cost of hiring full-time IT staff, including 24/7 IT support services and business continuity solutions."
    },
    {
      question: "How much do managed service providers cost and what factors affect pricing?",
      answer: "MSP pricing varies based on services, company size, and complexity. Most managed service providers offer tiered pricing starting from $50-150 per user per month. Factors affecting pricing include the scope of services, 24/7 monitoring requirements, cybersecurity needs, cloud infrastructure management, and specialized services like penetration testing or compliance management."
    },
    {
      question: "What's the difference between MSP and MSSP, and which one do I need?",
      answer: "While managed service providers offer comprehensive IT services including network management, cloud services, and basic security, managed security service providers focus exclusively on cybersecurity through dedicated Security Operations Centers (SOCs). Choose an MSP for general IT managed services or an MSSP for specialized cybersecurity outsourcing and advanced threat protection."
    },
    {
      question: "How do I choose the right managed service provider near me?",
      answer: "Consider factors like service portfolio, industry expertise, security capabilities, response times, and partnerships with major technology vendors when selecting managed service providers. Look for providers with experience in your industry, strong client testimonials, and comprehensive service offerings including cloud computing services, data backup and recovery, and 24/7 IT support."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-r from-[#314158] to-[#253347] text-white py-20 overflow-hidden">
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
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Top Managed Service Providers 2025: Find Your Perfect IT Partner
            </h1>
            <div className="w-24 h-1 bg-blue-300 mx-auto rounded-full mb-6"></div>
            <p className="text-md md:text-xl text-blue-100 max-w-5xl mx-auto leading-relaxed mb-8">
              Discover the best managed service providers and managed security service providers for your business needs. Compare top-rated MSPs offering comprehensive IT support, cybersecurity solutions, cloud services, 24/7 network monitoring, and data backup & recovery. Find managed service providers near me with our verified directory of top MSPs and MSSPs.
            </p>
            
           

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/managed-service-providers"
                className="bg-white text-[#314158] px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Browse Top MSPs
              </Link>
              <Link
                href="#what-is-msp"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-[#314158] transition-all duration-300"
              >
                Learn About MSPs
              </Link>
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

      {/* MSP COMPANIES TABLE */}
      <ManagedServiceProviders />

      {/* WHAT IS AN MSP SECTION */}
      <section id="what-is-msp" className="py-20">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#314158] mb-6">
              What is a Managed Service Provider (MSP)? Your Guide to IT Managed Services
            </h2>
          </div>
          
          <div className="w-full mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-200">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                A <strong>managed service provider</strong> (MSP) is a third-party company that remotely manages and maintains your IT infrastructure under a service-level agreement (SLA). Managed service providers operate on subscription-based models, delivering predictable costs and enterprise-level technology capabilities. Whether you&apos;re searching for managed service providers near me or exploring specialized managed security service providers, MSPs offer comprehensive IT managed services to support your business growth.
              </p>
              
              <h3 className="text-2xl font-bold text-[#314158] mb-6">Core Managed IT Services Include:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Check className="w-6 h-6 text-[#314158] mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">IT Support & Help Desk</div>
                      <div className="text-gray-600">24/7 technical support and troubleshooting</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Check className="w-6 h-6 text-[#314158] mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Network Monitoring</div>
                      <div className="text-gray-600">Proactive infrastructure monitoring and maintenance</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Check className="w-6 h-6 text-[#314158] mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Cloud Services</div>
                      <div className="text-gray-600">Migration, management, and optimization</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Check className="w-6 h-6 text-[#314158] mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Cybersecurity</div>
                      <div className="text-gray-600">Threat detection, incident response, compliance</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Check className="w-6 h-6 text-[#314158] mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Data Backup & Recovery</div>
                      <div className="text-gray-600">Business continuity and disaster recovery</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Check className="w-6 h-6 text-[#314158] mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">IT Consulting</div>
                      <div className="text-gray-600">Strategic technology planning and digital transformation</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-blue-50 rounded-lg border-l-4 border-[#314158]">
                <h4 className="font-bold text-gray-900 mb-2">Modern MSP Evolution:</h4>
                <p className="text-gray-700">
                  Today&apos;s managed service providers have evolved beyond basic IT support to offer comprehensive technology ecosystems including AI-powered monitoring, advanced threat protection, and strategic consulting services. For specialized cybersecurity outsourcing and managed security services, explore our <Link href="/managed-security-service-providers" className="text-[#314158] hover:underline">managed security service providers</Link> directory.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MSP VS MSSP COMPARISON */}
      <section className="py-20 bg-white">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#314158] mb-6">
              Managed Service Provider vs Managed Security Service Provider: Key Differences Explained
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto">
              Understanding the distinction between managed service providers (MSPs) and managed security service providers (MSSPs) is crucial for making informed technology decisions. Whether you need comprehensive IT managed services or specialized cybersecurity outsourcing, knowing the differences helps you choose the right partner for your business.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-blue-50 rounded-xl p-8 border border-blue-100">
              <h3 className="text-2xl font-bold text-[#314158] mb-6">MSP (Managed Service Provider)</h3>
              <div className="space-y-4">
                <div>
                  <span className="font-semibold text-gray-900">Focus:</span>
                  <span className="ml-2 text-gray-700">Comprehensive IT infrastructure management</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Services:</span>
                  <span className="ml-2 text-gray-700">Help desk, cloud migration, network management, backup solutions</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Best For:</span>
                  <span className="ml-2 text-gray-700">Businesses needing complete IT support and technology management</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Explore:</span>
                  <span className="ml-2 text-gray-700">
                    <Link href="/managed-service-providers" className="text-[#314158] hover:underline">Browse MSP Directory</Link>
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-8 border border-green-100">
              <h3 className="text-2xl font-bold text-[#314158] mb-6">MSSP (Managed Security Service Provider)</h3>
              <div className="space-y-4">
                <div>
                  <span className="font-semibold text-gray-900">Focus:</span>
                  <span className="ml-2 text-gray-700">Specialized cybersecurity and threat management</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Services:</span>
                  <span className="ml-2 text-gray-700">24/7 SOC monitoring, threat hunting, incident response, compliance</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Best For:</span>
                  <span className="ml-2 text-gray-700">Organizations with specific security requirements or high-risk profiles</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Explore:</span>
                  <span className="ml-2 text-gray-700">
                    <Link href="/managed-security-service-providers" className="text-[#314158] hover:underline">Browse MSSP Directory</Link>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
            <h4 className="font-bold text-gray-900 mb-2">Industry Convergence Trend:</h4>
            <p className="text-gray-700">
              The line between managed service providers and managed security service providers is blurring as MSPs acquire security firms and MSSPs expand into general IT services. Find hybrid providers offering both managed IT services and cybersecurity outsourcing in our <Link href="/network-security" className="text-[#314158] hover:underline">Network Security Services</Link> category.
            </p>
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="py-20 bg-gray-50">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#314158] mb-6">
              Why Choose Managed Service Providers for Your Business Growth?
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto">
              Managed service providers deliver significant advantages that transform how businesses operate, including cost savings, enhanced security, scalable cloud solutions, and 24/7 IT support services:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
             <div
  key={index}
  className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-all duration-300 border border-gray-200"
>
  {/* Icon + Title Row */}
  <div className="flex items-center gap-3 mb-4">
    <div className="p-3 rounded-lg bg-[#314158]/10 text-[#314158]">
      {benefit.icon}
    </div>
    <h3 className="text-lg font-semibold text-gray-900">{benefit.title}</h3>
  </div>

  {/* Description */}
  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
  
  {/* Internal linking based on benefit type */}
  <div className="mt-4">
    {index === 0 && (
      <Link href="/managed-service-providers" className="text-[#314158] hover:underline text-sm">
        Explore cost-effective managed IT services
      </Link>
    )}
    {index === 1 && (
      <Link href="/managed-security-service-providers" className="text-[#314158] hover:underline text-sm">
        Discover cybersecurity MSPs & MSSPs
      </Link>
    )}
    {index === 2 && (
      <Link href="/cloud-computing-services" className="text-[#314158] hover:underline text-sm">
        Find scalable cloud computing services
      </Link>
    )}
    {index === 3 && (
      <Link href="/it-security-solution" className="text-[#314158] hover:underline text-sm">
        Connect with strategic IT consultants
      </Link>
    )}
  </div>
</div>

            ))}
          </div>
        </div>
      </section>


      {/* SERVICE CATEGORIES */}
      <section className="py-20">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#314158] mb-6">
              Comprehensive Managed IT Services Categories
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {serviceCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
                <div className="flex items-center mb-6">
                  <div className="text-3xl mr-4">{category.icon}</div>
                  <h3 className="text-2xl font-bold text-[#314158]">{category.category}</h3>
                </div>
                <p className="text-gray-700 mb-6">{category.description}</p>
                <ul className="space-y-3">
                  {category.services.map((service, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-[#314158] mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{service}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  {index === 0 && (
                    <Link href="/managed-security-service-providers" className="text-[#314158] hover:underline">
                      Explore cybersecurity MSPs & MSSPs
                    </Link>
                  )}
                  {index === 1 && (
                    <Link href="/cloud-computing-services" className="text-[#314158] hover:underline">
                      Find cloud computing services
                    </Link>
                  )}
                  {index === 2 && (
                    <Link href="/it-security-solution" className="text-[#314158] hover:underline">
                      Connect with IT support specialists
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-700">
              Looking for specialized managed IT services? Browse our complete 
              <Link href="/managed-service-providers" className="text-[#314158] hover:underline mx-1">MSP directory</Link>
              to find providers with expertise in your specific industry or technology needs.
            </p>
          </div>
        </div>
      </section>

      {/* INDUSTRY-SPECIFIC SOLUTIONS */}
      <section className="py-20 bg-white">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#314158] mb-6">
              Industry-Specific Managed IT Services Solutions
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                <h3 className="text-2xl font-bold text-[#314158] mb-4">{industry.name}</h3>
                <p className="text-gray-700 mb-6">{industry.description}</p>
                <ul className="space-y-3">
                  {industry.services.map((service, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-[#314158] mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{service}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  {index === 0 && (
                    <Link href="/managed-service-providers" className="text-[#314158] hover:underline">
                      Healthcare IT managed services
                    </Link>
                  )}
                  {index === 1 && (
                    <Link href="/managed-service-providers" className="text-[#314158] hover:underline">
                      Financial services IT solutions
                    </Link>
                  )}
                  {index === 2 && (
                    <Link href="/managed-service-providers" className="text-[#314158] hover:underline">
                      Manufacturing technology services
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-700">
              Need industry-specific managed IT services? Explore our 
              <Link href="/managed-service-providers" className="text-[#314158] hover:underline mx-1">complete MSP directory</Link>
              to find providers with expertise in your industry.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#314158] mb-6">
              Frequently Asked Questions About Managed IT Services & MSPs
            </h2>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md border border-gray-200">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-8 text-left"
                >
                  <h3 className="text-xl font-semibold text-gray-900 pr-8">
                    {faq.question}
                  </h3>
                  {openIndex === index ? (
                    <Minus className="w-6 h-6 text-[#314158] flex-shrink-0" />
                  ) : (
                    <Plus className="w-6 h-6 text-[#314158] flex-shrink-0" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-8 pb-8 text-gray-700 leading-relaxed">
                    {faq.answer}
                    <div className="mt-4">
                      {index === 0 && (
                        <Link href="/managed-service-providers" className="text-[#314158] hover:underline">
                          Browse top managed service providers
                        </Link>
                      )}
                      {index === 1 && (
                        <Link href="/managed-security-service-providers" className="text-[#314158] hover:underline">
                          Explore managed security service providers
                        </Link>
                      )}
                      {index === 2 && (
                        <Link href="/managed-service-providers" className="text-[#314158] hover:underline">
                          View all managed IT services
                        </Link>
                      )}
                      {index === 3 && (
                        <Link href="/managed-service-providers" className="text-[#314158] hover:underline">
                          Compare MSP pricing & services
                        </Link>
                      )}
                      {index === 4 && (
                        <div>
                          <Link href="/managed-service-providers" className="text-[#314158] hover:underline mr-4">
                            Managed Service Providers
                          </Link>
                          <Link href="/managed-security-service-providers" className="text-[#314158] hover:underline">
                            Managed Security Service Providers
                          </Link>
                        </div>
                      )}
                      {index === 5 && (
                        <Link href="/managed-service-providers" className="text-[#314158] hover:underline">
                          Find the right managed service provider near me
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-700">
              Have more questions about managed IT services or managed service providers? Visit our 
              <Link href="/faq" className="text-[#314158] hover:underline mx-1">FAQ page</Link>
              or 
              <Link href="/contact" className="text-[#314158] hover:underline mx-1">contact us</Link>
              for personalized assistance with finding the right MSP for your business.
            </p>
          </div>
        </div>
      </section>

      {/* CALL-TO-ACTION & CONTACT */}
      <section className="py-16 bg-gradient-to-r from-[#314158] to-[#253347] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Find Your Ideal Managed Service Provider Today
          </h2>
          <p className="text-xl mb-8 max-w-4xl mx-auto">
            Ready to transform your business with professional managed service providers and managed security service providers? Our curated directory helps you compare and connect with top-rated MSPs and MSSPs offering comprehensive IT managed services:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Check className="w-8 h-8 mx-auto mb-2" />
              <div className="font-semibold">Comprehensive IT support and consulting</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Check className="w-8 h-8 mx-auto mb-2" />
              <div className="font-semibold">Advanced cybersecurity and compliance</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Check className="w-8 h-8 mx-auto mb-2" />
              <div className="font-semibold">Cloud migration and infrastructure management</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Check className="w-8 h-8 mx-auto mb-2" />
              <div className="font-semibold">24/7 monitoring and rapid response</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/managed-service-providers"
              className="bg-white text-[#314158] px-10 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Browse Top MSPs
            </Link>
            <Link
              href="/managed-security-service-providers"
              className="border-2 border-white text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-[#314158] transition-all duration-300"
            >
              Find Security Experts
            </Link>
          </div>
          
          <p className="mt-8 text-lg opacity-90">
            <strong>Get Started:</strong> Browse our directory of verified managed service providers and managed security service providers to find the perfect technology partner for your business growth. 
            For specialized needs, explore our 
            <Link href="/services" className="text-white underline mx-1">technology services</Link>
            or 
            <Link href="/strategies" className="text-white underline mx-1">IT strategies</Link>
            categories.
          </p>
        </div>
      </section>
    </div>
  );
};

export default MSPPage;