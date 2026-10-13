import React from "react";
import {
  Target,
  TrendingUp,
  Award,
  Globe,
  Headphones,
  Cloud,
  Shield,
  Server,
  Settings,
  CheckCircle,
  ArrowRight,
  Search,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "About Demand10 | Leading MSP & MSSP Platform for Business Growth",
  description:
    "Learn about Demand10, the premier platform connecting businesses with top Managed Service Providers and Managed Security Service Providers globally. Discover our mission, values, and commitment to secure technology partnerships.",
  keywords: [
    "Managed Service Provider Platform",
    "Managed Security Service Provider Directory",
    "Top MSP Database",
    "Best MSSP Directory",
    "IT Service Provider Platform",
    "Cybersecurity Solutions Directory",
    "Business Technology Partners",
    "Demand10 Company Information",
    "MSP MSSP Marketplace",
    "Enterprise Technology Solutions"
  ],
  metadataBase: new URL("https://demand10.com"),
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Demand10 | Leading MSP & MSSP Platform for Business Growth",
    description:
      "Learn about Demand10, the premier platform connecting businesses with top Managed Service Providers and Managed Security Service Providers globally. Discover our mission, values, and commitment to secure technology partnerships.",
    url: "https://demand10.com/about",
    siteName: "Demand10",

    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Demand10 | Leading MSP & MSSP Platform for Business Growth",
    description:
      "Learn about Demand10, the premier platform connecting businesses with top Managed Service Providers and Managed Security Service Providers globally.",
    site: "@demand10",
  },
};

