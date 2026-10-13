"use client";
import Link from "next/link";
import React, { useState } from "react";
import dynamic from 'next/dynamic';
import MspHeroButtons from "@/Componenets/MspPage/MspHeroButtons";
import MspCompanyCards from "@/Componenets/MspPage/MspCompanyCards";

const OrderDataReviewForm = dynamic(() => import('@/Componenets/ui/OrderDataReviewForm'), { ssr: false });

// Companies Data Array
const companies = [
  {
    name: "CMS IT Services",
    employees: "5,000 - 10,000",
    industry: "Information Technology & Services",
    location: "Bengaluru, Karnataka, India",
    founded: 2014,
    logo: "https://zenprospect-production.s3.amazonaws.com/uploads/pictures/691fe383bdbeec0001213a57/picture",
    website: "http://www.cmsitservices.com",
    phone: "+91 80 4550 0300",
    address: "238, Bengaluru, Karnataka, 560100",
    linkedin: "http://www.linkedin.com/company/cms-it-services",
    facebook: "https://www.facebook.com/cmsitservices",
    twitter: "https://twitter.com/cmsitservices",
    description: "A well-established IT managed services organization offering end-to-end technology lifecycle support, cloud infrastructure management, enterprise application services, and security operations across India and global markets.",
  },
  {
    name: "CoNetrix",
    employees: "100 - 250",
    industry: "Information Technology & Services",
    location: "Lubbock, Texas, United States",
    founded: 1977,
    logo: "https://zenprospect-production.s3.amazonaws.com/uploads/pictures/691eeaaf0e94a4000109a030/picture",
    website: "http://www.conetrix.com",
    phone: "+1 800-356-6568",
    address: "5225 S Loop 289, Lubbock, Texas, 79424",
    linkedin: "http://www.linkedin.com/company/conetrix",
    facebook: "http://www.facebook.com/CoNetrix",
    twitter: "http://twitter.com/CoNetrix",
    description: "A long-standing technology services firm serving the financial sector with compliance-aligned IT, network security assessments, vulnerability management, and continuity planning tailored for regulated banking environments.",
  },
  {
    name: "Motifworks",
    employees: "100 - 250",
    industry: "Information Technology & Services",
    location: "Towson, Maryland, United States",
    founded: 2010,
    logo: "https://zenprospect-production.s3.amazonaws.com/uploads/pictures/69240c72c4de570001f177e9/picture",
    website: "http://www.motifworks.com",
    phone: "+1 443-424-2340",
    address: "200 W Towsontown Blvd, Towson, Maryland, 21204-5200",
    linkedin: "http://www.linkedin.com/company/motifworks",
    facebook: "https://facebook.com/motifworks/",
    twitter: "https://twitter.com/motifworks",
    description: "A cloud-native consultancy with deep expertise in data engineering, advanced analytics, and AI-driven solutions. Partners with organizations to accelerate cloud adoption roadmaps and build scalable digital platforms.",
  },
  {
    name: "PhoenixNAP",
    employees: "100 - 250",
    industry: "Information Technology & Services",
    location: "Phoenix, Arizona, United States",
    founded: 2009,
    logo: "https://zenprospect-production.s3.amazonaws.com/uploads/pictures/691d7e10d80b7b000198a5e6/picture",
    website: "http://www.phoenixnap.com",
    phone: "+1 877-749-2656",
    address: "3402 E University Dr, Phoenix, Arizona, 85034",
    linkedin: "http://www.linkedin.com/company/phoenix-nap-colocation",
    facebook: "https://www.facebook.com/phoenixnap/",
    twitter: "https://twitter.com/phoenixnap",
    description: "A globally distributed infrastructure operator offering multi-tier dedicated hosting, hybrid cloud environments, edge computing, and enterprise-grade security services across its international data center network.",
  },
  {
    name: "Sota",
    employees: "100 - 250",
    industry: "Information Technology & Services",
    location: "Sittingbourne, England, United Kingdom",
    founded: 1989,
    logo: "https://zenprospect-production.s3.amazonaws.com/uploads/pictures/6924ba268b361b0001c98bd4/picture",
    website: "http://www.sota.co.uk",
    phone: "+44 179 541 3500",
    address: "Sittingbourne, England, ME9 8PX",
    linkedin: "http://www.linkedin.com/company/sota-solutions",
    facebook: null,
    twitter: null,
    description: "A connectivity-first managed services provider serving commercial and public sector organizations across the UK, delivering wide area networking, cloud adoption support, and operational resilience strategies.",
  },
  {
    name: "Norseman Defense",
    employees: "50 - 100",
    industry: "Computer Hardware",
    location: "Elkridge, Maryland, United States",
    founded: 1992,
    logo: "https://zenprospect-production.s3.amazonaws.com/uploads/pictures/691da3ce4765cf0001a4f8dd/picture",
    website: "http://www.norseman.com",
    phone: "+1 410-579-8600",
    address: "8172 Lark Brown Rd, Elkridge, Maryland, 21075",
    linkedin: "http://www.linkedin.com/company/norseman-defense-technologies",
    facebook: "https://www.facebook.com/NorsemanDefense/",
    twitter: "https://twitter.com/norsemandefense",
    description: "A federal-focused technology integrator specializing in secure DevSecOps pipelines, zero-trust architecture implementation, and mission-critical IT modernization for defense and government agency environments.",
  },
  {
    name: "ComTec Solutions",
    employees: "50 - 100",
    industry: "Information Technology & Services",
    location: "Rochester, New York, United States",
    founded: 1995,
    logo: "https://zenprospect-production.s3.amazonaws.com/uploads/pictures/691d42ec223a240001de601d/picture",
    website: "http://www.comtecsolutions.com",
    phone: "+1 585-621-9303",
    address: "65 Elmgrove Park, Rochester, New York, 14624-1364",
    linkedin: "http://www.linkedin.com/company/comtec-solutions",
    facebook: "https://facebook.com/pages/ComTec-Solutions/275716679138057",
    twitter: "https://twitter.com/ComTecSolutions",
    description: "A regional technology partner serving manufacturing and distribution companies with integrated ERP support, operational IT management, endpoint security, and workflow automation tailored to industrial businesses.",
  },
  {
    name: "Xtravirt",
    employees: "50 - 100",
    industry: "Information Technology & Services",
    location: "Fetcham, England, United Kingdom",
    founded: 2007,
    logo: "https://zenprospect-production.s3.amazonaws.com/uploads/pictures/69171240ac7e15000191a6c5/picture",
    website: "http://www.xtravirt.com",
    phone: "+44 800 488 0038",
    address: "Guildford Road, Fetcham, England, KT22 9AD",
    linkedin: "http://www.linkedin.com/company/xtravirt-limited",
    facebook: null,
    twitter: "https://twitter.com/xtravirt",
    description: "A specialist virtualization and cloud advisory firm helping enterprises design and implement multi-cloud architectures, workspace modernization programs, and hybrid infrastructure strategies aligned with business goals.",
  },
  {
    name: "Clouditalia Telecomunicazioni",
    employees: "50 - 100",
    industry: "Telecommunications",
    location: "Arezzo, Tuscany, Italy",
    founded: 2012,
    logo: "https://zenprospect-production.s3.amazonaws.com/uploads/pictures/690c509bd753700001489c28/picture",
    website: "http://www.clouditalia.com",
    phone: "+39 800 984 200",
    address: "Arezzo, Tuscany, Italy, 52100",
    linkedin: "http://www.linkedin.com/company/clouditalia-communications-spa",
    facebook: "https://facebook.com/ClouditaliaTelecomunicazioni",
    twitter: "https://twitter.com/clouditaliaspa",
    description: "An Italian-based telecommunications and cloud services operator delivering professional-grade voice infrastructure, unified communications platforms, and connectivity solutions for business and public sector clients.",
  },
  {
    name: "Alvaka",
    employees: "50 - 100",
    industry: "Information Technology & Services",
    location: "Irvine, California, United States",
    founded: 1982,
    logo: "https://zenprospect-production.s3.amazonaws.com/uploads/pictures/691b959c6f5e69000180b3fa/picture",
    website: "http://www.alvaka.net",
    phone: "+1 949-428-5000",
    address: "2 Executive Cir, Irvine, California, 92614",
    linkedin: "http://www.linkedin.com/company/alvaka-networks",
    facebook: "https://facebook.com/AlvakaNetworks/",
    twitter: "https://twitter.com/alvaka",
    description: "A veteran-owned managed IT firm with decades of experience in proactive network management, critical infrastructure protection, and rapid incident response — serving mid-market organizations across Southern California.",
  },
];

