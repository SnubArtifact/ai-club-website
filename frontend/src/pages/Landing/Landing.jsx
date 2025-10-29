import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'

const Landing = () => {
  const [showArrow, setShowArrow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide arrow when user scrolls down more than 100px
      if (window.scrollY > 100) {
        setShowArrow(false);
      } else {
        setShowArrow(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navbar />
      <div id="home" className="h-[100vh] w-full relative overflow-hidden bg-black">
        {/* Background image with overlay */}
        <img 
          className="w-full h-full object-cover opacity-70"
          src="images/landingimg.png" 
          alt="Landing" 
          loading="eager"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-indigo-900/30"></div>

        {/* Floating elements with more variety */}
        <div className="absolute inset-0">
          <div className="floating-element w-32 h-32 absolute top-1/4 right-1/4 opacity-20 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="floating-element w-40 h-40 absolute bottom-1/3 left-1/4 opacity-20 bg-indigo-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="floating-element w-24 h-24 absolute top-1/3 left-1/3 opacity-10 bg-blue-500 rounded-full blur-2xl animate-pulse delay-500"></div>
          <div className="floating-element w-36 h-36 absolute bottom-1/4 right-1/3 opacity-15 bg-violet-500 rounded-full blur-3xl animate-pulse delay-1500"></div>
        </div>

        {/* Main content */}
        <div className="absolute inset-0 flex items-center ">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl ml-20 space-y-8">
              {/* Main heading with enhanced gradient text */}
              <div className="animate-fadeIn opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                <h1 className="text-8xl text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-indigo-200 font-young font-bold drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)] select-none hover:scale-105 transition-transform duration-300">
                  AI Club
                </h1>
              </div>

              {/* Institution name with slide-in animation */}
              <div className="animate-slideRight opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                <h2 className="text-3xl text-white/90 font-ultra font-bold tracking-wide">
                  BITS PILANI
                </h2>
              </div>

              {/* Description with fade-in animation */}
              <div className="animate-fadeIn opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
                <p className="text-xl text-white/80 font-mont max-w-2xl leading-relaxed">
                  Pioneering the future of artificial intelligence through innovation, 
                  collaboration, and cutting-edge research. Join us in shaping tomorrow's 
                  technology today.
                </p>
              </div>

              {/* Call to action buttons with pop-up animation */}
              <div className="flex gap-6 mt-8 animate-slideUp opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
                <button
                  onClick={scrollToAbout}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-mont rounded-full 
                           hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 
                           shadow-lg hover:shadow-purple-500/20 hover:-translate-y-0.5 hover:scale-105"
                >
                  Discover More
                </button>
                <a
                  href="#contact"
                  className="px-8 py-3 border-2 border-white/30 text-white font-mont rounded-full
                           hover:bg-white/10 transition-all duration-300
                           shadow-lg hover:shadow-white/20 hover:-translate-y-0.5 hover:scale-105"
                >
                  Join Us
                </a>
              </div>

            
            </div>
          </div>
        </div>

        {/* Animated Arrow */}
        <div 
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${
            showArrow ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          onClick={scrollToAbout}
        >
          <div className="cursor-pointer group">
            <div className="flex flex-col items-center">
              <i className="fas fa-chevron-down text-white/70 text-3xl animate-bounce group-hover:text-purple-400 transition-colors"></i>
              <span className="text-white/50 text-sm font-mont mt-2 group-hover:text-purple-400 transition-colors">
                
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Landing
  


