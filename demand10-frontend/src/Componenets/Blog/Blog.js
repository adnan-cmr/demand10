"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Search, Calendar, User, ArrowRight, Clock, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const truncateText = (text, maxLength = 150) => {
  if (!text) return "No content available";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

const stripHtmlTags = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, "");
};

const BlogDetailPage = ({ blogData, latestBlog, currentPage = 1 }) => {
  const [mainArticles, setMainArticles] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalPosts: 0,
  });

  // Generate structured data for SEO with proper date validation
  const structuredData = useMemo(() => {
    const articles = Array.isArray(blogData)
      ? blogData
      : blogData?.blogs || blogData?.data || [];

    // Validate date helper
    const isValidDate = (dateString) => {
      return dateString && !isNaN(new Date(dateString).getTime());
    };

    return {
      "@context": "https://schema.org",
      "@type": "Blog",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://demand10.com/blog",
      },
      headline: "Demand10 Insights - Expert Strategies for Business Growth",
      description:
        "Actionable strategies, expert analysis, and industry updates to help businesses scale faster and smarter with top MSP and MSSP solutions.",
      publisher: {
        "@type": "Organization",
        name: "Demand10",
        logo: {
          "@type": "ImageObject",
          url: "https://demand10.com/images/logo.png",
        },
      },
      blogPost: articles.slice(0, 10).map((article) => {
        // Ensure we have a valid date for structured data
        const publicationDate = isValidDate(article.date || article.createdAt) 
          ? new Date(article.date || article.createdAt).toISOString()
          : new Date().toISOString();
          
        return {
          "@type": "BlogPosting",
          headline: article.title || "Untitled",
          description:
            article.shortDescription ||
            article.description ||
            truncateText(stripHtmlTags(article.body || article.content), 200),
          datePublished: publicationDate,
          dateModified: publicationDate,
          author: {
            "@type": "Person",
            name: article.author || "Admin",
          },
          image:
            article.image ||
            "https://via.placeholder.com/800x600?text=Blog+Image",
        };
      }),
    };
  }, [blogData]);

  useEffect(() => {
    try {
      // Handle blog data
      if (blogData) {
        let articles = [];
        let paginationData = {
          currentPage: currentPage,
          totalPages: 1,
          totalPosts: 0,
        };
        if (blogData.data && Array.isArray(blogData.data)) {
          articles = blogData.data;
          paginationData = {
            currentPage: blogData.currentPage || currentPage,
            totalPages: blogData.totalPages || 1,
            totalPosts: blogData.totalPosts || 0,
          };
        }

        // Check if blogData is an array or has a nested structure
        if (Array.isArray(blogData)) {
          articles = blogData;
        } else if (blogData.blogs && Array.isArray(blogData.blogs)) {
          articles = blogData.blogs;
        } else if (blogData.data && Array.isArray(blogData.data)) {
          articles = blogData.data;
        } else {
          console.warn("Unexpected blog data structure:", blogData);
          articles = [];
        }

        setMainArticles(articles);
        setFilteredArticles(articles);
        setPagination(paginationData);
      } else {
        setMainArticles([]);
        setFilteredArticles([]);
      }

      // Handle latest blog data
      if (latestBlog) {
        let latest = [];

        if (Array.isArray(latestBlog)) {
          latest = latestBlog;
        } else if (latestBlog.blogs && Array.isArray(latestBlog.blogs)) {
          latest = latestBlog.blogs;
        } else if (latestBlog.data && Array.isArray(latestBlog.data)) {
          latest = latestBlog.data;
        } else {
          console.warn("Unexpected latest blog data structure:", latestBlog);
          latest = [];
        }

        setLatestPosts(latest);
      } else {
        setLatestPosts([]);
      }

      setLoading(false);
    } catch (err) {
      console.error("Error processing blog data:", err);
      setError("Failed to process blog data");
      setLoading(false);
    }
  }, [blogData, latestBlog, currentPage]);
  const Pagination = () => {
    const { currentPage, totalPages } = pagination;

    if (totalPages <= 1) return null;

    return (
      <div className="flex justify-center mt-8 mb-4">
        <div className="flex items-center gap-2">
          {currentPage > 1 && (
            <Link
              href={`/blog?page=${currentPage - 1}`}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Previous
            </Link>
          )}

          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            return (
              <Link
                key={pageNum}
                href={`/blog?page=${pageNum}`}
                className={`px-4 py-2 rounded-lg ${
                  pageNum === currentPage
                    ? "bg-gradient-to-r from-[#265ba3] to-blue-700 text-white"
                    : "border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {pageNum}
              </Link>
            );
          })}

          {currentPage < totalPages && (
            <Link
              href={`/blog?page=${currentPage + 1}`}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Next
            </Link>
          )}
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (!Array.isArray(mainArticles)) {
      console.error("mainArticles is not an array:", mainArticles);
      return;
    }

    if (searchQuery.trim() === "") {
      setFilteredArticles(mainArticles);
    } else {
      const filtered = mainArticles.filter(
        (article) =>
          article.title &&
          article.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredArticles(filtered);
    }
  }, [searchQuery, mainArticles]);

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Format date helper with proper validation
  const formatDate = (dateString) => {
    if (!dateString) return "No date";
    
    // Validate date before formatting
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      // If invalid date, return a default date or handle appropriately
      console.warn("Invalid date provided:", dateString);
      return "Invalid date";
    }
    
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-600 text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-[#314158] text-white rounded-lg hover:bg-[#253347]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <header className="relative bg-gradient-to-br from-[#265ba3] via-[#1e4a86] to-[#1a365d] overflow-hidden min-h-[50vh] flex items-center">
       
        
        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-6 lg:px-12 py-16 text-center">
          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            Discover Insights That{" "}
            <span className="text-blue-200">Drive Business Growth</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
            Actionable strategies, expert analysis, and industry updates to help
            businesses scale faster and smarter with top MSP and MSSP solutions.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <a
              href="#blog-posts"
              className="px-8 py-4 bg-[#265ba3] text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              Explore Latest Articles
            </a>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300">
              Join Our Newsletter
            </button>
          </div>

          {/* Extra Tagline */}
          <div className="text-blue-100 text-sm sm:text-base">
            Trusted by professionals across industries — no fluff, just
            facts.
          </div>
        </div>

        
        
      </header>

      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Side - Scrollable Articles */}
            <div className="flex-1 lg:w-2/3">
              <h2
                id="blog-posts"
                className="text-3xl font-bold text-gray-900 mb-8"
              >
                Latest Insights
              </h2>

              {!Array.isArray(filteredArticles) ||
              filteredArticles.length === 0 ? (
                <section aria-labelledby="no-results">
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">📝</div>
                    <p className="text-gray-600 text-lg">
                      {searchQuery
                        ? "No articles found matching your search."
                        : "No articles available."}
                    </p>
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="mt-4 px-6 py-2 bg-gradient-to-r from-[#265ba3] to-blue-700 text-white rounded-lg hover:from-[#1e4a86] hover:to-blue-800"
                      >
                        Clear Search
                      </button>
                    )}
                  </div>
                </section>
              ) : (
                <section
                  aria-labelledby="blog-posts-list"
                  className="space-y-8"
                >
                  {filteredArticles.map((article, index) => (
                    <article
                      key={article._id || index}
                      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 group"
                      itemScope
                      itemType="https://schema.org/BlogPosting"
                    >
                      <div className="md:flex">
                        <div className="md:w-[40%] h-64 md:h-auto relative">
                          <Image
                            src={
                              article.image ||
                              "https://via.placeholder.com/800x600?text=Blog+Image"
                            }
                            alt={article.title || "Blog image"}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                            onError={(e) => {
                              e.target.src =
                                "https://via.placeholder.com/800x600?text=No+Image";
                            }}
                          />
                        </div>

                        <div className="flex-1 p-6 flex flex-col justify-between">
                          <div>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-3">
                              <div className="flex items-center">
                                <User className="w-4 h-4 mr-1 text-[#265ba3]" />
                                <span className="mr-2" itemProp="author">
                                  {article.author || "Admin"}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1 text-[#265ba3]" />
                                <time
                                  dateTime={
                                    article.date || article.createdAt
                                      ? new Date(article.date || article.createdAt).toISOString()
                                      : undefined
                                  }
                                  itemProp="datePublished"
                                >
                                  {formatDate(article.date || article.createdAt)}
                                </time>
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1 text-[#265ba3]" />
                                <span>5 min read</span>
                              </div>
                            </div>
                            <h3
                              className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#265ba3] transition-colors cursor-pointer"
                              itemProp="headline"
                            >
                              {article.title || "Untitled"}
                            </h3>
                            <Link href={`/insights/${article.slug}`}>
                              <p
                                className="text-gray-600 text-md space-y-3 line-clamp-3 group-hover:text-[#265ba3] transition-colors"
                                itemProp="description"
                              >
                                {article.shortDescription ||
                                  truncateText(
                                    stripHtmlTags(
                                      article.body ||
                                        article.content ||
                                        article.description
                                    ),
                                    200
                                  )}
                              </p>
                            </Link>
                          </div>
                          <div className="mt-4 flex flex-wrap items-center justify-between">
                            <div className="flex items-center">
                              <Tag className="w-4 h-4 mr-1 text-[#265ba3]" />
                              <span className="text-sm text-gray-500">Technology</span>
                            </div>
                            <Link
                              href={`/insights/${article.slug}`}
                              itemProp="url"
                            >
                              <button className="flex items-center cursor-pointer text-[#265ba3] font-medium text-sm hover:underline">
                                Read More <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </section>
              )}
              <Pagination />
            </div>

            {/* Right Side - Sticky Sidebar */}
            <aside className="lg:w-1/3">
              <div className="sticky top-8 space-y-6">
                {/* Search Section */}
                <section aria-labelledby="search-section">
                  <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
                    <h3
                      id="search-section"
                      className="text-lg font-semibold text-gray-900 mb-4 flex items-center"
                    >
                      <Search className="w-5 h-5 mr-2 text-[#265ba3]" />
                      Search Articles
                    </h3>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search articles by title..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#265ba3] focus:border-transparent"
                        aria-label="Search blog articles"
                      />
                      <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    </div>
                    {searchQuery && Array.isArray(filteredArticles) && (
                      <div className="mt-2 text-sm text-gray-600">
                        {filteredArticles.length} result
                        {filteredArticles.length !== 1 ? "s" : ""} found
                      </div>
                    )}
                  </div>
                </section>

                {/* Latest Posts Section */}
                <section aria-labelledby="latest-posts">
                  <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
                    <h3
                      id="latest-posts"
                      className="text-lg font-semibold text-gray-900 mb-4 flex items-center"
                    >
                      <Clock className="w-5 h-5 mr-2 text-[#265ba3]" />
                      Latest Posts
                    </h3>
                    {!Array.isArray(latestPosts) || latestPosts.length === 0 ? (
                      <p className="text-gray-500 text-sm">
                        No recent posts available.
                      </p>
                    ) : (
                      <div className="space-y-4">
                        {latestPosts.slice(0, 5).map((post, index) => (
                          <article
                            key={post._id || index}
                            className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0"
                            itemScope
                            itemType="https://schema.org/BlogPosting"
                          >
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={
                                  post.image ||
                                  "https://via.placeholder.com/64x64?text=No+Image"
                                }
                                alt={post.title || "Post image"}
                                fill
                                className="object-cover"
                                sizes="64px"
                                onError={(e) => {
                                  e.target.src =
                                    "https://via.placeholder.com/64x64?text=No+Image";
                                }}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center text-xs text-[#265ba3] mb-1">
                                <Calendar className="w-3 h-3 mr-1" />
                                <time
                                  dateTime={post.date || post.createdAt}
                                  itemProp="datePublished"
                                >
                                  {formatDate(post.date || post.createdAt)}
                                </time>
                              </div>
                              <Link
                                href={`/insights/${post.slug}`}
                                itemProp="url"
                              >
                                <h4
                                  className="text-sm font-medium text-gray-900 leading-tight hover:underline hover:text-[#265ba3] cursor-pointer"
                                  itemProp="headline"
                                >
                                  {post.title || "Untitled"}
                                </h4>
                              </Link>
                            </div>
                          </article>
                        ))}
                      </div>
                    )}
                  </div>
                </section>

              
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogDetailPage;