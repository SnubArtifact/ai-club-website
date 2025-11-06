import React, { useState, useEffect, useRef } from 'react'

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  // Sample images - replace with your actual images
  const images = [
    {
      src: "/images/gallery1.jpg",
      title: "Oasis Snaps",
      description: "AI Club snapped at Oasis 2025 - BITS Pilani's annual cultural fest",
     
    },
    {
      src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      title: "Neural Network Architecture",
      description: "Complex neural network visualization showing deep learning layers",
      
    },
    
  ];

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(timer);
  }, [currentIndex]);

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

    const elements = containerRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div id="gallery" ref={containerRef} className="min-h-screen relative bg-black overflow-hidden">
      {/* Background with parallax effect */}
      <div className="absolute inset-0 bg-[#0e0e0eff] z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent animate-pulse"></div>
      <img 
        className="w-full h-full object-cover opacity-30 mix-blend-overlay transform scale-105 hover:scale-110 transition-transform duration-[3s]"
        src="images/landingimg.png" 
        alt="Gallery Background" 
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
              <h1 className="text-7xl text-white bg-clip-text bg-gradient-to-r from-white to-amber-200 font-mont font-semibold mb-8 hover:scale-105 transition-transform duration-300">
                Gallery
              </h1>
              <p className="text-white/80 text-xl font-mont max-w-3xl mx-auto leading-relaxed">
                Explore our collection of cutting-edge AI research, development, and innovation. 
                Witness the future of artificial intelligence through our visual journey.
              </p>
            </div>

            {/* Main Carousel */}
            <div className="animate-on-scroll opacity-0 mb-12" style={{ animationDelay: '0.3s' }}>
              <div className="relative w-full h-96 lg:h-[500px] overflow-hidden rounded-2xl shadow-2xl group">
                {/* Navigation Buttons */}
                <button 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-20 shadow-lg opacity-0 group-hover:opacity-100"
                  onClick={prevSlide}
                >
                  <i className="fas fa-chevron-left text-lg"></i>
                </button>

                <button 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-20 shadow-lg opacity-0 group-hover:opacity-100"
                  onClick={nextSlide}
                >
                  <i className="fas fa-chevron-right text-lg"></i>
                </button>

                {/* Carousel Images */}
                <div className="relative w-full h-full">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                        index === currentIndex 
                          ? 'opacity-100 scale-100' 
                          : 'opacity-0 scale-105'
                      }`}
                    >
                      <img
                        src={image.src}
                        alt={image.title}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Image Overlay Content */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end">
                        <div className="p-8 text-white transform transition-transform duration-500 delay-300">
                          <h3 className="text-3xl font-mont font-semibold mb-3">
                            {image.title}
                          </h3>
                          <p className="text-white/80 font-mont text-lg mb-4 max-w-2xl">
                            {image.description}
                          </p>
                          
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Progress Dots */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={`w-0.8 h-0.8 rounded-full transition-all duration-300 ${
                        index === currentIndex 
                          ? 'bg-amber-400 scale-105 shadow-lg' 
                          : 'bg-white/50 hover:bg-white/80'
                      }`}
                      onClick={() => goToSlide(index)}
                    />
                  ))}
                </div>

                {/* Image Counter */}
                <div className="absolute top-6 right-6 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 text-white font-mont text-sm z-20">
                  {currentIndex + 1} / {images.length}
                </div>
              </div>
            </div>

           

           
          </div>
        </div>
      </div>

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .floating-element {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  )
}

export default Gallery