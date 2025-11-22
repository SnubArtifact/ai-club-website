import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Smooth scroll with offset for fixed navbar
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const yOffset = 100; // height of navbar + breathing space
    const y =
      element.getBoundingClientRect().top + window.pageYOffset - yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const navItems = [
    { title: "Home", id: "home" },
    { title: "About Us", id: "about" },

    // IMPORTANT: Faculty section root div currently has id="founder"
    // so we match that here
    { title: "Faculty", id: "founder" },

    { title: "Team", id: "team" },
    { title: "Projects", id: "projects" },
    { title: "Resources", id: "resources" },

    // Make sure your Blogs section has: <section id="blogs">...</section>
    { title: "Blogs", id: "blogs" },

    { title: "Gallery", id: "gallery" },
    { title: "Contact Us", id: "contact" },
  ];

  return (
    <nav className="fixed top-4 left-2 right-2 z-50">
      {/* widened container */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="bg-gray-500/5 backdrop-blur-lg rounded-full shadow-lg">
          <div className="flex items-center justify-between h-16 sm:h-20 px-4 sm:px-6">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 sm:h-12 sm:w-12 cursor-pointer"
                src="images/logo1.svg"
                alt="Logo"
                onClick={() => scrollToSection("home")}
              />
            </div>

            {/* Desktop nav */}
            <div className="hidden md:block flex-1">
              <div className="ml-8 flex items-center justify-center space-x-1">
                {navItems.map((item) => (
                  <button
                    key={item.title}
                    onClick={() => scrollToSection(item.id)}
                    className="text-white/80 hover:text-white px-4 py-2 text-sm lg:text-lg font-mont font-medium tracking-wide transition-all duration-300 bg-transparent border-none"
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex-shrink-0">
              <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="p-2 rounded-full text-gray-200 hover:text-white hover:bg-white/5 focus:outline-none transition-all duration-200"
                aria-label="Toggle menu"
              >
                {!isMenuOpen ? (
                  <svg
                    className="h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden mt-2 mx-4`}>
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg p-4">
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
  );
};

export default Navbar;
