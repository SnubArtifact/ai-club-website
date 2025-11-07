import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';

const Landing = () => {
  const [showArrow, setShowArrow] = useState(true);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  // ⭐ NEW STATE: To track cursor position
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 }); 
  

  useEffect(() => {
    const handleScroll = () => {
      setShowArrow(window.scrollY <= 100);
    };
    

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ⭐ NEW EFFECT: Tracks mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Calculate position as a percentage of the viewport
      const xPercentage = (e.clientX / window.innerWidth) * 100;
      const yPercentage = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x: xPercentage, y: yPercentage });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto-rotate events every 5 seconds (left untouched)
  useEffect(() => {
    if (upcomingEvents.length > 1) {
      const interval = setInterval(() => {
        setCurrentEventIndex((prev) => (prev + 1) % upcomingEvents.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Sample events data (left untouched)
  const upcomingEvents = [
    {
      id: 1,
      title: "NetApp Hackathon",
      date: "Nov 8-9, 2025",
      time: "10:00 AM - 10:00 AM (24 Hours)",
      location: "Online",
      comments:"Problem statement will be released offline.",
      type: "Hackathon",
      liveUpdates:"https://x.com/AI_ClubBPPC",
      icon: "fas fa-code",
      link: 'https://docs.google.com/forms/d/1r2F9ML4yp_feyO7YgHyUQ2ALJhQYdfLNa721Sp2Gxkc/edit?ts=6908ff00',
      logo: "images/netapp-logo.png", 
      prizes: "Exciting prizes + PPI Opportunity for top performers",
      eligibility: "BITS Pilani Students (UG+PG)"
    },
  ];

  const nextEvent = () => {
    setCurrentEventIndex((prev) => (prev + 1) % upcomingEvents.length);
  };

  const prevEvent = () => {
    setCurrentEventIndex((prev) => (prev - 1 + upcomingEvents.length) % upcomingEvents.length);
  };

  const goToEvent = (index) => {
    setCurrentEventIndex(index);
  };

  const currentEvent = upcomingEvents[currentEventIndex];

  return (
    <>
      <Navbar />
      {/* Set base background to black and apply CSS variables for spotlight effect */}
      <div 
        id="home" 
        className="h-[100vh] w-full relative overflow-hidden bg-black"
        style={{ '--x': `${mousePosition.x}%`, '--y': `${mousePosition.y}%` }}
      >
        
        {/* ⭐ NEW: Spotlight Overlay */}
        {/* This creates the radial gradient anchored to the cursor position */}
        <div className="bg-spotlight-overlay absolute inset-0 z-10 transition-colors duration-500"></div>

        {/* Existing elements (Image, Orbs, Grid) are removed for a cleaner black look,
            but if you want to keep them behind the spotlight, you can adjust their z-index.
            For now, let's keep it simple and black.
        */}
        
        {/* Professional Events Carousel (z-index 40 ensures it's above the spotlight overlay) */}
        <div className="absolute top-1/2 left-1/2 transform translate-x-1/2 -translate-y-[45%] z-40 w-full max-w-md px-4">
          <div 
            key={currentEvent.id} // Key change forces component re-mount for animation
            className="animate-fadeInRight animation-delay-1s" 
          >
            {/* VIBRANT ACCENT CARD */}
            <div className="event-card-attention rounded-xl overflow-hidden 
                          transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/50 transform hover:-translate-y-3 hover:scale-[1.03]">
              
              {/* Event Card Content (left untouched) */}
              <div className="bg-gray-700 px-5 py-4 border-b border-purple-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div>
                      <h3 className="text-lg font-bold text-white font-mont">Upcoming Event</h3>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-purple-200 font-semibold text-md font-mont">{currentEventIndex + 1}/{upcomingEvents.length}</div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 relative">
                {/* Event Type Badge */}
                <span className={`inline-flex items-center px-3 py-1 text-sm font-semibold font-mont rounded-full shadow-sm mb-3 ${
                  currentEvent.type === 'Workshop' 
                    ? 'bg-red-100 text-red-700'
                    : currentEvent.type === 'Competition'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-green-100 text-green-700'
                }`}>
                  <i className={`${currentEvent.icon} mr-2 text-xs`}></i>
                  {currentEvent.type}
                </span>

                {/* Event Title */}
                <div className='flex gap-4'>
                    <div className="w-11 h-11 bg-white rounded-lg -translate-y-2 flex items-center justify-center p-1">
                      <img 
                        src="images/netapp2.svg"
                        alt="NetApp Logo" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                <h4 className="text-2xl font-extrabold text-gray-900 font-mont leading-tight mb-4">
                  {currentEvent.title}
                </h4>
                </div>
                

                {/* Event Details */}
                <div className="space-y-4 mb-5 border-t border-b border-gray-200 py-4">
                  
                  {/* Date & Time */}
                  <div className="flex items-start space-x-3 group cursor-default hover:bg-gray-50 p-2 rounded transition-colors duration-200">
                    <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-purple-200 transition-colors mt-0.5">
                      <i className="fas fa-clock text-black text-xs"></i>
                    </div>
                    <div>
                      <div className="text-sm text-gray-800 font-mont font-semibold">{currentEvent.date}</div>
                      <div className="text-sm text-gray-600 font-mont">{currentEvent.time}</div>
                    </div>
                  </div>
                  
                  {/* Location */}
                  <div className="flex items-start space-x-3 group cursor-default hover:bg-gray-50 p-2 rounded transition-colors duration-200">
                    <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-purple-200 transition-colors mt-0.5">
                      <i className="fas fa-map-marker-alt text-black text-xs"></i>
                    </div>
                    <div className='column'>
                    <div className="text-sm text-gray-800 font-mont font-semibold">{currentEvent.location}</div>
                    <div className="text-sm text-gray-600 font-mont ">{currentEvent.comments}</div>
                    </div>
                  </div>

                 
                  
                    
                       
                     
                      
                  

                  {/* Prizes Section */}
                  <div className="flex items-start space-x-3 group cursor-default hover:bg-gray-50 p-2 rounded transition-colors duration-200">
                    <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-200 transition-colors mt-0.5">
                      <i className="fas fa-trophy text-black text-xs"></i>
                    </div>
                    <div>
                      <div className="text-sm text-gray-800 font-mont font-semibold">Win exciting prizes</div>
                      <div className="text-sm text-green-600 font-mont font-medium">+ PPI Opportunity for top performers</div>
                    </div>
                  </div>

                  {/* Eligibility Section */}
                  <div className="flex items-start space-x-3 group cursor-default hover:bg-gray-50 p-2 rounded transition-colors duration-200">
                    <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors mt-0.5">
                      <i className="fas fa-user-graduate text-black text-xs"></i>
                    </div>
                    <div>
                      <div className="text-sm text-gray-800 font-mont font-semibold">Who can apply?</div>
                      <div className="text-sm text-gray-600 font-mont">{currentEvent.eligibility}</div>
                    </div>
                  </div>
                </div>

                {/* Single, Primary Action Button */}
                <div className="mt-6">
                  <a 
                    href={currentEvent.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full bg-gray-600 text-white font-extrabold py-4 px-4 rounded-lg
                            hover:gray-800 transition-all duration-300
                            shadow-lg shadow-purple-500/50 hover:shadow-xl hover:black transform hover:scale-[1.02]
                            flex items-center justify-center space-x-3 text-lg group"
                  >
                    <i className="fas fa-arrow-right text-sm group-hover:translate-x-1 transition-transform duration-200"></i>
                    <span>Register Now</span>
                  </a>
                </div>
                <a
                href={currentEvent.liveUpdates}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-3 right-3 text-sm text-purple-600 font-mont font-semibold hover:underline"
              >
                Live Updates <i className="fas fa-external-link-alt ml-1 text-xs"></i>
                </a>
              </div>

              {/* Carousel Controls */}
              <div className="px-5 py-3 border-t border-gray-200 flex items-center justify-between bg-gray-100">
                {/* Prev Button */}
                <button 
                  onClick={prevEvent}
                  className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center
                            hover:bg-gray-200 transition-all duration-200 text-gray-700 group hover:shadow-md"
                >
                  <i className="fas fa-chevron-left text-xs group-hover:-translate-x-0.5 transition-transform duration-200"></i>
                </button>

                {/* Dot Indicators */}
                <div className="flex space-x-1.5">
                  {upcomingEvents.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToEvent(index)}
                      className={`w-1 h-1 rounded-full transition-all duration-300 ${
                        index === currentEventIndex 
                          ? 'bg-gray-600 scale-100 shadow-md '
                          : 'bg-gray-400 hover:bg-gray-500'
                      }`}
                    />
                  ))}
                </div>

                {/* Next Button */}
                <button 
                  onClick={nextEvent}
                  className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center
                            hover:bg-gray-200 transition-all duration-200 text-gray-700 group hover:shadow-md"
                >
                  <i className="fas fa-chevron-right text-xs group-hover:translate-x-0.5 transition-transform duration-200"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content section (z-index 20 ensures it's above the spotlight overlay) */}
        <div className="absolute inset-0 flex items-center z-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl ml-20 space-y-8">
              
              {/* Main heading */}
              <div className="animate-fadeInUp opacity-0" style={{ animationDelay: '0.2s' }}>
                <h1 className="text-9xl bg-clip-text bg-gradient-to-r from-white via-purple-200 to-indigo-200 font-nabla hover:scale-105 transition-transform duration-500 animate-text-shadow-pulse">
                  AI Club
                </h1>
              </div>

              {/* Institution name */}
              <div className="animate-fadeInUp opacity-0" style={{ animationDelay: '0.4s' }}>
                <h2 className="text-4xl text-white/90 font-mont tracking-wide">
                  BITS Pilani, Pilani Campus
                </h2>
              </div>

              {/* Description */}
              <div className="animate-fadeInUp opacity-0" style={{ animationDelay: '0.6s' }}>
                <p className="text-2xl text-white/85 font-mont max-w-2xl leading-relaxed">
                  Pioneering the future of artificial intelligence through innovation, 
                  collaboration, and cutting-edge research.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-6 mt-12 animate-fadeInUp opacity-0" style={{ animationDelay: '0.8s' }}>
                <button
                  onClick={scrollToAbout}
                  className="px-10 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-mont font-semibold rounded-xl 
                            hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 
                            shadow-2xl hover:shadow-purple-500/30 hover:-translate-y-1 hover:scale-105
                            flex items-center gap-3 group"
                >
                  <i className="fas fa-rocket group-hover:rotate-12 transition-transform duration-300"></i>
                  Explore More
                </button>

                <a
                  href="#contact"
                  className="px-10 py-4 bg-white/10 backdrop-blur-sm text-white font-mont font-semibold rounded-xl
                            border border-white/20 hover:bg-white/20 transition-all duration-300
                            shadow-2xl hover:shadow-white/20 hover:-translate-y-1 hover:scale-105
                            flex items-center gap-3 group"
                >
                  <i className="fas fa-users group-hover:scale-110 transition-transform duration-300"></i>
                  Join Now
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Arrow */}
        <div 
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-500 z-20 ${ // z-20 keeps it above spotlight
            showArrow ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={scrollToAbout}
        >
          <div className="cursor-pointer group">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-purple-500/30 group-hover:scale-110 transition-all duration-300">
                <i className="fas fa-chevron-down text-white text-lg animate-bounce"></i>
              </div>
              <span className="text-white/60 text-xs font-mont tracking-widest animate-blink">
                SCROLL
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* ⭐ NEW: Spotlight effect using a radial gradient centered at cursor position */
        .bg-spotlight-overlay {
          /* Use CSS variables set in React state */
          background: radial-gradient(
            circle at var(--x) var(--y),
            rgba(255, 255, 255, 0.2) 0%, /* Light center of the spotlight */
            rgba(0, 0, 0, 0.9) 25%, /* Transition to solid black */
            rgba(32, 32, 32, 1) 100% /* Solid black outside the light */
          );
          pointer-events: none; /* Allows clicks to pass through to elements below */
        }
        
        .event-card-attention {
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Event Card Carousel Fade-in */
        .animate-fadeInRight {
          animation: fadeInRight 0.5s ease-out forwards;
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Subtle Text Shadow Pulse for Title */
        .animate-text-shadow-pulse {
          animation: textShadowPulse 4s ease-in-out infinite alternate;
        }
        @keyframes textShadowPulse {
          0% {
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.4), 0 0 10px rgba(139, 92, 246, 0.3);
          }
          100% {
            text-shadow: 0 0 15px rgba(255, 255, 255, 0.8), 0 0 25px rgba(139, 92, 246, 0.5);
          }
        }

        /* Blink effect for SCROLL text */
        .animate-blink {
          animation: blink 1.5s step-end infinite;
        }
        @keyframes blink {
          50% { opacity: 0.4; }
        }
      `}</style>
    </>
  );
};

export default Landing;