import React from "react";
import { Target, TrendingUp, Heart, Shield, Lightbulb, Award, Globe, Calendar } from "lucide-react";

export const metadata = {
  title: "Our Journey - Demand10",
  description:
    "Learn about Demand10's mission to connect businesses with trusted service providers through our innovative platform and commitment to excellence.",
  keywords: [
    "Demand10 story",
    "company background",
    "business platform",
    "service providers",
    "platform development"
  ],
  metadataBase: new URL("https://demand10.com"),
  alternates: {
    canonical: "/history",
  },
  openGraph: {
    title: "Our Journey - Demand10",
    description:
      "Learn about Demand10's mission to connect businesses with trusted service providers through our innovative platform and commitment to excellence.",
    url: "https://demand10.com/history",
    siteName: "Demand10",
   
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Journey - Demand10",
    description:
      "Learn about Demand10's mission to connect businesses with trusted service providers through our innovative platform and commitment to excellence.",
    site: "@demand10",
  },
};

// Milestones data
const milestones = [
  {
    year: "2021",
    icon: <Calendar className="w-8 h-8" />,
    title: "Platform Foundation",
    description: "Established our digital platform with a focus on creating meaningful connections between businesses and qualified service professionals."
  },
  {
    year: "2022",
    icon: <Shield className="w-8 h-8" />,
    title: "Trust Framework",
    description: "Implemented comprehensive verification processes to ensure quality and reliability of all listed service providers."
  },
  {
    year: "2023",
    icon: <Globe className="w-8 h-8" />,
    title: "Market Expansion",
    description: "Extended our reach to serve diverse business needs across multiple regions and industry sectors."
  },
  {
    year: "2024",
    icon: <Award className="w-8 h-8" />,
    title: "Recognition Milestone",
    description: "Acknowledged by industry partners for our innovative approach to business-service provider matchmaking."
  }
];

// Core values data
const coreValues = [
  {
    icon: <Heart className="w-10 h-10" />,
    title: "Authenticity",
    description: "We maintain honest relationships and transparent communication with all our partners."
  },
  {
    icon: <Lightbulb className="w-10 h-10" />,
    title: "Progress",
    description: "We embrace change and continuously evolve to meet emerging business challenges."
  },
  {
    icon: <Target className="w-10 h-10" />,
    title: "Quality",
    description: "We uphold rigorous standards in every aspect of our platform and services."
  },
  {
    icon: <TrendingUp className="w-10 h-10" />,
    title: "Partnership",
    description: "We believe in collaborative success and mutual growth with our community."
  }
];

const Page = () => {
  return (
    <div>
      {/* Hero Section */}
      <section
        aria-label="Company Journey"
        className="relative bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] overflow-hidden min-h-[60vh] flex items-center"
      >
        <div className="relative z-10 container mx-auto px-6 py-16">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
                Our <span className="text-blue-200">Path Forward</span>
              </h1>
              <div className="w-24 h-1 bg-blue-300 mx-auto lg:mx-0 rounded-full mb-6"></div>
              <p className="text-lg sm:text-xl text-blue-100 leading-relaxed mb-6">
                Discover how we&apos;re building bridges between businesses and exceptional service providers through innovation and dedication.
              </p>
              <button className="px-8 py-4 bg-white text-[#265ba3] font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Discover Our Approach
              </button>
            </div>
            
            {/* Right: Core Values Preview */}
            <div className="space-y-5">
              {[
                {
                  title: "Our Purpose",
                  icon: <Target className="w-6 h-6 text-white" />,
                  text: "Creating valuable connections that drive business success and provider growth.",
                },
                {
                  title: "Our Direction",
                  icon: <TrendingUp className="w-6 h-6 text-white" />,
                  text: "Building the most reliable network for business-service partnerships globally.",
                },
                {
                  title: "Our Principles",
                  icon: <Heart className="w-6 h-6 text-white" />,
                  text: "Authenticity, progress, quality, and partnership in every interaction.",
                }
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-1">
                        {item.title}
                      </h3>
                      <p className="text-blue-100 text-sm">{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        {/* Introduction */}
        <section className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-[#265ba3] mb-6">Our Path: Building Meaningful Connections</h2>
          <div className="w-full mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              At Demand10, our journey began with a clear objective: to develop a platform that simplifies the process of connecting businesses with qualified service providers. We recognized the challenges companies face when searching for reliable partners and set out to create a solution.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Today, we serve as a trusted intermediary for organizations seeking professional services across various sectors. Our commitment to quality, verification, and user experience has made us a preferred choice for businesses looking to establish valuable partnerships.
            </p>
          </div>
        </section>

        {/* Milestones Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#265ba3] mb-2 text-center">Key Moments in Our Development</h2>
          <div className="w-20 h-1 bg-[#265ba3] mx-auto rounded-full mb-10"></div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#265ba3]/20 hidden md:block"></div>
            
            <div className="space-y-12 md:space-y-0">
              {milestones.map((milestone, index) => (
                <div 
                  key={index} 
                  className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} mb-12 md:mb-0`}
                >
                  {/* Year marker */}
                  <div className="md:w-1/2 flex justify-center md:justify-end md:pr-12 mb-4 md:mb-0">
                    <div className="bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] text-white font-bold text-xl py-2 px-6 rounded-lg shadow-md">
                      {milestone.year}
                    </div>
                  </div>
                  
                  {/* Center dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white border-4 border-[#265ba3] rounded-full flex items-center justify-center z-10 hidden md:flex">
                    <div className="text-[#265ba3]">
                      {milestone.icon}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="md:w-1/2 md:pl-12">
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300">
                      <h3 className="text-xl font-semibold text-[#265ba3] mb-2">{milestone.title}</h3>
                      <p className="text-gray-700">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#265ba3] mb-2 text-center">Our Guiding Principles</h2>
          <div className="w-20 h-1 bg-[#265ba3] mx-auto rounded-full mb-10"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 text-center">
                <div className="bg-[#265ba3]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-[#265ba3]">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-[#265ba3] mb-2">{value.title}</h3>
                <p className="text-gray-700">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Looking Ahead Section */}
        <section className="bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] rounded-xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Vision for Tomorrow</h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-blue-100 leading-relaxed mb-6">
              As we move forward, we remain focused on enhancing our platform capabilities and expanding our network of trusted providers. Our goal is to become the premier destination for businesses seeking reliable professional services.
            </p>
            <p className="text-lg text-blue-100 leading-relaxed mb-6">
              We will continue to invest in technology, verification systems, and user experience improvements to ensure that every interaction on Demand10 creates value for both businesses and service providers.
            </p>
            <div className="mt-8">
              <button className="px-8 py-3 bg-white text-[#265ba3] font-medium rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                Join Our Growing Network
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;