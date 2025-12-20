import React, { useState } from "react";

const ALL_BLOGS = [
  {
    id: 1,
    title: "The Guide to starting AI/ML",
    excerpt:
      "Hey everyone! This is just a small, friendly guide to help you dip your toes into the world of AI and Machine Learning during the break.",
    image: "https://unsplash.com/photos/a-sign-with-a-question-mark-and-a-question-mark-drawn-on-it-OAsF0QMRWlA",
    author: "AI Club BITS Pilani",
    readTime: "5 min read",
    date: "2025-12-20",
    category: "Resources",
    tags: ["AI", "Resources", "Guide", "ML"],
    content: `
Important Note: The goal here isn't to turn you into a PhD researcher overnight. We just want to help you understand the basics so you don't feel lost later on. Think of this as looking under the hood of a car, you don't need to be a mechanic, but it helps to know what an engine looks like.

1. Python: Just the Basics
Many of you might not be familiar with Python yet. Don't panic. You don't need to master it; you just need to be able to "speak" it a little bit.
I suggest spending just 5–6 days on the fundamentals. Don't worry about memorizing every single syntax rule (nobody does that, not even the pros). Focus on the logic.
What to focus on:
Data Structures: Primitive types (numbers), Strings, Arrays/Lists.
Flow Control: Conditionals (if, else) and Loops (for, while).
Classes: Just the very simple basics of how objects work.
Then, look at the NumPy & Pandas : Once you get the syntax, you need to learn the tools we actually use for data.
NumPy: Python is slow at math. NumPy makes it fast. Learn how to make an array (matrix) and do basic math with it.
Pandas: Think of this as "Excel on steroids" for programmers. Learn how to load a CSV file and look at the rows 

Resources:
https://www.youtube.com/watch?v=K5KVEU3aaeQ&t=2s
https://www.youtube.com/watch?v=r-uOLxNrNk8
If you don't like video lectures then - https://www.kaggle.com/learn
Tip: Python is super intuitive. If you get stuck or see something new, just ask ChatGPT or Google it. The goal is to learn how to think and write logic, not to become a walking dictionary.

2. Read what is Statistical learning
while you are learning python (or if you are not comfortable then after learning), please read the PDF we are sharing.
It is short, sweet, and easy to follow. It will explain what "learning from data" actually means. You’ll quickly realize that Machine Learning isn't magic, it’s just using math and data to make better guesses than a human could. IF you are too lazy to read it just give PDF to ChatGPT and ask to teach you but please go through it especially the Bias vs Variance concept
After learning about models, move on to how to evaluate it , evaluation is not always about accuracy. A model can score high and still be useless. (Why? find out yourself). Read about model evaluation and how to judge a model properly. 

Read - Accuracy & precision , confusion matrix. 	

3. Neural Network Basics
Now for the cool stuff. Once you’ve read the PDF, it’s time to understand Neural Networks.
Watch: The 3blue1brown Neural Network playlist on YouTube. It is the gold standard visual, simple, and beautiful.
Play: Fidget around with TensorFlow Playground. It lets you see a network learn in real-time.
Also go through this lecture - Learning - Lecture 4 - CS50's Introduction to Artificial Intelligence with Python 2020

4. Build One Tiny Model (The Challenge)
Once you get the concept, try building a "Digit Recognizer" (using the MNIST dataset). It’s the "Hello World" of AI.
Here is the catch:
Try to code this without using PyTorch or TensorFlow.
I know, that sounds harder. But libraries like PyTorch make things "too easy" by hiding the magic inside a black box. If you build it from scratch using just Python and NumPy, you will actually understand what is happening.
Try to manually code:
Feed Forward: Passing the values through the network.
Backpropagation: Fixing the wrong outputs.
Updates: changing the weights again and again.
Evaluation (This not optional): Refer back to Part 2 and evaluate your model (accuracy , precision confusion matrix, F1 score etc) 

Note - it is okay if your model does not perform well , It is okay if your code is messy. It is okay if it breaks. You will learn 10x more from this than from watching a tutorial.

5. If You Still Have Time...
(Seriously, though, why do you have so much time? Go touch some grass or enjoy your break!)
But if you are feeling extra curious, you can look up these terms just to see what they are used for:
CNNs: Great for images. Basics of CNNs 
RNNs / LSTMs: Great for text and sequences. 
Transformer : The OGs. Attention is all you need
You don't need to master these. Just know they exist so you aren't confused when you hear the acronyms later.

6. Final Advice
Keep it simple. Learn enough Python to write the logic. Understand that models are just math trying to learn from mistakes.
Take your time. Do not stress. Just start and be curious.

`
  },
  {
    id: 3,
    title: "AI in Sports: How Machine Learning Is Transforming the Sporting World",
    excerpt:
      "AI is revolutionizing training, scouting, refereeing, injury prediction, and fan experience across cricket, football, tennis, basketball, athletics, and more.",
    image: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=1200&q=80",
    author: "AI Club BITS Pilani",
    readTime: "7 min read",
    date: "2025-01-15",
    category: "Sports Analytics",
    tags: ["AI", "Sports", "Analytics", "ML"],
    content: `
1. INTRODUCTION
For decades, sport relied on instinct, raw talent, and human analysis. Today, AI has rewritten the rules — powering decision-making in cricket, football, tennis, basketball, athletics, and emerging sports.

AI performs in seconds what previously took hours: manual video review, opponent scouting, load planning, movement analysis, and performance breakdowns. CNNs, pose estimation, LSTMs, and multimodal systems provide insights on fatigue, weaknesses, strengths, and tactical patterns.

At AI Club BITS Pilani, students experiment with sports-tech — pose estimation, match analytics, player tracking, and generative commentary.

2. HOW MACHINE LEARNING IMPROVES PERFORMANCE ANALYTICS
Athletes generate massive data — acceleration, sprint load, HRV, symmetry, jump mechanics.

ML identifies:
• Fatigue buildup  
• Overtraining  
• Technique flaws  
• Tactical tendencies  
• Personalized improvement paths  

3. COMPUTER VISION IN SPORTS
Computer Vision powers:
• Real-time tracking  
• Automated highlights  
• Biomechanics  
• VAR, LBW, goal-line decisions  
• Tactical heatmaps  

4. DEEP LEARNING FOR INJURY PREDICTION
LSTMs analyze:
• Load patterns  
• Landing mechanics  
• Asymmetry  
• Sprint-fatigue coupling  

Used widely across NBA, Premier League, IPL.

5. GENERATIVE AI FOR STRATEGY & FAN EXPERIENCE
GenAI powers:
• Scouting  
• Simulation  
• Synthetic training  
• AI commentary  
• Personalized breakdowns  

6. STEPOUT — INDIA’S RISING SPORTS-TECH PLATFORM
Algorithms for:
• Technique breakdown  
• Skill scoring  
• Highlights  
• Scheduling + forecasting  

7. CONCLUSION
AI elevates—not replaces—athletes and coaches.
References: FIFA, MIT Sloan, ICC, NBA Tech Docs, OpenCV, StepOut.
`
  },

  {
    id: 2,
    title:
      "How Vector Databases Work: Core Mechanics and Vendor Landscape (Pinecone, Weaviate, Chroma)",
    excerpt:
      "Vector databases power semantic search, ANN indexing, and RAG systems. This article explains the core mechanics and compares Pinecone, Weaviate, and Chroma.",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80",
    author: "AI Club BITS Pilani",
    readTime: "10 min read",
    date: "2025-02-01",
    category: "Vector Databases",
    tags: ["Vector DB", "RAG", "Pinecone", "Weaviate", "Chroma"],
    content: `
I. Foundation and Necessity of Vector Databases
The transition from traditional, keyword-based search to modern semantic search is fundamentally enabled by specialized Vector Databases. Conventional databases, built for exact matches and structured metadata, fail to search based on the underlying meaning or conceptual substance of content. This limitation is critical in modern AI, which demands efficient similarity search across high-dimensional data like text, video, and audio. Vector similarity search serves as the engine to quickly compare data based on semantic relevance, underpinning applications from genome analysis to complex query processing.

The core data unit is the vector embedding, a high-dimensional numerical representation (e.g., 1536 or 3072 dimensions) that encapsulates a piece of data's semantic context. This high dimensionality, crucial for capturing nuance, creates the "curse of dimensionality," making traditional indexing structures computationally infeasible for calculating exact distances between vectors. Specialized VDBs are therefore essential for rapidly searching over massive vector sets. The predominant use case driving VDB adoption is Retrieval-Augmented Generation (RAG). By efficiently storing and processing these embeddings, VDBs power the retrieval layer in RAG workflows, injecting contextually relevant, specialized knowledge into the Large Language Model’s (LLM’s) prompt. This capability grounds generative models in proprietary knowledge without needing costly model retraining.

II. ANN Algorithms and Mechanism of High-Dimensional Search
The ability of vector databases to handle large-scale datasets with low latency requires moving beyond brute-force methods. While an Exact Nearest Neighbor search (Flat Index) guarantees 100% accuracy (recall), it is prohibitively slow and memory-intensive, requiring 8.26 milliseconds for a 1-million vector dataset and 256 MB of memory. Scaling to billions of items renders this approach unusable.

A. Approximate Nearest Neighbor (ANN) Search
Vector databases employ Approximate Nearest Neighbor (ANN) algorithms to maintain logarithmic scaling in high-dimensional data. ANN techniques accept a slight reduction in retrieval accuracy (recall) to gain massive increases in search speed and scalability. The customization and tuning of these algorithms are fundamental technical differentiators among VDB implementations.

Table 1: Comparative Analysis of ANN Indexing Trade-offs
Index Type
Goal
Recall (Accuracy)
Speed (Latency)
Memory Usage
Underlying Technique
Flat Index (Brute Force)
100% Accuracy
Highest (100%)
Slowest (8.26 ms)
Highest (256 MB)
Exact Nearest Neighbor
HNSW
Speed/Accuracy Balance
High/Very High
Very Fast (Logarithmic)
High (Memory Intensive)
Hierarchical Proximity Graph
IVFPQ (Optimized)
Speed/Memory Optimization
Medium/High (52%)
Fastest (0.09 ms)
Lowest (9.2 MB)
Inverted File + Product Quantization

B. Deep Dive: Hierarchical Navigable Small Worlds (HNSW)
The Hierarchical Navigable Small Worlds (HNSW) graph index is one of the most widely used and highest-performing ANN algorithms for large datasets. HNSW extends the concept of Navigable Small World (NSW) graphs by introducing a multi-layered, hierarchical structure.

Structure and Search Process: The index consists of multiple layers. The highest layers contain the longest, most sparse connections, facilitating a fast "zoom-out" phase for rapid graph traversal. Layer 0 holds the shortest, most numerous links for fine-grained search. The search begins at the highest layer, using greedy routing to move to the nearest neighboring vertex. Upon locating a local minimum, the search drops down to the next lower layer, repeating until Layer 0 is thoroughly searched, providing the most accurate approximation.

Performance and Memory Constraint: HNSW performance is highly tunable via parameters such as M (number of links per vertex) and efSearch (search depth). Increasing M significantly boosts recall but rapidly increases the index's memory consumption. This high RAM requirement creates a fundamental architectural trade-off: for the Sift1M dataset, increasing M from 2 to 512 can increase the required index size from over 0.5 GB to nearly 5 GB. This memory intensity necessitates either high-cost managed services or complex, manual compression techniques in self-hosted solutions.

C. Optimization via Quantization and Composite Indexes
To mitigate HNSW's memory consumption and further optimize search speed, VDBs use compression techniques like Product Quantization (PQ). PQ achieves memory reduction ratios as high as 64x by splitting the high-dimensional vector into smaller subvectors, clustering the points in those subvector spaces, and replacing the original floating-point values with tiny centroid IDs. While pure PQ indexes are highly memory efficient (6.5 MB for 1M vectors), they typically incur a significant decrease in recall (e.g., 50%).

For production environments, composite indexes like the combination of an Inverted File (IVF) structure with PQ (IndexIVFPQ) are standard. The IVF component acts as an initial filtering mechanism, partitioning vectors into cells. During a search, the query is restricted to only the closest cells, rapidly narrowing the search scope before applying the PQ compression. This combination achieves highly efficient performance, delivering lightning-fast search times (0.09 ms) with low memory usage (9.2 MB) and maintaining a reasonable recall rate (52%).

III. The Vector Database Industry
The leading vector database providers- Pinecone, Weaviate and Chroma, offer distinct architectural models that cater to different enterprise needs for scale, flexibility, and operational simplicity.

A. Pinecone: The Fully Managed, Performance-Guaranteed Solution
Pinecone is a fully managed, closed-source cloud service accessed via a REST API, designed to abstract away infrastructure complexity. It emphasizes operational simplicity and scalability, offering guaranteed performance (sub-100 ms query latency) for mission-critical RAG systems.

Architectural Strengths: Pinecone’s proprietary architecture features built-in replication across availability zones, continuous monitoring, and automatic backup/recovery, making it ideal for high-volume, enterprise-grade production. Its key trade-off is its lack of native auto-vectorization, requiring external embedding generation. Its hybrid search functionality is managed through an API filtering layer rather than being natively integrated into the data model.

Industry Use: Gong, a revenue intelligence platform, utilizes Pinecone to power its "Smart Trackers" feature, which allows sales teams to automatically track and classify concepts within customer conversations. By converting sales calls into sentence-level vector embeddings, Gong can efficiently search through billions of data points to identify relevant moments- such as competitor mentions or objection handling- across thousands of hours of audio. The company recently migrated this workload to Pinecone Serverless, which decoupled storage from compute. This shift allowed Gong to scale its index to billions of vectors without managing infrastructure, resulting in a 10x reduction in costs while maintaining the low latency required for real-time insights.

B. Weaviate: The Open-Source, Feature-Rich Hybrid
Weaviate is an open-source vector database prioritizing flexibility and advanced data modeling. It supports robust hybrid deployment options, including self-hosted, on-premises setups, and managed cloud services.

Key Feature Differentiation: Weaviate’s data model natively stores both the vector embeddings and the original data objects they represent, enabling seamless search techniques. Its most compelling feature is native Hybrid Search, which combines dense vector similarity with sparse keyword scoring (BM25) in a single query, offering a balance of semantic understanding and keyword precision that can boost retrieval accuracy by 15-25%. Weaviate utilizes a modular architecture supporting auto-vectorization plugins and provides a powerful GraphQL interface for complex metadata filtering and handling complex data relationships.

Industry Use: Instabase, an automation platform for unstructured data, uses Weaviate to underpin its "AI Hub," a suite of tools that helps large enterprises in finance and insurance process complex documents like claims and receipts. Instabase specifically leverages Weaviate’s hybrid search capabilities, which combine keyword-based retrieval (BM25) with vector-based semantic search. This dual approach is critical for their customers, who need to find precise values (like a specific invoice number) while also searching for broader conceptual information. Additionally, Weaviate’s ability to run inside Kubernetes containers allowed Instabase to deploy the solution into strict, on-premise environments required by highly regulated banking clients.

C. Chroma: The Embedded, Developer-First Tool
Chroma is an open-source solution optimized for AI development and ease of use, featuring a zero-configuration setup and an intuitive Pythonic API. It leverages HNSW and IVF indexing techniques for high-speed similarity searches.

Architectural Focus: Chroma’s distinguishing feature is its embedded architecture, which runs directly alongside the application, eliminating network latency and accelerating the development cycle for local prototyping and testing. It includes built-in persistence (SQLite), automatic embedding generation (auto-vectorization), and supports horizontal scaling. Its focus on local development means its monitoring capabilities are limited to basic logging, and scaling to enterprise production levels requires more manual tuning compared to fully managed alternatives.

Industry Use: Cursor (by Anysphere), an AI-powered code editor, is a prominent example of the "AI-native" startups that rely on Chroma for its lightweight, embedded design. Unlike other databases that typically require a separate server, Chroma can run directly inside a Python script or a local environment via a simple “pip install”. This makes it ideal for applications like Cursor, which need to index a user's local codebase privately and quickly to provide Retrieval-Augmented Generation (RAG) features, such as "Chat with Codebase." By using Chroma, fast-moving startups can spin up ephemeral vector stores for individual user sessions without the overhead of managing a distributed cloud database.

IV. Selection of Vector Database
Choosing a vector database requires aligning the vendor's capabilities with the project's strategic goals, particularly in RAG suitability and total cost of ownership (TCO).

A. RAG Suitability Alignment
The optimal choice depends on the application's stage and complexity :
Pinecone: Optimal for enterprise-level production RAG systems demanding strict SLA requirements, guaranteed low latency, and managed infrastructure with minimal operational overhead.
Weaviate: Best for complex RAG applications requiring native hybrid search capabilities, complex data modeling, or the flexibility of self-hosting/hybrid cloud deployment.
ChromaDB: Dominates for prototyping and local development, where zero-config, embedded architecture, and ease of use are prioritized for rapid iteration and testing.

B. The Total Cost of Ownership (TCO) Analysis
A comparison of Total Cost of Ownership (TCO), which incorporates infrastructure and labor costs, highlights the economic distinction between managed and self-hosted solutions.

Managed vs. Open-Source Economics: Pinecone’s managed, usage-based pricing offers cost predictability. While its raw infrastructure cost can be higher than alternatives, its primary economic advantage is the near-zero operational overhead, as Pinecone absorbs the complexity of managing HNSW indices, replication, and scaling. For a typical production workload (10M vectors, 5M queries/month), Pinecone’s estimated TCO is highly focused on infrastructure cost, approximately $840/month.

Open-source solutions (Weaviate, Chroma) shift the burden of maintaining highly available, high-performing vector indices, which is intrinsically complex due to ANN algorithms, to the user. The initial low infrastructure cost is often outweighed by the specialized DevOps labor required to manage, optimize, and scale these systems internally. The estimated total TCO for the benchmark workload reflects this: Weaviate TCO is approximately $2,595/month (Cloud + DevOps), and Chroma TCO is the highest, reaching approximately $4,320/month (Infrastructure + DevOps) due to its developer-centric design requiring greater infrastructure management to scale.

The strategic decision centers on whether an organization prefers to pay a premium for guaranteed consistency and managed infrastructure (Pinecone) or bear the higher cost of specialized internal engineering talent required to maintain the availability and performance of a self-hosted platform (Weaviate or Chroma).

References
Enhancing LLMs with Vector Database with real-world examples — Qwak  
Pinecone Vector Index docs  
AIMultiple and CustomGPT RAG DB comparisons  
Chroma, Weaviate official docs, and HNSW literature
`
  }
];

