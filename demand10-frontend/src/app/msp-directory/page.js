import React from "react";
import Script from "next/script";
import MspDirectoryPage from "@/Componenets/msp-directory";

export const metadata = {
  title: "MSP Directory | Verified IT Service Provider Database | Demand10",
  description:
    "Explore Demand10's structured database of verified managed IT service providers, cloud solution partners, and managed security firms worldwide. Research-grade intelligence for strategy consultants, private equity investors, and enterprise procurement teams.",
  keywords: [
    "MSP directory",
    "managed service provider database",
    "managed IT service providers",

  ],
  authors: [{ name: "Demand10" }],
  openGraph: {
    title: "MSP Directory | Global IT Provider Intelligence | Demand10",
    description:
      "Access Demand10's verified database of managed IT service providers, cloud partners, and cybersecurity firms across 60+ countries. Built for investment and strategy teams.",
    url: "https://demand10.com/msp-directory",
    siteName: "Demand10",
    type: "website",
    images: [
      {
        url: "https://demand10.com/og-msp-directory.jpg",
        width: 1200,
        height: 630,
        alt: "Demand10 MSP Directory - Global IT Service Provider Database",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MSP Directory | Global IT Provider Intelligence | Demand10",
    description:
      "Structured database of verified managed IT service providers worldwide. Research-grade intelligence for consultants, investors, and enterprise teams — by Demand10.",
    images: ["https://demand10.com/twitter-msp-directory.jpg"],
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
  alternates: {
    canonical: "https://demand10.com/msp-directory",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the Demand10 MSP Directory?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Demand10 MSP Directory is a structured database of verified managed IT service providers, cloud solution partners, and managed security firms operating globally. It is designed to help enterprises, investors, and advisory teams identify and evaluate IT service providers based on size, specialization, and geography.",
      },
    },
    {
      "@type": "Question",
      name: "How is the MSP data verified?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Each record in the Demand10 database is built through a structured research process combining public business registries, company websites, professional networks, and analyst review. Entries are cross-referenced across multiple sources and refreshed on a rolling basis to maintain accuracy.",
      },
    },
    {
      "@type": "Question",
      name: "Can I export the MSP dataset from Demand10?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Demand10 delivers data in structured CSV format and professionally formatted PDF reports. You can submit a data request through our form and our team will prepare a tailored export based on your specific filters and scope.",
      },
    },
    {
      "@type": "Question",
      name: "Who uses the Demand10 MSP database?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Demand10 research is used by strategy consultants, growth equity and private equity investors, corporate development teams, and enterprise procurement functions evaluating IT provider landscapes for sourcing, investment, or competitive analysis purposes.",
      },
    },
    {
      "@type": "Question",
      name: "How frequently is the Demand10 directory refreshed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Demand10 research team conducts ongoing updates to track new market entrants, ownership changes, technology stack shifts, and M&A events within the managed services sector, ensuring the data reflects current market conditions.",
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
        <MspDirectoryPage />
      </div>
    </>
  );
};

export default Page;
