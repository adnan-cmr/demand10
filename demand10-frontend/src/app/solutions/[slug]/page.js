import SubCategoryDetailPage from "@/Componenets/SubcategoryDetail/Detail";
import { fetchSubcategoryDetails } from "@/services/api";

// ✅ SEO Metadata Generation
export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  try {
    const subcategory = await fetchSubcategoryDetails(slug);
    
    if (!subcategory || !subcategory.name) {
      return {
        title: "Solution Not Found | Demand10",
        description: "No solution details found for this category.",
      };
    }
    
    const name = subcategory.name;
    const category = subcategory.categoryName || "Technology Solutions";
    const baseDescription = subcategory.description?.replace(/\n/g, " ") || "";
    
    // TITLE: limit to 55 chars
    let title = `${name} Solutions – ${category}`;
    if (title.length < 45) {
      title += " | Demand10";
    }
    if (title.length > 55) {
      title = title.slice(0, 52) + "...";
    }
    
    // DESCRIPTION: limit to 155 chars
    let description = baseDescription;
    if (description.length < 120) {
      description += ` Explore detailed ${category.toLowerCase()} solutions and service providers.`;
    }
    if (description.length > 155) {
      description = description.slice(0, 152) + "...";
    }
    
    return {
      title,
      description,
      keywords: [
        name,
        category,
        "Demand10",
        "technology solutions",
        "service providers",
        "IT solutions",
        "managed services",
        "business solutions",
      ],
      alternates: {
        canonical: `https://demand10.com/solutions/${slug}`,
      },
      openGraph: {
        title,
        description,
        url: `https://demand10.com/solutions/${slug}`,
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
  } catch (error) {
    console.error("Error generating metadata for solutions:", error);
    return {
      title: "Error | Demand10 Solutions",
      description: "An error occurred while fetching solution details.",
    };
  }
}

export default async function SolutionsDetailPage({ params }) {
  const { slug } = await params;
  
  try {
    const subcategory = await fetchSubcategoryDetails(slug);
    
    if (!subcategory) {
      return (
        <main className="container mx-auto py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Solution Not Found
            </h1>
            <p className="text-gray-600">
              The requested solution details could not be found.
            </p>
          </div>
        </main>
      );
    }

    return (
      <main className="container mx-auto">
        <SubCategoryDetailPage subcategory={subcategory} />
      </main>
    );
  } catch (error) {
    console.error("Error loading solution details:", error);
    return (
      <main className="container mx-auto py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Solution
          </h1>
          <p className="text-gray-600">
            We couldn&apos;t load the solution details. Please try again later.
          </p>
        </div>
      </main>
    );
  }
}
