import React from 'react'

const TeamMemberCard = ({ name, position, image }) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
      <div className="aspect-square rounded-lg overflow-hidden mb-4">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-xl text-white font-playfair font-semibold">{name}</h3>
      <p className="text-white/80 font-mont">{position}</p>
    </div>
  )
}

const Team = () => {
  const teamMembers = [
    {
      name: "John Doe",
      position: "President",
     // image: "placeholder.jpg"
    },
    {
      name: "Jane Smith",
      position: "Vice President",
      //image: "placeholder.jpg"
    },
    {
      name: "Mike Johnson",
      position: "Technical Lead",
      //image: "placeholder.jpg"
    }
  ]

  return (
    <section id="team" className="min-h-screen w-full relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-cyan-900/90"></div>
      <img 
        className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
        src="images/landingimg.png" 
        alt="Team Background" 
        loading="lazy"
      />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen py-20">
        <div className="container mx-auto px-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-7xl text-white font-playfair italic font-bold drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)] mb-8 text-center">
              Our Team
            </h1>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                  <TeamMemberCard
                    key={index}
                    name={member.name}
                    position={member.position}
                    image={member.image}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Team
