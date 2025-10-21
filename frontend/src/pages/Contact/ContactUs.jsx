import React from 'react'

const ContactUs = () => {
  return (
    <div id="contact" className="section-container">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/90 to-purple-800/90 z-0"></div>
      <img 
        className="w-full h-full object-cover opacity-50 mix-blend-overlay"
        src="images/landingimg.png" 
        alt="Contact Background" 
        loading="lazy"
      />
      
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl ml-20">
            <h1 className="text-7xl text-white font-playfair italic font-bold drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)] mb-8">
              Contact Us
            </h1>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact Form */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-white font-mont mb-2">Name</label>
                    <input 
                      type="text"
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-mont mb-2">Email</label>
                    <input 
                      type="email"
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-mont mb-2">Message</label>
                    <textarea 
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/40 h-32"
                      placeholder="Your message..."
                    ></textarea>
                  </div>
                  <button className="bg-white/10 hover:bg-white/20 text-white font-mont py-2 px-6 rounded-lg transition-all duration-200">
                    Send Message
                  </button>
                </div>

                {/* Contact Information */}
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <h3 className="text-2xl text-white font-playfair font-semibold mb-6">Get in Touch</h3>
                  <div className="space-y-4">
                    <ContactInfo
                      icon="📍"
                      title="Location"
                      detail="BITS Pilani, Pilani Campus"
                    />
                    <ContactInfo
                      icon="📧"
                      title="Email"
                      detail="aiclub@pilani.bits-pilani.ac.in"
                    />
                    <ContactInfo
                      icon="🌐"
                      title="Social Media"
                      detail={
                        <div className="flex gap-4">
                          <a href="#" className="text-white/80 hover:text-white">LinkedIn</a>
                          <a href="#" className="text-white/80 hover:text-white">Instagram</a>
                        </div>
                      }
                    />
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

const ContactInfo = ({ icon, title, detail }) => {
  return (
    <div className="flex items-start gap-4">
      <span className="text-2xl">{icon}</span>
      <div>
        <h4 className="text-white font-mont font-medium">{title}</h4>
        <div className="text-white/80 font-mont">{detail}</div>
      </div>
    </div>
  )
}

export default ContactUs