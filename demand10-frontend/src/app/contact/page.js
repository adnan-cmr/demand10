import ContactPage from "@/Componenets/ContactPage";
export const metadata = {
  title: "Contact Demand10 – Get in Touch with Our Technology Experts",
  description:
    "Connect with Demand10 for inquiries, support, or partnerships. Our team of MSP and MSSP specialists is ready to help you with your business technology solutions and growth strategies.",
  keywords: [
    "Contact Demand10",
    "MSP solutions contact",
    "MSSP services inquiry",
    "business technology support",
    "IT solutions partnership"
  ],
  metadataBase: new URL("https://demand10.com"),
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Demand10 – Get in Touch with Our Technology Experts",
    description:
      "Connect with Demand10 for inquiries, support, or partnerships. Our team of MSP and MSSP specialists is ready to help you with your business technology solutions and growth strategies.",
    url: "https://demand10.com/contact",
    siteName: "Demand10",
    
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Demand10 – Get in Touch with Our Technology Experts",
    description:
      "Connect with Demand10 for inquiries, support, or partnerships. Our team of MSP and MSSP specialists is ready to help you with your business technology solutions.",
    site: "@demand10",
  },
};
const Page = () => {
  return (
    <div>
     <ContactPage/>
    </div>
  );
};

export default Page;