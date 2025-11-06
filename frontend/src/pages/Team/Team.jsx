import React, { useEffect, useRef, useState, useCallback } from 'react';

const API_BASE_URL = 'https://aiclub-bitsp.dev/api';

/**
 * Team Member Card for Carousel
 */
const TeamMemberCard = ({ name, position, image, socials, description, isActive }) => {
  return (
    <div
      className={`flex-shrink-0 w-80 mx-4 transition-all duration-500 transform ${
        isActive 
          ? 'scale-105 opacity-100' 
          : 'scale-95 opacity-60'
      }`}
    >
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-500 group">
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
          <h3 className="text-2xl text-white font-mont  mb-2 group-hover:text-indigo-200 transition-colors duration-300">
            {name}
          </h3>
          <p className="text-indigo-300 font-mont font-medium mb-3 text-lg">
            {position}
          </p>
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
  
  // Filters state
  const [filters, setFilters] = useState({
    active: 'all', // 'true', 'false', or 'all'
    por_holders: 'all', // 'true', 'false', or 'all'
    batch: '',
    search: '',
    designation: '',
    ordering: 'name',
  });

  // Auto-play interval
  useEffect(() => {
    if (!autoPlay || teamMembers.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === teamMembers.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [autoPlay, teamMembers.length]);

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
      console.log('Fetching from:', apiURL); // For debugging
      
      const response = await fetch(apiURL); 
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Handle different response formats
      let membersData = data;
      if (Array.isArray(data.results)) {
        membersData = data.results; // Handle paginated responses
      } else if (Array.isArray(data.members)) {
        membersData = data.members; // Handle nested responses
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
      setCurrentIndex(0); // Reset to first slide when filters change
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
    setCurrentIndex(currentIndex === teamMembers.length - 1 ? 0 : currentIndex + 1);
  };

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? teamMembers.length - 1 : currentIndex - 1);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
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

  // Team stats
  const teamStats = [
    { number: "20+", label: "Active Members" },
    { number: "15+", label: "Projects Completed" },
    { number: "10+", label: "Research Papers" },
    { number: "25+", label: "Workshops Hosted" }
  ];

  // Calculate visible cards (show 3 cards at a time)
  const getVisibleCards = () => {
    if (teamMembers.length === 0) return [];
    
    const cards = [];
    const totalCards = teamMembers.length;
    
    // Show 3 cards: previous, current, next
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + totalCards) % totalCards;
      cards.push({
        ...teamMembers[index],
        isActive: i === 0 // Center card is active
      });
    }
    
    return cards;
  };

  // Get batch options from current members
  const batchOptions = [...new Set(teamMembers.map(member => member.batch).filter(Batch => Batch))].sort();

  // Render content based on state
  let content;

  if (loading) {
    content = (
      <div className="text-center py-20">
        <p className="text-white text-xl">Loading team data...</p>
        <div className="mt-4 w-8 h-8 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    );
  } else if (error) {
    content = (
      <div className="text-center py-20">
        <p className="text-red-400 text-xl font-bold">{error}</p>
        <button 
          onClick={fetchTeamMembers}
          className="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-300"
        >
          Retry
        </button>
      </div>
    );
  } else if (teamMembers.length === 0) {
    content = (
      <div className="text-center py-20">
        <p className="text-indigo-300 text-xl mb-4">No members found matching the criteria.</p>
        <button 
          onClick={clearFilters}
          className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-colors duration-300"
        >
          Clear Filters
        </button>
      </div>
    );
  } else {
    const visibleCards = getVisibleCards();
    
    content = (
      <div className="relative">
       

        {/* Carousel Navigation */}
        <div className="flex items-center justify-center mb-8">
          <button
            onClick={prevSlide}
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all duration-300 mr-4 hover:scale-110"
            disabled={teamMembers.length <= 1}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          
          <button
            onClick={nextSlide}
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all duration-300 hover:scale-110"
            disabled={teamMembers.length <= 1}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>

        {/* Carousel */}
        <div 
          ref={carouselRef}
          className="flex items-center justify-center transition-transform duration-500 ease-out"
        >
          {visibleCards.map((member, index) => (
            <TeamMemberCard
              key={`${member.id}-${index}`}
              {...member}
            />
          ))}
        </div>

        {/* Carousel Indicators */}
        {teamMembers.length > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {teamMembers.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                onMouseEnter={() => setAutoPlay(false)}
                onMouseLeave={() => setAutoPlay(true)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-indigo-400 w-8' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Current Member Info */}
        <div className="text-center mt-8">
          <img
            src={teamMembers[currentIndex]?.image || "images/team-placeholder.jpg"} />
          <h3 className="text-2xl text-white font-bold">
            {teamMembers[currentIndex]?.name}
          </h3>
          <p className="text-indigo-300 mt-2">
            {teamMembers[currentIndex]?.position}
          </p>
          {teamMembers[currentIndex]?.batch && (
            <p className="text-white/50 text-sm mt-1">
              Batch: {teamMembers[currentIndex]?.batch}
            </p>
          )}
          <p className="text-white/70 mt-4 max-w-2xl mx-auto leading-relaxed">
            {teamMembers[currentIndex]?.description}
          </p>
        </div>
      </div>
    );
  }

  return (
    <section id="team" ref={containerRef} className="min-h-screen w-full relative bg-black overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[#0e0e0eff] z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent animate-pulse"></div>

      <img
        className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
        src="images/landingimg.png"
        alt="Team Background"
      
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Main Title */}
            <div className="text-center mb-16">
              <h1 className="text-7xl  hover:scale-105 transition-all duration-300 text-transparent translate-y-2 bg-clip-text bg-gradient-to-r from-white to-indigo-200 font-mont font-semibold mb-8">
                Our Team
              </h1>
              <p className="text-white/80 text-xl font-mont max-w-3xl mx-auto leading-relaxed">
                Meet the passionate minds driving innovation in artificial intelligence
              </p>
            </div>
            
            {/* Filter Controls */}
            <div className="mb-12 bg-white/5 p-6 rounded-lg border border-white/10">
              <div className="flex flex-wrap gap-4 justify-center mb-4">
               

                

                {/* Batch Filter */}
                <select 
                  name="batch" 
                  value={filters.batch} 
                  onChange={handleFilterChange}
                  className="p-2 rounded bg-white/10 text-white border border-indigo-400/50 hover:bg-white/20 transition duration-300"
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
                  className="p-2 rounded bg-white/10 text-white border border-indigo-400/50 hover:bg-white/20 transition duration-300"
                >
                  <option value="name">Name A-Z</option>
                  <option value="-name">Name Z-A</option>
                  <option value="batch">Batch (Oldest)</option>
                  <option value="-batch">Batch (Newest)</option>
                 
                </select>
              </div>

              {/* Search and Designation Row */}
              <div className="flex flex-wrap gap-4 justify-center">
                <input 
                  type="text" 
                  name="search" 
                  value={filters.search} 
                  onChange={handleFilterChange} 
                  placeholder="Search names, positions, bio..."
                  className="p-2 rounded bg-white/10 text-white placeholder-white/50 border border-indigo-400/50 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 min-w-64"
                />

                <input 
                  type="text" 
                  name="designation" 
                  value={filters.designation} 
                  onChange={handleFilterChange} 
                  placeholder="Filter by designation..."
                  className="p-2 rounded bg-white/10 text-white placeholder-white/50 border border-indigo-400/50 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 min-w-64"
                />

                {/* Clear Filters Button */}
                <button
                  onClick={clearFilters}
                  className="p-2 px-4 rounded bg-white/10 hover:bg-white/20 text-white border border-white/20 transition duration-300"
                >
                  Clear Filters
                </button>
              </div>
            </div>

            {/* Carousel Content */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/20 min-h-96">
              {content}
            </div>

          
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;