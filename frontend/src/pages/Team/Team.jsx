import React, { useEffect, useRef, useState } from 'react';
// Assuming the CSS for 'animate-on-scroll' and 'animate-fadeIn' exists elsewhere (e.g., in a global CSS file or via a utility class injection for Tailwind)

const API_BASE_URL = 'http://localhost:8000/api';

/**
 * Renders a single Team Member Card.
 * This component remains a presentational component.
 */
const TeamMemberCard = ({ name, position, image, socials, delay, description }) => {
  return (
    <div
      className="animate-on-scroll opacity-0 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/10 group"
      // Note: The IntersectionObserver in Team component will handle the main animation, 
      // but 'delay' can still be used for staggered opacity reveal with a specific CSS class.
      // For the IntersectionObserver approach used below, we'll keep the delay prop but acknowledge 
      // the primary animation is controlled by the JS observer.
      style={{ animationDelay: delay }} 
    >
      {/* Member Image with Hover Effect */}
      <div className="relative aspect-square rounded-xl overflow-hidden mb-6">
        <img
          src={image || "images/team-placeholder.jpg"}
          alt={name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

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
              {/* Assuming the 'icon' prop contains the necessary class string (e.g., "fab fa-linkedin-in") */}
              <i className={`${social.icon} text-white text-sm`}></i> 
            </a>
          ))}
        </div>
      </div>

      {/* Member Info */}
      <div className="text-center">
        <h3 className="text-2xl text-white font-playfair font-semibold mb-2 group-hover:text-indigo-200 transition-colors duration-300">
          {name}
        </h3>
        <p className="text-indigo-300 font-mont font-medium mb-3 text-lg">
          {position}
        </p>
        <p className="text-white/70 font-mont text-sm leading-relaxed">
          {description || "Passionate about advancing AI technology and building innovative solutions for real-world challenges."}
        </p>
      </div>
    </div>
  )
}

/**
 * Team component fetches data from the API and manages the Intersection Observer.
 */
const Team = () => {
  const containerRef = useRef(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Effect for Data Fetching
  useEffect(() => {
    const fetchTeamMembers = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetching members who hold a Position of Responsibility (POR holders) as assumed for the leadership section
        const response = await fetch(`${API_BASE_URL}/members/por_holders/`); 
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Map API response structure to component prop structure
        // Assuming API returns an array of objects like: 
        // { id, name, designation, image_url, bio, social_links: [{ platform, url, icon_class }] }
        const formattedMembers = data.map(member => ({
          name: member.name,
          position: member.designation, // Assuming 'designation' from API maps to 'position'
          description: member.bio,     // Assuming 'bio' from API maps to 'description'
          image: member.image_url,     // Assuming 'image_url' from API maps to 'image'
          socials: member.social_links?.map(social => ({ // Assuming 'social_links' is an array
            icon: social.icon_class, // Needs to match the Font Awesome class
            url: social.url
          })) || [],
        }));
        
        setTeamMembers(formattedMembers);
      } catch (e) {
        console.error("Failed to fetch team members:", e);
        setError("Failed to load team data. Please try again later.");
        // Fallback or a clear message could be handled here
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []); // Empty dependency array means this runs once on mount

  // Effect for Intersection Observer
  useEffect(() => {
    // Only run this observer setup after the component has mounted AND 
    // we have the elements loaded (which happens after fetching data and re-render)
    if (!containerRef.current || loading) return; 

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
            // We can optionally stop observing once animated
            // observer.unobserve(entry.target);
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

  // Re-run observer setup if teamMembers or loading state changes, ensuring new cards are observed
  }, [teamMembers, loading]); 
  
  // Note: I've kept the original hardcoded stats for presentation, but they could also be fetched from an API.
  const teamStats = [
    { number: "50+", label: "Active Members" },
    { number: "15+", label: "Projects Completed" },
    { number: "10+", label: "Research Papers" },
    { number: "25+", label: "Workshops Hosted" }
  ];


  // --- Render Logic ---
  let content;

  if (loading) {
    content = (
      <div className="text-center py-20">
        <p className="text-white text-xl">Loading team data...</p>
        {/* Simple Spinner Placeholder */}
        <div className="mt-4 w-8 h-8 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    );
  } else if (error) {
    content = (
      <div className="text-center py-20">
        <p className="text-red-400 text-xl font-bold">{error}</p>
        <p className="text-white/70 mt-2">Could not fetch leadership team data.</p>
      </div>
    );
  } else if (teamMembers.length === 0) {
    content = (
      <div className="text-center py-20">
        <p className="text-indigo-300 text-xl">No leadership members found.</p>
      </div>
    );
  } else {
    // The main team grid rendering
    content = (
      <div className="animate-on-scroll opacity-0" style={{ animationDelay: '0.4s' }}>
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/20 transform hover:scale-[1.01] transition-all duration-500 hover:shadow-indigo-500/20">
          <h2 className="text-4xl text-white font-playfair italic font-semibold mb-12 text-center">
            Leadership Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMemberCard
                key={member.name || index} // Use a unique ID from API if available, otherwise name/index
                name={member.name}
                position={member.position}
                image={member.image}
                socials={member.socials}
                description={member.description}
                // Staggered delay for animation (adjust as needed with the observer logic)
                delay={`${0.6 + index * 0.1}s`} 
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- Main Return JSX ---
  return (
    <section id="team" ref={containerRef} className="min-h-screen w-full relative bg-black overflow-hidden">
      {/* Background elements remain the same */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 to-purple-600/90 z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent animate-pulse"></div>
      <img
        className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay transform scale-105 hover:scale-110 transition-transform duration-[3s]"
        src="images/landingimg.png"
        alt="Team Background"
        loading="lazy"
      />

      {/* Floating decorative elements - indigo/purple */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-element w-32 h-32 absolute top-1/4 left-1/4 opacity-10 bg-indigo-500 rounded-full blur-3xl"></div>
        <div className="floating-element w-40 h-40 absolute bottom-1/3 right-1/4 opacity-10 bg-purple-500 rounded-full blur-3xl delay-1000"></div>
        <div className="floating-element w-28 h-28 absolute top-1/2 left-1/3 opacity-10 bg-violet-500 rounded-full blur-3xl delay-500"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Main Title */}
            <div className="animate-on-scroll opacity-0 text-center mb-16">
              <h1 className="text-7xl text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-200 font-playfair italic font-bold mb-8 hover:scale-105 transition-transform duration-300">
                Our Team
              </h1>
              <p className="text-white/80 text-xl font-mont max-w-3xl mx-auto leading-relaxed">
                Meet the passionate minds driving innovation in artificial intelligence. Our diverse team of researchers,
                developers, and visionaries is committed to pushing the boundaries of what's possible with AI.
              </p>
            </div>

            {/* Team Grid (Dynamic Content) */}
            {content}

            {/* Team Stats (Optional: Can be kept or removed/made dynamic) */}
            <div className="mt-20 py-12 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm animate-on-scroll opacity-0" style={{ animationDelay: '1.2s' }}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {teamStats.map((stat, index) => (
                        <div key={index} className="px-4">
                            <p className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400 font-playfair mb-1">{stat.number}</p>
                            <p className="text-lg text-white/90 font-mont font-medium uppercase tracking-wider">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Team