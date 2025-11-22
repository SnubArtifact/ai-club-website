import React, { useState } from 'react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navItems = [
    { title: 'Home', id: 'home' },
    { title: 'About Us', id: 'about' },
    { title: 'Faculty', id: 'faculty' },
    { title: 'Team', id: 'team' },
    { title: 'Projects', id: 'projects' },
    { title: 'Resources', id: 'resources' },
    { title: 'Blogs', id: 'blogs' },
    {title: 'Gallery', id: 'gallery' }, 
    { title: 'Contact Us', id: 'contact' },
  ]

  return (
    <nav className="fixed top-4 left-4 right-4 z-50">
      <div className="max-w-7xl mx-auto px-4">
    
        <div className="bg-gray-500 bg-opacity-5 backdrop-blur-lg rounded-full shadow-lg">   
          <div className="flex items-center justify-center gap-30 h-20 px-6">
          
            <div className="flex-shrink-0">
              <img
                className="h-12 w-12 cursor-pointer"
                src="images/logo1.svg"
                alt="Logo"
                />
                
            </div>

         
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-1">
                {navItems.map((item) => (
                  <button
                    key={item.title}
                    onClick={() => scrollToSection(item.id)}
                    className="text-white/80 hover:text-white  border-none px-5 py-2 text-lg font-mont font-medium tracking-wide transition-all duration-400 bg-transparent"
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>

           
            <div className=" translate-x-10 md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-full text-gray-200 hover:text-white hover:bg-white/5 focus:outline-none transition-all duration-200 font-mont"
                aria-label="Toggle menu"
              >
                {!isMenuOpen ? (
                  <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

     
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden mt-2 mx-4`}>
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl border border-white border-opacity-20 shadow-lg p-4">
          <div className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.title}
                className="text-gray-200 hover:text-white block px-4 py-3 text-base font-medium transition-all duration-200 rounded-lg bg-transparent w-full text-left"
                onClick={() => {
                  scrollToSection(item.id);
                  setIsMenuOpen(false);
                }}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar