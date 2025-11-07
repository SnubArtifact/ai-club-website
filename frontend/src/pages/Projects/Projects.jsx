import React, { useEffect, useRef, useState } from 'react';

// Commenting out the API base URL for now
// const API_BASE_URL = 'https://aiclub-bitsp.dev/api';

/**
 * Renders an enhanced Project Card with expanded details on hover
 */
const ProjectCard = ({ project, delay }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const statusColors = {
    ongoing: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    completed: 'bg-green-500/20 text-green-300 border-green-500/30',
    planned: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
  };

  // Safe data handling
  const safeTags = Array.isArray(project.tags) ? project.tags : [];
  const safeTechnologies = Array.isArray(project.technologies) ? project.technologies : [];
  
  const truncatedDescription = project.description?.length > 120 
    ? project.description.substring(0, 120) + '...' 
    : project.description;

  return (
    <div
      className="animate-on-scroll opacity-0 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 transform transition-all duration-500 hover:scale-[1.02] hover:bg-white/10 hover:shadow-2xl hover:shadow-cyan-500/20 group cursor-pointer h-full flex flex-col relative overflow-hidden"
      style={{ animationDelay: delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Background Gradient on Hover */}
      <div className={`absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 transition-all duration-700 ${
        isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}></div>
      
      {/* Animated Border Glow */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 transition-all duration-500 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`} style={{
        filter: 'blur(12px)',
        margin: '-2px',
        zIndex: -1
      }}></div>

      {/* Status Badge */}
      {project.status && (
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-mont mb-3 border transition-all duration-300 ${
          isHovered ? 'scale-105' : 'scale-100'
        } ${statusColors[project.status] || 'bg-gray-500/20 text-gray-300'}`}>
          {project.status?.charAt(0).toUpperCase() + project.status?.slice(1)}
        </span>
      )}
      
      {/* Project Title */}
      <h3 className="text-2xl text-white font-nata font-semibold mb-3 group-hover:text-cyan-400 transition-all duration-500 relative z-10">
        {project.title}
      </h3>
      
      {/* Project Description */}
      <div className="flex-1 relative z-10">
        <p className={`text-white/80 font-mont leading-relaxed transition-all duration-700 ${
          isHovered ? 'text-base transform translate-y-0' : 'text-sm transform translate-y-1'
        }`}>
          {isHovered ? project.description : truncatedDescription}
        </p>
      </div>

      {/* Tech Stack Section */}
      {safeTechnologies.length > 0 && (
        <div className="mt-4 relative z-10">
          <h4 className="text-white/90 text-sm font-mont font-semibold mb-2 transition-all duration-300">
            Tech Stack:
          </h4>
          <div className="flex flex-wrap gap-2">
            {safeTechnologies.slice(0, isHovered ? safeTechnologies.length : 3).map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-lg text-xs font-mont border border-cyan-500/30 hover:bg-cyan-500/30 hover:text-cyan-200 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
                style={{
                  transitionDelay: isHovered ? `${index * 50}ms` : '0ms'
                }}
              >
                {tech}
              </span>
            ))}
            {!isHovered && safeTechnologies.length > 3 && (
              <span className="px-2 py-1 bg-white/10 text-white/70 rounded-lg text-xs font-mont transition-all duration-300">
                +{safeTechnologies.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Tags Section */}
      {safeTags.length > 0 && (
        <div className="mt-3 pt-3 border-t border-white/10 relative z-10">
          <div className="flex flex-wrap gap-1">
            {safeTags.slice(0, isHovered ? safeTags.length : 4).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-white/5 rounded-full text-xs text-white/80 font-mont hover:bg-white/10 hover:text-white transition-all duration-300 hover:scale-105"
                style={{
                  transitionDelay: isHovered ? `${index * 30}ms` : '0ms'
                }}
              >
                #{tag}
              </span>
            ))}
            {!isHovered && safeTags.length > 4 && (
              <span className="px-2 py-1 bg-white/5 text-white/60 rounded-full text-xs font-mont transition-all duration-300">
                +{safeTags.length - 4}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Hover Indicator */}
      <div className={`mt-4 pt-3 border-t border-white/10 transition-all duration-500 relative z-10 ${
        isHovered ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2'
      }`}>
        <span className="text-cyan-400 text-sm font-mont flex items-center">
          Click to view details
          <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </div>
  );
};

// ------------------------------------------------------------------

/**
 * Enhanced Projects component with 2 cards side by side and pagination
 */
const Projects = () => {
  const containerRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageTransition, setPageTransition] = useState(false);
  
  // State for pagination - now showing 2 cards per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const cardsPerPage = 2; // Only 2 cards per page

  // State for filters and ordering
  const [filters, setFilters] = useState({
    status: '',
    technology: '',
    search: '',
    ordering: '-created_at'
  });

  // Dummy Data - Comprehensive project examples
  const dummyProjects = [
    {
      id: 1,
      title: "AI-Powered Healthcare Assistant",
      description: "An intelligent healthcare assistant that uses machine learning to provide preliminary medical diagnoses and health recommendations. The system analyzes symptoms, medical history, and provides actionable insights for patients and healthcare professionals.",
      short_description: "AI healthcare assistant for medical diagnosis and recommendations.",
      technologies: ["Python", "TensorFlow", "React", "FastAPI", "MongoDB", "Docker"],
      tags: ["healthcare", "machine-learning", "medical-ai", "nlp"],
      status: "ongoing",
      created_at: "2024-01-10T00:00:00Z"
    },
    {
      id: 2,
      title: "Autonomous Campus Delivery Robot",
      description: "A self-navigating delivery robot that autonomously transports packages across campus. Uses computer vision for obstacle detection and path planning. Capable of carrying up to 10kg of payload with real-time tracking and notification system.",
      short_description: "Self-driving robot for campus package delivery with real-time tracking.",
      technologies: ["ROS", "Python", "OpenCV", "LiDAR", "React Native", "AWS"],
      tags: ["robotics", "autonomous", "computer-vision", "iot"],
      status: "completed",
      created_at: "2023-07-20T00:00:00Z"
    },
    {
      id: 3,
      title: "Smart Classroom Attendance System",
      description: "Facial recognition-based attendance system that automatically marks student attendance using classroom cameras. Integrates with university systems and provides analytics on attendance patterns and classroom utilization.",
      short_description: "AI-powered facial recognition for automated student attendance tracking.",
      technologies: ["Python", "OpenCV", "Face Recognition API", "Django", "PostgreSQL"],
      tags: ["facial-recognition", "attendance", "computer-vision", "education"],
      status: "ongoing",
      created_at: "2024-01-25T00:00:00Z"
    },
    {
      id: 4,
      title: "Climate Change Prediction Model",
      description: "Deep learning model that predicts climate patterns and extreme weather events using historical climate data. Processes satellite imagery and sensor data to provide accurate forecasts and climate risk assessments for different regions.",
      short_description: "Deep learning model for climate pattern prediction and risk assessment.",
      technologies: ["PyTorch", "Python", "NumPy", "Pandas", "Matplotlib", "AWS S3"],
      tags: ["climate", "deep-learning", "prediction", "sustainability"],
      status: "planned",
      created_at: "2024-03-01T00:00:00Z"
    },
    {
      id: 5,
      title: "Virtual Reality Learning Platform",
      description: "Immersive VR platform for engineering education, allowing students to interact with complex 3D models and simulations. Supports multi-user collaboration and real-time interaction with virtual laboratory equipment.",
      short_description: "VR platform for immersive engineering education and collaborative learning.",
      technologies: ["Unity", "C#", "WebGL", "Three.js", "WebRTC", "Node.js"],
      tags: ["vr", "education", "simulation", "collaboration"],
      status: "completed",
      created_at: "2023-04-15T00:00:00Z"
    },
    {
      id: 6,
      title: "Blockchain-based Certificate Verification",
      description: "Decentralized system for issuing and verifying academic certificates using blockchain technology. Provides tamper-proof credential verification and eliminates certificate fraud through smart contracts and distributed ledger.",
      short_description: "Blockchain system for secure academic certificate issuance and verification.",
      technologies: ["Solidity", "Ethereum", "Web3.js", "React", "Node.js", "IPFS"],
      tags: ["blockchain", "security", "education", "web3"],
      status: "ongoing",
      created_at: "2024-01-10T00:00:00Z"
    }
  ];

  // Function to fetch data - using dummy data instead of API
  const fetchProjects = async (pageToFetch, currentFilters) => {
    // Start page transition animation
    setPageTransition(true);
    
    // Simulate API loading
    setLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    try {
      // Filter dummy data based on current filters
      let filteredProjects = [...dummyProjects];
      
      // Apply status filter
      if (currentFilters.status) {
        filteredProjects = filteredProjects.filter(project => 
          project.status === currentFilters.status
        );
      }
      
      // Apply technology filter
      if (currentFilters.technology) {
        filteredProjects = filteredProjects.filter(project =>
          project.technologies.some(tech => 
            tech.toLowerCase().includes(currentFilters.technology.toLowerCase())
          )
        );
      }
      
      // Apply search filter
      if (currentFilters.search) {
        const searchTerm = currentFilters.search.toLowerCase();
        filteredProjects = filteredProjects.filter(project =>
          project.title.toLowerCase().includes(searchTerm) ||
          project.description.toLowerCase().includes(searchTerm) ||
          project.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
      }
      
      // Apply ordering
      if (currentFilters.ordering) {
        filteredProjects.sort((a, b) => {
          if (currentFilters.ordering === '-created_at') {
            return new Date(b.created_at) - new Date(a.created_at);
          } else if (currentFilters.ordering === 'created_at') {
            return new Date(a.created_at) - new Date(b.created_at);
          } else if (currentFilters.ordering === 'name') {
            return a.title.localeCompare(b.title);
          } else if (currentFilters.ordering === '-name') {
            return b.title.localeCompare(a.title);
          }
          return 0;
        });
      }
      
      // Simulate pagination with 2 cards per page
      const startIndex = (pageToFetch - 1) * cardsPerPage;
      const endIndex = startIndex + cardsPerPage;
      const paginatedProjects = filteredProjects.slice(startIndex, endIndex);
      
      // Update total pages based on filtered results
      setTotalPages(Math.ceil(filteredProjects.length / cardsPerPage));
      
      setProjects(paginatedProjects);
      setError(null);
      
    } catch (e) {
      console.error("Error processing projects:", e);
      setError("Failed to load project data.");
      // Fallback to showing all dummy projects
      const startIndex = (pageToFetch - 1) * cardsPerPage;
      const endIndex = startIndex + cardsPerPage;
      setProjects(dummyProjects.slice(startIndex, endIndex));
    } finally {
      setLoading(false);
      // End page transition animation after a short delay
      setTimeout(() => setPageTransition(false), 300);
      // Scroll to the top of the content area on page/filter change
      containerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handler for pagination button clicks with animation
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && !pageTransition) {
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

  // Effect for Data Fetching - using dummy data
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

  // Enhanced Pagination Controls with animations
  const PaginationControls = () => {
    return (
      <div className="flex justify-center items-center mt-12 space-x-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || loading || pageTransition}
          className="px-6 py-3 bg-white/10 text-white rounded-lg disabled:opacity-50 hover:bg-white/20 transition-all duration-300 font-mont flex items-center hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/10 transform"
        >
          <svg className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>
        
        <span className={`text-white font-mont text-lg px-6 py-3 bg-white/5 rounded-lg transition-all duration-500 ${
          pageTransition ? 'scale-95 opacity-70' : 'scale-100 opacity-100'
        }`}>
          Page {currentPage} of {totalPages}
        </span>
        
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || loading || pageTransition}
          className="px-6 py-3 bg-white/10 text-white rounded-lg disabled:opacity-50 hover:bg-white/20 transition-all duration-300 font-mont flex items-center hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/10 transform"
        >
          Next
          <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    );
  };

  // Render Logic
  let content;

  if (loading) {
    content = (
      <div className="text-center py-20 col-span-full">
        <div className="flex justify-center items-center space-x-4">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white text-2xl font-mont">Loading projects...</p>
        </div>
      </div>
    );
  } else if (error) {
    content = (
      <div className="text-center py-20 col-span-full">
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 max-w-md mx-auto">
          <p className="text-red-400 text-xl font-bold mb-4">Error Loading Projects</p>
          <p className="text-white/70 mb-6">{error}</p>
          <button 
            onClick={() => fetchProjects(currentPage, filters)}
            className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-all duration-300 font-mont hover:scale-105"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  } else if (projects.length === 0) {
    content = (
      <div className="text-center py-20 col-span-full">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 max-w-md mx-auto">
          <p className="text-cyan-300 text-xl mb-4">No projects found</p>
          <p className="text-white/70 mb-6">Try adjusting your filters or search terms</p>
          <button 
            onClick={clearFilters}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-all duration-300 font-mont hover:scale-105"
          >
            Clear Filters
          </button>
        </div>
      </div>
    );
  } else {
    content = (
      <div className={`w-full transition-all duration-700 ${
        pageTransition ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}>
        {/* Two Cards Side by Side */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              delay={`${0.1 + index * 0.1}s`}
            />
          ))}
        </div>
        
        {/* Show empty state if only one project on last page */}
        {projects.length === 1 && (
          <div className="xl:grid-cols-2 gap-8">
            <div className="opacity-0"> {/* Empty spacer card */} </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div id="projects" ref={containerRef} className="min-h-screen relative bg-black overflow-hidden w-full">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[#0e0e0eff] z-0"></div>
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
          <div className="max-w-7xl mx-auto">
            {/* Main Title */}
            <div className="animate-on-scroll opacity-0 text-center mb-14">
              <h1 className="text-7xl text-white hover:scale-105 transition-all duration-300 py-2 bg-clip-text bg-gradient-to-r from-white to-cyan-200 font-mont -translate-y-4 font-semibold mb-8">
                Our Projects
              </h1>
              <p className="text-white/80 text-xl font-mont translate-y-2 max-w-2xl mx-auto">
                Exploring the frontiers of artificial intelligence through innovative projects and real-world applications
              </p>
            </div>

            {/* Filter Controls */}
            <div className="animate-on-scroll opacity-0 mb-8 bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm" style={{ animationDelay: '0.2s' }}>
              <div className="flex flex-wrap gap-4 justify-center items-center">
                {/* Status Filter */}
                <select 
                  name="status" 
                  value={filters.status} 
                  onChange={handleFilterChange}
                  className="p-3 rounded-lg bg-white/10 text-white border border-cyan-400/50 hover:bg-white/20 transition-all duration-300 font-mont hover:scale-105 focus:scale-105"
                >
                  <option value="">All Status</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="planned">Planned</option>
                </select>

                {/* Technology Filter */}
                <input 
                  type="text" 
                  name="technology" 
                  value={filters.technology} 
                  onChange={handleFilterChange} 
                  placeholder="Filter by technology..."
                  className="p-3 rounded-lg bg-white/10 text-white placeholder-white/50 border border-cyan-400/50 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 font-mont hover:scale-105 focus:scale-105"
                />

                {/* Search Filter */}
                <input 
                  type="text" 
                  name="search" 
                  value={filters.search} 
                  onChange={handleFilterChange} 
                  placeholder="Search projects..."
                  className="p-3 rounded-lg bg-white/10 text-white placeholder-white/50 border border-cyan-400/50 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 font-mont hover:scale-105 focus:scale-105"
                />

                {/* Ordering Filter */}
                <select 
                  name="ordering" 
                  value={filters.ordering} 
                  onChange={handleFilterChange}
                  className="p-3 rounded-lg bg-white/10 text-white border border-cyan-400/50 hover:bg-white/20 transition-all duration-300 font-mont hover:scale-105 focus:scale-105"
                >
                  <option value="-created_at">Newest First</option>
                  <option value="created_at">Oldest First</option>
                  <option value="name">Name A-Z</option>
                  <option value="-name">Name Z-A</option>
                </select>
              </div>
            </div>

            {/* Glass Card Container */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 transform transition-all duration-500">
              {/* Results Count */}
              {!loading && !error && projects.length > 0 && (
                <div className="text-center mb-8">
                  <p className="text-cyan-300 text-lg font-mont transition-all duration-500">
                    Showing {projects.length} project{projects.length !== 1 ? 's' : ''}
                    {filters.status && <span> • Status: {filters.status}</span>}
                    {filters.technology && <span> • Technology: {filters.technology}</span>}
                    {filters.search && <span> • Search: "{filters.search}"</span>}
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
  );
};

export default Projects;