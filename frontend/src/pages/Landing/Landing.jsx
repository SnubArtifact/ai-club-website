import React from 'react'
import Navbar from '../../components/Navbar/Navbar'

const Landing = () => {
  return (
    <>
      <Navbar />
      <div className="h-[100vh] w-full relative overflow-hidden">
        <img 
          className="w-full h-full object-cover"
          src="images/landingimg.png" 
          alt="Landing" 
          loading="eager"
        />
        <div className="absolute inset-0 flex items-center">
          <div className="ml-20">
            <h1 className="text-8xl text-white font-playfair italic font-bold drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)] select-none mb-4">
              AI CLUB
            </h1>
            <p className="text-2xl text-white/90 font-sora font-medium tracking-wide">
              BITS PILANI 
              <span className="block mt-2 font-semibold">random punchline here</span>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Landing
  


