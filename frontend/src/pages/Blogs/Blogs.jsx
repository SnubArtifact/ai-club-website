import React, { useEffect, useRef } from 'react'

const BlogPost = ({ title, excerpt, author, date, tags, image, readTime, delay }) => {
  return (
    <div 
      className="animate-on-scroll opacity-0 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:shadow-lg group cursor-pointer"
      style={{ animationDelay: delay }}
    >
      {/* Blog Image */}
      <div className="aspect-video rounded-xl overflow-hidden mb-4">
        <img 
          src={image || "images/blog-placeholder.jpg"} 
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag, index) => (
          <span 
            key={index}
            className="px-3 py-1 bg-white/5 rounded-full text-sm text-white/90 font-mont hover:bg-rose-500/20 hover:text-rose-200 transition-all duration-300 cursor-default"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <h3 className="text-2xl text-white font-playfair font-semibold mb-3 group-hover:text-rose-200 transition-colors duration-300">
        {title}
      </h3>

      {/* Excerpt */}
      <p className="text-white/80 font-mont mb-4 leading-relaxed">
        {excerpt}
      </p>

      {/* Meta Information */}
      <div className="flex items-center justify-between text-sm text-white/60 font-mont">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <i className="fas fa-user text-rose-400"></i>
            {author}
          </span>
          <span className="flex items-center gap-1">
            <i className="fas fa-clock text-rose-400"></i>
            {readTime}
          </span>
        </div>
        <span className="flex items-center gap-1 group-hover:text-rose-300 transition-colors duration-300">
          {date}
          <i className="fas fa-arrow-right text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"></i>
        </span>
      </div>
    </div>
  )
}

const Blogs = () => {
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

    const elements = containerRef.current.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const blogPosts = [
    {
      title: "Understanding Neural Networks: From Basics to Advanced",
      excerpt: "A comprehensive guide to neural networks covering fundamental concepts, architecture, and real-world applications in modern AI systems.",
      author: "Dr. Sarah Chen",
      date: "Oct 21, 2025",
      readTime: "8 min read",
      tags: ['AI', 'Deep Learning', 'Neural Networks'],
      image: "images/blog-neural-networks.jpg"
    },
    {
      title: "The Future of AI: Trends Shaping 2025 and Beyond",
      excerpt: "Exploring the latest innovations in artificial intelligence including generative AI, ethical considerations, and industry transformations.",
      author: "Alex Thompson",
      date: "Oct 20, 2025",
      readTime: "6 min read",
      tags: ['AI', 'Technology', 'Future Trends'],
      image: "images/blog-ai-future.jpg"
    },
    {
      title: "Machine Learning in Healthcare: Revolutionizing Diagnosis",
      excerpt: "How machine learning algorithms are transforming medical diagnosis, drug discovery, and personalized treatment plans.",
      author: "Dr. Priya Patel",
      date: "Oct 18, 2025",
      readTime: "10 min read",
      tags: ['Healthcare', 'Machine Learning', 'Medical AI'],
      image: "images/blog-healthcare-ai.jpg"
    },
    {
      title: "Building Your First AI Project: A Step-by-Step Guide",
      excerpt: "Practical guide for beginners to start their first AI project, from data collection to model deployment.",
      author: "Mike Johnson",
      date: "Oct 15, 2025",
      readTime: "12 min read",
      tags: ['Tutorial', 'Beginner', 'Projects'],
      image: "images/blog-first-project.jpg"
    },
    {
      title: "Natural Language Processing: Beyond ChatGPT",
      excerpt: "Deep dive into advanced NLP techniques, transformer architectures, and the future of language models.",
      author: "Elena Rodriguez",
      date: "Oct 12, 2025",
      readTime: "9 min read",
      tags: ['NLP', 'Language Models', 'Transformers'],
      image: "images/blog-nlp.jpg"
    },
    {
      title: "Ethical AI: Building Responsible Machine Learning Systems",
      excerpt: "Exploring the importance of ethics in AI development and practical approaches to building fair and transparent systems.",
      author: "David Kim",
      date: "Oct 10, 2025",
      readTime: "7 min read",
      tags: ['Ethics', 'Responsible AI', 'Machine Learning'],
      image: "images/blog-ethics.jpg"
    }
  ]

  return (
    <div id="blogs" ref={containerRef} className="min-h-screen relative bg-black overflow-hidden">
      {/* Background with parallax effect */}
      <div className="absolute inset-0 bg-[linear-gradient(349deg,rgba(35,8,69,0.79)_0%,rgba(23,0,107,1)_40%,rgba(90,50,128,1)_100%)] z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-500/10 via-transparent to-transparent animate-pulse"></div>
      <img 
        className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay transform scale-105 hover:scale-110 transition-transform duration-[3s]"
        src="images/landingimg.png" 
        alt="Blogs Background" 
        loading="lazy"
      />

      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-element w-32 h-32 absolute top-1/4 right-1/4 opacity-10 bg-rose-500 rounded-full blur-3xl"></div>
        <div className="floating-element w-40 h-40 absolute bottom-1/3 left-1/4 opacity-10 bg-pink-500 rounded-full blur-3xl delay-1000"></div>
        <div className="floating-element w-28 h-28 absolute top-1/2 right-1/3 opacity-10 bg-red-500 rounded-full blur-3xl delay-500"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Main Title */}
            <div className="animate-on-scroll opacity-0 text-center mb-16">
              <h1 className="text-7xl text-transparent bg-clip-text bg-gradient-to-r from-white to-rose-200 font-playfair italic font-bold mb-8 hover:scale-105 transition-transform duration-300">
                Blogs
              </h1>
              <p className="text-white/80 text-xl font-mont max-w-3xl mx-auto leading-relaxed">
                Insights, tutorials, and thought leadership from our AI community. 
                Stay updated with the latest trends and developments in artificial intelligence.
              </p>
            </div>

            {/* Blog Posts Grid */}
            <div className="animate-on-scroll opacity-0" style={{ animationDelay: '0.2s' }}>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/20 transform hover:scale-[1.01] transition-all duration-500 hover:shadow-rose-500/20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogPosts.map((post, index) => (
                    <BlogPost
                      key={index}
                      title={post.title}
                      excerpt={post.excerpt}
                      author={post.author}
                      date={post.date}
                      tags={post.tags}
                      image={post.image}
                      readTime={post.readTime}
                      delay={`${0.4 + index * 0.1}s`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Newsletter CTA */}
            <div className="animate-on-scroll opacity-0 text-center mt-16" style={{ animationDelay: '1s' }}>
              <div className="bg-gradient-to-r from-rose-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-8 border border-rose-500/30 transform hover:scale-105 transition-all duration-300">
                <h3 className="text-2xl text-white font-playfair italic font-semibold mb-4">
                  Never Miss a Post
                </h3>
                <p className="text-white/80 font-mont mb-6 max-w-2xl mx-auto">
                  Subscribe to our newsletter and get the latest AI insights, tutorials, 
                  and research papers delivered directly to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-mont placeholder-white/50 focus:outline-none focus:border-rose-500 transition-colors duration-300"
                  />
                  <button className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-8 py-3 rounded-full font-mont font-semibold hover:scale-105 transform transition-all duration-300 hover:shadow-lg hover:shadow-rose-500/30 whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blogs