import React from 'react'

const AboutUs = () => {
  return (
    <div id="about" className="section-container">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 to-indigo-900/90 z-0"></div>
      <img 
          className="w-full h-full object-cover opacity-50 mix-blend-overlay"
          src="images/landingimg.png" 
          alt="About Us Background" 
          loading="eager"
        />
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl ml-20">
              {/* Main Title */}
              <h1 className="text-7xl text-white font-playfair italic font-bold drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)] mb-8">
                About Us
              </h1>

              {/* Glass Card */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/20">
                {/* Mission Statement */}
                <h2 className="text-3xl text-white font-playfair italic font-semibold mb-6">
                  Our Mission
                </h2>
                <p className="text-white/90 text-lg font-mont leading-relaxed mb-8">
                  We are dedicated to exploring and advancing the frontiers of artificial intelligence through collaborative learning, innovative projects, and knowledge sharing.
                </p>

                {/* What We Do Section */}
                <h2 className="text-3xl text-white font-playfair italic font-semibold mb-6">
                  What We Do
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm">
                    <h3 className="text-xl text-white font-playfair italic font-semibold mb-3">
                      Workshops & Training
                    </h3>
                    <p className="text-white/80 font-mont">
                      Regular workshops and hands-on training sessions on AI/ML technologies and tools.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm">
                    <h3 className="text-xl text-white font-playfair italic font-semibold mb-3">
                      Project Development
                    </h3>
                    <p className="text-white/80 font-mont">
                      Collaborative projects focusing on real-world AI applications and solutions.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm">
                    <h3 className="text-xl text-white font-playfair italic font-semibold mb-3">
                      Research & Innovation
                    </h3>
                    <p className="text-white/80 font-mont">
                      Exploring cutting-edge AI research and implementing innovative solutions.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm">
                    <h3 className="text-xl text-white font-playfair italic font-semibold mb-3">
                      Community Building
                    </h3>
                    <p className="text-white/80 font-mont">
                      Creating a vibrant community of AI enthusiasts and practitioners.
                    </p>
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
