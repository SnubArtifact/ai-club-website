import React, { useEffect, useRef, useState } from 'react';

const API_BASE_URL = 'http://localhost:8000/api';

/**
 * Renders a single SMALLER Project Card.
 * Images are removed, design simplified for a compact look.
 */
const ProjectCard = ({ title, description, tags, delay }) => {
  return (
    <div
      className="animate-on-scroll opacity-0 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 transform hover:scale-105 transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-cyan-500/10 group flex flex-col justify-between cursor-pointer"
      style={{ animationDelay: delay }}
    >
      <div>
        {/* Project Title */}
        <h3 className="text-xl text-white font-young font-semibold mb-2 group-hover:text-cyan-200 transition-colors duration-300">
          {title}
        </h3>
        {/* Project Description */}
        <p className="text-white/80 font-mont text-sm mb-3 leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mt-auto pt-2 border-t border-white/5">
        {tags?.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-0.5 bg-white/5 rounded-full text-xs text-white/90 font-mont hover:bg-cyan-500/20 hover:text-cyan-200 transition-all duration-300 cursor-default"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

// ------------------------------------------------------------------

/**
 * Projects component fetches data from the API and manages the Intersection Observer and Pagination.
 */
const Projects = () => {
  const containerRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 12; // Adjusted page size for more, smaller cards

  // Function to fetch data, now independent of currentPage state update inside.
  const fetchProjects = async (pageToFetch) => {
    setLoading(true);
    setError(null);
    try {
        // API call using the passed pageToFetch argument
        const response = await fetch(`${API_BASE_URL}/projects/?page=${pageToFetch}&page_size=${pageSize}`); // Include page_size in request
        
        if (!response.ok) {
          const errorText = await response.text(); 
          throw new Error(`HTTP error! status: ${response.status} - ${errorText || 'Unknown Error'}`);
        }
        
        const rawData = await response.json();
        
        const projectsArray = rawData.results || rawData; 
        const totalCount = rawData.count || projectsArray.length; 
        
        // Calculate total pages based on count
        if (rawData.count) {
             setTotalPages(Math.ceil(totalCount / (rawData.page_size || pageSize)));
        } else {
             // If non-paginated API returns all data, totalPages is 1
             setTotalPages(1); 
        }

        if (!Array.isArray(projectsArray)) {
            console.error("API response did not contain a list of projects:", rawData);
            throw new TypeError("Received data is not a list of projects.");
        }
        
        const formattedProjects = projectsArray.map(project => ({
          title: project.name,
          description: project.short_description || project.description || (project.full_description?.substring(0, 150) + '...' || 'No description provided.'), 
          // image: project.image_url || project.image, // Removed image
          tags: project.slug || project.tags || [],
        }));
        
        setProjects(formattedProjects);
        
    } catch (e) {
        console.error("Failed to fetch projects:", e);
        setError(`Failed to load project data. Error: ${e.message.includes('HTTP error!') ? e.message.split(' - ')[0] : e.message}`);
    } finally {
        setLoading(false);
        // Scroll to the top of the content area on page change
        containerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handler for pagination button clicks: ONLY updates state, letting useEffect handle fetch
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // 1. Effect for Data Fetching: Runs on mount and whenever currentPage changes
  useEffect(() => {
    fetchProjects(currentPage);
  }, [currentPage]); 


  // 2. Effect for Intersection Observer (runs only when projects are updated)
  useEffect(() => {
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

    const elements = containerRef.current.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [projects]); 


  // --- Render Logic ---
  let content;

  if (loading) {
     content = (
      <div className="text-center py-20 col-span-full">
        <p className="text-white text-xl">Loading projects from page {currentPage}...</p>
        <div className="mt-4 w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    );
  } else if (error) {
    content = (
      <div className="text-center py-20 col-span-full">
        <p className="text-red-400 text-xl font-bold">{error}</p>
        <p className="text-white/70 mt-2">Check your API status or CORS settings.</p>
      </div>
    );
  } else if (projects.length === 0) {
    content = (
      <div className="text-center py-20 col-span-full">
        <p className="text-cyan-300 text-xl">No projects found on this page.</p>
      </div>
    );
  } else {
    content = (
      // Adjusted grid for smaller cards: 2 on md, 3 on lg, 4 on xl
      <div className="animate-on-scroll opacity-0 w-full" style={{ animationDelay: '0.4s' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"> 
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title || index} 
              title={project.title}
              description={project.description}
              tags={project.slug}
              delay={`${0.1 + index * 0.05}s`} // Faster staggered delay for more cards
            />
          ))}
        </div>
      </div>
    );
  }

  // --- Pagination Controls Component (unchanged) ---
  const PaginationControls = () => (
    <div className="flex justify-center items-center mt-12 space-x-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1 || loading}
        className="px-4 py-2 bg-white/10 text-white rounded-lg disabled:opacity-50 hover:bg-white/20 transition-colors duration-200 font-mont"
      >
        Previous
      </button>
      
      <span className="text-white font-mont text-lg">
        Page **{currentPage}** of **{totalPages}**
      </span>
      
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || loading}
        className="px-4 py-2 bg-white/10 text-white rounded-lg disabled:opacity-50 hover:bg-white/20 transition-colors duration-200 font-mont"
      >
        Next
      </button>
    </div>
  );


  // --- Main Return JSX ---
  return (
    <div id="projects" ref={containerRef} className="min-h-screen relative bg-black overflow-hidden w-full">
      {/* Background and floating elements (unchanged) */}
      <div className="absolute inset-0 bg-[#733CA9] z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent animate-pulse"></div>
      <img
        className="w-full h-full object-cover opacity-30 mix-blend-overlay transform scale-105 hover:scale-110 transition-transform duration-[3s]"
        src="images/landingimg.png"
        alt="Projects Background"
        loading="lazy"
      />
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-element w-32 h-32 absolute top-1/4 left-1/4 opacity-10 bg-cyan-500 rounded-full blur-3xl"></div>
        <div className="floating-element w-40 h-40 absolute bottom-1/3 right-1/4 opacity-10 bg-blue-500 rounded-full blur-3xl delay-1000"></div>
        <div className="floating-element w-28 h-28 absolute top-1/2 right-1/3 opacity-10 bg-teal-500 rounded-full blur-3xl delay-500"></div>
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Main Title */}
            <div className="animate-on-scroll opacity-0 text-center mb-12">
              <h1 className="text-7xl text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200 font-young font-bold mb-8 hover:scale-105 transition-transform duration-300">
                Our Projects
              </h1>
              <p className="text-white/80 text-xl font-mont max-w-2xl mx-auto">
                Exploring the frontiers of artificial intelligence through innovative projects and real-world applications
              </p>
            </div>

            {/* Glass Card Container */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/20 transform hover:scale-[1.01] transition-all duration-500 hover:shadow-cyan-500/20">
              {/* Dynamic Projects Grid */}
              {content}
              
              {/* Pagination Controls go below the content */}
              {totalPages > 1 && !loading && !error && <PaginationControls />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projects