import { fetchCategories } from "@/services/api";

export const dynamic = "force-dynamic";

// Helper function to format dates consistently for sitemaps
function formatSitemapDate(date) {
  try {
    // Handle various date input formats
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      throw new Error('Invalid date');
    }
    return dateObj.toISOString();
  } catch (error) {
    console.error('❌ Error formatting date for sitemap:', error);
    // Fallback to current date
    return new Date().toISOString();
  }
}

export async function GET() {
  const baseUrl = "https://demand10.com";
  
  // Use consistent date formatting
  const currentDate = formatSitemapDate(new Date());

  let categories = [];
  try {
    categories = await fetchCategories();
    
  } catch (err) {
    console.error("❌ Error fetching categories for sitemap:", err);
    // Continue with empty array to avoid breaking the sitemap
  }

  // Create proper sitemap index
  let sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemapIndex += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Add subcategory sitemaps
  let subcategoryCount = 0;
  for (const category of categories) {
    if (!category.subcategories) continue;
    for (const sub of category.subcategories) {
      subcategoryCount++;
      sitemapIndex += `  <sitemap>\n`;
      sitemapIndex += `    <loc>${baseUrl}/sitemaps/subcategory/${sub.slug}</loc>\n`;
      sitemapIndex += `    <lastmod>${currentDate}</lastmod>\n`;
      sitemapIndex += `  </sitemap>\n`;
    }
  }

  // Add other sitemaps
  const otherSitemaps = [
    'blog-sitemap',
    'static-sitemap',
    'solutions-sitemap',
    'city-msp-sitemap'
  ];
  
  for (const sitemapName of otherSitemaps) {
    sitemapIndex += `  <sitemap>\n`;
    sitemapIndex += `    <loc>${baseUrl}/sitemaps/${sitemapName}</loc>\n`;
    sitemapIndex += `    <lastmod>${currentDate}</lastmod>\n`;
    sitemapIndex += `  </sitemap>\n`;
  }

  sitemapIndex += `</sitemapindex>`;


  return new Response(sitemapIndex, {
    status: 200,
    headers: { 
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600"
    },
  });
}