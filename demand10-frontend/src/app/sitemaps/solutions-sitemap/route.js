import { fetchCategories } from "@/services/api";

export const dynamic = "force-dynamic";

export async function GET() {
  const baseUrl = "https://demand10.com";
  
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

  // Use consistent date formatting
  const currentDate = formatSitemapDate(new Date());
  
  let categories = [];

  try {
    categories = await fetchCategories(); // isme subcategories included hain
    
    // Log success for monitoring
    console.log(`✅ Successfully fetched ${categories.length} categories for solutions sitemap`);
  } catch (err) {
    console.error("❌ Error fetching categories for solutions sitemap:", err);
    // Continue with empty array to avoid breaking the sitemap
  }

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Add solutions listing page
  sitemap += `
  <url>
    <loc>${baseUrl}/solutions</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <lastmod>${currentDate}</lastmod>
  </url>
`;

  // Add subcategory URLs
  let subcategoryCount = 0;
  // 🔹 Loop through all categories & subcategories
  for (const category of categories) {
    if (!category.subcategories) continue;

    for (const sub of category.subcategories) {
      subcategoryCount++;
      sitemap += `
  <url>
    <loc>${baseUrl}/solutions/${sub.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <lastmod>${currentDate}</lastmod>
  </url>
  `;
    }
  }

  sitemap += `</urlset>`;

  // Log sitemap generation for monitoring
  console.log(`✅ Generated solutions sitemap with ${subcategoryCount} subcategories`);

  return new Response(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
    },
  });
}