// Global metadata fallback
export const metadata = {
  metadataBase: new URL('https://rankb2b.com'),
  title: {
    default: 'RankB2B - Top MSP & MSSP Database Platform',
    template: '%s | RankB2B',
  },
  description:
    "Discover top Managed Service Providers & MSSPs with RankB2B's 95% accurate B2B data. Connect with 10K+ suppliers in 500+ categories.",
  keywords: ['MSP', 'MSSP', 'Managed Service Provider', 'B2B data', 'RankB2B', 'IT services'],
  authors: [{ name: 'RankB2B Team' }],
  creator: 'RankB2B',
  publisher: 'RankB2B',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rankb2b.com',
    siteName: 'RankB2B',
    title: 'RankB2B - Top MSP & MSSP Database Platform',
    description: "Discover top Managed Service Providers & MSSPs with RankB2B's 95% accurate B2B data.",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RankB2B - Top MSP & MSSP Database Platform',
    description: "Discover top Managed Service Providers & MSSPs with RankB2B's 95% accurate B2B data.",
    site: '@rankb2b',
  },
};

import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import LayoutWrapper from "@/Componenets/ui/LayoutWrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NextTopLoader from 'nextjs-toploader';

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "RankB2B",
  "url": "https://rankb2b.com",
  "description": "Discover top Managed Service Providers & MSSPs with RankB2B's 95% accurate B2B data.",
  "publisher": {
    "@type": "Organization",
    "name": "RankB2B",
    "logo": { "@type": "ImageObject" }
  }
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      
        <NextTopLoader
         color="#0F1B3D"
          height={3}
          showSpinner={false}
          crawlSpeed={200}
        />
        <ToastContainer 
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          style={{
            '--toastify-color-info': '#EF4444',
            '--toastify-color-success': '#EF4444',
            '--toastify-color-warning': '#EF4444',
            '--toastify-color-error': '#EF4444',
          }}
        />
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}