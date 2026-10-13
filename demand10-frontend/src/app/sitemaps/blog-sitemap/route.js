import { fetchBlogsSitemap } from "@/services/api";

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
  
  let blogs = [];

  try {
    blogs = await fetchBlogsSitemap(); // returns array with slug + date or updatedAt
    
    // Log success for monitoring
    console.log(`✅ Successfully fetched ${blogs.length} blogs for sitemap`);
  } catch (err) {
    console.error("❌ Error fetching blogs for sitemap:", err);
    // Continue with empty array to avoid breaking the sitemap
  }

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Blog listing page
  sitemap += `
  <url>
    <loc>${baseUrl}/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <lastmod>${currentDate}</lastmod>
  </url>
`;

  // Add blog URLs
  let blogCount = 0;
  for (const blog of blogs) {
    // Skip blogs without slug
    if (!blog?.slug) {
      console.warn(`⚠️ Skipping blog without slug`);
      continue;
    }
    
    blogCount++;

    // Format last modified date with better error handling
    let formattedLastModified = currentDate; // Default to current date
    const lastModified = blog.updatedAt || blog.date;
    
    if (lastModified) {
      formattedLastModified = formatSitemapDate(lastModified);
    }

    sitemap += `
  <url>
    <loc>${baseUrl}/insights/${blog.slug}</loc>
    <lastmod>${formattedLastModified}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  `;
  }

  sitemap += `</urlset>`;

  // Log sitemap generation for monitoring
  console.log(`✅ Generated blog sitemap with ${blogCount} blogs`);

  return new Response(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
    },
  });
}