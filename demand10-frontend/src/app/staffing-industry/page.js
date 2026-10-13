import React from "react";
import Script from "next/script";
import StaffingIndustryPage from "@/Componenets/staffing-industry";

export const metadata = {
  title: "Staffing Industry Research & Workforce Sector Intelligence | Demand10",
  description:
    "Demand10 delivers structured workforce sector research for strategy advisors, private equity investors, and enterprise teams. Access verified data on healthcare staffing, tech talent, industrial workforce, and HR services companies.",
  keywords: [
    "staffing industry research",
    "workforce sector intelligence",
    "staffing market data",
    "staffing M&A research",

  ],
  metadataBase: new URL("https://demand10.com"),
  alternates: {
    canonical: "/staffing-industry",
  },
  openGraph: {
    title: "Staffing Industry Research & Workforce Sector Intelligence | Demand10",
    description:
      "Access Demand10's structured workforce sector datasets covering healthcare staffing, tech talent markets, and industrial HR services. Built for strategy consultants, PE investors, and corporate development teams.",
    url: "https://demand10.com/staffing-industry",
    siteName: "Demand10",
    type: "website",
    images: [
      {
        url: "https://demand10.com/og-staffing-industry.jpg",
        width: 1200,
        height: 630,
        alt: "Demand10 Staffing Industry Research - Workforce Sector Intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Staffing Industry Research & Workforce Sector Intelligence | Demand10",
    description:
      "Structured workforce sector research for investors, strategy consultants, and enterprise teams. Verified staffing market data delivered by Demand10.",
    site: "@demand10",
    images: ["https://demand10.com/twitter-staffing-industry.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  authors: [{ name: "Demand10" }],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is staffing industry research from Demand10?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Demand10 staffing industry research provides structured market data, competitive landscape analysis, and due diligence intelligence covering staffing and workforce services companies across healthcare, technology, and industrial verticals. It supports investment screening, market entry evaluation, and M&A decision-making.",
      },
    },
    {
      "@type": "Question",
      name: "Who uses Demand10's staffing market data?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Strategy consultants, private equity investors, corporate development teams, and investment advisory professionals use Demand10 staffing data for market sizing, peer benchmarking, acquisition screening, and operational due diligence on workforce services companies.",
      },
    },
    {
      "@type": "Question",
      name: "What is included in Demand10's staffing industry reports?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Demand10 reports include staffing company profiles, firmographic data, revenue and headcount benchmarks, vertical specialization mapping across healthcare, IT, and industrial sectors, geographic footprint analysis, ownership and M&A history, and competitive positioning insights.",
      },
    },
    {
      "@type": "Question",
      name: "How does Demand10 verify its staffing industry data?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Demand10 builds each dataset through a multi-source research process combining public business registries, regulatory filings, company disclosures, and analyst review. Records are cross-validated across sources and maintained on a rolling refresh schedule to ensure accuracy for strategic applications.",
      },
    },
    {
      "@type": "Question",
      name: "Can I request custom staffing research from Demand10?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Demand10 provides custom CSV datasets and formatted PDF research reports scoped to specific staffing verticals, geographies, company size ranges, or ownership profiles. Contact our research team to discuss your requirements and we will prepare a tailored proposal.",
      },
    },
  ],
};

const Page = () => {
  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div>
        <StaffingIndustryPage />
      </div>
    </>
  );
};

export default Page;
