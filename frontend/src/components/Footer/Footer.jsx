import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[#342063] text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Club Info */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h3 className="text-lg font-semibold font-mont">AI Club, BITS Pilani</h3>
            <p className="text-gray-400 text-sm font-mont mt-1">
              Pioneering AI innovation and research
            </p>
          </div>

          {/* Social Links */}
          <div className="flex space-x-6">
            <a 
              href="https://www.instagram.com/aiclub.bitsp/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a 
              href="https://www.linkedin.com/company/ai-club-bitsp/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              <i className="fab fa-linkedin text-xl"></i>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-6 pt-6 text-center">
          <p className="text-gray-400 text-sm font-mont">
            &copy; {new Date().getFullYear()} AI Club BITS Pilani. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer