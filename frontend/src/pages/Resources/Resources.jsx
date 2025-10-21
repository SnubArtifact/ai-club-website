import React from 'react'

const Resources = () => {
  return (
    <div id="resources" className="section-container">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/90 to-teal-900/90 z-0"></div>
      <img 
        className="w-full h-full object-cover opacity-50 mix-blend-overlay"
        src="images/landingimg.png" 
        alt="Resources Background" 
        loading="lazy"
      />
      
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl ml-20">
            <h1 className="text-7xl text-white font-playfair italic font-bold drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)] mb-8">
              Resources
            </h1>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResourceSection 
                  title="Learning Materials"
                  items={[
                    { name: "AI Fundamentals", link: "#" },
                    { name: "Machine Learning Basics", link: "#" },
                    { name: "Deep Learning Resources", link: "#" }
                  ]}
                />
                <ResourceSection 
                  title="Tools & Software"
                  items={[
                    { name: "Python Libraries", link: "#" },
                    { name: "Development Tools", link: "#" },
                    { name: "Datasets", link: "#" }
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ResourceSection = ({ title, items }) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
      <h3 className="text-2xl text-white font-playfair font-semibold mb-4">{title}</h3>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index}>
            <a 
              href={item.link}
              className="text-white/80 hover:text-white font-mont transition-colors duration-200 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 bg-white/50 rounded-full"></span>
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Resources