import Link from "next/link";
import { Lock, ShieldCheck, EyeOff, Mail, Globe, User, RefreshCw, HelpCircle, ChevronRight, Server, Cloud, Shield } from "lucide-react";

export const metadata = {
  title: "Privacy Policy - Data Protection | Demand10",
  description: "Discover how Demand10 protects your business data. Our comprehensive privacy policy explains data collection, usage, and security practices for IT service providers and B2B clients.",
  keywords: [
    "Privacy Policy",
    "Data Protection",
    "Business Data Security",
    "Demand10 Privacy",
    "IT Service Provider Privacy",
    "B2B Data Protection",
    "GDPR Compliance",
    "Data Usage Policy",
    "Managed IT Services Privacy",
    "Cybersecurity Data Handling",
    "Cloud Services Privacy",
    "Technology Partner Data Security"
  ],
  metadataBase: new URL("https://demand10.com"),
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy - Data Protection | Demand10",
    description: "Discover how Demand10 protects your business data. Our comprehensive privacy policy explains data collection, usage, and security practices for IT service providers and B2B clients.",
    url: "https://demand10.com/privacy-policy",
    siteName: "Demand10",
    
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy - Data Protection | Demand10",
    description: "Discover how Demand10 protects your business data. Our comprehensive privacy policy explains data collection, usage, and security practices for IT service providers and B2B clients.",
    site: "@demand10",
  },
};

