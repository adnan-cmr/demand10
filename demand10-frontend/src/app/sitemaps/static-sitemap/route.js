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

  const staticPages = [
    { path: "/", changefreq: "monthly", priority: 1.0 },
    { path: "/about", changefreq: "monthly", priority: 0.6 },
    { path: "/contact", changefreq: "monthly", priority: 0.5 },
    { path: "/privacy-policy", changefreq: "monthly", priority: 0.3 },
    { path: "/blog", changefreq: "monthly", priority: 0.7 },
    { path: "/faq", changefreq: "monthly", priority: 0.5 },
    { path: "/history", changefreq: "monthly", priority: 0.4 },
    { path: "/services", changefreq: "monthly", priority: 0.6 },
    { path: "/strategies", changefreq: "monthly", priority: 0.5 },
    { path: "/term-policies", changefreq: "monthly", priority: 0.3 },
    { path: "/msp-global", changefreq: "weekly", priority: 0.8 },
    { path: "/all-categories", changefreq: "weekly", priority: 0.7 },
    { path: "/solutions", changefreq: "weekly", priority: 0.8 },
    { path: "/review", changefreq: "monthly", priority: 0.3 },
    { path: "/listing", changefreq: "monthly", priority: 0.3 },
    { path: "/staffing-industry", changefreq: "weekly", priority: 0.8 },
    { path: "/msp-directory", changefreq: "weekly", priority: 0.8 },
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Add static pages
  let pageCount = 0;
  for (const page of staticPages) {
    pageCount++;
    xml += `
  <url>
    <loc>${baseUrl}${page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`;
  }

  xml += `\n</urlset>`;

  // Log sitemap generation for monitoring
  console.log(`✅ Generated static sitemap with ${pageCount} pages`);

  return new Response(xml, {
    status: 200,
    headers: { "Content-Type": "application/xml" },
  });
}