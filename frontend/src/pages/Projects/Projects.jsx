import React, { useEffect, useRef, useState } from 'react';

const API_BASE_URL = 'https://aiclub-bitsp.dev/api';

/**
 * Renders a single SMALLER Project Card.
 */
const ProjectCard = ({ title, description, tags, delay, status }) => {
  const statusColors = {
    ongoing: 'bg-yellow-500/20 text-yellow-300',
    completed: 'bg-green-500/20 text-green-300',
    planned: 'bg-blue-500/20 text-blue-300'
  };

  // Ensure tags is always an array
  const safeTags = Array.isArray(tags) ? tags : [];

  return (
    <div
      className="animate-on-scroll opacity-0 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 transform hover:scale-105 transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-cyan-500/10 group flex flex-col justify-between cursor-pointer h-full"
      style={{ animationDelay: delay }}
    >
      <div>
        {/* Status Badge */}
        {status && (
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-mont mb-2 ${statusColors[status] || 'bg-gray-500/20 text-gray-300'}`}>
            {status?.charAt(0).toUpperCase() + status?.slice(1)}
          </span>
        )}
        
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
      {safeTags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-auto pt-2 border-t border-white/5">
          {safeTags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-0.5 bg-white/5 rounded-full text-xs text-white/90 font-mont hover:bg-cyan-500/20 hover:text-cyan-200 transition-all duration-300 cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

// ------------------------------------------------------------------

/**
 * Projects component with advanced filtering and API integration.
 */
const Projects = () => {
  const containerRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 12;

  // State for filters and ordering
  const [filters, setFilters] = useState({
    status: '', // 'ongoing', 'completed', 'planned', or ''
    technology: '',
    search: '',
    ordering: '-created_at' // Default: newest first
  });

  // Build API URL with filters and pagination
  const buildApiUrl = (page, currentFilters) => {
    const params = new URLSearchParams();
    
    // Add pagination
    params.append('page', page);
    params.append('page_size', pageSize);
    
    // Add filters
    if (currentFilters.status) {
      params.append('status', currentFilters.status);
    }
    if (currentFilters.technology) {
      params.append('technology', currentFilters.technology);
    }
    if (currentFilters.search) {
      params.append('search', currentFilters.search);
    }
    if (currentFilters.ordering) {
      params.append('ordering', currentFilters.ordering);
    }
    
    return `${API_BASE_URL}/projects/?${params.toString()}`;
  };

  // Function to fetch data
  const fetchProjects = async (pageToFetch, currentFilters) => {
    setLoading(true);
    setError(null);
    try {
      const apiURL = buildApiUrl(pageToFetch, currentFilters);
      console.log('Fetching from:', apiURL);
      
      const response = await fetch(apiURL);
      
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
        setTotalPages(1); 
      }

      if (!Array.isArray(projectsArray)) {
        console.error("API response did not contain a list of projects:", rawData);
        throw new TypeError("Received data is not a list of projects.");
      }
      
      // Format projects with safe tag handling
      const formattedProjects = projectsArray.map(project => {
        // Handle tags - ensure it's always an array
        let tagsArray = [];
        if (Array.isArray(project.technologies)) {
          tagsArray = project.technologies;
        } else if (Array.isArray(project.tags)) {
          tagsArray = project.tags;
        } else if (project.slug) {
          tagsArray = [project.slug];
        } else if (typeof project.technologies === 'string') {
          tagsArray = project.technologies.split(',').map(tag => tag.trim());
        }
        
        return {
          id: project.id,
          title: project.name || project.title,
          description: project.short_description || project.description || (project.full_description?.substring(0, 150) + '...' || 'No description provided.'), 
          tags: tagsArray,
          status: project.status,
          start_date: project.start_date,
          end_date: project.end_date,
          created_at: project.created_at
        };
      });
      
      setProjects(formattedProjects);
      
    } catch (e) {
      console.error("Failed to fetch projects:", e);
      setError(`Failed to load project data. Error: ${e.message.includes('HTTP error!') ? e.message.split(' - ')[0] : e.message}`);
    } finally {
      setLoading(false);
      // Scroll to the top of the content area on page/filter change
      containerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handler for pagination button clicks
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Handler for filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Handler for clearing filters
  const clearFilters = () => {
    setFilters({
      status: '',
      technology: '',
      search: '',
      ordering: '-created_at'
    });
    setCurrentPage(1);
  };

  // Effect for Data Fetching: Runs on mount and whenever currentPage or filters change
  useEffect(() => {
    fetchProjects(currentPage, filters);
  }, [currentPage, filters]); 

  // Effect for Intersection Observer
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
        <p className="text-white text-xl">Loading projects...</p>
        <div className="mt-4 w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    );
  } else if (error) {
    content = (
      <div className="text-center py-20 col-span-full">
        <p className="text-red-400 text-xl font-bold">{error}</p>
        <p className="text-white/70 mt-2">Check your API status or CORS settings.</p>
        <button 
          onClick={() => fetchProjects(currentPage, filters)}
          className="mt-4 px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors duration-300"
        >
          Retry
        </button>
      </div>
    );
  } else if (projects.length === 0) {
    content = (
      <div className="text-center py-20 col-span-full">
        <p className="text-cyan-300 text-xl mb-4">No projects found matching your criteria.</p>
        <button 
          onClick={clearFilters}
          className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-colors duration-300"
        >
          Clear Filters
        </button>
      </div>
    );
  } else {
    content = (
      <div className="animate-on-scroll opacity-0 w-full" style={{ animationDelay: '0.4s' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"> 
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id || project.title || index} 
              title={project.title}
              description={project.description}
              tags={project.tags}
              status={project.status}
              delay={`${0.1 + index * 0.05}s`}
            />
          ))}
        </div>
      </div>
    );
  }

  // Pagination Controls Component
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
        Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
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

  return (
    <div id="projects" ref={containerRef} className="min-h-screen relative bg-black overflow-hidden w-full">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[#2b1c54] z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent animate-pulse"></div>
      <img
        className="w-full h-full object-cover opacity-30 mix-blend-overlay transform scale-105"
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

            {/* Filter Controls */}
            <div className="animate-on-scroll opacity-0 mb-8 bg-white/5 p-6 rounded-lg border border-white/10" style={{ animationDelay: '0.2s' }}>
              <div className="flex flex-wrap gap-4 justify-center items-center">
                {/* Status Filter */}
                <select 
                  name="status" 
                  value={filters.status} 
                  onChange={handleFilterChange}
                  className="p-2 rounded bg-white/10 text-white border border-cyan-400/50 hover:bg-white/20 transition duration-300"
                >
                  <option value="">All Status</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="planned">Planned</option>
                </select>

                

                {/* Search Filter */}
                <input 
                  type="text" 
                  name="search" 
                  value={filters.search} 
                  onChange={handleFilterChange} 
                  placeholder="Search projects..."
                  className="p-2 rounded bg-white/10 text-white placeholder-white/50 border border-cyan-400/50 focus:ring-cyan-500 focus:border-cyan-500 transition duration-300 min-w-64"
                />




                
              </div>
            </div>

            {/* Glass Card Container */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/20 transform transition-all duration-500 hover:shadow-cyan-500/20">
              {/* Results Count */}
              {!loading && !error && projects.length > 0 && (
                <div className="text-center mb-6">
                  <p className="text-cyan-300 text-lg">
                    Showing {projects.length} project{projects.length !== 1 ? 's' : ''}
                    {filters.status && ` • Status: ${filters.status}`}
                    {filters.technology && ` • Technology: ${filters.technology}`}
                  </p>
                </div>
              )}

              {/* Dynamic Projects Grid */}
              {content}
              
              {/* Pagination Controls */}
              {totalPages > 1 && !loading && !error && projects.length > 0 && <PaginationControls />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projects