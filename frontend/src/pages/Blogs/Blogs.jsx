import React, { useEffect, useRef, useState } from 'react';

// Define the base URL for the API
const API_BASE_URL = 'http://localhost:8000/api';

/**
 * Utility function to format the date from the API
 * @param {string} isoDate - The ISO format date string (e.g., "2025-10-21T10:00:00Z")
 * @returns {string} Formatted date string (e.g., "Oct 21, 2025")
 */
const formatDate = (isoDate) => {
    if (!isoDate) return 'Unknown Date';
    try {
        return new Date(isoDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    } catch (e) {
        return 'Invalid Date';
    }
};

/**
 * Renders a single Blog Post Card.
 * This component remains a presentational component.
 */
const BlogPost = ({ title, excerpt, author, date, tags, image, readTime, delay }) => {
  return (
    <div
      className="animate-on-scroll opacity-0 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:shadow-lg group cursor-pointer"
      style={{ animationDelay: delay }}
    >
      {/* Blog Image */}
      <div className="aspect-video rounded-xl overflow-hidden mb-4">
        <img
          src={image || "images/blog-placeholder.jpg"}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {tags?.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-white/5 rounded-full text-sm text-white/90 font-mont hover:bg-rose-500/20 hover:text-rose-200 transition-all duration-300 cursor-default"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <h3 className="text-2xl text-white font-playfair font-semibold mb-3 group-hover:text-rose-200 transition-colors duration-300">
        {title}
      </h3>

      {/* Excerpt */}
      <p className="text-white/80 font-mont mb-4 leading-relaxed">
        {excerpt}
      </p>

      {/* Meta Information */}
      <div className="flex items-center justify-between text-sm text-white/60 font-mont">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <i className="fas fa-user text-rose-400"></i>
            {author}
          </span>
          <span className="flex items-center gap-1">
            <i className="fas fa-clock text-rose-400"></i>
            {readTime}
          </span>
        </div>
        <span className="flex items-center gap-1 group-hover:text-rose-300 transition-colors duration-300">
          {date}
          <i className="fas fa-arrow-right text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"></i>
        </span>
      </div>
    </div>
  )
}

// ------------------------------------------------------------------

/**
 * Blogs component fetches data from the API and manages the Intersection Observer.
 */
const Blogs = () => {
  const containerRef = useRef(null);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Effect for Data Fetching
  useEffect(() => {
    // Blogs.jsx (around line 110)

const fetchBlogPosts = async () => {
    setLoading(true);
    setError(null);
    try {
        const response = await fetch(`${API_BASE_URL}/blogs/?published=true&ordering=-date_published`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const rawData = await response.json(); // Use a new variable name for clarity

        // --- CORE FIX HERE ---
        // Determine the actual array of posts. Assuming pagination returns a 'results' key.
        const postsArray = rawData.results || rawData; 
        
        // Safety check to ensure we have an array
        if (!Array.isArray(postsArray)) {
            // This handles cases where the response is a single object or an unexpected format
            console.error("API response did not contain an array of posts:", rawData);
            throw new TypeError("Received data is not a list of blog posts.");
        }
        
        const formattedPosts = postsArray.map(post => ({ // Use the extracted array
            title: post.title,
            excerpt: post.description,
            author: post.author_name,
            date: formatDate(post.date_published),
            readTime: post.estimated_read_time || '5 min read',
            tags: post.tags || [],
            image: post.image_url,
        }));

        setBlogPosts(formattedPosts);
    } catch (e) {
        console.error("Failed to fetch blog posts:", e);
        // The error message is now more informative
        setError(`Failed to load blog data: ${e.message}.`); 
    } finally {
        setLoading(false);
    }
};

    fetchBlogPosts();
  }, []); // Empty dependency array means this runs once on mount

  // 2. Effect for Intersection Observer
  useEffect(() => {
    // Only run this observer setup after the component has mounted and elements are potentially present
    if (!containerRef.current || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
          }
        });
      },
      { threshold: 0.1 }
    );

    // Select all elements that need the scroll animation
    const elements = containerRef.current.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    // Cleanup function
    return () => observer.disconnect();

  // Re-run observer setup if blogPosts or loading state changes, observing new cards
  }, [blogPosts, loading]);


  // --- Render Logic for Blog Posts ---
  let content;

  if (loading) {
    content = (
      <div className="text-center py-20">
        <p className="text-white text-xl">Fetching latest insights...</p>
        {/* Simple Spinner Placeholder */}
        <div className="mt-4 w-8 h-8 border-4 border-rose-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    );
  } else if (error) {
    content = (
      <div className="text-center py-20">
        <p className="text-red-400 text-xl font-bold">{error}</p>
        <p className="text-white/70 mt-2">Could not load blog posts.</p>
      </div>
    );
  } else if (blogPosts.length === 0) {
    content = (
      <div className="text-center py-20">
        <p className="text-rose-300 text-xl">No published blog posts found.</p>
      </div>
    );
  } else {
    // The main blog grid rendering
    content = (
      <div className="animate-on-scroll opacity-0" style={{ animationDelay: '0.2s' }}>
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/20 transform hover:scale-[1.01] transition-all duration-500 hover:shadow-rose-500/20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
              <BlogPost
                key={post.title || index} // Use unique ID from API if available
                title={post.title}
                excerpt={post.excerpt}
                author={post.author}
                date={post.date}
                tags={post.tags}
                image={post.image}
                readTime={post.readTime}
                // Staggered delay for animation
                delay={`${0.4 + index * 0.1}s`} 
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- Main Return JSX ---
  return (
    <div id="blogs" ref={containerRef} className="min-h-screen relative bg-black overflow-hidden">
      {/* Background elements remain the same */}
      <div className="absolute inset-0 bg-[#9458D0] z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-500/10 via-transparent to-transparent animate-pulse"></div>
      <img
        className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay transform scale-105 hover:scale-110 transition-transform duration-[3s]"
        src="images/landingimg.png"
        alt="Blogs Background"
        loading="lazy"
      />

      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-element w-32 h-32 absolute top-1/4 right-1/4 opacity-10 bg-rose-500 rounded-full blur-3xl"></div>
        <div className="floating-element w-40 h-40 absolute bottom-1/3 left-1/4 opacity-10 bg-pink-500 rounded-full blur-3xl delay-1000"></div>
        <div className="floating-element w-28 h-28 absolute top-1/2 right-1/3 opacity-10 bg-red-500 rounded-full blur-3xl delay-500"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Main Title */}
            <div className="animate-on-scroll opacity-0 text-center mb-16">
              <h1 className="text-7xl text-transparent bg-clip-text bg-gradient-to-r from-white to-rose-200 font-young font-bold mb-8 hover:scale-105 transition-transform duration-300">
                Blogs
              </h1>
              <p className="text-white/80 text-xl font-mont max-w-3xl mx-auto leading-relaxed">
                Insights, tutorials, and thought leadership from our AI community.
                Stay updated with the latest trends and developments in artificial intelligence.
              </p>
            </div>

            {/* Dynamic Blog Posts Grid */}
            {content}
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blogs