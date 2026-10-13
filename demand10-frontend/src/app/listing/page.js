import React from 'react';
import ListingPage from '@/Componenets/listingcomponents/ListingPage';
import { checkUserAuth } from '@/services/userApi';

export const metadata = {
  title: "List Your Company | Demand10 Business Directory",
  description:
    "Add your business to Demand10 trusted directory of service providers. Reach more customers and grow your business by listing your company with us.",
  keywords: [
    "business directory",
    "company listing",
    "service providers",
    "business growth",
    "customer acquisition",
    "verified providers",
    "B2B directory",
    "company profile"
  ],
  metadataBase: new URL("https://demand10.com"),
  alternates: {
    canonical: "/listing",
  },
  openGraph: {
    title: "List Your Company | Demand10 Business Directory",
    description:
      "Add your business to Demand10 trusted directory of service providers. Reach more customers and grow your business by listing your company with us.",
    url: "https://demand10.com/listing",
    siteName: "Demand10",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "List Your Company | Demand10 Business Directory",
    description:
      "Add your business to Demand10 trusted directory of service providers. Reach more customers and grow your business by listing your company with us.",
    site: "@demand10",
  },
};

// Server-side function to check user authentication
async function getUserData() {
  try {
    const data = await checkUserAuth();
    return data.ok ? data.user : null;
  } catch (error) {
    console.error('Authentication check failed:', error);
    return null;
  }
}

export default async function CompanyListing() {
  // Fetch user data on the server side
  const user = await getUserData();
  
  // Pass the user data as a prop to the client component
  return (
    <div>
      <ListingPage 
        initialUser={user}
      />
    </div>
  );
}