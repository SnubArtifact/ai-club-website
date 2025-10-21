import React, { useEffect, useRef, useState } from 'react'

const ContactUs = () => {
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

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

    const elements = containerRef.current.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div id="contact" ref={containerRef} className="min-h-screen relative bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(349deg,rgba(35,8,69,0.79)_0%,rgba(24,0,51,1)_40%,rgba(49,9,64,1)_100%)] z-0"></div>
      <img 
        className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
        src="images/landingimg.png" 
        alt="Contact Background" 
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Main Title */}
            <div className="animate-on-scroll opacity-0 text-center mb-12">
              <h1 className="text-7xl text-transparent bg-clip-text bg-gradient-to-r from-white to-violet-200 font-playfair italic font-bold mb-8">
                Contact Us
              </h1>
              <p className="text-white/80 text-xl font-mont">
                Get in touch with our AI Club team
              </p>
            </div>

            {/* Contact Card */}
            <div className="animate-on-scroll opacity-0 bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Form */}
                <div>
                  <h3 className="text-2xl text-white font-playfair font-semibold mb-6">Send Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input 
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-violet-400 font-mont"
                        placeholder="Your Name"
                        required
                      />
                    </div>
                    <div>
                      <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-violet-400 font-mont"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div>
                      <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-violet-400 font-mont h-32 resize-none"
                        placeholder="Your message..."
                        required
                      ></textarea>
                    </div>
                    <button 
                      type="submit"
                      className="w-full bg-gradient-to-r from-violet-600 to-purple-700 text-white font-mont font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105"
                    >
                      Send Message
                    </button>
                  </form>
                </div>

                {/* Contact Info */}
                <div>
                  <h3 className="text-2xl text-white font-playfair font-semibold mb-6">Contact Info</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                      <div className="w-10 h-10 bg-violet-600 rounded-lg flex items-center justify-center">
                        <span className="text-white">📍</span>
                      </div>
                      <div>
                        <p className="text-white font-mont font-medium">Location</p>
                        <p className="text-white/80 font-mont text-sm">BITS Pilani, Pilani Campus</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                      <div className="w-10 h-10 bg-violet-600 rounded-lg flex items-center justify-center">
                        <span className="text-white">📧</span>
                      </div>
                      <div>
                        <p className="text-white font-mont font-medium">Email</p>
                        <p className="text-white/80 font-mont text-sm">aiclub@pilani.bits-pilani.ac.in</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                      <div className="w-10 h-10 bg-violet-600 rounded-lg flex items-center justify-center">
                        <span className="text-white">🌐</span>
                      </div>
                      <div>
                        <p className="text-white font-mont font-medium">Social Media</p>
                        <div className="flex gap-3 mt-1">
                          <a href="#" className="text-white/80 hover:text-white transition-colors">
                            <i className="fab fa-linkedin text-lg"></i>
                          </a>
                          <a href="#" className="text-white/80 hover:text-white transition-colors">
                            <i className="fab fa-instagram text-lg"></i>
                          </a>
                          <a href="#" className="text-white/80 hover:text-white transition-colors">
                            <i className="fab fa-github text-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs