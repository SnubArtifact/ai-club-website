import React, { useEffect, useRef, useState, useCallback } from 'react';

const API_BASE_URL = 'https://aiclub-bitsp.dev/api';

/**
 * Team Member Card for Carousel
 */
const TeamMemberCard = ({ name, position, image, socials, batch, isActive }) => {
  return (
    <div
      className={`flex-shrink-0 w-full max-w-xs sm:w-72 md:w-80 mx-3 transition-all duration-500 transform ${
        isActive ? "scale-105 opacity-100" : "scale-95 opacity-70"
      } hover:scale-105 hover:opacity-100`}
    >
          <div className="relative flex flex-col justify-between bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-[2px] border border-white/10 hover:border-indigo-400/40 shadow-lg hover:shadow-indigo-400/20 transition-all duration-500 group h-auto sm:h-[480px]">
        
        {/* Outer Glow Animation */}
        <div className="absolute inset-0 rounded-2xl bg-[linear-gradient(120deg,#6366f1,#a855f7,#6366f1)] bg-[length:200%_200%] opacity-0 group-hover:opacity-40 blur-xl animate-gradient-move"></div>
        
        {/* Inner Card */}
        <div className="relative z-10 flex flex-col justify-between items-center bg-black/70 rounded-2xl p-6 h-full">
          
          {/* Image */}
          <div className="relative w-40 h-40 sm:w-60 sm:h-60 rounded-full overflow-hidden border-4 border-indigo-400/40 shadow-[0_0_20px_rgba(99,102,241,0.4)] group-hover:border-indigo-300 transition-all duration-500">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-700"
            />
          </div>

          {/* Info */}
          <div className="text-center flex flex-col items-center justify-center flex-grow mt-6">
            <h3 className="text-xl font-semibold font-mont text-white leading-tight mb-2 text-balance text-center px-2">
              {name}
            </h3>
            <p className="text-indigo-300 font-medium text-base mb-2">{position}</p>
            {batch && (
              <p className="text-white/60 text-sm mb-4">Batch {batch}</p>
            )}
          </div>

          {/* Socials */}
          <div className="flex justify-center gap-3 mt-2">
            {socials?.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-tr from-indigo-600 to-purple-500 text-white hover:scale-110 hover:shadow-[0_0_15px_rgba(99,102,241,0.6)] transition-all duration-300"
              >
                <i className={`${social.icon} text-sm`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Carousel Team Component
 */
const Team = () => {
  const containerRef = useRef(null);
  const carouselRef = useRef(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0); // Now using page index instead of card index
  const [autoPlay, setAutoPlay] = useState(true);
  const cardsPerPage = 3; // Fixed to show exactly 3 cards per page
  
  // Filters state
  const [filters, setFilters] = useState({
    active: 'all',
    por_holders: 'all',
    batch: '',
    search: '',
    designation: '',
    ordering: 'name',
  });

  // Calculate total pages
  const totalPages = Math.ceil(teamMembers.length / cardsPerPage);

  // Auto-play interval
  useEffect(() => {
    if (!autoPlay || totalPages <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentPage((prevPage) => 
        prevPage === totalPages - 1 ? 0 : prevPage + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [autoPlay, totalPages]);

 // ... inside the Team component

// Build API URL based on filters
const buildApiUrl = (currentFilters) => {
    const params = new URLSearchParams();
    
    // Handle special endpoints (if por_holders=true and no other filters)
    if (currentFilters.por_holders === 'true' && 
        currentFilters.active === 'all' && 
        !currentFilters.batch && 
        !currentFilters.search && 
        !currentFilters.designation) {
      return `${API_BASE_URL}/members/por_holders/`;
    }
    
    // Add filter parameters to URLSearchParams
    if (currentFilters.active !== 'all') {
      params.append('active', currentFilters.active);
    }
    if (currentFilters.por_holders !== 'all') {
      params.append('por_holders', currentFilters.por_holders);
    }
    // ... (other filters like batch, designation, search, ordering)
    if (currentFilters.batch) {
      params.append('batch', currentFilters.batch);
    }
    if (currentFilters.designation) {
      params.append('designation', currentFilters.designation);
    }
    if (currentFilters.search) {
      params.append('search', currentFilters.search);
    }
    if (currentFilters.ordering) {
      params.append('ordering', currentFilters.ordering);
    }
    
    const queryString = params.toString();
    // Return the final URL
    return `${API_BASE_URL}/members/${queryString ? `?${queryString}` : ''}`;
};
  // Fetch team members
  // Fetch team members with pagination support
const fetchTeamMembers = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    // Start with the initial URL based on filters
    let currentURL = buildApiUrl(filters);
    let allMembers = [];
    
    try {
        while (currentURL) {
            console.log('Fetching from:', currentURL);
            
            const response = await fetch(currentURL); 
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Extract members from the current page
            let membersData = [];
            if (Array.isArray(data.results)) {
                membersData = data.results; // Standard DRF pagination
            } else if (Array.isArray(data.members)) {
                membersData = data.members; // Alternate array key
            } else if (Array.isArray(data)) {
                membersData = data; // Non-paginated response for the first run
            }
            
            // Add members from the current page to the total list
            allMembers = [...allMembers, ...membersData];
            
            // Set the URL for the next iteration (data.next will be null when done)
            currentURL = data.next || null;
            
            // OPTIONAL: If the response is not paginated, break the loop after the first fetch
            if (!data.next && !data.results) {
                break;
            }
        } // End of while loop
        
        // --- Process All Collected Members ---
const formattedMembers = allMembers.map(member => {
  // Decide which image field to use
  let image = null;

  if (member.photo_link) {
    // Direct external URL (e.g., Google Drive, Cloudinary)
    image = member.photo_link;
  } else if (member.photo_file) {
    // Uploaded image file (relative /media path)
    image = member.photo_file.startsWith('http')
      ? member.photo_file
      : `${API_BASE_URL.replace('/api', '')}${member.photo_file}`;
  } else if (member.image || member.image_url) {
    // Future-proofing in case serializer uses other names
    image = member.image || member.image_url;
  } else {
    // Fallback placeholder
    image = 'https://via.placeholder.com/400x400?text=AI+Club+Member';
  }

  // Build socials cleanly
  const socials = [];
  if (member.github_link) {
    socials.push({ icon: 'fab fa-github', url: member.github_link });
  }
  if (member.linkedin_link) {
    socials.push({ icon: 'fab fa-linkedin-in', url: member.linkedin_link });
  }

  return {
    id: member.id,
    name: member.name,
    position: member.designation,
    description: member.bio || '',
    image,
    socials,
    batch: member.batch,
    joined_date: member.joined_date,
    active: member.is_active, // your model field name
  };
});

        
        setTeamMembers(formattedMembers);
        setCurrentPage(0); // Reset to the first page after successful fetch
    } catch (e) {
        console.error("Failed to fetch team members:", e);
        setError("Failed to load team data. Please try again later.");
    } finally {
        setLoading(false);
    }
}, [filters]);
  useEffect(() => {
    fetchTeamMembers();
  }, [fetchTeamMembers]);

  // Navigation functions
  const nextPage = () => {
    if (totalPages <= 1) return;
    setCurrentPage(currentPage === totalPages - 1 ? 0 : currentPage + 1);
  };

  const prevPage = () => {
    if (totalPages <= 1) return;
    setCurrentPage(currentPage === 0 ? totalPages - 1 : currentPage - 1);
  };

  const goToPage = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  // Filter handlers
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      active: 'all',
      por_holders: 'all',
      batch: '',
      search: '',
      designation: '',
      ordering: 'name',
    });
  };

  // Get visible cards for current page
  const getVisibleCards = () => {
    if (teamMembers.length === 0) return [];
    
    const startIndex = currentPage * cardsPerPage;
    const endIndex = Math.min(startIndex + cardsPerPage, teamMembers.length);
    
    const cards = [];
    for (let i = startIndex; i < endIndex; i++) {
      cards.push({
        ...teamMembers[i],
        isActive: true
      });
    }
    
    return cards;
  };

  // Get batch options from current members
  const batchOptions = [...new Set(teamMembers.map(member => member.batch).filter(batch => batch))].sort();

  // Render content based on state
  let content;

  if (loading) {
    content = (
      <div className="text-center py-20">
        <div className="flex justify-center items-center space-x-4">
          <div className="w-12 h-12 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white text-xl font-mont">Loading team members...</p>
        </div>
      </div>
    );
  } else if (error) {
    content = (
      <div className="text-center py-20">
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 max-w-md mx-auto">
          <p className="text-red-400 text-xl font-bold mb-4">Connection Issue</p>
          <p className="text-white/70 mb-6">{error}</p>
          <button 
            onClick={fetchTeamMembers}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all duration-300 font-mont hover:scale-105"
          >
            Retry Loading
          </button>
        </div>
      </div>
    );
  } else if (teamMembers.length === 0) {
    content = (
      <div className="text-center py-20">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 max-w-md mx-auto">
          <p className="text-indigo-300 text-xl mb-4">No members found</p>
          <p className="text-white/70 mb-6">Try adjusting your filters or search terms</p>
          <button 
            onClick={clearFilters}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-all duration-300 font-mont hover:scale-105"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    );
  } else {
    const visibleMemberCards = getVisibleCards();
    const currentDisplayNumber = currentPage + 1;
    
    content = (
      <div className="relative">
        {/* Results Count */}
        <div className="text-center mb-8">
          <p className="text-indigo-300 text-lg font-mont">
            Showing <strong>{teamMembers.length}</strong> member{teamMembers.length !== 1 ? 's' : ''}
            {filters.batch && <span> • Batch: <strong>{filters.batch}</strong></span>}
            {filters.designation && <span> • Designation: <strong>{filters.designation}</strong></span>}
            {filters.search && <span> • Search: <strong>"{filters.search}"</strong></span>}
          </p>
        </div>

        {/* Carousel Navigation */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center mb-8 space-x-6">
            <button
              onClick={prevPage}
              onMouseEnter={() => setAutoPlay(false)}
              onMouseLeave={() => setAutoPlay(true)}
              className="p-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-indigo-500/20"
            >
              <i className="fas fa-chevron-left text-lg"></i>
            </button>
            
            <span className="text-white font-mont text-lg px-6 py-3 bg-white/5 rounded-lg">
              Page {currentDisplayNumber} of {totalPages} • Showing {visibleMemberCards.length} of {teamMembers.length} members
            </span>
            
            <button
              onClick={nextPage}
              onMouseEnter={() => setAutoPlay(false)}
              onMouseLeave={() => setAutoPlay(true)}
              className="p-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-indigo-500/20"
            >
              <i className="fas fa-chevron-right text-lg"></i>
            </button>
          </div>
        )}

        {/* Carousel */}
        <div 
          ref={carouselRef}
          className="flex flex-wrap items-center justify-center gap-4 transition-transform duration-500 ease-out"
        >
          {visibleMemberCards.map((member, index) => (
            <TeamMemberCard
              key={`${member.id}-${currentPage}-${index}`}
              {...member}
            />
          ))}
        </div>

{/* Carousel Indicators */}
<div className="
  mt-8 
  max-w-full 
  overflow-x-auto 
  no-scrollbar-mobile   /* NEW */
  px-4 
  touch-pan-x           /* smooth touch scroll */
  scroll-smooth 
">
  <div className="flex gap-3 w-max mx-auto">
    {Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index}
        onClick={() => goToPage(index)}
        onMouseEnter={() => setAutoPlay(false)}
        onMouseLeave={() => setAutoPlay(true)}
        className={`w-10 h-3 rounded-full flex-shrink-0 transition-all duration-300 ${
          currentPage === index
            ? "bg-indigo-400 w-12"
            : "bg-white/30 hover:bg-white/50"
        }`}
      />
    ))}
  </div>
</div>

      </div>
    );
  }

  return (
    <section id="team" ref={containerRef} className="relative w-full bg-black overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[#0e0e0eff]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent animate-pulse" />
        <img
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
          src="images/landingimg.png"
          alt="Team Background"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Main Title */}
            <div className="text-center mb-16">
              <h1 className="site-h1 hover:scale-105 transition-all duration-300 text-transparent translate-y-2 bg-clip-text bg-gradient-to-r from-white to-indigo-200 font-mont mb-8">
                Our Team
              </h1>
              <p className="text-white/80 text-xl font-mont max-w-3xl mx-auto leading-relaxed">
                Meet the passionate minds driving innovation in artificial intelligence
              </p>
            </div>
            
            {/* Filter Controls */}
            <div className="mb-12 bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
              <div className="flex flex-wrap gap-4 justify-center items-center">
                {/* Active Status Filter */}
                <select 
                  name="active" 
                  value={filters.active} 
                  onChange={handleFilterChange}
                  className="p-3 rounded-lg bg-white/10 text-white border border-indigo-400/50 hover:bg-white/20 transition-all duration-300 font-mont hover:scale-105"
                >
                  <option value="all">All Members</option>
                  <option value="true">Active Only</option>
                  <option value="false">Inactive Only</option>
                </select>

                {/* POR Holders Filter */}
                <select 
                  name="por_holders" 
                  value={filters.por_holders} 
                  onChange={handleFilterChange}
                  className="p-3 rounded-lg bg-white/10 text-white border border-indigo-400/50 hover:bg-white/20 transition-all duration-300 font-mont hover:scale-105"
                >
                  <option value="all">All Roles</option>
                  <option value="true">POR Holders</option>
                  <option value="false">Members</option>
                </select>

                {/* Batch Filter */}
                <select 
                  name="batch" 
                  value={filters.batch} 
                  onChange={handleFilterChange}
                  className="p-3 rounded-lg bg-white/10 text-white border border-indigo-400/50 hover:bg-white/20 transition-all duration-300 font-mont hover:scale-105"
                >
                  <option value="">All Batches</option>
                  {batchOptions.map(batch => (
                    <option key={batch} value={batch}>Batch {batch}</option>
                  ))}
                </select>

                {/* Ordering */}
                <select 
                  name="ordering" 
                  value={filters.ordering} 
                  onChange={handleFilterChange}
                  className="p-3 rounded-lg bg-white/10 text-white border border-indigo-400/50 hover:bg-white/20 transition-all duration-300 font-mont hover:scale-105"
                >
                  <option value="name">Name A-Z</option>
                  <option value="-name">Name Z-A</option>
                  <option value="batch">Batch (Oldest)</option>
                  <option value="-batch">Batch (Newest)</option>
                </select>
              </div>

              {/* Search and Designation Row */}
              <div className="flex flex-wrap gap-4 justify-center mt-4">
                <input 
                  type="text" 
                  name="search" 
                  value={filters.search} 
                  onChange={handleFilterChange} 
                  placeholder="Search names, positions, bio..."
                  className="p-3 rounded-lg bg-white/10 text-white placeholder-white/50 border border-indigo-400/50 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 min-w-64 font-mont hover:scale-105 focus:scale-105"
                />

                <input 
                  type="text" 
                  name="designation" 
                  value={filters.designation} 
                  onChange={handleFilterChange} 
                  placeholder="Filter by designation..."
                  className="p-3 rounded-lg bg-white/10 text-white placeholder-white/50 border border-indigo-400/50 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 min-w-64 font-mont hover:scale-105 focus:scale-105"
                />

                {/* Clear Filters Button */}
                <button
                  onClick={clearFilters}
                  className="p-3 px-6 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all duration-300 font-mont hover:scale-105"
                >
                  Clear Filters
                </button>
              </div>
            </div>

            {/* Carousel Container */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 transform transition-all duration-500">
              {content}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;