export default function AboutUsSection() {
  return (
    <main>
      {/* Updated Hero Section with Semantic HTML */}
      <header className="relative bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] min-h-[500px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
        <div className="relative z-10 container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                About Our Company
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                About <span className="text-blue-200">Demand10</span>
              </h1>
              <div className="w-20 h-1 bg-blue-300 mx-auto lg:mx-0 rounded-full mb-8"></div>
              <p className="text-xl text-blue-100 mb-8 max-w-xl mx-auto lg:mx-0">
                Premier MSP & MSSP Platform
              </p>
              <p className="text-lg text-blue-50 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Connecting businesses with top Managed Service Providers and Managed Security Service Providers across global markets.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/services" aria-label="Explore our services">
                  <button className="flex items-center cursor-pointer justify-center px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg">
                    <Settings className="w-5 h-5 mr-2" />
                    Our Services
                  </button>
                </Link>
                <Link href="/contact" aria-label="Contact Demand10">
                  <button className="px-6 py-3 cursor-pointer bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium rounded-lg hover:bg-white/20 transition-all duration-300 hover:border-white/30">
                    Contact Us
                  </button>
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: Target,
                  title: "Our Mission",
                  desc: "Connecting businesses with top MSPs and MSSPs for secure growth",
                },
                {
                  icon: Globe,
                  title: "Our Reach",
                  desc: "Serving businesses across USA, Europe, Australia, and Canada",
                },
                {
                  icon: Shield,
                  title: "Our Focus",
                  desc: "Verified MSP and MSSP partnerships for maximum security",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-xl"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/30">
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h2 className="text-white font-bold text-xl mb-2">
                        {item.title}
                      </h2>
                      <p className="text-blue-100">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Company History Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-16 px-4 relative overflow-hidden">
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Our Journey
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-[#265ba3]">Journey</span>
            </h2>
            <div className="w-20 h-1 bg-[#265ba3] rounded-full mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Demand10 emerged as a response to the growing need for reliable,
                data-driven technology partnerships. What began as a specialized 
                Managed Service Provider database has evolved into a comprehensive 
                platform connecting businesses with verified MSP and MSSP solution 
                providers worldwide.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We&apos;ve helped businesses streamline their technology procurement 
                process by connecting them with top MSPs and MSSPs while maintaining 
                a commitment to excellence and security.
              </p>
              
              {/* CTA Button */}
              <div className="mt-8">
                <button className="px-6 py-3 bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] hover:from-[#1e4a86] hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg flex items-center">
                  Learn More About Our History
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: "10K+", label: "Businesses Served" },
                { value: "95%", label: "Client Satisfaction" },
                { value: "500+", label: "Global Partners" },
                { value: "24/7", label: "Support Coverage" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">{stat.value}</span>
                  </div>
                  <p className="text-gray-600 text-center font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Content Section */}
      <article className="bg-gradient-to-br from-gray-50 to-white py-16 px-4 relative overflow-hidden">
        
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="space-y-16">
            {/* Introduction */}
            <section className="text-center">
              <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                Strategic Technology Partnership
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Your Strategic <span className="text-[#265ba3]">MSP & MSSP</span> Technology Partner
              </h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                At Demand10, we specialize in connecting businesses with premier Managed Service Providers and Managed Security Service Providers. 
                Our comprehensive platform serves as the critical link between organizations seeking top-tier MSP and MSSP partnerships 
                and verified IT solution providers across global markets.
              </p>
            </section>

            {/* Mission */}
            <section className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/3">
                  <div className="bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] rounded-2xl p-6 text-white">
                    <h3 className="text-2xl font-bold mb-4">Our Core Mission</h3>
                    <p className="mb-4">Empowering businesses through strategic technology partnerships</p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                        <Target className="w-5 h-5" />
                      </div>
                      <span className="font-medium">Global Reach</span>
                    </div>
                  </div>
                </div>
                <div className="md:w-2/3">
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    To transform business technology procurement by providing access to the best Managed Service Providers and Managed Security Service Providers. 
                    We empower organizations to make data-driven decisions about their MSP and MSSP partnerships while ensuring security, scalability, 
                    and strategic alignment for long-term growth.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                      <div className="text-2xl font-bold text-[#265ba3]">10K+</div>
                      <div className="text-gray-600">Verified Providers</div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                      <div className="text-2xl font-bold text-[#265ba3]">95%</div>
                      <div className="text-gray-600">Client Satisfaction</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Services */}
            <section>
              <div className="text-center mb-12">
                <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                  Comprehensive Solutions
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Comprehensive <span className="text-[#265ba3]">MSP & MSSP</span> Solutions
                </h3>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  As a full-service technology partner, we offer both a premier MSP/MSSP database and direct managed services to meet your business needs.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "MSP Database Platform",
                    desc: "Access to 10K+ verified Managed Service Providers with detailed capabilities and performance metrics for informed decision-making.",
                    icon: Server,
                    link: "/managed-service-providers",
                    color: "from-blue-500 to-blue-700"
                  },
                  {
                    title: "MSSP Database Platform",
                    desc: "Connect with top Managed Security Service Providers for comprehensive cybersecurity protection and threat management.",
                    icon: Shield,
                    link: "/managed-security-service-providers",
                    color: "from-blue-500 to-blue-700"
                  },
                  {
                    title: "Cybersecurity Solutions",
                    desc: "Comprehensive protection against evolving threats with 24/7 monitoring and rapid response from verified MSSPs.",
                    icon: Shield,
                    link: "/data-backup-recovery",
                    color: "from-blue-500 to-blue-700"
                  },
                  {
                    title: "Cloud Infrastructure",
                    desc: "Scalable cloud solutions from top MSPs enabling business growth without technological constraints or limitations.",
                    icon: Cloud,
                    link: "/cloud-computing-services",
                    color: "from-blue-500 to-blue-700"
                  },
                  {
                    title: "Strategic IT Consulting",
                    desc: "Expert guidance to align MSP and MSSP investments with business objectives and long-term strategic goals.",
                    icon: TrendingUp,
                    link: "/business-consulting",
                    color: "from-blue-500 to-blue-700"
                  },
                  {
                    title: "Compliance Management",
                    desc: "Ensuring your MSP and MSSP partnerships meet industry regulations and security standards for full compliance.",
                    icon: CheckCircle,
                    link: "/compliance-risk-management",
                    color: "from-blue-500 to-blue-700"
                  },
                ].map((service, idx) => (
                  <Link
                    key={idx}
                    href={service.link}
                    className="block bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
                  >
                    <div className="flex items-start mb-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mr-4 flex-shrink-0`}>
                        <service.icon className="w-7 h-7 text-white" />
                      </div>
                      <h4 className="font-bold text-xl text-gray-900 group-hover:text-[#265ba3] transition-colors">
                        {service.title}
                      </h4>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{service.desc}</p>
                    <div className="mt-4 flex items-center text-[#265ba3] font-medium">
                      Learn more
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Approach */}
            <section className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <div className="text-center mb-12">
                <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                  </svg>
                  Methodology
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Our Client-Centric <span className="text-[#265ba3]">MSP & MSSP</span> Approach
                </h3>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  We believe technology should serve your business strategy, not constrain it. Our four-phase methodology ensures MSP and MSSP solutions that deliver measurable results.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    step: "01",
                    title: "Assessment",
                    desc: "Comprehensive MSP and MSSP needs analysis with detailed requirement mapping",
                    icon: Search,
                  },
                  {
                    step: "02",
                    title: "Strategy",
                    desc: "Custom strategy aligned with business goals and security requirements",
                    icon: Target,
                  },
                  {
                    step: "03",
                    title: "Implementation",
                    desc: "Seamless MSP/MSSP solution deployment with minimal disruption",
                    icon: Settings,
                  },
                  {
                    step: "04",
                    title: "Optimization",
                    desc: "Continuous improvement with your MSP/MSSP partners for peak performance",
                    icon: TrendingUp,
                  },
                ].map((phase, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 text-center group hover:border-[#265ba3] transition-all duration-300">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#265ba3] to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <phase.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-[#265ba3] mb-2">{phase.step}</div>
                    <h4 className="font-bold text-xl text-gray-900 mb-3">{phase.title}</h4>
                    <p className="text-gray-600">{phase.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Why Choose Us */}
            <section>
              <div className="text-center mb-12">
                <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Competitive Advantages
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Why Businesses Choose Top <span className="text-[#265ba3]">MSPs & MSSPs</span> via Demand10
                </h3>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  The competitive advantages that make us the trusted MSP/MSSP platform for businesses worldwide.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "MSP/MSSP Expertise",
                    desc: "Our team averages 10+ years in enterprise MSP and MSSP solutions with proven track records",
                    icon: Award,
                    color: "from-blue-500 to-blue-700"
                  },
                  {
                    title: "Verified Providers",
                    desc: "Rigorous vetting process for all MSP and MSSP partners in our database with continuous monitoring",
                    icon: CheckCircle,
                    color: "from-blue-500 to-blue-700"
                  },
                  {
                    title: "Security First",
                    desc: "Zero major security incidents across client MSP/MSSP deployments with proactive threat management",
                    icon: Shield,
                    color: "from-blue-500 to-blue-700"
                  },
                  {
                    title: "Global Perspective",
                    desc: "MSP and MSSP solutions optimized for international operations across 40+ countries",
                    icon: Globe,
                    color: "from-blue-500 to-blue-700"
                  },
                  {
                    title: "Proactive Support",
                    icon: Headphones,
                    desc: "95% of MSP/MSSP issues resolved before impacting operations with 24/7 monitoring",
                    color: "from-blue-500 to-blue-700"
                  },
                  {
                    title: "Cost Transparency",
                    icon: TrendingUp,
                    desc: "Clear pricing with no hidden fees when working with MSPs/MSSPs for budget predictability",
                    color: "from-blue-500 to-blue-700"
                  },
                ].map((reason, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group">
                    <div className={`w-14 h-14 bg-gradient-to-br ${reason.color} rounded-xl flex items-center justify-center mb-5`}>
                      <reason.icon className="w-7 h-7 text-white" />
                    </div>
                    <h4 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-[#265ba3] transition-colors">
                      {reason.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">{reason.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Final CTA */}
            <section className="bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] rounded-3xl p-8 md:p-12 text-center">
              <div className="max-w-4xl mx-auto">
                <div className="inline-flex items-center bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                  Take the Next Step
                </div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">
                  Connect with Top <span className="text-blue-200">MSPs & MSSPs</span> Today
                </h3>
                <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
                  Join thousands of businesses that trust Demand10 to find the best Managed Service Providers and Managed Security Service Providers for their technology needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact" aria-label="Contact Demand10" className="cursor-pointer">
                    <button className="px-8 py-4  bg-white text-[#1a365d] font-bold rounded-xl hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Get Started Today
                    </button>
                  </Link>
                  <Link href="/services" aria-label="Explore our services" className="text-white cursor-pointer">
                    <button className="px-8 py-4  bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center">
                      <Settings className="w-5 h-5 mr-2" />
                      Explore MSP/MSSP Solutions
                    </button>
                  </Link>
                </div>
                
                {/* Trust Indicators */}
                <div className="mt-12 pt-8 border-t border-white/20">
                  <p className="text-blue-200 mb-4">Trusted by 10,000+ businesses worldwide</p>
                  <div className="flex flex-wrap justify-center gap-8">
                    {[
                      { value: "10K+", label: "Businesses Served" },
                      { value: "500+", label: "Global Partners" },
                      { value: "95%", label: "Client Satisfaction" },
                      { value: "24/7", label: "Support Coverage" },
                    ].map((stat, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-2xl font-bold text-white">{stat.value}</div>
                        <div className="text-blue-200 text-sm">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
}