const PrivacyPolicy = () => {

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] overflow-hidden">
       
        <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-18">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-5 py-3 rounded-full text-sm font-medium mb-8 shadow-lg">
              <ShieldCheck className="w-5 h-5 mr-2" />
              Last Updated: August 4, 2025
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              Privacy <span className="text-white/90">Policy</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed">
              Your trust is our priority. Discover how we protect your data and respect your privacy as a valued B2B partner.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#privacy" className="px-8 py-4 bg-white text-[#265ba3] font-bold rounded-lg hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg">
                Read Privacy Policy
              </Link>
              <Link href="#security" className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all duration-300 text-lg">
                Data Security
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex items-center mb-8">
                <Lock className="w-8 h-8 text-[#314158] mr-3" />
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Privacy Policy</h1>
              </div>
              
              <div className="space-y-10">
                {/* Table of Contents */}
                <div className="bg-[#f8f9fa] rounded-xl p-6 border border-gray-200">
                  <h2 className="text-xl font-semibold text-[#314158] mb-4 flex items-center">
                    <HelpCircle className="w-5 h-5 mr-2" />
                    Table of Contents
                  </h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <li>
                      <Link href="#copyright" className="text-gray-700 hover:text-[#314158] flex items-center">
                        <ChevronRight className="w-4 h-4 mr-2 text-[#314158]" />
                        Copyright Policy
                      </Link>
                    </li>
                    <li>
                      <Link href="#eula" className="text-gray-700 hover:text-[#314158] flex items-center">
                        <ChevronRight className="w-4 h-4 mr-2 text-[#314158]" />
                        End User License Agreement
                      </Link>
                    </li>
                    <li>
                      <Link href="#privacy" className="text-gray-700 hover:text-[#314158] flex items-center">
                        <ChevronRight className="w-4 h-4 mr-2 text-[#314158]" />
                        Privacy Policy Details
                      </Link>
                    </li>
                    <li>
                      <Link href="#security" className="text-gray-700 hover:text-[#314158] flex items-center">
                        <ChevronRight className="w-4 h-4 mr-2 text-[#314158]" />
                        Data Security
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Copyright Policy Section */}
                <section id="copyright">
                  <div className="border-l-4 border-[#314158] pl-4 mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Copyright Policy</h2>
                    <h3 className="text-xl font-semibold text-[#314158] mb-4">Digital Millennium Copyright Act Compliance</h3>
                  </div>
                   
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    <span className="text-md font-semibold text-gray-700 mb-3">Reporting Copyright Infringement</span>
                    If you believe that content available through Demand10 platform infringes upon your copyright, please notify our Copyright Agent with a detailed report. We take intellectual property rights seriously and will respond promptly to valid notifications.
                  </p>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Before submitting a report, please ensure you understand that you may be liable for damages if you make false claims. If you&apos;re uncertain about copyright infringement, we recommend consulting with a legal professional first.
                  </p>
                  <p className="text-gray-600 mb-4 leading-relaxed font-medium">
                    Required Information for Copyright Notifications:
                  </p>
                  <ol className="list-decimal pl-6 mb-4 space-y-2 text-gray-600">
                    <li>Electronic signature of the copyright owner or authorized representative</li>
                    <li>Identification of the copyrighted work claimed to be infringed</li>
                    <li>Specific identification of the allegedly infringing material</li>
                    <li>Your contact information including address, phone number, and email</li>
                    <li>Statement of good faith belief that use is unauthorized</li>
                    <li>Statement of accuracy under penalty of perjury</li>
                  </ol>
                  <div className="bg-[#f0f4f9] rounded-lg p-4 border border-[#314158]/20">
                    <p className="text-gray-600 leading-relaxed">
                      Send copyright notifications to: <span className="font-medium text-[#314158]">support@demand10.com</span>.
                    </p>
                  </div>
                </section>

                {/* EULA Section */}
                <section id="eula">
                  <div className="border-l-4 border-[#314158] pl-4 mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Demand10 End User License Agreement</h2>
                    <p className="text-gray-500 text-sm">Last Updated: May 24, 2018</p>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    This Legal Agreement governs your use of Demand10 services. By accessing or using our platform, you agree to comply with these terms and conditions.
                  </p>
                  
                  <div className="space-y-6 mt-8">
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                      <h3 className="text-xl font-medium text-[#314158] mb-3 flex items-center">
                        <Server className="w-5 h-5 mr-2" />
                        1. Service Definitions
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        The Service refers to Demand10 technology platform that connects businesses with managed service providers. This includes our website, applications, and related tools designed to facilitate B2B technology partnerships.
                      </p>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        User Data encompasses any information, content, or materials you submit to our platform during your use of our services, including project specifications, requirements, and communications.
                      </p>
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                      <h3 className="text-xl font-medium text-[#314158] mb-3 flex items-center">
                        <Globe className="w-5 h-5 mr-2" />
                        2. Service Access and Usage
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        Demand10 provides two service tiers: Professional Edition for businesses requiring full platform access, and Community Edition for users exploring our services with limited functionality.
                      </p>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        As a business user, you may utilize our platform to discover managed IT service providers, evaluate technology solutions, and connect with qualified partners. As a service provider, you can showcase your offerings to potential clients.
                      </p>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        Professional Edition subscribers gain access to advanced features including detailed vendor comparisons, project management tools, and direct communication channels with service providers.
                      </p>
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                      <h3 className="text-xl font-medium text-[#314158] mb-3 flex items-center">
                        <Shield className="w-5 h-5 mr-2" />
                        3. User Responsibilities
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                      </p>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        You agree to provide accurate, current, and complete information during registration and to update such information to maintain its accuracy.
                      </p>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        You must not use the Service for any illegal or unauthorized purpose, nor may you violate any laws in your jurisdiction.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Privacy Policy Section */}
                <section id="privacy">
                  <div className="border-l-4 border-[#314158] pl-4 mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Demand10 Privacy Policy</h2>
                    <p className="text-gray-500 text-sm">(Last Updated: June 20, 2024)</p>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    At Demand10, we are committed to protecting your privacy and ensuring the security of your information. This policy explains how we collect, use, and safeguard your data when you use our services.
                  </p>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    We may update this policy periodically to reflect changes in our practices or legal requirements. We encourage you to review this policy regularly.
                  </p>
                  
                  <div className="space-y-6 mt-8">
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                      <h3 className="text-xl font-medium text-[#314158] mb-3 flex items-center">
                        <User className="w-5 h-5 mr-2" />
                        1. Information We Collect
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        We collect information to provide and improve our services, including:
                      </p>
                      <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
                        <li>Account information such as your name, email address, and company details</li>
                        <li>Business requirements and project specifications you provide</li>
                        <li>Communication preferences and service interactions</li>
                        <li>Technical information about your device and browsing activities</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                      <h3 className="text-xl font-medium text-[#314158] mb-3 flex items-center">
                        <EyeOff className="w-5 h-5 mr-2" />
                        2. How We Use Your Information
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        We use your information to:
                      </p>
                      <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
                        <li>Connect you with relevant managed service providers</li>
                        <li>Improve our platform and user experience</li>
                        <li>Communicate with you about our services</li>
                        <li>Comply with legal obligations</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                      <h3 className="text-xl font-medium text-[#314158] mb-3 flex items-center">
                        <Shield className="w-5 h-5 mr-2" />
                        3. Data Protection Measures
                      </h3>
                      <h4 className="text-lg font-medium text-gray-700 mb-2">A. Technical Safeguards</h4>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        We implement industry-standard security measures to protect your data, including encryption, secure server infrastructure, and regular security audits.
                      </p>
                      <h4 className="text-lg font-medium text-gray-700 mb-2">B. Access Controls</h4>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        Access to your information is limited to authorized personnel who require it for their job functions. All staff receive regular security training.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Security Section */}
                <section id="security">
                  <div className="border-l-4 border-[#314158] pl-4 mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Data Security & Your Rights</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] rounded-xl p-6 text-white">
                      <h3 className="text-xl font-semibold mb-3 flex items-center">
                        <ShieldCheck className="w-5 h-5 mr-2" />
                        How We Protect Your Data
                      </h3>
                      <ul className="space-y-2 text-gray-100">
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                          Advanced encryption for data transmission and storage
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                          Secure infrastructure with continuous monitoring
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                          Strict access controls and authentication
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                          Regular security assessments and updates
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] rounded-xl p-6 text-white">
                      <h3 className="text-xl font-semibold mb-3 flex items-center">
                        <RefreshCw className="w-5 h-5 mr-2" />
                        Your Privacy Rights
                      </h3>
                      <ul className="space-y-2 text-gray-100">
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                          Access and review your personal information
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                          Request correction of inaccurate data
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                          Request deletion of your data
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                          Opt-out of marketing communications
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-8 bg-[#f8f9fa] rounded-xl p-6 border border-gray-200">
                    <h3 className="text-xl font-semibold text-[#314158] mb-4">Contact Us</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      If you have questions about this Privacy Policy or concerns about your privacy, please contact our Data Protection Officer:
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      Email: <span className="font-medium text-[#314158]">support@demand10.com</span>
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;