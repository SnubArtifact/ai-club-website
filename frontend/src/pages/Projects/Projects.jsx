import React, { useEffect, useRef } from 'react'

const Projects = () => {
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
    <div id="projects" ref={containerRef} className="min-h-screen relative bg-black overflow-hidden">
      {/* Background with parallax effect */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,hsla(266,63%,9%,1)_0%,hsla(269,100%,23%,1)_100%)] z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent animate-pulse"></div>
      <img 
        className="w-full h-full object-cover opacity-30 mix-blend-overlay transform scale-105 hover:scale-110 transition-transform duration-[3s]"
        src="images/landingimg.png" 
        alt="Projects Background" 
        loading="lazy"
      />

      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-element w-32 h-32 absolute top-1/4 left-1/4 opacity-10 bg-cyan-500 rounded-full blur-3xl"></div>
        <div className="floating-element w-40 h-40 absolute bottom-1/3 right-1/4 opacity-10 bg-blue-500 rounded-full blur-3xl delay-1000"></div>
        <div className="floating-element w-28 h-28 absolute top-1/2 right-1/3 opacity-10 bg-teal-500 rounded-full blur-3xl delay-500"></div>
      </div>
      
      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Main Title */}
            <div className="animate-on-scroll opacity-0 text-center mb-12">
              <h1 className="text-7xl text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200 font-playfair italic font-bold mb-8 hover:scale-105 transition-transform duration-300">
                Our Projects
              </h1>
              <p className="text-white/80 text-xl font-mont max-w-2xl mx-auto">
                Exploring the frontiers of artificial intelligence through innovative projects and real-world applications
              </p>
            </div>

            {/* Glass Card Container */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/20 transform hover:scale-[1.01] transition-all duration-500 hover:shadow-cyan-500/20">
              {/* Projects Grid */}
              <div className="animate-on-scroll opacity-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <ProjectCard
                    title="Neural Network Visualizer"
                    description="An interactive tool that visualizes neural network architectures and training processes in real-time, helping students understand deep learning concepts."
                    image="images/project1.jpg"
                    tags={['Deep Learning', 'Visualization', 'Education']}
                    delay="0.1s"
                  />
                  <ProjectCard
                    title="Autonomous Drone Navigation"
                    description="Computer vision system enabling drones to navigate complex environments using reinforcement learning and obstacle avoidance algorithms."
                    image="images/project2.jpg"
                    tags={['Computer Vision', 'Reinforcement Learning', 'Robotics']}
                    delay="0.2s"
                  />
                  

                
                </div>
              </div>

             
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ProjectCard = ({ title, description, image, tags, delay }) => {
  return (
    <div 
      className="animate-on-scroll opacity-0 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 transform hover:scale-105 transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-cyan-500/10 group"
      style={{ animationDelay: delay }}
    >
      {/* Project Image with Hover Effect */}
      <div className="aspect-video rounded-lg overflow-hidden mb-4 relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-mont text-sm hover:bg-white/30 transition-colors">
            View Details
          </button>
        </div>
      </div>
      
      {/* Project Content */}
      <h3 className="text-2xl text-white font-playfair font-semibold mb-3 group-hover:text-cyan-200 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-white/80 font-mont mb-4 leading-relaxed">
        {description}
      </p>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span 
            key={index}
            className="px-3 py-1 bg-white/5 rounded-full text-sm text-white/90 font-mont hover:bg-cyan-500/20 hover:text-cyan-200 transition-all duration-300 cursor-default"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Projects