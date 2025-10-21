import React from 'react'

const Blogs = () => {
  return (
    <div id="blogs" className="section-container">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 to-zinc-800/90 z-0"></div>
      <img 
        className="w-full h-full object-cover opacity-50 mix-blend-overlay"
        src="images/landingimg.png" 
        alt="Blogs Background" 
        loading="lazy"
      />
      
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl ml-20">
            <h1 className="text-7xl text-white font-playfair italic font-bold drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)] mb-8">
              Blogs
            </h1>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/20">
              <div className="grid grid-cols-1 gap-6">
                <BlogPost 
                  title="Understanding Neural Networks"
                  excerpt="A deep dive into the fundamentals of neural networks and their applications..."
                  author="John Doe"
                  date="Oct 21, 2025"
                  tags={['AI', 'Deep Learning']}
                />
                <BlogPost 
                  title="The Future of AI"
                  excerpt="Exploring the upcoming trends and innovations in artificial intelligence..."
                  author="Jane Smith"
                  date="Oct 20, 2025"
                  tags={['AI', 'Technology', 'Future']}
                />
                {/* Add more blog posts */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const BlogPost = ({ title, excerpt, author, date, tags }) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag, index) => (
          <span 
            key={index}
            className="px-3 py-1 bg-white/5 rounded-full text-sm text-white/90 font-mont"
          >
            {tag}
          </span>
        ))}
      </div>
      <h3 className="text-2xl text-white font-playfair font-semibold mb-2">{title}</h3>
      <p className="text-white/80 font-mont mb-4">{excerpt}</p>
      <div className="flex items-center justify-between text-sm text-white/60 font-mont">
        <span>{author}</span>
        <span>{date}</span>
      </div>
    </div>
  )
}

export default Blogs