/* --------------------------- Blog Card --------------------------- */
const BlogCard = ({ post, onClick }) => (
  <article
    onClick={onClick}
    className="group cursor-pointer rounded-2xl flex flex-col bg-white/5 border border-white/10 backdrop-blur-md
               hover:border-white/20 hover:bg-white/10 transition-all duration-300"
  >
    <div className="h-48 overflow-hidden rounded-t-2xl">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
    </div>

    <div className="p-6 flex flex-col flex-1">
      <h3 className="text-lg md:text-xl font-semibold text-white mb-2 group-hover:text-indigo-200 transition">
        {post.title}
      </h3>

      <p className="text-white/70 leading-relaxed line-clamp-3 mb-4">
        {post.excerpt}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag, i) => (
          <span
            key={i}
            className="px-2 py-1 rounded-full text-xs bg-white/10 border border-white/20 text-white/60"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-auto text-xs text-white/50 flex justify-between">
        <span>{post.author}</span>
        <span>{post.readTime}</span>
      </div>
    </div>
  </article>
);

/* --------------------------- Blogs Page --------------------------- */
const Blogs = () => {
  const [filters, setFilters] = useState({
    search: "",
    tag: "",
    category: "",
    ordering: "-date"
  });

  const [selectedPost, setSelectedPost] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;

  // Filtering + sorting
  const filtered = [...ALL_BLOGS]
    .filter((b) => {
      if (
        filters.search &&
        !b.title.toLowerCase().includes(filters.search.toLowerCase())
      )
        return false;
      if (
        filters.tag &&
        !b.tags.some((t) =>
          t.toLowerCase().includes(filters.tag.toLowerCase())
        )
      )
        return false;
      if (
        filters.category &&
        !b.category.toLowerCase().includes(filters.category.toLowerCase())
      )
        return false;
      return true;
    })
    .sort((a, b) => {
      const desc = filters.ordering.startsWith("-");
      const field = filters.ordering.replace("-", "");

      let A;
      let B;

      if (field === "date") {
        A = new Date(a.date);
        B = new Date(b.date);
      } else {
        A = a.title.toLowerCase();
        B = b.title.toLowerCase();
      }

      if (A < B) return desc ? 1 : -1;
      if (A > B) return desc ? -1 : 1;
      return 0;
    });

  const totalPages = Math.max(1, Math.ceil(filtered.length / cardsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * cardsPerPage;
  const currentBlogs = filtered.slice(start, start + cardsPerPage);

  return (
    <section id="blogs" className="relative w-full bg-black overflow-x-hidden pt-40 pb-24">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-semibold text-white mb-3">
          Blogs
        </h1>
        <p className="text-white/60 max-w-xl mx-auto text-sm md:text-base">
          Insights, tutorials, and deep-dives from the AI Club community.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 max-w-5xl mx-auto backdrop-blur-md mb-12">
        <div className="flex flex-wrap justify-center gap-4">
          {["search", "tag", "category"].map((f) => (
            <input
              key={f}
              placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
              className="p-3 bg-white/10 border border-white/20 rounded-lg text-white min-w-[180px]"
              value={filters[f]}
              onChange={(e) => {
                setCurrentPage(1);
                setFilters((prev) => ({ ...prev, [f]: e.target.value }));
              }}
            />
          ))}

          <select
            className="p-3 bg-white/10 border border-white/20 rounded-lg text-white min-w-[180px]"
            value={filters.ordering}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, ordering: e.target.value }))
            }
          >
            <option value="-date">Newest First</option>
            <option value="date">Oldest First</option>
            <option value="title">A–Z</option>
            <option value="-title">Z–A</option>
          </select>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md p-8">
          {currentBlogs.length === 0 ? (
            <p className="text-center text-white/60 py-20">No blogs found.</p>
          ) : (
            <>
              {/* Blog Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {currentBlogs.map((post) => (
                  <BlogCard
                    key={post.id}
                    post={post}
                    onClick={() => setSelectedPost(post)}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-6 mt-12">
                  <button
                    disabled={safePage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                    className="px-6 py-2 bg-white/10 border border-white/20 rounded-lg text-white disabled:opacity-30"
                  >
                    Previous
                  </button>

                  <span className="text-white/70">
                    Page {safePage} of {totalPages}
                  </span>

                  <button
                    disabled={safePage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className="px-6 py-2 bg-white/10 border border-white/20 rounded-lg text-white disabled:opacity-30"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Overlay */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="relative bg-black border border-white/20 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center
                         rounded-full bg-white/10 hover:bg-white/20 border border-white/20
                         text-white text-xl font-semibold transition"
              onClick={() => setSelectedPost(null)}
            >
              ×
            </button>

            {/* Image */}
            <img
              src={selectedPost.image}
              className="w-full h-64 object-cover rounded-t-2xl"
              alt={selectedPost.title}
            />

            {/* Text */}
            <div className="p-8 text-white">
              <h2 className="text-3xl font-semibold mb-4">
                {selectedPost.title}
              </h2>

              <div className="text-white/60 text-sm mb-6 flex gap-3 flex-wrap">
                <span>{selectedPost.author}</span>
                <span>•</span>
                <span>
                  {new Date(selectedPost.date).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                  })}
                </span>
                <span>•</span>
                <span>{selectedPost.readTime}</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedPost.tags.map((t, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 rounded-full text-xs bg-white/10 border border-white/20 text-white/60"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              <div className="text-white/80 whitespace-pre-line leading-relaxed">
                {selectedPost.content}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Blogs;
