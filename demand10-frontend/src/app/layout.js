export const dynamic = 'force-dynamic';

// Global metadata fallback
export const metadata = {
  metadataBase: new URL('https://demand10.com'),
  title: {
    default: 'Demand10 - Top MSP & MSSP Database Platform',
    template: '%s | Demand10'
  },
  description: 'Discover top Managed Service Providers & MSSPs with Demand10\'s 95% accurate B2B data. Connect with 10K+ suppliers in 500+ categories.',
  keywords: ['MSP', 'MSSP', 'Managed Service Provider', 'B2B data', 'Demand10', 'IT services'],
  authors: [{ name: 'Demand10 Team' }],
  creator: 'Demand10',
  publisher: 'Demand10',
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
    url: 'https://demand10.com',
    siteName: 'Demand10',
    title: 'Demand10 - Top MSP & MSSP Database Platform',
    description: 'Discover top Managed Service Providers & MSSPs with Demand10\'s 95% accurate B2B data.',
   
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Demand10 - Top MSP & MSSP Database Platform',
    description: 'Discover top Managed Service Providers & MSSPs with Demand10\'s 95% accurate B2B data.',
    site: '@demand10',
  },
};

import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import LayoutWrapper from "@/Componenets/ui/LayoutWrapper";
import { fetchCategories } from "@/services/api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NextTopLoader from 'nextjs-toploader';

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Demand10",
  "url": "https://demand10.com",
  "description": "Discover top Managed Service Providers & MSSPs with Demand10's 95% accurate B2B data. Connect with 10K+ suppliers in 500+ categories.",
  "publisher": {
    "@type": "Organization",
    "name": "Demand10",
    "logo": {
      "@type": "ImageObject",
    }
  }
};

export default async function RootLayout({ children }) {
  const categories = await fetchCategories();

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
         color="#1a365d"
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
            '--toastify-color-info': '#4897de',
            '--toastify-color-success': '#4897de',
            '--toastify-color-warning': '#4897de',
            '--toastify-color-error': '#4897de',
          }}
        />
        <LayoutWrapper categories={categories}>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}