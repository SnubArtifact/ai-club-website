import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';

const Landing = () => {
  const [showArrow, setShowArrow] = useState(true);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setShowArrow(window.scrollY <= 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate events every 5 seconds
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

  // Sample events data
  const upcomingEvents = [
    {
      id: 1,
      title: "NetApp Hackathon",
      date: "Nov 8, 2025",
      // time: "3:00 PM - 5:00 PM",
       location: "Online",
      type: "Hackathon",
      icon: "fas fa-code",
      link:'https://docs.google.com/forms/d/1r2F9ML4yp_feyO7YgHyUQ2ALJhQYdfLNa721Sp2Gxkc/edit?ts=6908ff00'
    },
    // {
    //   id: 2,
    //   title: "Annual Hackathon: Future of Computing",
    //   date: "Dec 20, 2024",
    //   time: "10:00 AM - 6:00 PM",
    //   location: "Tech Innovation Park, Hall A",
    //   type: "Competition",
    //   icon: "fas fa-laptop-code",
    // },
    // {
    //   id: 3,
    //   title: "Guest Lecture: ML in Healthcare",
    //   date: "Jan 5, 2025",
    //   time: "2:00 PM - 4:00 PM",
    //   location: "Main Auditorium",
    //   type: "Guest Lecture",
    //   icon: "fas fa-comment-alt",
    // }
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
      <div id="home" className="h-[100vh] w-full relative overflow-hidden bg-black">
        {/* --- Background elements adjusted --- */}
        <img 
          className="w-full h-full object-cover opacity-50" 
          src="images/landingimg.png" 
          alt="AI Innovation" 
          loading="eager"
        />
        
        {/* Softened Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-purple-900/30 to-black/50 animate-gradient-flow-soft"></div>

        {/* Softened Glow Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-float-medium delay-2000"></div>
        </div>

        {/* Animated Grid Pattern (Made softer) */}
        <div className="absolute inset-0 opacity-8">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(139, 92, 246, 0.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(139, 92, 246, 0.2) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              animation: 'gridMove 30s linear infinite'
            }}
          ></div>
        </div>
        
        {/* Professional Events Carousel - ATTENTION GRABBING */}
        <div className="absolute top-1/2 left-1/2 transform translate-x-1/4 -translate-y-1/2 z-40 w-full max-w-lg px-4">
          <div className="animate-fadeInUp opacity-0" style={{ animationDelay: '1s' }}>
            {/* VIBRANT ACCENT CARD */}
            <div className="event-card-attention rounded-xl overflow-hidden 
                          transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/50 transform hover:-translate-y-2 hover:scale-[1.03]">
              
              {/* Header - Stronger Purple Accent */}
              <div className="bg-purple-900 px-5 py-3 border-b border-purple-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-lg">
                      <i className="fas fa-calendar-alt text-purple-600 text-sm"></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white font-mont">Upcoming Events</h3>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-purple-200 font-semibold text-md font-mont">{currentEventIndex + 1}/{upcomingEvents.length}</div>
                  </div>
                </div>
              </div>

              {/* Event Content - Light Background for Contrast */}
              <div className="bg-white  p-5 relative">
                
                {/* Event Type Badge */}
                <span className={`inline-flex items-center px-2 py-0.5 text-xs font-semibold font-mont rounded shadow-sm mb-2 ${
                  currentEvent.type === 'Workshop' 
                    ? 'bg-red-100 text-red-700' // Changed to red for high contrast/alertness
                    : currentEvent.type === 'Competition'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-green-100 text-green-700'
                }`}>
                  <i className={`${currentEvent.icon} mr-1 text-xs`}></i>
                  {currentEvent.type}
                </span>

                {/* Event Title */}
                <h4 className="text-xl font-extrabold text-gray-900 font-mont leading-snug mb-4">
                  {currentEvent.title}
                </h4>

                {/* Event Details - Clean, stacked look */}
                <div className="space-y-3 mb-5 border-t border-b border-gray-200 py-3">
                  
                  {/* Date & Time */}
                  <div className="flex items-center space-x-3 group cursor-default hover:bg-gray-50 p-1 rounded transition-colors duration-200">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-purple-200 transition-colors">
                      <i className="fas fa-clock text-purple-600 text-xs"></i>
                    </div>
                    <div>
                      <div className="text-sm text-gray-800 font-mont font-medium">{currentEvent.date}</div>
                      <div className="text-xs text-gray-500 font-mont">{currentEvent.time}</div>
                    </div>
                  </div>
                  
                  {/* Location */}
                  <div className="flex items-center space-x-3 group cursor-default hover:bg-gray-50 p-1 rounded transition-colors duration-200">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-purple-200 transition-colors">
                      <i className="fas fa-map-marker-alt text-purple-600 text-xs"></i>
                    </div>
                    <div className="text-sm text-gray-800 font-mont">{currentEvent.location}</div>
                  </div>
                </div>

                {/* Single, Primary Action Button - Glowing Shadow on Hover */}
                <div className="mt-4">
                  <a href="https://docs.google.com/forms/d/1r2F9ML4yp_feyO7YgHyUQ2ALJhQYdfLNa721Sp2Gxkc/edit?ts=6908ff00" className="w-full bg-purple-900 text-white font-extrabold py-3 px-4 rounded-lg
                                  hover:from-red-600 hover:to-purple-700 transition-all duration-300
                                  shadow-lg shadow-red-500/50 hover:shadow-xl hover:shadow-purple-500/70 transform hover:scale-[1.02]
                                  flex items-center justify-center space-x-2 text-md group">
                    <i className="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform duration-200"></i>
                    <span>Register Now</span>
                  </a>
                </div>
              </div>

              {/* Carousel Controls - Darker Footer for Grounding */}
              <div className="px-5 py-3 border-t border-gray-200 flex items-center justify-between bg-gray-100">
                {/* Prev Button */}
                <button 
                  onClick={prevEvent}
                  className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center
                                hover:bg-gray-200 transition-all duration-200 text-gray-700 group hover:shadow-md">
                  <i className="fas fa-chevron-left text-xs group-hover:-translate-x-0.5 transition-transform duration-200"></i>
                </button>

                {/* Dot Indicators */}
                <div className="flex space-x-1.5">
                  {upcomingEvents.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToEvent(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentEventIndex 
                          ? 'bg-red-500 scale-125 shadow-md shadow-red-500/50' // Highlighted dot
                          : 'bg-gray-400 hover:bg-gray-500'
                      }`}
                    />
                  ))}
                </div>

                {/* Next Button */}
                <button 
                  onClick={nextEvent}
                  className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center
                                hover:bg-gray-200 transition-all duration-200 text-gray-700 group hover:shadow-md">
                  <i className="fas fa-chevron-right text-xs group-hover:translate-x-0.5 transition-transform duration-200"></i>
                </button>
                
                {/* <a href="#events" className="text-xs text-purple-700 hover:text-red-600 font-semibold ml-4 hidden sm:block transition-colors duration-200">
                  View All
                </a> */}
              </div>
            </div>
          </div>
        </div>

        {/* ... (Main content section remains the same) ... */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl ml-20 space-y-8">
              
              {/* Main heading */}
              <div className="animate-fadeInUp opacity-0" style={{ animationDelay: '0.2s' }}>
                <h1 className="text-9xl bg-clip-text bg-gradient-to-r from-white via-purple-200 to-indigo-200 font-nabla hover:scale-105 transition-transform duration-500">
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
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${
            showArrow ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={scrollToAbout}
        >
          <div className="cursor-pointer group">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-purple-500/30 group-hover:scale-110 transition-all duration-300">
                <i className="fas fa-chevron-down text-white text-lg animate-bounce"></i>
              </div>
              <span className="text-white/60 text-xs font-mont tracking-widest">
                SCROLL
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Reintroduced more aggressive shadow on hover for the whole card */
        .event-card-attention {
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); /* Base shadow */
        }
        
        /* Background animations remain soft */
        .animate-gradient-flow-soft {
          background-size: 200% 200%;
          animation: gradientFlow 10s ease infinite;
        }
        
        @keyframes gradientFlow {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
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
        
        .animate-float-slow {
          animation: float 12s ease-in-out infinite;
        }

        .animate-float-medium {
          animation: float 8s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          33% {
            transform: translateY(-20px) scale(1.05);
          }
          66% {
            transform: translateY(10px) scale(0.95);
          }
        }

        @keyframes gridMove {
          0% {
            transform: translateX(0px) translateY(0px);
          }
          100% {
            transform: translateX(-60px) translateY(-60px);
          }
        }
      `}</style>
    </>
  );
};

export default Landing;