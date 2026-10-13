"use client"
import React, { useState } from 'react'
import {  MessageCircle, ChevronDown, Link, Server, Shield, Cloud, Users, Building, MapPin } from "lucide-react";

const FaqCom = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // FAQ data organized with managed IT services focus
  const faqItems = [
    {
      question: "What are the key advantages of partnering with managed IT service providers?",
      answer: "Working with professional managed IT service providers delivers significant benefits for organizations of all sizes:",
      listItems: [
        "Continuous System Monitoring: Around-the-clock oversight of your IT infrastructure to identify and resolve issues before they disrupt operations.",
        "Reduced Operational Costs: Lower expenses compared to maintaining an in-house IT department while accessing specialized expertise.",
        "Robust Cybersecurity: Comprehensive digital security solutions from certified managed security service providers to defend against evolving threats.",
        "Flexible Scalability: Adaptable services that expand or contract based on your business requirements, from startups to enterprises.",
        "Access to Experts: Tap into a team of certified IT professionals without the commitment of permanent hires.",
        "Strategic Focus: Redirect internal resources toward core business objectives instead of routine IT maintenance."
      ]
    },
    {
      question: "What defines a managed service provider (MSP)?",
      answer: "A Managed Service Provider (MSP) is a professional organization that remotely oversees a client's IT infrastructure and user systems. MSPs deliver comprehensive services including network supervision, data protection, cybersecurity measures, and cloud solutions. Whether you need managed IT services for small businesses, legal practices, or large corporations, partnering with the right managed service provider can revolutionize your technology operations.",
      additionalText: "Demand10 connects you with pre-vetted managed service providers in your area across major metropolitan markets, ensuring you find the ideal IT managed services provider for your unique requirements."
    },
    {
      question: "How do co-managed IT services differ from fully managed services?",
      answer: "Co-managed IT services utilize a collaborative model where a managed service provider works in tandem with your internal IT personnel:",
      listItems: [
        "Co-Managed Approach: Perfect for organizations with existing IT staff who require supplementary expertise or support during busy periods. Your IT managed service provider functions as an extension of your current team.",
        "Fully Managed Model: The managed service provider assumes complete responsibility for your IT infrastructure, ideal for businesses without internal IT resources or those aiming to minimize their technology overhead."
      ],
      additionalText: "Both co-managed IT services and fully managed solutions are available from qualified managed service providers in our network, enabling you to select the approach that aligns best with your organizational structure and requirements."
    },
    {
      question: "What managed IT security solutions do top providers offer?",
      answer: "Our network of managed security service providers delivers comprehensive cybersecurity solutions:",
      listItems: [
        "Round-the-Clock Threat Detection: Constant surveillance to identify and respond to cyber threats in real-time.",
        "Security Vulnerability Assessments: Regular scanning and analysis of your systems to uncover potential security weaknesses.",
        "Rapid Incident Response: Swift response protocols to minimize damage and restore operations quickly following a security breach.",
        "Regulatory Compliance Assistance: Support with meeting industry standards such as HIPAA, GDPR, and SOX.",
        "Device Protection: Advanced security solutions for all devices connected to your network.",
        "Staff Security Education: Training programs to educate your employees on best practices to prevent security incidents."
      ],
      additionalText: "These managed IT security services are delivered by top-rated managed security service providers who are verified partners in our platform, ensuring you receive the highest level of protection."
    },
    {
      question: "How can I locate managed service providers in my area?",
      answer: "Demand10 simplifies the process of connecting with managed service providers near you:",
      listItems: [
        "Geographic Search: Our platform enables you to search for managed service providers in specific cities and regions.",
        "Specialized Expertise: Find managed IT services for small businesses, legal firms, healthcare organizations, and other industry-specific requirements.",
        "Pre-Screened Partners: All managed service providers in our network undergo thorough vetting for quality and dependability.",
        "Comprehensive Profiles: Review provider profiles, services offered, client testimonials, and performance metrics before making a decision.",
        "Direct Communication: Contact multiple managed service providers directly through our platform to discuss your specific needs."
      ],
      additionalText: "Whether you're seeking IT managed services near your location or specialized managed IT services for your industry, our platform streamlines the process of finding and connecting with the right managed service provider."
    },
    {
      question: "Which industries benefit from managed IT services?",
      answer: "Our network of managed service providers serves businesses across diverse sectors:",
      listItems: [
        "Legal Services: Specialized managed IT services for law firms with strict confidentiality and compliance requirements.",
        "Small Enterprises: Cost-effective managed IT services for small businesses that need enterprise-level IT support without the overhead.",
        "Healthcare: HIPAA-compliant managed IT services for healthcare organizations protecting sensitive patient data.",
        "Financial Services: Secure managed IT services for financial institutions with stringent regulatory requirements.",
        "Education: Reliable managed IT services for educational institutions supporting diverse technology needs.",
        "Manufacturing: Industrial-grade managed IT services for manufacturing companies with complex operational technology environments."
      ],
      additionalText: "Each industry presents unique IT challenges, and our managed service providers offer customized solutions to address these specific requirements."
    },
    {
      question: "What cloud solutions do managed cloud service providers deliver?",
      answer: "Managed cloud service providers in our network offer a comprehensive range of cloud solutions:",
      listItems: [
        "Cloud Migration Services: Seamless transition of your data and applications to cloud environments with minimal disruption.",
        "Cloud Infrastructure Management: Ongoing management and optimization of your cloud infrastructure for peak performance.",
        "Multi-Cloud Strategies: Approaches for leveraging multiple cloud platforms to avoid vendor lock-in and optimize costs.",
        "Business Continuity Solutions: Cloud-based backup and recovery solutions to ensure uninterrupted operations.",
        "Elastic Resource Scaling: Flexible cloud resources that automatically adjust to your changing business needs.",
        "Integrated Security: Cloud security solutions that protect your data and applications in cloud environments."
      ],
      additionalText: "These managed cloud service provider solutions are designed to provide you with the flexibility and reliability of cloud computing while maintaining the security and support of working with experienced managed service providers."
    },
    {
      question: "What criteria should guide my choice of managed IT services provider?",
      answer: "Selecting the right managed IT services provider requires careful evaluation of several factors:",
      listItems: [
        "Service Specialization: Ensure the managed service provider has experience with the specific services you need, whether it's managed IT security services, cloud solutions, or general IT support.",
        "Industry Experience: Look for managed service providers who understand the unique requirements of your industry, such as managed IT services for law firms or healthcare organizations.",
        "Geographic Proximity: Consider managed service providers near you for easier collaboration and on-site support when needed.",
        "Performance Guarantees: Evaluate the provider's SLAs and response times to ensure they meet your business requirements.",
        "Adaptability: Choose managed service providers who can grow with your business and adapt to changing needs.",
        "Client References: Review testimonials and case studies from similar businesses to gauge the provider's effectiveness."
      ],
      additionalText: "Demand10 simplifies this process by providing detailed profiles of managed service providers, client reviews, and performance metrics to help you make an informed decision."
    },
    {
      question: "What factors influence managed IT services pricing?",
      answer: "Managed IT services pricing varies based on several factors:",
      listItems: [
        "Scope of Services: The range of services required affects pricing, from basic IT managed support to comprehensive managed IT security services.",
        "Organization Size: Managed IT services for small businesses typically have different pricing structures than enterprise solutions.",
        "Infrastructure Complexity: More complex IT environments require more resources to manage, affecting costs.",
        "Performance Commitments: Premium SLAs with faster response times may incur additional costs.",
        "Provider Expertise: Specialized managed service providers with advanced certifications may charge premium rates.",
        "Regional Market: Managed service providers in major business centers may have different pricing than those in other regions."
      ],
      additionalText: "Our platform allows you to compare pricing and services from multiple managed service providers to find the best value for your specific requirements."
    },
    {
      question: "How soon can my organization begin using managed IT services?",
      answer: "Getting started with managed IT services through Demand10 is a streamlined process:",
      listItems: [
        "Account Registration: Create your Demand10 account in minutes to access our network of managed service providers.",
        "Requirements Submission: Describe your IT needs, including any specific requirements for managed IT services for your business type or industry.",
        "Provider Recommendations: Receive personalized recommendations for managed service providers near you who match your requirements.",
        "Consultation Scheduling: Connect directly with shortlisted managed service providers to discuss your needs in detail.",
        "Service Activation: Finalize contracts and service level agreements with your chosen managed service provider.",
        "Implementation Process: Begin receiving managed IT services with minimal disruption to your operations."
      ],
      additionalText: "Most businesses can begin receiving managed IT services within 1-2 weeks of initial contact, with many managed service providers offering accelerated onboarding for urgent requirements."
    }
  ];

  return (
    <>
      <div>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] overflow-hidden min-h-[50vh] flex items-center">
        
      
          {/* Main Content */}
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="w-full mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="text-center lg:text-left">
                  {/* Main Heading */}
                  <div className="mb-8">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
                      Managed IT Services <span className="text-white/90">FAQ</span>
                    </h1>
                    <div className="w-20 h-1 bg-white/80 mx-auto lg:mx-0 rounded-full mb-6"></div>
                    <h4 className="text-xl sm:text-2xl text-white/90 font-light">
                      Your Questions About MSP & IT Solutions Answered
                    </h4>
                  </div>
                  {/* Description */}
                  <p className="text-lg text-white/80 mb-8 leading-relaxed">
                    Get clear answers to your most common questions about managed IT services, MSP providers, cybersecurity solutions, and how Demand10 connects you with top-rated managed service providers in your area.
                  </p>
                
                </div>
                
                {/* Right Content - Icons Grid */}
                <div className="hidden lg:block">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                          <Server className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-white font-semibold">IT Managed Services</h3>
                      </div>
                      <p className="text-white/80 text-sm">Comprehensive IT support from pre-vetted managed service providers</p>
                    </div>
                    
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                          <Shield className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-white font-semibold">Cybersecurity</h3>
                      </div>
                      <p className="text-white/80 text-sm">Advanced digital security from certified managed security providers</p>
                    </div>
                    
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                          <Cloud className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-white font-semibold">Cloud Solutions</h3>
                      </div>
                      <p className="text-white/80 text-sm">Scalable cloud infrastructure from top-tier providers</p>
                    </div>
                    
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                          <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-white font-semibold">Local Experts</h3>
                      </div>
                      <p className="text-white/80 text-sm">Connect with nearby providers in major business hubs</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
         
        </section>
        
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 md:px-8 py-10">
          <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
            {/* Introduction */}
            <section className="mb-10 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Managed IT Services & MSP Solutions</h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Whether you&apos;re searching for managed IT services for small businesses, looking for managed service providers near you in Chicago or New York, or seeking specialized managed IT security services, our comprehensive FAQ answers your most pressing questions about working with managed service providers.
              </p>
            </section>
            
            {/* FAQ Items */}
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div 
                  key={index} 
                  className={`border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 ${openIndex === index ? 'shadow-md' : ''}`}
                >
                  <button 
                    className={`flex justify-between items-center w-full p-5 text-left transition-colors duration-200 ${openIndex === index ? 'bg-[#314158]/10 text-[#314158]' : 'bg-gray-50 hover:bg-gray-100'}`}
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-content-${index}`}
                  >
                    <h3 className="text-lg font-semibold">{item.question}</h3>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-[#314158]' : 'text-gray-500'}`} />
                  </button>
                  <div 
                    id={`faq-content-${index}`}
                    className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="p-5 bg-white">
                      <p className="text-gray-600 leading-relaxed mb-3">
                        {item.answer}
                      </p>
                      {item.listItems && (
                        <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-3">
                          {item.listItems.map((listItem, i) => (
                            <li key={i} className="pl-2">
                              {listItem}
                            </li>
                          ))}
                        </ul>
                      )}
                      {item.additionalText && (
                        <p className="text-gray-600 leading-relaxed">
                          {item.additionalText}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Service Highlights Section */}
            <section className="mt-16 pt-10 border-t border-gray-200">
              <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose Demand10 for Your IT Needs?</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-xl border border-[#265ba3]/30 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center mb-5">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#265ba3] to-[#1a365d] rounded-lg flex items-center justify-center mr-4">
                      <Server className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-xl text-gray-800">Proactive IT Management</h4>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Prevent issues before they impact your business with 24/7 monitoring by certified IT managed service providers.
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-xl border border-[#265ba3]/30 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center mb-5">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#265ba3] to-[#1a365d] rounded-lg flex items-center justify-center mr-4">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-xl text-gray-800">Enhanced Security</h4>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Protect your organization from cyber threats with comprehensive managed IT security services from verified MSSPs.
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-xl border border-[#265ba3]/30 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center mb-5">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#265ba3] to-[#1a365d] rounded-lg flex items-center justify-center mr-4">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-xl text-gray-800">Expert Support</h4>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Access enterprise-level IT expertise without the overhead of full-time staff through qualified managed service providers.
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-xl border border-[#265ba3]/30 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center mb-5">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#265ba3] to-[#1a365d] rounded-lg flex items-center justify-center mr-4">
                      <Building className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-xl text-gray-800">Industry Specialization</h4>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Connect with specialized managed IT services for small businesses, legal firms, and other industry-specific needs.
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-xl border border-[#265ba3]/30 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center mb-5">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#265ba3] to-[#1a365d] rounded-lg flex items-center justify-center mr-4">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-xl text-gray-800">Local Providers</h4>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Find trusted managed service providers near you in major business centers across the country.
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-xl border border-[#265ba3]/30 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center mb-5">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#265ba3] to-[#1a365d] rounded-lg flex items-center justify-center mr-4">
                      <Cloud className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-xl text-gray-800">Cloud Solutions</h4>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Scalable cloud infrastructure from top managed cloud service providers to support your business growth.
                  </p>
                </div>
              </div>
            </section>
            
          
          </div>
        </main>
      </div>
    </>
  )
}

export default FaqCom