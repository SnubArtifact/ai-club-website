import React from 'react'

const Footer = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-[#371e78] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Club Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-sora font-bold">AI Club-BITS Pilani</h3>
            <p className="font-mont text-sm text-gray-300">
              Exploring the frontiers of artificial intelligence through collaboration and innovation.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-mont font-bold">Quick Links</h3>
            <ul className="space-y-2 font-mont">
              <li>
                <span 
                  onClick={() => scrollToSection('home')} 
                  className="hover:text-purple-300 transition-colors cursor-pointer"
                >
                  Home
                </span>
              </li>
              <li>
                <span 
                  onClick={() => scrollToSection('about')} 
                  className="hover:text-purple-300 transition-colors cursor-pointer"
                >
                  About Us
                </span>
              </li>
              <li>
                <span 
                  onClick={() => scrollToSection('team')} 
                  className="hover:text-purple-300 transition-colors cursor-pointer"
                >
                  Our Team
                </span>
              </li>
              <li>
                <span 
                  onClick={() => scrollToSection('projects')} 
                  className="hover:text-purple-300 transition-colors cursor-pointer"
                >
                  Projects
                </span>
              </li>
              <li>
                <span 
                  onClick={() => scrollToSection('resources')} 
                  className="hover:text-purple-300 transition-colors cursor-pointer"
                >
                  Resources
                </span>
              </li>
              <li>
                <span 
                  onClick={() => scrollToSection('contact')} 
                  className="hover:text-purple-300 transition-colors cursor-pointer"
                >
                  Contact
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Info 
          <div className="space-y-4">
            <h3 className="text-xl font-playfair italic font-bold">Contact Us</h3>
            <ul className="space-y-2 font-mont text-sm">
              <li>Email: aiclub@university.edu</li>
              <li>Room: Innovation Hub 301</li>
              <li>Meeting Times: Thursdays 5-6 PM</li>
            </ul>
          </div>
          */}

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-mont font-bold">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 transition-colors">
                <i className="fab fa-github text-2xl"></i>
              </a>
              <a href="https://www.linkedin.com/company/ai-club-bitsp/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 transition-colors">
                <i className="fab fa-linkedin text-2xl"></i>
              </a>
              <a href="https://discord.gg/your-discord" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 transition-colors">
                <i className="fab fa-discord text-2xl"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-8 text-center font-mont text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} AI Club - BITS Pilani. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
