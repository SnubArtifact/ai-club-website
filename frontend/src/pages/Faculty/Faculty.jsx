import React, { useEffect, useRef } from 'react';

const Faculty = () => {
  const containerRef = useRef(null);

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

    if (containerRef.current) {
      const elements = containerRef.current.querySelectorAll('.animate-on-scroll');
      elements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      id="founder"
      ref={containerRef}
      className="min-h-screen relative bg-black overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#0e0e0eff] z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent animate-pulse" />
      <img
        className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
        src="images/landingimg.png"
        alt="Founder Background"
      />

      {/* Content */}
<div className="relative z-10 min-h-screen pt-10 pb-20">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="max-w-5xl mx-auto">

      {/* Title */}
      <div className="animate-on-scroll opacity-0 text-center mb-12">
        <h1 className="text-7xl text-transparent bg-clip-text bg-gradient-to-r from-white to-violet-200 hover:scale-105 transition-all duration-300 font-mont font-semibold mb-6">
          Faculty in Charge
        </h1>
      </div>


            {/* Founder Card */}
            <div className="animate-on-scroll opacity-0 bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

                {/* Photo */}
                <div className="flex justify-center">
                  <div className="relative w-64 h-64 sm:w-72 sm:h-72">
                    <div className="absolute inset-0 rounded-2xl bg-[linear-gradient(135deg,#6366f1,#a855f7,#22d3ee)] opacity-70 blur-2xl" />
                    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/20 bg-white/5">
                      <img
                        src="/images/PHOTO-2025-11-21-17-34-54.jpg"
                        alt="Founder Dhruv Kumar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Founder Info */}
                <div className="space-y-5">
                  <div>
                    <h2 className="text-3xl sm:text-4xl text-white font-mont font-semibold mb-2">
                      Dhruv Kumar
                    </h2>

                  </div>

                  <p className="text-white/80 font-mont leading-relaxed text-sm sm:text-base">
                    Dhruv Kumar guided the AI Club at BITS Pilani to create a collaborative
                    ecosystem for students passionate about AI, machine learning, and modern
                    computing. His vision built one of the strongest tech communities on
                    campus, empowering students through workshops, projects, research, and a
                    culture of curiosity and innovation.
                  </p>


                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Faculty; 