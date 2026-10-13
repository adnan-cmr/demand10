export async function GET() {
  const baseUrl = "https://demand10.com";
  
  // Import city data
  const cityMspContent = await import('../../../data/cityMspContent.json').then(module => module.default);
  
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

  // Generate city MSP pages dynamically from JSON data
  const cityMspPages = Object.keys(cityMspContent).map(cityKey => ({
    path: `/msp/${cityKey}`,
    changefreq: "weekly",
    priority: 0.8
  }));

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Add city MSP pages
  let cityCount = 0;
  for (const page of cityMspPages) {
    cityCount++;
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
  console.log(`✅ Generated city MSP sitemap with ${cityCount} cities`);

  return new Response(xml, {
    status: 200,
    headers: { 
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
    },
  });
}