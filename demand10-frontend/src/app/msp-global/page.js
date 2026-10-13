import MSPPage from '@/Componenets/MspPage/Msp'
import React from 'react'
import Script from 'next/script'

// Streamlined metadata for Google policy compliance
export const metadata = {
  title: "Top Managed Service Providers 2025 | Find Best MSPs",
  description:
    "Discover the best managed service providers and managed security service providers for your business. Compare top-rated MSPs & MSSPs offering IT support, cybersecurity, and cloud services. Find verified MSPs and MSSPs with our comprehensive directory.",
  keywords: [
    "managed service provider",
    "managed security service provider",
    "MSP",
    "MSSP",
    "IT support services",
    "cybersecurity outsourcing",
    "cloud service provider",
    "best managed service providers",
    "top managed security providers",
    "IT managed services",
    "managed IT services",
    "top MSP",
    "best MSSP",
    "IT service provider",
    "cybersecurity services",
    "business technology partners",
    "managed IT support",
    "network security services",
    "data backup and recovery",
    "cloud computing services",
    "IT consulting services",
    "24/7 IT support",
    "compliance management",
    "penetration testing",
    "SOC monitoring",
    "business continuity services"
  ],
  metadataBase: new URL("https://demand10.com"),
  alternates: {
    canonical: "/msp-global",
  },
  openGraph: {
    title: "Top Managed Service Providers 2025 | Find Best MSPs",
    description:
      "Discover the best managed service providers and managed security service providers for your business. Compare top-rated MSPs & MSSPs offering IT support, cybersecurity, and cloud services. Find verified MSPs and MSSPs with our comprehensive directory.",
    url: "https://demand10.com/msp-global",
    siteName: "Demand10",
   
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Top Managed Service Providers 2025 | Find Best MSPs",
    description:
      "Discover the best managed service providers and managed security service providers for your business. Compare top-rated MSPs & MSSPs offering IT support, cybersecurity, and cloud services. Find verified MSPs and MSSPs with our comprehensive directory.",
   
    site: "@demand10",
  },
};

const Page = () => {
  return (
    <>
      <Script
        id="msp-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Top Managed Service Providers 2025 | Find Best MSPs",
            "description": "Discover the best managed service providers and managed security service providers for your business. Compare top-rated MSPs & MSSPs offering IT support, cybersecurity, and cloud services. Find verified MSPs and MSSPs with our comprehensive directory.",
            "url": "https://demand10.com/msp-global",
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [{
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://demand10.com/"
              },{
                "@type": "ListItem",
                "position": 2,
                "name": "Managed Service Providers",
                "item": "https://demand10.com/msp-global"
              }]
            },
            "mainEntity": {
              "@type": "Service",
              "serviceType": "Managed Service Provider",
              "provider": {
                "@type": "Organization",
                "name": "Demand10",
                "url": "https://demand10.com"
              },
              "areaServed": "Global",
              "category": ["IT Services", "Cybersecurity", "Cloud Services", "Network Security", "Data Backup and Recovery"],
              "keywords": "managed service provider, managed security service provider, MSP, MSSP, IT support services, cybersecurity outsourcing, cloud service provider, IT managed services, managed IT services, 24/7 IT support, compliance management, penetration testing, SOC monitoring"
            },
            "about": {
              "@type": "Service",
              "name": "Managed Security Service Provider",
              "serviceType": "Cybersecurity Services"
            }
          })
        }}
      />
      <MSPPage />
    </>
  );
};

export default Page;