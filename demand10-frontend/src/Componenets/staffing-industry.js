"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic';

const OrderDataReviewForm = dynamic(() => import('@/Componenets/ui/OrderDataReviewForm'), { ssr: false });

const StaffingIndustryPage = () => {
  const [showOrderReviewForm, setShowOrderReviewForm] = useState(false);

  useEffect(() => {
    // Load Mermaid script
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10.6.1/dist/mermaid.min.js';
    script.async = true;
    script.onload = () => {
      if (window.mermaid) {
        window.mermaid.initialize({
          startOnLoad: true,
          theme: 'default',
          securityLevel: 'loose',
          flowchart: {
            useMaxWidth: true,
            htmlLabels: true
          }
        });
        window.mermaid.contentLoaded();
      }
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="bg-white text-[#1a1a1a] font-sans">
      

      {/* Header */}
      <header className="bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] text-white py-12 md:py-16 lg:py-20 px-4 md:px-5 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 md:mb-4 leading-tight">
        Staffing Industry Data Reports
        </h1>
        <p className="max-w-4xl mx-auto text-sm sm:text-base md:text-lg opacity-95 px-2">
          Specialized research covering recruitment, staffing, and workforce solutions sectors — built for strategy consultants, growth equity investors, and corporate development professionals seeking proprietary market insights
        </p>
        
        <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <Link href="/recruitment-staffing" className="w-full sm:w-auto bg-white hover:bg-gray-50 text-[#265ba3] font-semibold py-2.5 md:py-3 px-5 md:px-6 rounded-md transition duration-300 text-sm md:text-base">
            Explore Workforce Data
          </Link>
          <button 
            onClick={() => setShowOrderReviewForm(true)}
            className="w-full sm:w-auto bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2.5 md:py-3 px-5 md:px-6 rounded-md transition duration-300 cursor-pointer text-sm md:text-base"
          >
            Get a Sample Research Report
          </button>
          <button 
            onClick={() => setShowOrderReviewForm(true)}
            className="w-full sm:w-auto bg-[#f7931e] hover:opacity-90 text-white font-semibold py-2.5 md:py-3 px-5 md:px-6 rounded-md transition duration-300 cursor-pointer text-sm md:text-base"
          >
            Book an Expert Consultation
          </button>
        </div>
      </header>

      {/* Stats */}
      <div className="max-w-6xl mx-auto px-4 md:px-5 -mt-8 md:-mt-10 mb-12 md:mb-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          <div className="bg-white p-4 md:p-6 text-center rounded-xl shadow-lg">
            <h2 className="text-[#265ba3] text-2xl md:text-3xl font-bold">18,000+</h2>
            <p className="text-gray-600 text-xs md:text-base">Workforce Firms Tracked</p>
          </div>
          <div className="bg-white p-4 md:p-6 text-center rounded-xl shadow-lg">
            <h2 className="text-[#265ba3] text-2xl md:text-3xl font-bold">$700B+</h2>
            <p className="text-gray-600 text-xs md:text-base">Total Sector Coverage</p>
          </div>
          <div className="bg-white p-4 md:p-6 text-center rounded-xl shadow-lg">
            <h2 className="text-[#265ba3] text-2xl md:text-3xl font-bold">300+</h2>
            <p className="text-gray-600 text-xs md:text-base">Research Engagements</p>
          </div>
          <div className="bg-white p-4 md:p-6 text-center rounded-xl shadow-lg">
            <h2 className="text-[#265ba3] text-2xl md:text-3xl font-bold">96%</h2>
            <p className="text-gray-600 text-xs md:text-base">Repeat Client Rate</p>
          </div>
        </div>
      </div>

      {/* SEO Section */}
      <section className="py-12 md:py-16 px-4 md:px-5 bg-white border-t border-gray-100 border-b">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-[text-gray-900]">
            Workforce Sector Data Powering Smarter Investment Decisions
          </h2>
          <p className="max-w-4xl mx-auto text-gray-600 text-sm md:text-base">
            Demand10 delivers structured workforce sector research for strategy advisors, growth investors, and enterprise procurement teams. Our datasets support market sizing, vendor benchmarking, acquisition screening, and operational due diligence across the full spectrum of staffing and HR services companies.
          </p>
        </div>
      </section>

      {/* Staffing Industry Market Intelligence & Reports */}
      <section id="market-data" className="bg-white border-t border-b border-[#eee] py-12 md:py-16">
        <div className="max-w-[1000px] mx-auto px-4 md:px-5">
          <h2 className="text-center text-2xl md:text-[34px] mb-6 md:mb-[25px] text-[text-gray-900] font-bold">Workforce Sector Market Data & Research Reports</h2>

          <div className="bg-white p-4 md:p-[25px] rounded-[10px] my-6 md:my-[30px] shadow-[0_4px_12px_rgba(0,0,0,0.05)] overflow-x-auto">
            <div className="text-[text-gray-900] mb-3 md:mb-[15px] font-semibold text-base md:text-lg">Workforce Sector Revenue Expansion by Segment (2020-2024)</div>
            <div className="mermaid flex justify-center items-center min-h-[200px] overflow-x-auto">
{`graph LR
    A[2020: $450B] --> B[2021: $520B]
    B --> C[2022: $580B]
    C --> D[2023: $620B]
    D --> E[2024: $650B]
    
    subgraph "Market Composition 2024"
        F[Healthcare: 38%] --> G[IT/Tech: 25%]
        G --> H[Industrial: 22%]
        H --> I[Office/Admin: 15%]
    end`}
            </div>
          </div>

          <div className="border-2 border-[#265ba3] bg-[#eff6ff] p-4 md:p-5 rounded-[10px] my-5 md:my-[25px]">
            <h4 className="text-[#1e4a86] mb-2 md:mb-2.5 text-base md:text-lg font-semibold">Sector Spotlight: Clinical Workforce Services Lead Growth</h4>
            <p className="text-left m-0 text-sm md:text-base text-[#444]">Clinical and allied health workforce services account for the largest share of sector revenue, underpinned by persistent talent shortages and structural demand from an aging global population. This segment continues to attract premium valuations and consolidation activity.</p>
          </div>

          <h3 className="my-5 md:my-[25px_0_10px] text-[text-gray-900] text-xl md:text-2xl font-semibold">Workforce Sector Operating & Financial Benchmarks</h3>
          <div className="overflow-x-auto block my-4 md:my-5">
            <table className="w-full border-collapse table">
              <thead>
                <tr>
                  <th className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm bg-[#f8f9fc] text-[text-gray-900] font-semibold">Staffing Vertical</th>
                  <th className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm bg-[#f8f9fc] text-[text-gray-900] font-semibold">Avg. Gross Margin</th>
                  <th className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm bg-[#f8f9fc] text-[text-gray-900] font-semibold">Avg. EBITDA Margin</th>
                  <th className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm bg-[#f8f9fc] text-[text-gray-900] font-semibold">Revenue/Employee</th>
                  <th className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm bg-[#f8f9fc] text-[text-gray-900] font-semibold">Valuation Multiple (EBITDA)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">Healthcare Staffing</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">25-30%</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">12-15%</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">$250K-$350K</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">8-12x</td></tr>
                <tr><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">IT/Tech Staffing</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">20-25%</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">10-13%</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">$300K-$400K</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">7-10x</td></tr>
                <tr><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">Industrial Staffing</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">15-20%</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">6-9%</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">$150K-$200K</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">4-6x</td></tr>
                <tr><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">Office/Admin Staffing</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">18-22%</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">8-11%</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">$180K-$250K</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">5-7x</td></tr>
                <tr><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">Executive Search</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">35-40%</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">20-25%</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">$500K-$750K</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">10-15x</td></tr>
              </tbody>
            </table>
          </div>

          <div className="bg-white p-4 md:p-[25px] rounded-[10px] my-6 md:my-[30px] shadow-[0_4px_12px_rgba(0,0,0,0.05)] overflow-x-auto">
            <div className="text-[text-gray-900] mb-3 md:mb-[15px] font-semibold text-base md:text-lg">Staffing M&A Activity & Deal Multiples (2020-2024)</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {/* Healthcare Column */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-[#265ba3]"></div>
                  <h3 className="font-bold text-gray-800">Healthcare Staffing</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { year: '2020', val: 12 },
                    { year: '2021', val: 18 },
                    { year: '2022', val: 22 },
                    { year: '2023', val: 25 },
                    { year: '2024', val: 28 },
                  ].map((item) => (
                    <div key={item.year} className="relative">
                      <div className="flex justify-between text-sm mb-1 text-gray-600 relative z-10 font-medium">
                        <span>{item.year}</span>
                        <span>${item.val}M</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#265ba3] to-[#1e4a86] rounded-full" 
                          style={{ width: `${(item.val / 30) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* IT/Tech Column */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-[#3b82f6]"></div>
                  <h3 className="font-bold text-gray-800">IT/Tech Staffing</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { year: '2020', val: 8 },
                    { year: '2021', val: 12 },
                    { year: '2022', val: 15 },
                    { year: '2023', val: 18 },
                    { year: '2024', val: 20 },
                  ].map((item) => (
                    <div key={item.year} className="relative">
                      <div className="flex justify-between text-sm mb-1 text-gray-600 relative z-10 font-medium">
                        <span>{item.year}</span>
                        <span>${item.val}M</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#3b82f6] rounded-full" 
                          style={{ width: `${(item.val / 30) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Industrial Column */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-[#f7931e]"></div>
                  <h3 className="font-bold text-gray-800">Industrial Staffing</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { year: '2020', val: 5 },
                    { year: '2021', val: 7 },
                    { year: '2022', val: 9 },
                    { year: '2023', val: 10 },
                    { year: '2024', val: 11 },
                  ].map((item) => (
                    <div key={item.year} className="relative">
                      <div className="flex justify-between text-sm mb-1 text-gray-600 relative z-10 font-medium">
                        <span>{item.year}</span>
                        <span>${item.val}M</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#f7931e] rounded-full" 
                          style={{ width: `${(item.val / 30) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-sm md:text-base text-[#444] mt-3"><strong>Demand10 Insight:</strong> Clinical workforce sector transactions grew substantially from 2020–2024, with average deal values rising as PE platforms prioritized specialty niche providers over generalist staffing models.</p>
          </div>
        </div>
      </section>

      {/* Competitive Intelligence & Market Share Analysis */}
      <section className="bg-white border-t border-b border-[#eee] py-12 md:py-16">
        <div className="max-w-[1000px] mx-auto px-4 md:px-5">
          <h2 className="text-center text-2xl md:text-[34px] mb-6 md:mb-[25px] text-[text-gray-900] font-bold">Workforce Sector Competitive Landscape & Share Analysis</h2>

          <div className="bg-white p-4 md:p-[25px] rounded-[10px] my-6 md:my-[30px] shadow-[0_4px_12px_rgba(0,0,0,0.05)] overflow-x-auto">
            <div className="text-[text-gray-900] mb-3 md:mb-[15px] font-semibold text-base md:text-lg">Leading Workforce Firms by Global Revenue Share (2024)</div>
            <div className="mt-8 space-y-6">
              {/* Top 3 Leaders - Bento Style */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 {[
                   { name: "Adecco Group", share: 12, rank: 1 },
                   { name: "Randstad", share: 11, rank: 2 },
                   { name: "ManpowerGroup", share: 9, rank: 3 }
                 ].map(firm => (
                   <div key={firm.name} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                     <div className="w-12 h-12 rounded-full bg-[#dbeafe] text-[#265ba3] flex items-center justify-center font-bold text-lg mb-3">#{firm.rank}</div>
                     <h3 className="text-gray-900 font-bold text-lg mb-1">{firm.name}</h3>
                     <div className="text-3xl font-extrabold text-[#265ba3]">{firm.share}%</div>
                     <p className="text-xs text-gray-500 mt-1">Global Market Share</p>
                   </div>
                 ))}
              </div>

              {/* The Chase Pack - Compact Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                 {[
                   { name: "Allegis", share: 8 },
                   { name: "Kelly", share: 5 },
                   { name: "Robert Half", share: 4 },
                   { name: "Insperity", share: 3 },
                   { name: "Korn Ferry", share: 3 },
                   { name: "ASGN", share: 3 }
                 ].map(firm => (
                   <div key={firm.name} className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-center transition-colors hover:bg-gray-100">
                     <div className="text-gray-800 font-semibold text-xs md:text-sm truncate" title={firm.name}>{firm.name}</div>
                     <div className="text-[#3b82f6] font-bold text-base md:text-lg">{firm.share}%</div>
                   </div>
                 ))}
              </div>

              {/* The Fragmented Reality - Insight Banner */}
              <div className="bg-white rounded-xl p-6 md:p-8 border-2 border-[#f7931e]/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg relative overflow-hidden group">
                 {/* Decorative background element */}
                 <div className="absolute top-0 right-0 w-64 h-64 bg-[#f7931e]/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                 
                 <div className="relative z-10 flex-1">
                    <h4 className="text-lg md:text-2xl font-bold mb-3 flex items-center gap-3 text-gray-900">
                       <span className="bg-[#fff4e5] text-[#f7931e] p-2 rounded-lg text-xl">⚡</span> 
                       The Fragmented Opportunity
                    </h4>
                    <p className="text-gray-600 text-sm md:text-base max-w-xl leading-relaxed mb-6">
                      The remaining market is highly fragmented, with 5,000+ smaller firms accounting for the largest single share. This presents a massive consolidation opportunity for PE.
                    </p>
                    <button 
                      onClick={() => setShowOrderReviewForm(true)}
                      className="inline-flex items-center gap-2 bg-[#f7931e] hover:bg-[#e0851c] text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-200"
                    >
                      Explore Acquisition Targets
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </button>
                 </div>
                 
                 <div className="relative z-10 text-center min-w-[140px] bg-gray-50 border border-gray-100 p-6 rounded-xl shadow-inner">
                    <div className="text-4xl md:text-5xl font-extrabold text-[#f7931e] tracking-tight">42%</div>
                    <div className="text-gray-500 text-[10px] md:text-xs uppercase tracking-widest mt-2 font-bold">Other 5000+ Firms</div>
                 </div>
              </div>
            </div>
          </div>

          <h3 className="my-5 md:my-[25px_0_10px] text-[text-gray-900] text-xl md:text-2xl font-semibold">Geographic Concentration & Deal Flow by Region</h3>
          <div className="overflow-x-auto block my-4 md:my-5">
            <table className="w-full border-collapse table">
              <thead>
                <tr>
                  <th className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm bg-[#f8f9fc] text-[text-gray-900] font-semibold">Region</th>
                  <th className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm bg-[#f8f9fc] text-[text-gray-900] font-semibold">Top 3 Firms Market Share</th>
                  <th className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm bg-[#f8f9fc] text-[text-gray-900] font-semibold">Market Growth Rate (2024)</th>
                  <th className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm bg-[#f8f9fc] text-[text-gray-900] font-semibold">Avg. Deal Size</th>
                  <th className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm bg-[#f8f9fc] text-[text-gray-900] font-semibold">Notable Recent Transactions</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">North America</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">28%</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">8.2%</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">$85M</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">Korn Ferry acquires Salo LLC ($150M)</td></tr>
                <tr><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">Europe</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">35%</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">6.5%</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">$65M</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">Randstad acquires Ausy ($480M)</td></tr>
                <tr><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">Asia-Pacific</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">22%</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">11.8%</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">$45M</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">Recruit Holdings acquires Indeed Japan</td></tr>
                <tr><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">Latin America</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">18%</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">9.3%</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">$30M</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">Adecco acquires Vitae ($120M)</td></tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gradient-to-br from-[#f8f9fc] to-[#eef2f7] p-4 md:p-[25px] rounded-[10px] my-5 md:my-[25px]">
            <h3 className="text-[text-gray-900] mb-2 md:mb-2.5 text-lg md:text-xl font-semibold">Fragmentation Remains an Investor Opportunity</h3>
            <p className="text-left m-0 text-sm md:text-base text-[#444] leading-relaxed">Despite global expansion, the workforce sector remains highly fragmented at the mid-market level. The top firms collectively hold a minority of total market value, leaving substantial room for targeted acquisitions, regional consolidation plays, and specialty vertical build-outs.</p>
          </div>
        </div>
      </section>

      {/* Consulting & Private Equity Use Cases with Data */}
      <section id="use-cases" className="bg-[#f8f9fc] py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-4 md:px-5">
          <h2 className="text-center text-2xl md:text-[34px] mb-6 md:mb-[25px] text-[text-gray-900] font-bold">How Investors & Advisors Use Demand10 Data</h2>

          <div className="bg-white border-l-4 border-[#265ba3] p-4 md:p-5 my-4 md:my-5 rounded-lg">
            <h4 className="text-gray-900 mb-2 md:mb-2.5 text-lg md:text-xl font-semibold">Engagement Snapshot: Workforce Vendor Optimization for a Large Industrial Client</h4>
            <p className="text-left my-2 md:my-2.5 text-sm md:text-base text-[#444]"><strong>Business Challenge:</strong> A global logistics operator sought to rationalize its contingent labor program, which spanned multiple workforce providers and lacked unified performance benchmarks.</p>
            <p className="text-left my-2 md:my-2.5 text-sm md:text-base text-[#444]"><strong>Demand10 Data Delivered:</strong></p>
            <div className="overflow-x-auto block my-4 md:my-5">
              <table className="w-full border-collapse table">
                <thead>
                  <tr>
                    <th className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm bg-[#f8f9fc] text-[text-gray-900] font-semibold">Metric</th>
                    <th className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm bg-[#f8f9fc] text-[text-gray-900] font-semibold">Client Current</th>
                    <th className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm bg-[#f8f9fc] text-[text-gray-900] font-semibold">Market Benchmark</th>
                    <th className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm bg-[#f8f9fc] text-[text-gray-900] font-semibold">Optimization Opportunity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">Avg. Bill Rate Markup</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">42%</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">28-32%</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">10-14% reduction</td></tr>
                  <tr><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">Time-to-Fill (days)</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">21</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">14</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">7 days improvement</td></tr>
                  <tr><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">Fill Rate</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">78%</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">85%</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">7% improvement</td></tr>
                  <tr><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">Vendor Count</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">15</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">6-8 optimal</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">Consolidate 7-9 vendors</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-left my-2 md:my-2.5 text-sm md:text-base text-[#444]"><strong>Outcome:</strong> Workforce program restructuring delivered measurable cost improvements and improved time-to-productivity across critical operational roles.</p>
          </div>

          <div className="bg-white border-l-4 border-[#265ba3] p-4 md:p-5 my-4 md:my-5 rounded-lg">
            <h4 className="text-gray-900 mb-2 md:mb-2.5 text-lg md:text-xl font-semibold">Investment Evaluation: Specialty Healthcare Staffing Platform Acquisition</h4>
            <p className="text-left my-2 md:my-2.5 text-sm md:text-base text-[#444]"><strong>Target Profile:</strong> A clinician placement platform operating across multiple regional markets with a focus on travel nursing and allied health.</p>
            <p className="text-left my-2 md:my-2.5 text-sm md:text-base text-[#444]"><strong>Research Findings:</strong></p>
            <div className="bg-white p-4 md:p-6 rounded-xl my-6 shadow-sm border border-gray-100">
              <h5 className="text-gray-900 font-bold text-lg mb-6 border-b border-gray-100 pb-3">Target Company Performance vs. Market Benchmarks</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {[
                   { label: "Gross Margin", target: "26.5%", market: "25-30%", status: "neutral" },
                   { label: "EBITDA Margin", target: "13.2%", market: "12-15%", status: "neutral" },
                   { label: "Revenue Growth", target: "18.4%", market: "12-15%", status: "success" },
                   { label: "Client Retention", target: "92%", market: "85-90%", status: "success" }
                 ].map((metric, idx) => (
                   <div key={idx} className={`p-4 rounded-lg border ${metric.status === 'success' ? 'border-[#265ba3]/30 bg-[#eff6ff]' : 'border-gray-200 bg-gray-50'}`}>
                     <div className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">{metric.label}</div>
                     <div className="flex justify-between items-end">
                       <div>
                         <div className="text-sm text-gray-500 mb-1">Target</div>
                         <div className={`text-2xl font-bold ${metric.status === 'success' ? 'text-[#047857]' : 'text-gray-800'}`}>{metric.target}</div>
                       </div>
                       <div className="text-right">
                         <div className="text-sm text-gray-500 mb-1">Benchmark</div>
                         <div className="text-lg font-medium text-gray-600">{metric.market}</div>
                       </div>
                     </div>
                     {metric.status === 'success' && (
                       <div className="mt-3 text-xs font-bold text-[#059669] flex items-center gap-1">
                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                         Outperforms Market
                       </div>
                     )}
                   </div>
                 ))}
              </div>
            </div>
            <p className="text-left my-2 md:my-2.5 text-sm md:text-base text-[#444]"><strong>Research Value:</strong> Demand10 benchmarking validated the platform's above-market performance profile, supporting a compelling investment narrative and informed valuation approach.</p>
          </div>
        </div>
      </section>

      {/* Staffing Industry Vertical Deep Dives with Data */}
      <section className="bg-[#eef2f7] py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-4 md:px-5">
          <h2 className="text-center text-2xl md:text-[34px] mb-6 md:mb-[25px] text-[text-gray-900] font-bold">Segment-Level Research: Workforce Verticals Explored in Depth</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-[25px]">
            <div className="bg-white p-5 md:p-[25px] rounded-[14px] shadow-[0_5px_18px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:-translate-y-1">
              <h3 className="text-[#265ba3] mb-2 md:mb-2.5 text-xl md:text-[22px] font-semibold">Clinical & Healthcare Workforce</h3>
              <div className="mermaid my-4 flex justify-center items-center min-h-[200px] overflow-x-auto">
{`graph BT
    A[Travel Clinicians] --> B[High CAGR 2020-24]
    C[Allied Health] --> D[Sustained Demand]
    E[Physician Locums] --> F[Premium Segment]
    G[Home-Based Care] --> H[Fastest Growth]`}
              </div>
              <ul className="list-none my-4 p-0">
                <li className="mb-2 text-[#555] text-xs md:text-sm"><strong>Estimated Value:</strong> $250B+ globally (2024)</li>
                <li className="mb-2 text-[#555] text-xs md:text-sm"><strong>Annual Expansion:</strong> Mid-teens percentage growth</li>
                <li className="mb-2 text-[#555] text-xs md:text-sm"><strong>Regulatory Factor:</strong> Staffing ratio mandates in multiple jurisdictions</li>
                <li className="mb-2 text-[#555] text-xs md:text-sm"><strong>Tech Adoption:</strong> AI-assisted matching increasingly standard</li>
              </ul>
              <button onClick={() => setShowOrderReviewForm(true)} className="w-full block text-center mt-4 bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] text-white py-3 md:py-3.5 px-6 md:px-7 rounded-md font-semibold transition-opacity duration-300 hover:opacity-90 text-sm md:text-base cursor-pointer">Access Clinical Workforce Report</button>
            </div>
            
            <div className="bg-white p-5 md:p-[25px] rounded-[14px] shadow-[0_5px_18px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:-translate-y-1">
              <h3 className="text-[#265ba3] mb-2 md:mb-2.5 text-xl md:text-[22px] font-semibold">Technology & Digital Talent Workforce</h3>
              <div className="mermaid my-4 flex justify-center items-center min-h-[200px] overflow-x-auto">
{`graph LR
    A[Distributed Work] --> B[Majority of Placements]
    C[Talent Scarcity] --> D[Millions of Open Roles]
    E[AI Specialist Demand] --> F[Rapid Expansion]
    G[Cloud Expertise] --> H[Rate Premium Segment]`}
              </div>
              <ul className="list-none my-4 p-0">
                <li className="mb-2 text-[#555] text-xs md:text-sm"><strong>Estimated Value:</strong> $170B+ (2024)</li>
                <li className="mb-2 text-[#555] text-xs md:text-sm"><strong>Supply Gap:</strong> Significant unfilled technical roles globally</li>
                <li className="mb-2 text-[#555] text-xs md:text-sm"><strong>Work Flexibility:</strong> Majority of engagements are hybrid or remote</li>
                <li className="mb-2 text-[#555] text-xs md:text-sm"><strong>Specialist Premiums:</strong> Advanced AI and cloud roles carry outsized bill rates</li>
              </ul>
              <button onClick={() => setShowOrderReviewForm(true)} className="w-full block text-center mt-4 bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] text-white py-3 md:py-3.5 px-6 md:px-7 rounded-md font-semibold transition-opacity duration-300 hover:opacity-90 text-sm md:text-base cursor-pointer">Access Technology Workforce Report</button>
            </div>
            
            <div className="bg-white p-5 md:p-[25px] rounded-[14px] shadow-[0_5px_18px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:-translate-y-1">
              <h3 className="text-[#265ba3] mb-2 md:mb-2.5 text-xl md:text-[22px] font-semibold">Light Industrial & Operations Staffing</h3>
              <div className="mermaid my-4 flex justify-center items-center min-h-[200px] overflow-x-auto">
{`graph TD
    A[Process Automation] --> B[Reshaping Role Mix]
    C[Labor Cost Pressure] --> D[Rising Since 2020]
    E[Compliance Tech] --> F[Widely Deployed]
    G[Platform Models] --> H[Gaining Share]`}
              </div>
              <ul className="list-none my-4 p-0">
                <li className="mb-2 text-[#555] text-xs md:text-sm"><strong>Sector Value:</strong> $145B+ (2024)</li>
                <li className="mb-2 text-[#555] text-xs md:text-sm"><strong>Structural Shift:</strong> Automation changing required skill profiles</li>
                <li className="mb-2 text-[#555] text-xs md:text-sm"><strong>Wage Pressure:</strong> Sustained increases across light industrial roles</li>
                <li className="mb-2 text-[#555] text-xs md:text-sm"><strong>On-Demand Models:</strong> Growing platform-based fulfillment</li>
              </ul>
              <button onClick={() => setShowOrderReviewForm(true)} className="w-full block text-center mt-4 bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] text-white py-3 md:py-3.5 px-6 md:px-7 rounded-md font-semibold transition-opacity duration-300 hover:opacity-90 text-sm md:text-base cursor-pointer">Access Industrial Workforce Report</button>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Tiers for Consulting & PE Firms */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-4 md:px-5">
          <h2 className="text-center text-2xl md:text-[34px] mb-6 md:mb-[25px] text-[text-gray-900] font-bold">Research Access Plans for Advisory & Investment Teams</h2>
          <div className="overflow-x-auto block my-4 md:my-5">
            <table className="w-full border-collapse table">
              <thead>
                <tr>
                  <th className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm bg-[#f8f9fc] text-[text-gray-900] font-semibold">Feature</th>
                  <th className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm bg-[#f8f9fc] text-[text-gray-900] font-semibold">Analyst Tier</th>
                  <th className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm bg-[#f8f9fc] text-[text-gray-900] font-semibold">Partner Tier</th>
                  <th className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm bg-[#f8f9fc] text-[text-gray-900] font-semibold">Enterprise Tier</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">Market Reports</td>
                  <td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">5/year</td>
                  <td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">Unlimited</td>
                  <td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">Unlimited + Custom</td>
                </tr>
                <tr>
                  <td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">Data Analyst Support</td>
                  <td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">Email Only</td>
                  <td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">Dedicated Analyst</td>
                  <td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">Team of Analysts</td>
                </tr>
                <tr>
                  <td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">Excel Data Exports</td>
                  <td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">Limited</td>
                  <td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">Unlimited</td>
                  <td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">Unlimited + API</td>
                </tr>
                <tr>
                  <td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">PPT Template Access</td>
                  <td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">✓</td>
                  <td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">✓</td>
                  <td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">✓ + Custom Branding</td>
                </tr>
                <tr>
                  <td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">Due Diligence Packages</td>
                  <td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">1/year</td>
                  <td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">4/year</td>
                  <td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">Unlimited</td>
                </tr>
                <tr>
                  <td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">Quarterly Briefings</td>
                  <td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">—</td>
                  <td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">✓</td>
                  <td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">✓ + Executive Sessions</td>
                </tr>
                <tr>
                  <td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">Monthly Price</td>
                  <td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">$2,500</td>
                  <td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">$7,500</td>
                  <td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">Custom Quote</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gradient-to-br from-[#f8f9fc] to-[#eef2f7] p-4 md:p-[25px] rounded-[10px] my-5 md:my-[25px]">
            <h3 className="text-[text-gray-900] mb-2 md:mb-2.5 text-lg md:text-xl font-semibold">Research Efficiency & Return on Insight</h3>
            <p className="text-left m-0 text-sm md:text-base text-[#444] leading-relaxed"><strong>Documented Research Savings:</strong> Demand10 datasets reduce the time advisors spend on primary data collection, allowing teams to focus on analysis and client value rather than raw information gathering.</p>
          </div>
        </div>
      </section>

      {/* Data Methodology & Quality Assurance */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-4 md:px-5">
          <h2 className="text-center text-2xl md:text-[34px] mb-6 md:mb-[25px] text-[text-gray-900] font-bold">Research Standards & Data Integrity Framework</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-[25px]">
            <div className="bg-white p-5 md:p-[25px] rounded-[14px] shadow-[0_5px_18px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:-translate-y-1">
              <h3 className="text-[#265ba3] mb-2 md:mb-2.5 text-xl md:text-[22px] font-semibold">How We Gather Market Intelligence</h3>
              <div className="overflow-x-auto block my-4 md:my-5">
                <table className="w-full border-collapse table">
                  <thead>
                    <tr>
                      <th className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm bg-[#f8f9fc] text-[text-gray-900] font-semibold">Source</th>
                      <th className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm bg-[#f8f9fc] text-[text-gray-900] font-semibold">Coverage</th>
                      <th className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm bg-[#f8f9fc] text-[text-gray-900] font-semibold">Update Frequency</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">Executive Interviews</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">200+ annually</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">Quarterly</td></tr>
                    <tr><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">Industry Surveys</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">5,000+ responses</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">Semi-annual</td></tr>
                    <tr><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">Financial Filings</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">15,000+ companies</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">Real-time</td></tr>
                    <tr><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">Regulatory Databases</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">50+ countries</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">Monthly</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="bg-white p-5 md:p-[25px] rounded-[14px] shadow-[0_5px_18px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:-translate-y-1">
              <h3 className="text-[#265ba3] mb-2 md:mb-2.5 text-xl md:text-[22px] font-semibold">Our Data Quality Standards</h3>
              <div className="overflow-x-auto block my-4 md:my-5">
                <table className="w-full border-collapse table">
                  <thead>
                    <tr>
                      <th className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm bg-[#f8f9fc] text-[text-gray-900] font-semibold">Metric</th>
                      <th className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm bg-[#f8f9fc] text-[text-gray-900] font-semibold">Target</th>
                      <th className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm bg-[#f8f9fc] text-[text-gray-900] font-semibold">Current</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">Data Accuracy</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">&gt;95%</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">97.3%</td></tr>
                    <tr><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">Update Timeliness</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">&lt;30 days</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">22 days avg.</td></tr>
                    <tr><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">Coverage Completeness</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">&gt;90%</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">92.8%</td></tr>
                    <tr><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">Client Satisfaction</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">&gt;90%</td><td className="border border-[#ddd] p-2 md:p-3 text-left text-xs md:text-sm">94.2%</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-5 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-3xl font-bold mb-10 text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <details className="group bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-200 cursor-pointer">
              <summary className="flex justify-between items-center font-semibold text-lg text-gray-800 list-none">
                What is staffing industry intelligence?
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
                Staffing industry intelligence provides comprehensive market data, competitive analysis, and due diligence insights on staffing firms across healthcare, IT, and industrial sectors. It helps consulting firms and PE investors make informed decisions about M&A, market entry, and portfolio optimization.
              </p>
            </details>

            <details className="group bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-200 cursor-pointer">
              <summary className="flex justify-between items-center font-semibold text-lg text-gray-800 list-none">
                Who uses staffing industry market data?
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
                Management consulting firms, private equity investors, corporate strategy teams, and investment banks use staffing industry data for M&A research, market sizing, competitive benchmarking, and due diligence on staffing companies.
              </p>
            </details>

            <details className="group bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-200 cursor-pointer">
              <summary className="flex justify-between items-center font-semibold text-lg text-gray-800 list-none">
                What data is included in staffing industry reports?
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
                Reports include staffing company profiles, revenue and employee data, market share analysis, technology adoption, M&A activity, vertical specialization (healthcare, IT, industrial), geographic coverage, and competitive positioning.
              </p>
            </details>

            <details className="group bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-200 cursor-pointer">
              <summary className="flex justify-between items-center font-semibold text-lg text-gray-800 list-none">
                How is staffing industry data verified?
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
                Data is verified through multi-source aggregation, public records, business registries, manual validation, and continuous refresh cycles to ensure research-grade accuracy for strategic decision-making.
              </p>
            </details>

            <details className="group bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-200 cursor-pointer">
              <summary className="flex justify-between items-center font-semibold text-lg text-gray-800 list-none">
                Can I get custom staffing industry research?
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
                Yes, Demand10 provides custom CSV datasets and PDF research reports tailored to specific staffing verticals, geographies, or company segments. Contact our research team to discuss your requirements.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Order Review Form Modal */}
      {showOrderReviewForm && (
        <OrderDataReviewForm onClose={() => setShowOrderReviewForm(false)} />
      )}
    </div>
  );
};

export default StaffingIndustryPage;