const faqs = [
  {
    question: "What is the Demand10 MSP Directory?",
    answer:
      "The Demand10 MSP Directory is a structured database of verified managed IT service providers, cloud solution partners, and managed security firms operating globally. It is designed to help enterprises, investors, and advisory teams identify and evaluate IT service providers based on size, specialization, and geography.",
  },
  {
    question: "How is the MSP data verified?",
    answer:
      "Each record in our database is built through a structured research process combining public business registries, company websites, professional networks, and analyst review. Entries are cross-referenced across multiple sources and refreshed on a rolling basis to maintain accuracy.",
  },
  {
    question: "Can I export the MSP dataset?",
    answer:
      "Yes. Demand10 delivers data in structured CSV format and professionally formatted PDF reports. You can submit a data request through our form and our team will prepare a tailored export based on your specific filters and scope.",
  },
  {
    question: "Who accesses the Demand10 MSP database?",
    answer:
      "Our research is used by strategy consultants, growth equity and private equity investors, corporate development teams, and enterprise procurement functions evaluating IT provider landscapes for sourcing, investment, or competitive analysis purposes.",
  },
  {
    question: "How frequently is the directory refreshed?",
    answer:
      "Our research team conducts ongoing updates to track new market entrants, ownership changes, technology stack shifts, and M&A events within the managed services sector, ensuring the data reflects current market conditions.",
  },
];



const MspDirectoryPage = () => {
  const [showOrderReviewForm, setShowOrderReviewForm] = useState(false);

  return (
    <div className="bg-white text-[#1a1a1a] font-sans">
      {/* Header */}
      <header className="bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] text-white py-12 md:py-16 lg:py-20 px-4 md:px-5 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 md:mb-4 leading-tight">
          Explore Verified IT Service Providers Across the Globe
        </h1>
        <p className="max-w-4xl mx-auto text-sm sm:text-base md:text-lg opacity-95 px-2">
          A structured intelligence platform for researching managed IT providers, cloud solution partners, and technology service firms — built for procurement leaders, investment teams, and strategy advisors
        </p>

        <MspHeroButtons onOpenForm={() => setShowOrderReviewForm(true)} />
      </header>

      {/* Stats */}
      <div className="max-w-6xl mx-auto px-4 md:px-5 -mt-8 md:-mt-10 mb-12 md:mb-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          <div className="bg-white p-4 md:p-6 text-center rounded-xl shadow-lg">
            <h2 className="text-[#265ba3] text-2xl md:text-3xl font-bold">120,000+</h2>
            <p className="text-gray-600 text-xs md:text-base">IT Providers Documented</p>
          </div>
          <div className="bg-white p-4 md:p-6 text-center rounded-xl shadow-lg">
            <h2 className="text-[#265ba3] text-2xl md:text-3xl font-bold">10+</h2>
            <p className="text-gray-600 text-xs md:text-base">Years of Market Coverage</p>
          </div>
          <div className="bg-white p-4 md:p-6 text-center rounded-xl shadow-lg">
            <h2 className="text-[#265ba3] text-2xl md:text-3xl font-bold">60+</h2>
            <p className="text-gray-600 text-xs md:text-base">Countries Indexed</p>
          </div>
          <div className="bg-white p-4 md:p-6 text-center rounded-xl shadow-lg">
            <h2 className="text-[#265ba3] text-2xl md:text-3xl font-bold">Quarterly</h2>
            <p className="text-gray-600 text-xs md:text-base">Analyst-Verified Refresh</p>
          </div>
        </div>
      </div>

      {/* SEO Keyword Section */}
      <section className="py-12 md:py-16 px-4 md:px-5 bg-white border-t border-gray-100 border-b">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-900">
            Research-Grade IT Provider Intelligence for Strategic Teams
          </h2>

          <h3 className="text-gray-900 text-lg md:text-xl font-bold mt-4 md:mt-6 mb-2">
            Identify and Evaluate Managed IT Service Providers with Confidence
          </h3>
          <p className="text-gray-600 mb-4 text-sm md:text-base text-left">
            Demand10 gives procurement leaders, investment professionals, and strategy consultants access to a structured database of managed IT service organizations across major global markets. Whether you need to evaluate providers in specific geographies, filter by service specialization, or benchmark operational scale, our research platform delivers the structured intelligence you need.
          </p>

          <h3 className="text-gray-900 text-lg md:text-xl font-bold mt-4 md:mt-6 mb-2">
            Sector Coverage Across Technology Disciplines
          </h3>
          <p className="text-gray-600 mb-4 text-sm md:text-base text-left">
            Our platform captures detailed attributes across cloud services, cybersecurity, network management, and digital transformation disciplines. Clients use this intelligence to benchmark providers, support sourcing decisions, and inform investment-grade research on the managed services landscape.
          </p>

          <h3 className="text-gray-900 text-lg md:text-xl font-bold mt-4 md:mt-6 mb-2">
            A Reliable Foundation for IT Market Research
          </h3>
          <p className="text-gray-600 mb-4 text-sm md:text-base text-left">
            With verified records spanning multiple regions and service categories, Demand10 supports vendor evaluation programs, digital transformation planning, and competitive landscape studies for organizations operating at scale.
          </p>
        </div>
      </section>

      {/* About */}
      <section className="py-12 md:py-16 px-4 md:px-5">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-900">
            IT Provider Research Platform & Structured MSP Intelligence
          </h2>
          <p className="max-w-4xl mx-auto text-gray-600 text-sm md:text-base">
            Demand10 maintains a structured repository of IT service and managed services organizations, enriched with firmographic detail, technology attributes, ownership context, and geographic coverage. Research teams use this intelligence to accelerate market analysis, shortlist acquisition targets, and evaluate provider landscapes across the global IT services sector.
          </p>
        </div>
      </section>

      {/* Directory Section */}
      <section id="directory" className="py-12 md:py-16 px-4 md:px-5 ">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-left text-2xl md:text-3xl font-bold mb-6 md:mb-10 text-gray-900">
            World’s Largest MSP Directory
          </h2>

          <MspCompanyCards companies={companies} onOpenForm={() => setShowOrderReviewForm(true)} />
        </div>
      </section>

      {/* Data Coverage & Intelligence Services */}
      <section className="py-16 px-5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-3xl font-bold mb-4 text-gray-900">
            Platform Capabilities & Research Coverage
          </h2>
          <p className="text-center max-w-4xl mx-auto text-gray-600 mb-10">
            Demand10 organizes managed IT provider intelligence into structured datasets purpose-built for advisory, investment, and enterprise strategy use cases.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <div className="bg-white p-6 rounded-xl shadow-md hover:-translate-y-1 transition duration-300">
              <h3 className="text-gray-800 text-xl font-bold mb-4">
                Data Coverage & Available Fields
              </h3>
              <ul className="text-gray-600 space-y-2 list-disc list-inside">
                <li>MSP Company Name & Website</li>
                <li>Physical Address & Country</li>
                <li>LinkedIn Company Page URL</li>
                <li>Employee Size & Revenue Range</li>
                <li>Technology Usage & Stack</li>
                <li>Vendor & Cloud Partnerships</li>
                <li>Service Portfolio Mapping</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:-translate-y-1 transition duration-300">
              <h3 className="text-gray-800 text-xl font-bold mb-4">
                Contact & Decision-Maker Intelligence
              </h3>
              <ul className="text-gray-600 space-y-2 list-disc list-inside">
                <li>Contact Name & Job Title</li>
                <li>Business Email & Direct Phone</li>
                <li>Company & Office Details</li>
                <li>LinkedIn Profile URL</li>
                <li>Firmographics & Technographics</li>
                <li>Partnership & Vendor Exposure</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:-translate-y-1 transition duration-300">
              <h3 className="text-gray-800 text-xl font-bold mb-4">Advanced Data Filtering</h3>
              <ul className="text-gray-600 space-y-2 list-disc list-inside">
                <li>Year Founded</li>
                <li>Employee & Revenue Brackets</li>
                <li>Technology Platforms Used</li>
                <li>Vendor Partnerships</li>
                <li>Country & Regional Focus</li>
                <li>Growth & Maturity Indicators</li>
              </ul>
            </div>
          </div>

          <h2 className="text-center text-3xl font-bold mb-4 text-gray-900">
            Research Reports, Market Studies & Data Methodology
          </h2>
          <p className="text-center max-w-4xl mx-auto text-gray-600 mb-10">
            Demand10 produces structured research outputs covering the managed IT services sector, including historical trends, competitive dynamics, and ownership intelligence for advisory and investment teams.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md hover:-translate-y-1 transition duration-300">
              <h3 className="text-gray-800 text-xl font-bold mb-4">Global MSP Market Overview</h3>
              <ul className="text-gray-600 space-y-2 list-disc list-inside">
                <li>Regional MSP Distribution</li>
                <li>Year-wise Growth (2010–2025)</li>
                <li>Technology Adoption Trends</li>
                <li>Vendor Partnership Mapping</li>
                <li>Market Share Analysis</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:-translate-y-1 transition duration-300">
              <h3 className="text-gray-800 text-xl font-bold mb-4">M&A & Consolidation Intelligence</h3>
              <ul className="text-gray-600 space-y-2 list-disc list-inside">
                <li>Annual Acquisition Activity</li>
                <li>Top Acquiring Platforms</li>
                <li>Private Equity Roll-Ups</li>
                <li>Regional Consolidation Trends</li>
                <li>Exit & Valuation Signals</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:-translate-y-1 transition duration-300">
              <h3 className="text-gray-800 text-xl font-bold mb-4">Financial & Revenue Benchmarks</h3>
              <ul className="text-gray-600 space-y-2 list-disc list-inside">
                <li>Revenue Distribution</li>
                <li>Revenue per Employee</li>
                <li>Profitability Metrics</li>
                <li>Cost Structure Analysis</li>
                <li>Growth vs Margin Index</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:-translate-y-1 transition duration-300">
              <h3 className="text-gray-800 text-xl font-bold mb-4">Technology & Vendor Landscape</h3>
              <ul className="text-gray-600 space-y-2 list-disc list-inside">
                <li>RMM & PSA Adoption</li>
                <li>Cloud Platform Usage</li>
                <li>Security Stack Mapping</li>
                <li>Vendor Dependency Index</li>
                <li>Emerging Tools</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:-translate-y-1 transition duration-300">
              <h3 className="text-gray-800 text-xl font-bold mb-4">Lifecycle & Ownership Studies</h3>
              <ul className="text-gray-600 space-y-2 list-disc list-inside">
                <li>Startup vs Closure Rates</li>
                <li>Bootstrapped vs Funded MSPs</li>
                <li>Average Company Lifespan</li>
                <li>Failure Risk Indicators</li>
                <li>Scale-Up Success Drivers</li>
              </ul>
            </div>

             <div className="bg-white p-6 rounded-xl shadow-md hover:-translate-y-1 transition duration-300">
               <h3 className="text-gray-800 text-xl font-bold mb-4">Company Lifecycle & Market Dynamics</h3>
               <ul className="text-gray-600 space-y-2 list-disc list-inside">
                 <li>New Companies Added per Year</li>
                 <li>M&A Activity & Acquirer Mapping</li>
                 <li>Closed & Inactive Firms</li>
                 <li>Bootstrapped vs Funded Analysis</li>
                 <li>Platform & Roll-Up Structures</li>
               </ul>
             </div>

             <div className="bg-white p-6 rounded-xl shadow-md hover:-translate-y-1 transition duration-300">
                <h3 className="text-gray-800 text-xl font-bold mb-4">Methodology & Data Sources</h3>
                <ul className="text-gray-600 space-y-2 list-disc list-inside">
                  <li>Multi-source Data Collection</li>
                  <li>Primary & Secondary Research</li>
                  <li>Cross-Source Validation</li>
                  <li>Human Analyst Review</li>
                  <li>Continuous Updates</li>
                </ul>
             </div>
          </div>

          <div className="text-center mt-8 md:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <button
              onClick={() => setShowOrderReviewForm(true)}
              className="w-full sm:w-auto bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] hover:opacity-90 text-white font-semibold py-2.5 md:py-3 px-5 md:px-6 rounded-md transition duration-300 cursor-pointer text-sm md:text-base"
            >
              Request Sample Report
            </button>
            <button
              onClick={() => setShowOrderReviewForm(true)}
              className="w-full sm:w-auto bg-gray-800 hover:opacity-90 text-white font-semibold py-2.5 md:py-3 px-5 md:px-6 rounded-md transition duration-300 cursor-pointer text-sm md:text-base"
            >
              Talk to Research Team
            </button>
          </div>
        </div>
      </section>

      {/* Consulting & PE Use Cases */}
      <section className="py-16 px-5 bg-white border-t border-gray-100 border-b">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-3xl font-bold mb-4 text-gray-900">
            How Advisory & Investment Teams Apply Demand10 Research
          </h2>
          <p className="max-w-4xl mx-auto text-gray-600 mb-6 font-medium">
            Leading management consulting firms, private equity investors, and corporate strategy
            teams rely on Demand10’s custom CSV datasets and PDF research reports to support
            high-impact decision-making across market entry, M&A, and growth initiatives.
          </p>
          <p className="max-w-4xl mx-auto text-gray-500 mb-10 text-center text-sm italic">
            All research outputs are delivered in structured CSV and professionally formatted PDF files, ready for modeling, presentation, and client reporting workflows.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md hover:-translate-y-1 transition duration-300 border border-gray-100">
              <h3 className="text-gray-800 text-xl font-bold mb-3">Market Entry & Expansion Strategy</h3>
              <ul className="text-gray-600 space-y-2 list-disc list-inside text-sm">
                <li>Analyze regional MSP density using CSV datasets</li>
                <li>Map competitive landscapes in PDF reports</li>
                <li>Evaluate market saturation and whitespace</li>
                <li>Support geographic expansion models</li>
                <li>Prepare client-ready market studies</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:-translate-y-1 transition duration-300 border border-gray-100">
              <h3 className="text-gray-800 text-xl font-bold mb-3">Investment Due Diligence</h3>
              <ul className="text-gray-600 space-y-2 list-disc list-inside text-sm">
                <li>Validate target company profiles via structured data</li>
                <li>Review financial and employee benchmarks</li>
                <li>Analyze technology and vendor dependencies</li>
                <li>Assess operational maturity</li>
                <li>Support IC and investment memos</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:-translate-y-1 transition duration-300 border border-gray-100">
              <h3 className="text-gray-800 text-xl font-bold mb-3">M&A & Roll-Up Execution</h3>
              <ul className="text-gray-600 space-y-2 list-disc list-inside text-sm">
                <li>Identify acquisition targets in CSV files</li>
                <li>Track historical consolidation activity</li>
                <li>Map platform and bolt-on opportunities</li>
                <li>Support integration planning</li>
                <li>Build acquisition pipelines</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:-translate-y-1 transition duration-300 border border-gray-100">
              <h3 className="text-gray-800 text-xl font-bold mb-3">Competitive & Vendor Intelligence</h3>
              <ul className="text-gray-600 space-y-2 list-disc list-inside text-sm">
                <li>Compare MSP positioning across regions</li>
                <li>Analyze vendor partnership exposure</li>
                <li>Track technology adoption trends</li>
                <li>Identify ecosystem gaps</li>
                <li>Support partner strategy</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:-translate-y-1 transition duration-300 border border-gray-100">
              <h3 className="text-gray-800 text-xl font-bold mb-3">Portfolio Performance Management</h3>
              <ul className="text-gray-600 space-y-2 list-disc list-inside text-sm">
                <li>Monitor portfolio benchmarks in CSV format</li>
                <li>Compare revenue and headcount growth</li>
                <li>Identify underperforming assets</li>
                <li>Support value creation initiatives</li>
                <li>Prepare quarterly review materials</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:-translate-y-1 transition duration-300 border border-gray-100">
              <h3 className="text-gray-800 text-xl font-bold mb-3">Board & Client Reporting</h3>
              <ul className="text-gray-600 space-y-2 list-disc list-inside text-sm">
                <li>Use PDF reports for board presentations</li>
                <li>Generate investor-ready insights</li>
                <li>Support consulting deliverables</li>
                <li>Enable data-backed recommendations</li>
                <li>Strengthen client credibility</li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-8 md:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <button
              onClick={() => setShowOrderReviewForm(true)}
              className="w-full sm:w-auto bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] hover:opacity-90 text-white font-semibold py-2.5 md:py-3 px-5 md:px-6 rounded-md transition duration-300 cursor-pointer text-sm md:text-base"
            >
              Request Sample CSV / PDF
            </button>
            <button
              onClick={() => setShowOrderReviewForm(true)}
              className="w-full sm:w-auto bg-gray-800 hover:opacity-90 text-white font-semibold py-2.5 md:py-3 px-5 md:px-6 rounded-md transition duration-300 cursor-pointer text-sm md:text-base"
            >
              Discuss Custom Report
            </button>
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="py-16 px-5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-3xl font-bold mb-10 text-gray-900">
            IT Service Providers by Region
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md hover:-translate-y-1 transition duration-300">
              <h3 className="text-gray-800 text-xl font-bold mb-3">MSPs in Los Angeles</h3>
              <ul className="text-gray-600 space-y-1 list-disc list-inside mb-4">
                <li>Cloud Consulting</li>
                <li>IT Infrastructure</li>
                <li>Cybersecurity</li>
              </ul>
              <Link
                href="/msp/it-managed-service-providers-los-angeles"
                className="block text-center bg-gray-800 hover:opacity-90 text-white py-2 px-4 rounded-md transition duration-300"
              >
                View Providers
              </Link>
            </div>

          

        
             <div className="bg-white p-6 rounded-xl shadow-md hover:-translate-y-1 transition duration-300">
              <h3 className="text-gray-800 text-xl font-bold mb-3">MSPs in Miami</h3>
              <ul className="text-gray-600 space-y-1 list-disc list-inside mb-4">
                <li>Enterprise IT</li>
                <li>Data Center Support</li>
                <li>Disaster Recovery</li>
              </ul>
              <Link
                href="/msp/managed-it-services-miami"
                className="block text-center bg-gray-800 hover:opacity-90 text-white py-2 px-4 rounded-md transition duration-300"
              >
                View Providers
              </Link>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:-translate-y-1 transition duration-300">
              <h3 className="text-gray-800 text-xl font-bold mb-3">MSPs in Boston</h3>
              <ul className="text-gray-600 space-y-1 list-disc list-inside mb-4">
                <li>Cloud Migration</li>
                <li>IT Support</li>
                <li>Network Security</li>
              </ul>
              <Link
                href="/msp/managed-it-services-boston"
                className="block text-center bg-gray-800 hover:opacity-90 text-white py-2 px-4 rounded-md transition duration-300"
              >
                View Providers
              </Link>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:-translate-y-1 transition duration-300">
              <h3 className="text-gray-800 text-xl font-bold mb-3">MSPs in Orlando</h3>
              <ul className="text-gray-600 space-y-1 list-disc list-inside mb-4">
                <li>Managed Services</li>
                <li>Cloud Solutions</li>
                <li>Help Desk</li>
              </ul>
              <Link
                href="/msp/managed-it-services-orlando"
                className="block text-center bg-gray-800 hover:opacity-90 text-white py-2 px-4 rounded-md transition duration-300"
              >
                View Providers
              </Link>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:-translate-y-1 transition duration-300">
              <h3 className="text-gray-800 text-xl font-bold mb-3">MSPs in New Jersey</h3>
              <ul className="text-gray-600 space-y-1 list-disc list-inside mb-4">
                <li>IT Management</li>
                <li>Cybersecurity</li>
                <li>Cloud Services</li>
              </ul>
              <Link
                href="/msp/new-jersey-managed-service-providers"
                className="block text-center bg-gray-800 hover:opacity-90 text-white py-2 px-4 rounded-md transition duration-300"
              >
                View Providers
              </Link>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:-translate-y-1 transition duration-300">
              <h3 className="text-gray-800 text-xl font-bold mb-3">IT MSPs in LA</h3>
              <ul className="text-gray-600 space-y-1 list-disc list-inside mb-4">
                <li>IT Infrastructure</li>
                <li>Tech Support</li>
                <li>Network Solutions</li>
              </ul>
              <Link
                href="/msp/it-managed-service-providers-los-angeles"
                className="block text-center bg-gray-800 hover:opacity-90 text-white py-2 px-4 rounded-md transition duration-300"
              >
                View Providers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Demand10 vs Others */}
      <section className="py-16 px-5 bg-gray-50 border-t border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-3xl font-bold mb-6 text-gray-900">
            Demand10 vs Standard Data Sources
          </h2>
           <p className="max-w-4xl mx-auto text-center text-gray-600 mb-10">
             Generic business directories are built for discovery, not for strategic decisions. Demand10 is purpose-built for research-grade IT sector intelligence — providing the depth, structure, and analytical context that advisory teams and investors actually need.
           </p>

           <div className="overflow-x-auto rounded-xl shadow-lg bg-white mb-10">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="bg-gray-900 text-white">
                   <th className="p-4 border-b border-gray-200">Feature</th>
                   <th className="p-4 border-b border-gray-200">Demand10</th>
                   <th className="p-4 border-b border-gray-200">Generic Data Providers</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                 <tr>
                   <td className="p-4 font-semibold text-gray-800">MSP-Focused Coverage</td>
                   <td className="p-4 text-green-600 font-bold">✔ Dedicated MSP & IT Services Dataset</td>
                   <td className="p-4 text-red-500">✖ Mixed, Non-Specialized Data</td>
                 </tr>
                 <tr>
                   <td className="p-4 font-semibold text-gray-800">Historical Intelligence</td>
                   <td className="p-4 text-green-600 font-bold">✔ Long-Term Tracking (Founded, M&A, Closures)</td>
                   <td className="p-4 text-red-500">✖ Limited or No History</td>
                 </tr>
                 <tr>
                    <td className="p-4 font-semibold text-gray-800">Data Enrichment</td>
                    <td className="p-4 text-green-600 font-bold">✔ Revenue, Employees, Tech Stack, Partners</td>
                    <td className="p-4 text-orange-500">⚠ Basic Firmographics Only</td>
                 </tr>
                 <tr>
                    <td className="p-4 font-semibold text-gray-800">Delivery Format</td>
                    <td className="p-4 text-green-600 font-bold">✔ Custom CSV & PDF Reports</td>
                    <td className="p-4 text-orange-500">⚠ Rigid Dashboards / Limited Exports</td>
                 </tr>
                  <tr>
                    <td className="p-4 font-semibold text-gray-800">Customization</td>
                    <td className="p-4 text-green-600 font-bold">✔ Tailored Filters & Research Scope</td>
                    <td className="p-4 text-red-500">✖ Standardized Packages</td>
                 </tr>
                  <tr>
                    <td className="p-4 font-semibold text-gray-800">M&A & PE Readiness</td>
                    <td className="p-4 text-green-600 font-bold">✔ Built for Due Diligence & Roll-Ups</td>
                    <td className="p-4 text-orange-500">⚠ Not Investment-Focused</td>
                 </tr>
                 <tr>
                    <td className="p-4 font-semibold text-gray-800">Verification Process</td>
                    <td className="p-4 text-green-600 font-bold">✔ Multi-Source Validation</td>
                    <td className="p-4 text-orange-500">⚠ Limited Validation</td>
                 </tr>
                 <tr>
                    <td className="p-4 font-semibold text-gray-800">Support & Research Assistance</td>
                    <td className="p-4 text-green-600 font-bold">✔ Dedicated Analyst Support</td>
                    <td className="p-4 text-red-500">✖ Self-Service Only</td>
                 </tr>
                 <tr>
                     <td className="p-4 font-semibold text-gray-800">Data Licensing</td>
                     <td className="p-4 text-green-600 font-bold">✔ Enterprise & Project-Based Licensing</td>
                     <td className="p-4 text-orange-500">⚠ One-Size-Fits-All Licensing</td>
                 </tr>
               </tbody>
             </table>
           </div>

           <div className="bg-[#eff6ff] border-l-4 border-[#265ba3] p-6 rounded-md mb-10">
             <h3 className="text-gray-900 text-xl font-bold mb-2">Built for Strategy, Investment & Advisory Teams</h3>
             <p className="text-gray-700">
               Demand10 is designed for organizations that require defensible, audit-ready, and presentation-ready datasets. Our reports support consulting engagements, private equity investments, corporate development initiatives, and board-level decision-making.
             </p>
           </div>

              <div className="text-center mt-8 md:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <button
              onClick={() => setShowOrderReviewForm(true)}
              className="w-full sm:w-auto bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] hover:opacity-90 text-white font-semibold py-2.5 md:py-3 px-5 md:px-6 rounded-md transition duration-300 cursor-pointer text-sm md:text-base"
            >
              Request Sample CSV / PDF
            </button>
            <button
              onClick={() => setShowOrderReviewForm(true)}
              className="w-full sm:w-auto bg-gray-800 hover:opacity-90 text-white font-semibold py-2.5 md:py-3 px-5 md:px-6 rounded-md transition duration-300 cursor-pointer text-sm md:text-base"
            >
              Discuss Custom Report
            </button>
          </div>
        </div>
      </section>

      {/* Data Compliance */}
      <section className="py-16 px-5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-3xl font-bold mb-6 text-gray-900">
            Data Compliance & NDA Policy
          </h2>
          <p className="max-w-4xl mx-auto text-center text-gray-600 mb-10">
            Demand10 follows strict data governance, privacy, and compliance standards to ensure
            our MSP databases and market intelligence reports meet the expectations of consulting
            firms, private equity investors, and enterprise clients.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md hover:-translate-y-1 transition duration-300 border border-gray-100">
              <h3 className="text-gray-800 text-xl font-bold mb-3">Regulatory Compliance</h3>
               <ul className="text-gray-600 space-y-2 list-disc list-inside">
                <li>GDPR & Global Data Privacy Alignment</li>
                <li>CAN-SPAM & Email Compliance Standards</li>
                <li>Data Protection & Retention Policies</li>
                <li>Regional Privacy Law Monitoring</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:-translate-y-1 transition duration-300 border border-gray-100">
              <h3 className="text-gray-800 text-xl font-bold mb-3">Data Collection & Verification</h3>
               <ul className="text-gray-600 space-y-2 list-disc list-inside">
                <li>Multi-source data aggregation</li>
                <li>Public records & business registries</li>
                <li>Manual validation & QA audits</li>
                <li>Continuous refresh cycles</li>
              </ul>
            </div>
             <div className="bg-white p-6 rounded-xl shadow-md hover:-translate-y-1 transition duration-300 border border-gray-100">
              <h3 className="text-gray-800 text-xl font-bold mb-3">Confidentiality & NDA Protection</h3>
               <ul className="text-gray-600 space-y-2 list-disc list-inside">
                <li>Custom Non-Disclosure Agreements</li>
                <li>Project-level confidentiality clauses</li>
                <li>Restricted internal access controls</li>
                <li>Secure file delivery systems</li>
              </ul>
            </div>
             <div className="bg-white p-6 rounded-xl shadow-md hover:-translate-y-1 transition duration-300 border border-gray-100">
              <h3 className="text-gray-800 text-xl font-bold mb-3">Secure Data Delivery</h3>
               <ul className="text-gray-600 space-y-2 list-disc list-inside">
                <li>Encrypted CSV & PDF reports</li>
                <li>Password-protected file access</li>
                <li>Private cloud transfers</li>
                <li>Audit-ready documentation</li>
              </ul>
            </div>
          </div>
           <p className="max-w-4xl mx-auto text-center text-gray-600 mt-10">
            For enterprise engagements, Demand10 provides signed NDAs, customized compliance documentation, and data usage frameworks to support due diligence, market sizing, M&A research, and competitive benchmarking projects.
          </p>
        </div>
      </section>

     
      {/* Final Comparison Block from HTML */}
      <section className="py-16 px-5 bg-gray-50 border-t border-gray-100">
         <div className="max-w-4xl mx-auto">
            <h2 className="text-center text-3xl font-bold mb-6 text-gray-900">
              Why Demand10 vs Other Data Providers
            </h2>

            <h3 className="text-gray-900 text-xl font-bold mt-6 mb-2">Built for Strategy, Not Just Sales</h3>
            <p className="text-gray-600 mb-4">
              Unlike generic lead databases, Demand10 focuses on research-grade MSP intelligence designed for consulting, investment, and corporate strategy teams.
            </p>

            <h3 className="text-gray-900 text-xl font-bold mt-6 mb-2">Key Differentiators</h3>
            <ul className="text-gray-600 space-y-1 mb-4 list-disc list-inside">
              <li>15+ years of historical MSP market data</li>
              <li>Verified company-level and executive datasets</li>
              <li>Deep technology and partnership mapping</li>
              <li>M&A, closure, and bootstrap tracking</li>
              <li>Custom segmentation and modeling support</li>
            </ul>

            <h3 className="text-gray-900 text-xl font-bold mt-6 mb-2">Comparison Snapshot</h3>
            <p className="text-gray-600 mb-2">
              <strong className="text-gray-800">Generic Providers:</strong> Basic contact lists, limited verification, no historical insights.
            </p>
            <p className="text-gray-600 mb-4">
              <strong className="text-gray-800">Demand10:</strong> Research-ready datasets, longitudinal analysis, and enterprise-grade delivery.
            </p>

            <h3 className="text-gray-900 text-xl font-bold mt-6 mb-2">Enterprise-Ready Delivery</h3>
            <p className="text-gray-600 mb-4">
              All datasets are delivered in professionally formatted CSV and PDF formats, optimized for Excel modeling, BI tools, and executive presentations.
            </p>
         </div>
      </section>
       {/* FAQ Section */}
      <section className="py-16 px-5 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-3xl font-bold mb-10 text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-200 cursor-pointer"
              >
                <summary className="flex justify-between items-center font-semibold text-lg text-gray-800 list-none">
                  {faq.question}
                  <span className="transition-transform duration-300 group-open:rotate-180">
                    <svg
                      fill="none"
                      height="24"
                      shapeRendering="geometricPrecision"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p className="text-gray-600 mt-4 group-open:animate-fadeIn">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>


      {/* Order Data Review Form Popup */}
      {showOrderReviewForm && (
        <OrderDataReviewForm
          onClose={() => setShowOrderReviewForm(false)}
          onSubmit={(data) => {
            setShowOrderReviewForm(false);
          }}
        />
      )}
    </div>
  );
};

export default MspDirectoryPage;
