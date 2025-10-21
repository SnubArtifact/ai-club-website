import React, { useEffect, useRef } from 'react'

const ResourceCard = ({ title, description, icon, link, tags, delay, type }) => {
  const getTypeColor = (type) => {
    const colors = {
      tutorial: 'from-blue-500 to-cyan-500',
      tool: 'from-green-500 to-emerald-500',
      dataset: 'from-purple-500 to-pink-500',
      course: 'from-orange-500 to-red-500',
      book: 'from-yellow-500 to-amber-500',
      research: 'from-indigo-500 to-purple-500'
    }
    return colors[type] || 'from-gray-500 to-gray-600'
  }

  return (
    <div 
      className="animate-on-scroll opacity-0 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:shadow-lg group cursor-pointer"
      style={{ animationDelay: delay }}
      onClick={() => window.open(link, '_blank')}
    >
      {/* Header with Icon and Type Badge */}
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getTypeColor(type)} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <i className={`${icon} text-white text-lg`}></i>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-mont font-medium bg-gradient-to-r ${getTypeColor(type)} text-white`}>
          {type}
        </span>
      </div>

      {/* Content */}
      <h3 className="text-xl text-white font-playfair font-semibold mb-3 group-hover:text-cyan-200 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-white/70 font-mont text-sm leading-relaxed mb-4">
        {description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span 
            key={index}
            className="px-2 py-1 bg-white/5 rounded-lg text-xs text-white/80 font-mont hover:bg-white/10 transition-colors duration-300 cursor-default"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Hover Action Indicator */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <i className="fas fa-external-link-alt text-white/60 text-sm"></i>
      </div>
    </div>
  )
}

const ResourceSection = ({ title, description, resources, delay }) => {
  return (
    <div className="animate-on-scroll opacity-0" style={{ animationDelay: delay }}>
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
        <h3 className="text-3xl text-white font-playfair italic font-semibold mb-3">
          {title}
        </h3>
        <p className="text-white/70 font-mont mb-6 leading-relaxed">
          {description}
        </p>
        <div className="space-y-4">
          {resources.map((resource, index) => (
            <a
              key={index}
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <i className={`${resource.icon} text-cyan-300 text-lg w-5 text-center`}></i>
                  <span className="text-white font-mont group-hover:text-cyan-200 transition-colors duration-300">
                    {resource.name}
                  </span>
                </div>
                <i className="fas fa-external-link-alt text-white/40 group-hover:text-cyan-300 transition-colors duration-300 text-sm"></i>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

const Resources = () => {
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

  const featuredResources = [
    {
      title: "Deep Learning Specialization",
      description: "Comprehensive course series covering neural networks, CNNs, RNNs, and more by Andrew Ng.",
      icon: "fas fa-graduation-cap",
      link: "#",
      tags: ['Course', 'Deep Learning', 'Coursera'],
      type: 'course'
    },
    {
      title: "TensorFlow Documentation",
      description: "Official documentation and tutorials for TensorFlow and Keras with practical examples.",
      icon: "fas fa-book",
      link: "#",
      tags: ['Documentation', 'Framework', 'Tutorials'],
      type: 'tutorial'
    },
    {
      title: "Kaggle Datasets",
      description: "Large collection of datasets for machine learning competitions and personal projects.",
      icon: "fas fa-database",
      link: "#",
      tags: ['Datasets', 'Competitions', 'Community'],
      type: 'dataset'
    },
    {
      title: "PyTorch Tutorials",
      description: "Hands-on tutorials and examples for PyTorch from basic to advanced concepts.",
      icon: "fas fa-laptop-code",
      link: "#",
      tags: ['Tutorials', 'PyTorch', 'Examples'],
      type: 'tutorial'
    },
    {
      title: "AI Research Papers",
      description: "Curated collection of influential AI research papers with summaries and implementations.",
      icon: "fas fa-file-alt",
      link: "#",
      tags: ['Research', 'Papers', 'Implementations'],
      type: 'research'
    },
    {
      title: "Machine Learning Tools",
      description: "Essential tools and libraries for data preprocessing, visualization, and model deployment.",
      icon: "fas fa-tools",
      link: "#",
      tags: ['Tools', 'Libraries', 'Development'],
      type: 'tool'
    }
  ]

  const resourceCategories = [
    {
      title: "Learning Paths",
      description: "Structured learning materials from beginner to advanced levels",
      resources: [
        { name: "AI Fundamentals Crash Course", icon: "fas fa-play", link: "#" },
        { name: "Machine Learning Mastery", icon: "fas fa-chart-line", link: "#" },
        { name: "Deep Learning Specialization", icon: "fas fa-brain", link: "#" },
        { name: "NLP Learning Path", icon: "fas fa-language", link: "#" }
      ]
    },
    {
      title: "Development Tools",
      description: "Essential software and libraries for AI development",
      resources: [
        { name: "Python Data Science Stack", icon: "fab fa-python", link: "#" },
        { name: "Jupyter Notebook Tutorials", icon: "fas fa-book", link: "#" },
        { name: "Cloud AI Platforms", icon: "fas fa-cloud", link: "#" },
        { name: "Version Control for ML", icon: "fab fa-git-alt", link: "#" }
      ]
    },
   
   
  ]

  return (
    <div id="resources" ref={containerRef} className="min-h-screen relative bg-black overflow-hidden">
      {/* Background with parallax effect */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,hsla(266,100%,9%,1)_0%,hsla(250,39%,45%,1)_100%)] z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent animate-pulse"></div>
      <img 
        className="w-full h-full object-cover opacity-30 mix-blend-overlay transform scale-105 hover:scale-110 transition-transform duration-[3s]"
        src="images/landingimg.png" 
        alt="Resources Background" 
        loading="lazy"
      />

      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-element w-32 h-32 absolute top-1/4 right-1/4 opacity-10 bg-amber-500 rounded-full blur-3xl"></div>
        <div className="floating-element w-40 h-40 absolute bottom-1/3 left-1/4 opacity-10 bg-orange-500 rounded-full blur-3xl delay-1000"></div>
        <div className="floating-element w-28 h-28 absolute top-1/2 right-1/3 opacity-10 bg-yellow-500 rounded-full blur-3xl delay-500"></div>
      </div>
      
      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Main Title */}
            <div className="animate-on-scroll opacity-0 text-center mb-16">
              <h1 className="text-7xl text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-200 font-playfair italic font-bold mb-8 hover:scale-105 transition-transform duration-300">
                Resources
              </h1>
              <p className="text-white/80 text-xl font-mont max-w-3xl mx-auto leading-relaxed">
                Discover curated learning materials, tools, and datasets to accelerate your AI journey. 
                Everything you need to go from beginner to expert in artificial intelligence.
              </p>
            </div>

           

            {/* Resource Categories */}
            <div className="animate-on-scroll opacity-0" style={{ animationDelay: '0.6s' }}>
              <h2 className="text-4xl text-white font-playfair italic font-semibold mb-8 text-center">
                Resource Categories
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {resourceCategories.map((category, index) => (
                  <ResourceSection
                    key={index}
                    title={category.title}
                    description={category.description}
                    resources={category.resources}
                    delay={`${0.8 + index * 0.1}s`}
                  />
                ))}
              </div>
            </div>

           
          </div>
        </div>
      </div>
    </div>
  )
}

export default Resources