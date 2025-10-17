import React, { useState } from 'react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { title: 'Home', path: '/' },
    { title: 'About Us', path: '/about' },
    { title: 'Team', path: '/team' },
    { title: 'Projects', path: '/projects' },
    { title: 'Resources', path: '/resources' },
    { title: 'Contact Us', path: '/contact' },
    { title: 'Blogs', path: '/blogs' }
  ]

  return (
    <nav className="fixed top-4 left-4 right-4 z-50">
      <div className="max-w-5xl mx-auto px-4">
    
        <div className="bg-gray-500 bg-opacity-5 backdrop-blur-lg rounded-full shadow-lg">   
          <div className="flex items-center justify-center gap-30 h-16 px-6">
          
            <div className="flex-shrink-0">
              <span className="text-white font-semibold text-xl tracking-wide">AI Club</span>
            </div>

         
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-1">
                {navItems.map((item) => (
                  <a
                    key={item.title}
                    href={item.path}
                    className="text-white/90 hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium tracking-wide transition-all duration-200 "
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            </div>

           
            <div className="md:hidden">
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
              <a
                key={item.title}
                href={item.path}
                className="text-gray-200 hover:text-white block px-4 py-3 text-base font-medium transition-all duration-200 rounded-lg hover:bg-white hover:bg-opacity-10"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar