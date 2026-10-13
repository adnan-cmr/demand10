import BlogDetailPage from "@/Componenets/Blog/Blog";
import { fetchBlogs, fetchLatestBlogs } from "@/services/api";


export const metadata = {
  title: "Insights on MSPs, MSSPs & IT Solutions | Demand10 Blog",
  description:
    "Explore expert articles on Managed Service Providers, cybersecurity, IT support, and more at Demand10's blog. Stay updated with the latest industry trends.",
  keywords: [
    "Managed Service Providers",
    "MSSPs",
    "IT solutions",
    "cybersecurity",
    "IT support services",
    "cloud services",
    "network administration",
    "IT consulting"
  ],
  metadataBase: new URL("https://demand10.com"),
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Insights on MSPs, MSSPs & IT Solutions | Demand10 Blog",
    description:
      "Explore expert articles on Managed Service Providers, cybersecurity, IT support, and more at Demand10's blog. Stay updated with the latest industry trends.",
    url: "https://demand10.com/blog",
    siteName: "Demand10 Blog",
    
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights on MSPs, MSSPs & IT Solutions | Demand10 Blog",
    description:
      "Explore expert articles on Managed Service Providers, cybersecurity, IT support, and more at Demand10's blog. Stay updated with the latest industry trends.",
    site: "@demand10",
  },
};
export default async function Page({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;
  
  let BlogData = null;
  let LatestBlog = null;

  try {
    const [blogsRes, latestRes] = await Promise.allSettled([
      fetchBlogs(page),
      fetchLatestBlogs(),
    ]);

    if (blogsRes.status === "fulfilled") {
      BlogData = blogsRes.value;
    }

    if (latestRes.status === "fulfilled") {
      LatestBlog = latestRes.value;
    }

  } catch (error) {
    console.error("Error fetching blog data", error);
  }

  return (
    <main>
      <BlogDetailPage 
        blogData={BlogData} 
        latestBlog={LatestBlog} 
        currentPage={page}
      />
    </main>
  );
}