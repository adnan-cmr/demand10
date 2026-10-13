import FaqCom from "@/Componenets/FaqComponent";

export const metadata = {
  title: "Frequently Asked Questions – MSP & MSSP Solutions",
  description:
    "Get answers to common questions about Managed Service Providers, Managed Security Service Providers, and how Demand10 connects businesses with top-tier technology partners.",
  keywords: [
    "MSP FAQ",
    "MSSP solutions",
    "Managed Service Providers",
    "Managed Security Service Providers",
    "IT outsourcing",
    "cybersecurity services",
    "cloud infrastructure",
    "technology partnerships",
    "business IT solutions"
  ],
  metadataBase: new URL("https://demand10.com"),
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "Frequently Asked Questions – MSP & MSSP Solutions",
    description:
      "Get answers to common questions about Managed Service Providers, Managed Security Service Providers, and how Demand10 connects businesses with top-tier technology partners.",
    url: "https://demand10.com/faq",
    siteName: "Demand10",
    
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Frequently Asked Questions – MSP & MSSP Solutions",
    description:
      "Get answers to common questions about Managed Service Providers, Managed Security Service Providers, and how Demand10 connects businesses with top-tier technology partners.",
    site: "@demand10",
  },
};

const Page = () => {
  return (
    <div>
      <FaqCom/>
    </div>
  )
}

export default Page