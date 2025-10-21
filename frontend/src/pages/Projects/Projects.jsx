import React from 'react'

const Projects = () => {
  return (
    <div id="projects" className="section-container">
      <img 
        className="w-full h-full object-cover"
        src="images/landingimg.png" 
        alt="Projects Background" 
        loading="lazy"
      />
      
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl ml-20">
            <h1 className="text-7xl text-white font-playfair italic font-bold drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)] mb-8">
              Our Projects
            </h1>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Add project cards here */}
                <ProjectCard
                  title="Project Name"
                  description="Brief description of the project and its impact."
                  image="placeholder.jpg"
                  tags={['AI', 'Machine Learning', 'Computer Vision']}
                />
                {/* Add more projects */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ProjectCard = ({ title, description, image, tags }) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
      <div className="aspect-video rounded-lg overflow-hidden mb-4">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-2xl text-white font-playfair font-semibold mb-2">{title}</h3>
      <p className="text-white/80 font-mont mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span 
            key={index}
            className="px-3 py-1 bg-white/5 rounded-full text-sm text-white/90 font-mont"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Projects