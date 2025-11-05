import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'

const Landing = () => {
  const [showArrow, setShowArrow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowArrow(window.scrollY <= 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Navbar />
      <div id="home" className="h-[100vh] w-full relative overflow-hidden bg-black">
        {/* Main background image */}
        <img 
          className="w-full h-full object-cover opacity-40"
          src="images/landingimg.png" 
          alt="AI Innovation" 
          loading="eager"
        />
        
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-indigo-900/30 to-black/60 animate-gradient-flow"></div>

        {/* Floating Glow Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-500/8 rounded-full blur-3xl animate-float-medium delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-2xl animate-float-fast delay-1000"></div>
        </div>

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              animation: 'gridMove 20s linear infinite'
            }}
          ></div>
        </div>

        {/* Subtle Particle Effects */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400/30 rounded-full animate-particle-float"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${10 + Math.random() * 80}%`,
                animationDelay: `${i * 1.5}s`,
                animationDuration: `${8 + Math.random() * 4}s`
              }}
            ></div>
          ))}
        </div>

        {/* Main content */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl ml-20 space-y-8">
              
              {/* Main heading */}
              <div className="animate-fadeInUp opacity-0" style={{ animationDelay: '0.2s' }}>
                <h1 className="text-9xl text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-cyan-200 font-archivo hover:scale-105 transition-transform duration-500">
                  AI Club
                </h1>
              </div>

              {/* Institution name */}
              <div className="animate-fadeInUp opacity-0" style={{ animationDelay: '0.4s' }}>
                <h2 className="text-4xl text-white/90 font-mont  tracking-wide">
                  BITS Pilani, Pilani Campus
                </h2>
              </div>

              {/* Description */}
              <div className="animate-fadeInUp opacity-0" style={{ animationDelay: '0.6s' }}>
                <p className="text-2xl text-white/85 font-mont max-w-2xl leading-relaxed">
                  Pioneering the future of artificial intelligence through innovation, 
                  collaboration, and cutting-edge research.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-6 mt-12 animate-fadeInUp opacity-0" style={{ animationDelay: '0.8s' }}>
                <button
                  onClick={scrollToAbout}
                  className="px-10 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-mont font-semibold rounded-xl 
                           hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 
                           shadow-2xl hover:shadow-purple-500/30 hover:-translate-y-1 hover:scale-105
                           flex items-center gap-3 group"
                >
                  <i className="fas fa-rocket group-hover:rotate-12 transition-transform duration-300"></i>
                  Explore More
                </button>

                <a
                  href="#contact"
                  className="px-10 py-4 bg-white/10 backdrop-blur-sm text-white font-mont font-semibold rounded-xl
                           border border-white/20 hover:bg-white/20 transition-all duration-300
                           shadow-2xl hover:shadow-white/20 hover:-translate-y-1 hover:scale-105
                           flex items-center gap-3 group"
                >
                  <i className="fas fa-users group-hover:scale-110 transition-transform duration-300"></i>
                  Join Now
                </a>
              </div>

              
            </div>
          </div>
        </div>

        {/* Animated Arrow */}
        <div 
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${
            showArrow ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={scrollToAbout}
        >
          <div className="cursor-pointer group">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-purple-500/30 group-hover:scale-110 transition-all duration-300">
                <i className="fas fa-chevron-down text-white text-lg animate-bounce"></i>
              </div>
              <span className="text-white/60 text-xs font-mont tracking-widest">
                SCROLL
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-gradient-flow {
          background-size: 200% 200%;
          animation: gradientFlow 8s ease infinite;
        }

        @keyframes gradientFlow {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-float-slow {
          animation: float 12s ease-in-out infinite;
        }

        .animate-float-medium {
          animation: float 8s ease-in-out infinite;
        }

        .animate-float-fast {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          33% {
            transform: translateY(-20px) scale(1.05);
          }
          66% {
            transform: translateY(10px) scale(0.95);
          }
        }

        .animate-particle-float {
          animation: particleFloat 8s ease-in-out infinite;
        }

        @keyframes particleFloat {
          0%, 100% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-40px) translateX(10px) scale(1.2);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-20px) translateX(-10px) scale(0.8);
            opacity: 0.4;
          }
          75% {
            transform: translateY(-30px) translateX(5px) scale(1.1);
            opacity: 0.5;
          }
        }

        @keyframes gridMove {
          0% {
            transform: translateX(0px) translateY(0px);
          }
          100% {
            transform: translateX(-60px) translateY(-60px);
          }
        }
      `}</style>
    </>
  )
}

export default Landing