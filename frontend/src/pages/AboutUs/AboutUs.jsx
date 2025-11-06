import React, { useEffect, useRef } from 'react'

const AboutUs = () => {
  const containerRef = useRef(null);

  useEffect(() => {
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
  }, []);

  return (
    <div id="about" ref={containerRef} className="min-h-screen relative bg-black overflow-hidden">
      {/* Background with parallax effect */}
      <div className="absolute inset-0 bg-[#211745] z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent animate-pulse"></div>
      <img 
        className="w-full h-full object-cover opacity-30 mix-blend-overlay transform scale-105 hover:scale-110 transition-transform duration-[3s]"
        src="images/landingimg.png" 
        alt="About Us Background" 
        loading="eager"
      />

      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-element w-32 h-32 absolute top-1/4 right-1/4 opacity-10 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="floating-element w-40 h-40 absolute bottom-1/3 left-1/4 opacity-10 bg-indigo-500 rounded-full blur-3xl delay-1000"></div>
      </div>
        
      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Main Title */}
            <div className="animate-on-scroll opacity-0 text-center">
              <h1 className="text-7xl text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200 font-mont font-semibold -translate-y-6 mb-12 hover:scale-105 transition-transform duration-300">
                About Us
              </h1>
            </div>

            {/* Glass Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/20 transform hover:scale-[1.02] transition-all duration-500 hover:shadow-purple-500/20">
              {/* Mission Statement */}
              <div className="animate-on-scroll opacity-0 text-center" style={{ animationDelay: '0.2s' }}>
                <h2 className="text-4xl text-white font-mont   mb-12">
                  Our Mission
                </h2>
                <p className="text-white/90 text-xl font-mont leading-relaxed mb-12 max-w-2xl mx-auto">
                  We are dedicated to exploring and advancing the frontiers of artificial intelligence through collaborative learning, innovative projects, and knowledge sharing.
                </p>
              </div>

              {/* What We Do Section */}
              <div className="animate-on-scroll opacity-0 text-center" style={{ animationDelay: '0.4s' }}>
                <h2 className="text-4xl text-white font-mont  mb-12">
                  What We Do
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 hover:bg-white/10">
                    <h3 className="text-xl text-white font-tiny font-semibold mb-3 flex items-center justify-center">
                      <i className="fas fa-chalkboard-teacher mr-3 text-purple-300"></i>
                      Workshops & Training
                    </h3>
                    <p className="text-white/80 font-mont text-md text-center">
                      Regular workshops and hands-on training sessions on AI/ML technologies and tools.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 hover:bg-white/10">
                    <h3 className="text-2xl text-white font-tiny font-semibold mb-3 flex items-center justify-center">
                      <i className="fas fa-project-diagram mr-3 text-purple-300"></i>
                      Project Development
                    </h3>
                    <p className="text-white/80 font-mont text-md text-center">
                      Collaborative projects focusing on real-world AI applications and solutions.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 hover:bg-white/10">
                    <h3 className="text-2xl text-white font-tiny font-semibold mb-3 flex items-center justify-center">
                      <i className="fas fa-microscope mr-3 text-purple-300"></i>
                      Research & Innovation
                    </h3>
                    <p className="text-white/80 font-mont text-md text-center">
                      Exploring cutting-edge AI research and implementing innovative solutions.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 hover:bg-white/10">
                    <h3 className="text-2xl text-white font-tiny font-semibold mb-3 flex items-center justify-center">
                      <i className="fas fa-users mr-3 text-purple-300"></i>
                      Community Building
                    </h3>
                    <p className="text-white/80 font-mont text-md text-center">
                      Creating a vibrant community of AI enthusiasts and practitioners.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
