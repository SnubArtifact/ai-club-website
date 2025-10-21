import React, { useEffect, useRef } from 'react'

const TeamMemberCard = ({ name, position, image, socials, delay, description }) => {
  return (
    <div 
      className="animate-on-scroll opacity-0 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/10 group"
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

const Team = () => {
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

  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      position: "President & Founder",
      description: "AI researcher with 8+ years experience in machine learning and computer vision. Passionate about democratizing AI education.",
      socials: [
        { icon: "fab fa-linkedin-in", url: "#" },
        { icon: "fab fa-github", url: "#" },
        { icon: "fab fa-twitter", url: "#" }
      ]
    },
    {
      name: "Marcus Rodriguez",
      position: "Vice President",
      description: "Full-stack developer and ML engineer specializing in scalable AI systems and cloud infrastructure.",
      socials: [
        { icon: "fab fa-linkedin-in", url: "#" },
        { icon: "fab fa-github", url: "#" },
        { icon: "fab fa-medium", url: "#" }
      ]
    },
    {
      name: "Alex Thompson",
      position: "Technical Lead",
      description: "Deep learning specialist focused on neural architecture search and model optimization techniques.",
      socials: [
        { icon: "fab fa-linkedin-in", url: "#" },
        { icon: "fab fa-github", url: "#" },
        { icon: "fab fa-kaggle", url: "#" }
      ]
    },
    {
      name: "Priya Patel",
      position: "Research Director",
      description: "NLP researcher with expertise in transformer models and multilingual AI applications.",
      socials: [
        { icon: "fab fa-linkedin-in", url: "#" },
        { icon: "fab fa-github", url: "#" },
        { icon: "fab fa-google-scholar", url: "#" }
      ]
    },
    {
      name: "David Kim",
      position: "Operations Lead",
      description: "Project manager and community builder with background in tech entrepreneurship and startup ecosystems.",
      socials: [
        { icon: "fab fa-linkedin-in", url: "#" },
        { icon: "fab fa-twitter", url: "#" },
        { icon: "fas fa-globe", url: "#" }
      ]
    },
    {
      name: "Elena Volkov",
      position: "Outreach Coordinator",
      description: "AI ethics advocate and educator focused on responsible AI development and inclusive technology.",
      socials: [
        { icon: "fab fa-linkedin-in", url: "#" },
        { icon: "fab fa-medium", url: "#" },
        { icon: "fas fa-envelope", url: "#" }
      ]
    }
  ]

  const teamStats = [
    { number: "50+", label: "Active Members" },
    { number: "15+", label: "Projects Completed" },
    { number: "10+", label: "Research Papers" },
    { number: "25+", label: "Workshops Hosted" }
  ]

  return (
    <section id="team" ref={containerRef} className="min-h-screen w-full relative bg-black overflow-hidden">
      {/* Background with indigo/purple gradient */}
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

           

            {/* Team Grid */}
            <div className="animate-on-scroll opacity-0" style={{ animationDelay: '0.4s' }}>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/20 transform hover:scale-[1.01] transition-all duration-500 hover:shadow-indigo-500/20">
                <h2 className="text-4xl text-white font-playfair italic font-semibold mb-12 text-center">
                  Leadership Team
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {teamMembers.map((member, index) => (
                    <TeamMemberCard
                      key={index}
                      name={member.name}
                      position={member.position}
                      image={member.image}
                      socials={member.socials}
                      description={member.description}
                      delay={`${0.6 + index * 0.1}s`}
                    />
                  ))}
                </div>
              </div>
            </div>

           
          </div>
        </div>
      </div>
    </section>
  )
}

export default Team