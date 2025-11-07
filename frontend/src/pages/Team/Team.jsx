import React, { useEffect, useRef, useState, useCallback } from 'react';

// Base URL for the external API
const API_BASE_URL = 'https://aiclub-bitsp.dev/api';

/**
 * Team Member Card for Carousel
 * Includes a robust image URL fallback to a placeholder.
 */
const TeamMemberCard = ({ name, position, image, socials, batch, isActive }) => {
    // Use a placeholder URL if the image prop is missing or null
    const finalImage = image || "https://placehold.co/400x400/1E293B/FFFFFF?text=No+Photo";
    
    return (
        <div
            className={`flex-shrink-0 w-80 mx-3 transition-all duration-500 transform ${
                isActive 
                    ? 'scale-105 opacity-100' 
                    : 'scale-95 opacity-70'
            } hover:scale-110 hover:opacity-100`}
        >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-500 group h-full shadow-lg">
                {/* Member Image with Hover Effect */}
                <div className="relative aspect-square rounded-xl overflow-hidden mb-6">
                    <img
                        src={finalImage}
                        alt={name}
                        // Fallback in case the provided URL is bad (though placeholder should load)
                        onError={(e) => {
                             e.target.onerror = null; 
                             e.target.src = "https://placehold.co/400x400/653A97/FFFFFF?text=Image+Error";
                        }}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-[#653A97] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

                    {/* Social Links on Hover */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 flex gap-3">
                        {socials?.map((social, index) => (
                            <a
                                key={index}
                                href={social.url}
                                className="w-10 h-10 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-indigo-500 hover:scale-110 transition-all duration-300"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {/* Assuming Font Awesome or similar classes are available */}
                                <i className={`${social.icon} text-white text-base`}></i>
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
    const [currentPage, setCurrentPage] = useState(0); 
    const [autoPlay, setAutoPlay] = useState(true);
    // Use a responsive number of cards per page based on screen size (handled by Tailwind)
    const cardsPerPage = 3; 

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

    /**
     * Helper function to build the initial API URL based on current filters.
     */
    const buildApiUrl = (currentFilters) => {
        const params = new URLSearchParams();
        
        // Handle special por_holders endpoint if no other major filters are active
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
        // Return the final URL
        return `${API_BASE_URL}/members/${queryString ? `?${queryString}` : ''}`;
    };

    /**
     * Fetches all pages of data from the API using the next link.
     */
    const fetchTeamMembers = useCallback(async () => {
        setLoading(true);
        setError(null);
        
        let currentURL = buildApiUrl(filters);
        let allMembers = [];
        
        // Exponential backoff setup (1s, 2s, 4s, 8s max)
        const maxRetries = 4;
        let retries = 0;

        try {
            while (currentURL) {
                let success = false;
                let data = null;

                for (retries = 0; retries < maxRetries; retries++) {
                    try {
                        console.log(`Fetching from: ${currentURL} (Attempt ${retries + 1})`);
                        const response = await fetch(currentURL); 
                        
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        
                        data = await response.json();
                        success = true;
                        break; // Exit retry loop on success

                    } catch (e) {
                        if (retries < maxRetries - 1) {
                            const delay = Math.pow(2, retries) * 1000;
                            await new Promise(resolve => setTimeout(resolve, delay));
                        } else {
                            throw e; // Throw the error if max retries reached
                        }
                    }
                }
                
                if (!success || !data) break; // Should not happen, but safety break

                // Extract members from the current page
                let membersData = [];
                if (Array.isArray(data.results)) {
                    membersData = data.results; // Standard DRF pagination
                } else if (Array.isArray(data.members)) {
                    membersData = data.members; // Alternate array key
                } else if (Array.isArray(data)) {
                    membersData = data; // Non-paginated response
                }
                
                allMembers = [...allMembers, ...membersData];
                
                // Set the URL for the next iteration (data.next will be null when done)
                currentURL = data.next || null;
                
                // If response is not paginated (no 'next' and no 'results'), break after first fetch
                if (!data.next && !data.results && Array.isArray(data)) {
                    break;
                }
            } // End of while loop
            
            // --- Process All Collected Members ---
            const formattedMembers = allMembers.map(member => ({
                id: member.id,
                name: member.name,
                position: member.designation, 
                description: member.bio || member.description,     
                // Check multiple possible keys for the image URL
                image: member.image_url || member.image || member.profile_pic,     
                socials: member.social_links?.map(social => ({ 
                    icon: social.icon_class || social.icon, 
                    url: social.url
                })) || [],
                batch: member.batch,
                joined_date: member.joined_date,
                active: member.active
            }));
            
            setTeamMembers(formattedMembers);
            setCurrentPage(0); // Reset to the first page after successful fetch
        } catch (e) {
            console.error("Failed to fetch team members:", e);
            setError("Failed to load team data after multiple retries. Please check the API connection.");
        } finally {
            setLoading(false);
        }
    }, [filters, buildApiUrl]);

    // Trigger fetch when filters change
    useEffect(() => {
        fetchTeamMembers();
    }, [fetchTeamMembers]);
    
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

    // Navigation functions
    const nextPage = () => {
        if (totalPages <= 1) return;
        setCurrentPage(currentPage === totalPages - 1 ? 0 : currentPage + 1);
        setAutoPlay(false); // Stop autoplay on manual interaction
    };

    const prevPage = () => {
        if (totalPages <= 1) return;
        setCurrentPage(currentPage === 0 ? totalPages - 1 : currentPage - 1);
        setAutoPlay(false); // Stop autoplay on manual interaction
    };

    const goToPage = (pageIndex) => {
        setCurrentPage(pageIndex);
        setAutoPlay(false); // Stop autoplay on manual interaction
    };

    // Filter handlers
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        // Reset page to 0 whenever filters change
        setCurrentPage(0); 
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    // Clear all filters
    const clearFilters = () => {
        setCurrentPage(0);
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
        // Only mark members on the current page as "active" for the carousel effect
        for (let i = startIndex; i < endIndex; i++) {
            cards.push({
                ...teamMembers[i],
                isActive: true
            });
        }
        
        return cards;
    };

    // Get unique, sorted batch options from current members for the filter dropdown
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
                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all duration-300 font-mont hover:scale-105 shadow-md"
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
                        className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-all duration-300 font-mont hover:scale-105 shadow-md"
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
                            aria-label="Previous Page"
                        >
                            <i className="fas fa-chevron-left text-lg"></i>
                        </button>
                        
                        <span className="text-white font-mont text-lg px-6 py-3 bg-white/5 rounded-lg border border-white/10 shadow-inner">
                            Page {currentDisplayNumber} of {totalPages} 
                        </span>
                        
                        <button
                            onClick={nextPage}
                            onMouseEnter={() => setAutoPlay(false)}
                            onMouseLeave={() => setAutoPlay(true)}
                            className="p-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-indigo-500/20"
                            aria-label="Next Page"
                        >
                            <i className="fas fa-chevron-right text-lg"></i>
                        </button>
                    </div>
                )}

                {/* Carousel Display */}
                <div 
                    ref={carouselRef}
                    className="flex items-center justify-center transition-transform duration-500 ease-out"
                >
                    {visibleMemberCards.map((member, index) => (
                        <TeamMemberCard
                            key={`${member.id}-${currentPage}-${index}`}
                            {...member}
                        />
                    ))}
                </div>

                {/* Carousel Indicators */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-8 space-x-3">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => goToPage(index)}
                                onMouseEnter={() => setAutoPlay(false)}
                                onMouseLeave={() => setAutoPlay(true)}
                                aria-label={`Go to page ${index + 1}`}
                                className={`w-10 h-3 rounded-full transition-all duration-300 ${
                                    currentPage === index
                                        ? 'bg-indigo-400 w-12 shadow-md shadow-indigo-500/50' 
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
        <section id="team" ref={containerRef} className="relative w-full bg-black min-h-screen flex items-center overflow-hidden font-inter">
            {/* Load Font Awesome for social icons */}
            <script src="https://kit.fontawesome.com/a076d05399.js" crossOrigin="anonymous"></script>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />

            {/* Background elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-[#0e0e0eff]" />
                {/* Subtle radial glow effect */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-900/10 via-transparent to-transparent opacity-50" />
            </div>

            {/* Content */}
            <div className="relative z-10 py-20 w-full">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Main Title */}
                        <div className="text-center mb-16">
                            <h1 className="text-7xl font-extrabold hover:scale-105 transition-all duration-300 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-white font-mont mb-8">
                                Our Team
                            </h1>
                            <p className="text-white/80 text-xl font-inter max-w-3xl mx-auto leading-relaxed">
                                Meet the passionate minds driving innovation in artificial intelligence
                            </p>
                        </div>
                        
                        {/* Filter Controls */}
                        <div className="mb-12 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm shadow-2xl">
                            <div className="flex flex-wrap gap-4 justify-center items-center">
                                {/* Active Status Filter */}
                                <select 
                                    name="active" 
                                    value={filters.active} 
                                    onChange={handleFilterChange}
                                    className="p-3 rounded-xl bg-white/10 text-white border border-indigo-400/50 hover:bg-white/20 transition-all duration-300 font-inter appearance-none cursor-pointer shadow-inner"
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
                                    className="p-3 rounded-xl bg-white/10 text-white border border-indigo-400/50 hover:bg-white/20 transition-all duration-300 font-inter appearance-none cursor-pointer shadow-inner"
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
                                    className="p-3 rounded-xl bg-white/10 text-white border border-indigo-400/50 hover:bg-white/20 transition-all duration-300 font-inter appearance-none cursor-pointer shadow-inner"
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
                                    className="p-3 rounded-xl bg-white/10 text-white border border-indigo-400/50 hover:bg-white/20 transition-all duration-300 font-inter appearance-none cursor-pointer shadow-inner"
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
                                    className="p-3 rounded-xl bg-white/10 text-white placeholder-white/50 border border-indigo-400/50 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 w-full sm:w-64 font-inter hover:bg-white/20 shadow-inner"
                                />

                                <input 
                                    type="text" 
                                    name="designation" 
                                    value={filters.designation} 
                                    onChange={handleFilterChange} 
                                    placeholder="Filter by designation..."
                                    className="p-3 rounded-xl bg-white/10 text-white placeholder-white/50 border border-indigo-400/50 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 w-full sm:w-64 font-inter hover:bg-white/20 shadow-inner"
                                />

                                {/* Clear Filters Button */}
                                <button
                                    onClick={clearFilters}
                                    className="p-3 px-6 rounded-xl bg-indigo-500/80 hover:bg-indigo-600 text-white transition-all duration-300 font-inter shadow-md hover:scale-105"
                                >
                                    <i className="fas fa-filter mr-2"></i> Reset Filters
                                </button>
                            </div>
                        </div>

                        {/* Carousel Container */}
                        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20 transform transition-all duration-500">
                            {content}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Team;