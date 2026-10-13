import JobHeroSection from "@/Componenets/Home/HeroSection";
import { fetchCategories, fetchHomepageCompanies } from "@/services/api";
import ResetPasswordForm from "@/Componenets/ui/ResetPasswordForm";
import Testimonials from "@/Componenets/Home/Testimonials";
import ListProduct from "@/Componenets/Home/ListProduct";
import SoftwareCategories from "@/Componenets/Home/Categories";
import ReviewSection from "@/Componenets/Home/ClientReviews";
import GartnerReviews from "@/Componenets/Home/GartnerReviews";

export const metadata = {
  title: "Top Managed Service Providers & Security Solutions 2025",
  description:
    "Connect with premier Managed Service Providers and Security Service Providers delivering enterprise-grade IT infrastructure, cybersecurity, and cloud solutions. Access our verified database of industry leaders.",
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
    "B2B companies",
    "company directory",
    "verified vendors"
  ],
  metadataBase: new URL("https://demand10.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Top Managed Service Providers & Security Solutions 2025",
    description:
      "Access our curated database of top-tier Managed Service Providers and Security Service Providers with Demand10's verified B2B intelligence. Connect with 10K+ vetted suppliers across 500+ specialized categories.",
    url: "https://demand10.com/",
    siteName: "Demand10",
  
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Top Managed Service Providers & Security Solutions 2025",
    description:
      "Connect with premier Managed Service Providers and Security Service Providers delivering enterprise-grade IT infrastructure, cybersecurity, and cloud solutions. Access our verified database of industry leaders.",
    site: "@demand10",
  },
};

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const resetToken = params["reset-token"];

  // Fetch categories and homepage companies data
  const [categories, homepageCompanies] = await Promise.all([
    fetchCategories(),
    fetchHomepageCompanies()
    
  ]);

  return (
    <main>
      {resetToken ? (
        <ResetPasswordForm token={resetToken} />
      ) : (
        <>
          <JobHeroSection homepageCompanies={homepageCompanies} />
          <SoftwareCategories categories={categories} />
          <ListProduct />
          
          
       
             <GartnerReviews/>
          <ReviewSection/>
          <Testimonials />
        </>
      )}
    </main>
  );
}