import React, { useEffect, useRef, useState, useCallback } from 'react';

const API_BASE_URL = 'https://aiclub-bitsp.dev/api';

/**
 * Team Member Card for Carousel
 */
const TeamMemberCard = ({ name, position, image, socials, description, batch, isActive }) => {
  return (
    <div
      className={`flex-shrink-0 w-80 mx-3 transition-all duration-500 transform ${
        isActive 
          ? 'scale-105 opacity-100' 
          : 'scale-95 opacity-70'
      } hover:scale-110 hover:opacity-100`}
    >
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-500 group h-full">
        {/* Member Image with Hover Effect */}
        <div className="relative aspect-square rounded-xl overflow-hidden mb-6">
          <img
            src={image || "images/team-placeholder.jpg"}
            alt={name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-[#653A97] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

          {/* Social Links on Hover */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 flex gap-3">
            {socials?.map((social, index) => (
              <a
                key={index}
                href={social.url}
                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-indigo-500 hover:scale-110 transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className={`${social.icon} text-white text-sm`}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Member Info */}
        <div className="text-center">
          <h3 className="text-2xl text-white font-mont mb-2 group-hover:text-indigo-200 transition-colors duration-300">
            {name}
          </h3>
          <p className="text-indigo-300 font-mont font-medium mb-3 text-lg">
            {position}
          </p>
          {batch && (
            <p className="text-white/60 font-mont text-sm mb-3">
              Batch {batch}
            </p>
          )}
          <p className="text-white/70 font-mont text-sm leading-relaxed line-clamp-3">
            {description || "Passionate about advancing AI technology and building innovative solutions for real-world challenges."}
          </p>
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const visibleCards = 3; // Fixed to show exactly 3 cards per page
  
  // Filters state
  const [filters, setFilters] = useState({
    active: 'all',
    por_holders: 'all',
    batch: '',
    search: '',
    designation: '',
    ordering: 'name',
  });

  // Auto-play interval
  useEffect(() => {
    if (!autoPlay || teamMembers.length <= visibleCards) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex >= teamMembers.length - visibleCards ? 0 : prevIndex + visibleCards
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [autoPlay, teamMembers.length, visibleCards]);

  // Build API URL based on filters
  const buildApiUrl = (currentFilters) => {
    const params = new URLSearchParams();
    
    // Handle special endpoints
    if (currentFilters.por_holders === 'true' && 
        currentFilters.active === 'all' && 
        !currentFilters.batch && 
        !currentFilters.search && 
        !currentFilters.designation) {
      return `${API_BASE_URL}/members/por_holders/`;
    }
    
    // Add filter parameters
    if (currentFilters.active !== 'all') {
      params.append('active', currentFilters.active);
    }
    if (currentFilters.por_holders !== 'all') {
      params.append('por_holders', currentFilters.por_holders);
    }
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
    return `${API_BASE_URL}/members/${queryString ? `?${queryString}` : ''}`;
  };

  // Fetch team members
  const fetchTeamMembers = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    const apiURL = buildApiUrl(filters);
    
    try {
      console.log('Fetching from:', apiURL);
      
      const response = await fetch(apiURL); 
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Handle different response formats
      let membersData = data;
      if (Array.isArray(data.results)) {
        membersData = data.results;
      } else if (Array.isArray(data.members)) {
        membersData = data.members;
      }
      
      const formattedMembers = membersData.map(member => ({
        id: member.id,
        name: member.name,
        position: member.designation, 
        description: member.bio || member.description,    
        image: member.image_url || member.image,    
        socials: member.social_links?.map(social => ({ 
          icon: social.icon_class || social.icon, 
          url: social.url
        })) || [],
        batch: member.batch,
        joined_date: member.joined_date,
        active: member.active
      }));
      
      setTeamMembers(formattedMembers);
      setCurrentIndex(0);
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
  const nextSlide = () => {
    if (teamMembers.length <= visibleCards) return;
    setCurrentIndex(currentIndex >= teamMembers.length - visibleCards ? 0 : currentIndex + visibleCards);
  };

  const prevSlide = () => {
    if (teamMembers.length <= visibleCards) return;
    setCurrentIndex(currentIndex === 0 ? teamMembers.length - visibleCards : currentIndex - visibleCards);
  };

  const goToSlide = (pageIndex) => {
    setCurrentIndex(pageIndex * visibleCards);
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

  // Get visible cards for carousel
  const getVisibleCards = () => {
    if (teamMembers.length === 0) return [];
    
    const cards = [];
    const totalCards = teamMembers.length;
    
    // Show exactly 3 cards
    for (let i = 0; i < Math.min(visibleCards, totalCards - currentIndex); i++) {
      const index = currentIndex + i;
      if (index < totalCards) {
        cards.push({
          ...teamMembers[index],
          isActive: true
        });
      }
    }
    
    // If we're at the end and don't have 3 cards, loop back to start
    if (cards.length < visibleCards) {
      const remaining = visibleCards - cards.length;
      for (let i = 0; i < remaining; i++) {
        cards.push({
          ...teamMembers[i],
          isActive: true
        });
      }
    }
    
    return cards;
  };

  // Calculate total pages
  const totalPages = Math.ceil(teamMembers.length / visibleCards);
  const currentPage = Math.floor(currentIndex / visibleCards) + 1;

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
        {teamMembers.length > visibleCards && (
          <div className="flex items-center justify-center mb-8 space-x-6">
            <button
              onClick={prevSlide}
              onMouseEnter={() => setAutoPlay(false)}
              onMouseLeave={() => setAutoPlay(true)}
              className="p-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-indigo-500/20"
            >
              <i className="fas fa-chevron-left text-lg"></i>
            </button>
            
            <span className="text-white font-mont text-lg px-6 py-3 bg-white/5 rounded-lg">
              Page {currentPage} of {totalPages} • Showing {visibleCards} members
            </span>
            
            <button
              onClick={nextSlide}
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
          className="flex items-center justify-center transition-transform duration-500 ease-out"
        >
          {visibleMemberCards.map((member, index) => (
            <TeamMemberCard
              key={`${member.id}-${currentIndex}-${index}`}
              {...member}
            />
          ))}
        </div>

        {/* Carousel Indicators */}
        {teamMembers.length > visibleCards && (
          <div className="flex justify-center mt-8 space-x-3">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                onMouseEnter={() => setAutoPlay(false)}
                onMouseLeave={() => setAutoPlay(true)}
                className={`w-10 h-3 rounded-full transition-all duration-300 ${
                  currentPage === index + 1
                    ? 'bg-indigo-400 w-12' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
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
              <h1 className="text-7xl hover:scale-105 transition-all duration-300 text-transparent translate-y-2 bg-clip-text bg-gradient-to-r from-white to-indigo-200 font-mont font-semibold mb-8">
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