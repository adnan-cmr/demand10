import { fetchCompaniesForSitemap } from "@/services/api";

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

export async function GET(req, { params }) {
  const baseUrl = "https://demand10.com";
  const subSlug = params.subcategory;
  
  // Validate required parameter
  if (!subSlug) {
    console.error('❌ Missing subcategory slug for sitemap generation');
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`,
      {
        status: 400,
        headers: { 
          "Content-Type": "application/xml",
        },
      }
    );
  }

  // Use consistent date formatting
  const currentDate = formatSitemapDate(new Date());

  let companies = [];
  try {
    const res = await fetchCompaniesForSitemap(subSlug);
    companies = res?.companies || [];
    
    // Log success for monitoring
    console.log(`✅ Successfully fetched ${companies.length} companies for subcategory ${subSlug}`);
  } catch (err) {
    console.error(`❌ Error fetching companies for subcategory ${subSlug}:`, err);
    // Continue with empty array to avoid breaking the sitemap
  }

  // Handle case where no companies are found
  if (companies.length === 0) {
    console.log(`⚠️ No companies found for subcategory: ${subSlug}`);
  }

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Add subcategory page URL
  sitemap += `
  <url>
    <loc>${baseUrl}/${subSlug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <lastmod>${currentDate}</lastmod>
  </url>
`;

  // Add company URLs
  let companyCount = 0;
  for (const company of companies) {
    // Skip companies without slug
    if (!company?.slug) {
      console.warn(`⚠️ Skipping company without slug in subcategory ${subSlug}`);
      continue;
    }
    
    companyCount++;

    // Format last modified date with better error handling
    let formattedLastModified = currentDate; // Default to current date
    const lastModified = company.updatedAt || company.createdAt;
    
    if (lastModified) {
      formattedLastModified = formatSitemapDate(lastModified);
    }

    sitemap += `
  <url>
    <loc>${baseUrl}/${subSlug}/${company.slug}</loc>
    <lastmod>${formattedLastModified}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  `;
  }

  sitemap += `</urlset>`;

  // Log sitemap generation for monitoring
  console.log(`✅ Generated sitemap for subcategory ${subSlug} with ${companyCount} companies`);

  return new Response(sitemap, {
    status: 200,
    headers: { 
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600"
    },
  });
}