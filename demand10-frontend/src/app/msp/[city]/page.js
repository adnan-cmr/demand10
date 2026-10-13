import React from 'react';
import Script from 'next/script';
import CityMspPageComponent from '@/Componenets/citypages/CityMspPage';
import cityMspContent from '@/data/cityMspContent.json';
import Link from 'next/link';

// Generate metadata for each city MSP page
export async function generateMetadata({ params }) {
  let { city } = await params;
  
  // Get city data from our content file
  const cityData = cityMspContent[city];
  
  // If city data doesn't exist, return 404-like metadata
  if (!cityData) {
    return {
      title: "City Not Found | Demand10",
      description: "The requested city page for managed service providers could not be found. Explore our network of trusted MSPs in major cities."
    };
  }
  
  const title = cityData.pageTitle || `Top Managed Service Providers in ${city.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} | Demand10`;
  const description = cityData.pageDescription || `Discover the best managed IT service providers, cybersecurity experts, and cloud solutions in ${city.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}. Connect with verified local MSPs for your business needs.`;
  
  const formattedCity = city.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return {
    title,
    description,
    keywords: cityData.keywords ? cityData.keywords.split(', ') : [
      `managed service providers ${formattedCity}`,
      `MSP ${formattedCity}`,
      `IT services ${formattedCity}`,
      `cybersecurity ${formattedCity}`,
      `cloud services ${formattedCity}`,
      `network security ${formattedCity}`,
      `data backup ${formattedCity}`,
      `IT support ${formattedCity}`,
      `managed IT ${formattedCity}`,
      `business technology ${formattedCity}`,
      `tech solutions ${formattedCity}`,
      `digital infrastructure ${formattedCity}`,
      `IT consulting ${formattedCity}`,
      `software services ${formattedCity}`,
      `data protection ${formattedCity}`
    ],
    metadataBase: new URL("https://demand10.com"),
    alternates: {
      canonical: `/msp/${city}`,
    },
    openGraph: {
      title,
      description,
      url: `https://demand10.com/msp/${city}`,
      siteName: "Demand10",
     
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: "@demand10",
    },
  };
}

const CityMspPage = async ({ params }) => {
  let { city } = await params;
  
  // Get city data from our content file
  const cityData = cityMspContent[city];
  
  // If city data doesn't exist, show a 404-like message
  if (!cityData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-2xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">City Not Found</h1>
          <p className="text-gray-600 mb-6">
            Sorry, we couldn&apos;t find the page for &quot;{city}&quot;. Please check the URL or visit our homepage to see available cities.
          </p>
          <Link
            href="/" 
            className="px-6 py-3 bg-[#265ba3] text-white font-medium rounded-lg hover:bg-[#1e4a86] transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }
  
  const formattedCity = city.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  // Generate structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `Managed Service Providers in ${formattedCity} | Demand10`,
    "description": `Discover the best managed IT service providers, cybersecurity experts, and cloud solutions in ${formattedCity}. Connect with verified local MSPs for your business needs.`,
    "url": `https://demand10.com/msp/${city}`,
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
        "item": "https://demand10.com/msp"
      },{
        "@type": "ListItem",
        "position": 3,
        "name": formattedCity,
        "item": `https://demand10.com/msp/${city}`
      }]
    },
    "mainEntity": {
      "@type": "Service",
      "serviceType": "Managed IT Services",
      "provider": {
        "@type": "Organization",
        "name": "Demand10",
        "url": "https://demand10.com"
      },
      "areaServed": {
        "@type": "Place",
        "name": formattedCity
      },
      "category": [
        "IT Services", 
        "Cybersecurity", 
        "Cloud Services", 
        "Network Security", 
        "Data Backup and Recovery",
        "Managed IT Support",
        "Business Technology Solutions",
        "Digital Infrastructure"
      ],
      "keywords": [
        `managed service providers ${formattedCity}`,
        `MSP ${formattedCity}`,
        `IT services ${formattedCity}`,
        `cybersecurity ${formattedCity}`,
        `cloud services ${formattedCity}`,
        `network security ${formattedCity}`,
        `data backup ${formattedCity}`,
        `IT support ${formattedCity}`,
        `managed IT ${formattedCity}`,
        `business technology ${formattedCity}`,
        `tech solutions ${formattedCity}`,
        `digital infrastructure ${formattedCity}`,
        `IT consulting ${formattedCity}`,
        `software services ${formattedCity}`,
        `data protection ${formattedCity}`
      ]
    },
    "about": {
      "@type": "Service",
      "name": `Managed IT Services in ${formattedCity}`,
      "serviceType": "IT Services"
    }
  };

  return (
    <>
      <Script
        id={`${city}-msp-structured-data`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      <CityMspPageComponent city={city} cityData={cityData} />
    </>
  );
};

export default CityMspPage;