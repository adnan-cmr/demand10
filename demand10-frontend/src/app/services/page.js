import DataSolutionsWebsite from "@/Componenets/ServiceCom";

export const metadata = {
  title: "Demand10 Services – B2B Data Solutions & MSP Databases",
  description:
    "Explore Demand10's services offering verified B2B data solutions, MSP databases, and lead generation tools to connect with key decision-makers.",
  keywords: [
    "B2B data solutions",
    "MSP databases",
    "lead generation tools",
    "Demand10 services",
    "verified business data"
  ],
  metadataBase: new URL("https://demand10.com"),
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Demand10 Services – B2B Data Solutions & MSP Databases",
    description:
      "Explore Demand10's services offering verified B2B data solutions, MSP databases, and lead generation tools to connect with key decision-makers.",
    url: "https://demand10.com/services",
    siteName: "Demand10",
   
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Demand10 Services – B2B Data Solutions & MSP Databases",
    description:
      "Explore Demand10's services offering verified B2B data solutions, MSP databases, and lead generation tools to connect with key decision-makers.",
    site: "@demand10",
  },
};

const Page = () => {
  return (
    <div>
      <DataSolutionsWebsite/>
    </div>
  );
};

export default Page;