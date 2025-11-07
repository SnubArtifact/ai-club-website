import React, { useEffect, useRef, useState } from "react";

const API_BASE_URL = "https://aiclub-bitsp.dev/api";

/* ---------------------- Pill Tag (purge-safe colors) ---------------------- */
const COLOR = {
  indigo: "bg-indigo-500/15 text-indigo-200 border border-indigo-400/30",
  pink: "bg-pink-500/15 text-pink-200 border border-pink-400/30",
  violet: "bg-violet-500/15 text-violet-200 border border-violet-400/30",
  cyan: "bg-cyan-500/15 text-cyan-200 border border-cyan-400/30",
};

const Tag = ({ children, color = "indigo" }) => (
  <span
    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
      COLOR[color] || COLOR.indigo
    }`}
  >
    {children}
  </span>
);

/* ----------------------------- Project Card ------------------------------ */
const ProjectCard = ({ project }) => {
  const {
    title,
    description,
    technologies = [],
    tags = [],
    image,
    category, // e.g., "IoT", "Computer Vision"
    featured, // boolean
    code_url, // string
    demo_url, // string
  } = project;

  return (
    <article
      className="group relative h-full flex flex-col rounded-2xl bg-white/5 border border-white/10
                 shadow-[0_10px_40px_-10px_rgba(0,0,0,.6)]
                 hover:border-indigo-400/30 hover:shadow-indigo-500/20
                 transition-all duration-300 overflow-hidden"
    >
      {/* Image header */}
      <div className="relative h-52 w-full overflow-hidden">
        <img
          src={image || `https://picsum.photos/seed/project-${project.id}/1200/630`}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {category && <Tag>{category}</Tag>}
          {featured && <Tag color="pink">Featured</Tag>}
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-white/75 leading-relaxed line-clamp-3 mb-4">{description}</p>

        {/* Tech Stack */}
        {technologies.length > 0 && (
          <>
            <p className="text-white/80 text-sm font-medium mb-2">Tech Stack:</p>
            <div className="mb-4 flex flex-wrap gap-2">
              {technologies.map((t, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg text-xs bg-indigo-500/15 text-indigo-200 border border-indigo-400/30"
                >
                  {t}
                </span>
              ))}
            </div>
          </>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mb-5 flex flex-wrap gap-2">
            {tags.map((tg, i) => (
              <span key={i} className="px-2 py-1 rounded-full text-xs bg-white/10 text-white/75">
                #{tg}
              </span>
            ))}
          </div>
        )}

        {/* Buttons */}
        <div className="mt-auto pt-4 flex items-center gap-3">
          {code_url && (
            <a
              href={code_url}
              target="_blank"
              rel="noreferrer"
              className="flex-1 text-center px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition"
            >
              Code
            </a>
          )}
          {demo_url && (
            <a
              href={demo_url}
              target="_blank"
              rel="noreferrer"
              className="flex-1 text-center px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition"
            >
              Demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

/* ----------------------------- Projects Page ----------------------------- */
const Projects = () => {
  const containerRef = useRef(null);

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageTransition, setPageTransition] = useState(false);
  const [error, setError] = useState(null);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const cardsPerPage = 3; // server-aligned via page_size

  // filters
  const [filters, setFilters] = useState({
    status: "",
    technology: "",
    search: "",
    ordering: "-created_at",
  });

  // -------- Robust API fetch that auto-recovers on common backend differences
const fetchProjects = async (pageToFetch, currentFilters) => {
  setPageTransition(true);
  setLoading(true);

  try {
    const params = new URLSearchParams();

    // filters the API actually supports
    if (currentFilters.status) params.set("status", currentFilters.status);
    if (currentFilters.technology) params.set("technology", currentFilters.technology);
    if (currentFilters.search) params.set("search", currentFilters.search);

    // API doc shows ?ordering=field (no minus). If UI sends "-field",
    // we send "field" and reverse locally afterwards.
    const orderRaw = currentFilters.ordering || "created_at";
    const orderField = orderRaw.replace(/^-/, "");
    const isDesc = orderRaw.startsWith("-");
    params.set("ordering", orderField);

    const res = await fetch(`${API_BASE_URL}/projects/${params.toString() ? `?${params}` : ""}`, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    const raw = Array.isArray(data?.results) ? data.results : Array.isArray(data) ? data : [];
let normalized = raw.map((p, i) => {
  // Handle technologies_used and tech_stack fields
  const techArray =
    Array.isArray(p.technologies)
      ? p.technologies
      : typeof p.technologies_used === "string"
      ? p.technologies_used.split(",").map(s => s.trim()).filter(Boolean)
      : typeof p.technologies === "string"
      ? p.technologies.split(",").map(s => s.trim()).filter(Boolean)
      : [];

  return {
    id: p.id ?? i + 1,
    slug: p.slug ?? p.Slug ?? "", // ✅ handle both lowercase/uppercase
    title: p.title ?? p.name ?? "Untitled Project",
    description:
      p.description ??
      p.short_description ??
      p.tagline ??
      "No description provided.",
    technologies: techArray,
    tech_stack: p.tech_stack ?? "", // ✅ capture long-form stack
    tags: Array.isArray(p.tags)
      ? p.tags
      : typeof p.tags === "string"
      ? p.tags.split(",").map(s => s.trim()).filter(Boolean)
      : [],
    status: p.status ?? "",
    category: p.category ?? p.domain ?? "",
    featured: Boolean(p.featured ?? p.is_featured),
    image:
      p.image ||
      p.heroSectionImageLink ||
      p.image_url ||
      p.thumbnail ||
      null,
    code_url:
      p.code_url ??
      p.github_url ??
      p.github_link ??
      p.repo_url ??
      "",
    demo_url:
      p.demo_url ??
      p.demo_link ??
      p.live_url ??
      p.preview_url ??
      "",
    created_at: p.created_at ?? p.createdAt ?? p.date_created ?? null,
    start_date: p.start_date ?? null,
    end_date: p.end_date ?? null,
  };
});


    // If UI asked for descending (e.g., "-created_at"), reverse locally.
    if (isDesc) normalized = [...normalized].reverse();

    // client-side pagination
    const total = normalized.length;
    const totalPagesLocal = Math.max(1, Math.ceil(total / cardsPerPage));
    setTotalPages(totalPagesLocal);

    const start = (pageToFetch - 1) * cardsPerPage;
    const end = start + cardsPerPage;
    setProjects(normalized.slice(start, end));

    // clamp page if it went out of range after filter change
    if (pageToFetch > totalPagesLocal) {
      setCurrentPage(1);
    }

    setError(null);
  } catch (e) {
    console.error("Failed to fetch projects:", e);
    setError("Failed to load project data.");
    setProjects([]);
    setTotalPages(1);
  } finally {
    setLoading(false);
    setTimeout(() => setPageTransition(false), 120);
  }
};

  useEffect(() => {
    fetchProjects(currentPage, filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, filters]);

  useEffect(() => {
    if (!containerRef.current || loading) return;
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("animate-fadeIn")),
      { threshold: 0.12 }
    );
    containerRef.current.querySelectorAll(".animate-on-scroll").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [projects, loading]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({ status: "", technology: "", search: "", ordering: "-created_at" });
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && !pageTransition) setCurrentPage(page);
  };

  // grid content
  const grid = loading ? (
    <div className="text-center py-20">
      <div className="mx-auto w-16 h-16 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin" />
      <p className="text-white text-xl mt-6">Loading projects...</p>
    </div>
  ) : error ? (
    <div className="text-center py-20">
      <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 max-w-md mx-auto">
        <p className="text-red-400 text-xl font-bold mb-3">Error Loading Projects</p>
        <p className="text-white/70 mb-6">{error}</p>
        <button
          onClick={() => fetchProjects(currentPage, filters)}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
        >
          Try Again
        </button>
      </div>
    </div>
  ) : projects.length === 0 ? (
    <div className="text-center py-20">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 max-w-md mx-auto">
        <p className="text-indigo-300 text-xl mb-2">No projects found</p>
        <p className="text-white/70 mb-6">Try adjusting filters or search terms.</p>
        <button
          onClick={clearFilters}
          className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition"
        >
          Clear Filters
        </button>
      </div>
    </div>
  ) : (
    <div
      className={`transition duration-500 ${
        pageTransition ? "opacity-0 scale-[0.99]" : "opacity-100 scale-100"
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-stretch">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </div>
  );

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative w-full bg-black overflow-hidden py-20 md:py-28"
    >
      {/* Decorative background (no layout impact) */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[#0e0e0e]" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_40%,rgba(99,102,241,0.10),transparent_60%)]" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-7xl font-mont font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-200 hover:scale-105 transition-transform duration-300 leading-[1.15] pb-1 mb-6">
            Our Projects
          </h2>
        </div>

        {/* Filters */}
        <div className="mb-8 bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
          <div className="flex flex-wrap justify-center items-center gap-4 text-center">
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="p-3 rounded-lg bg-white/10 text-white border border-indigo-400/40"
            >
              <option value="">All Status</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="planned">Planned</option>
            </select>

            <input
              type="text"
              name="technology"
              value={filters.technology}
              onChange={handleFilterChange}
              placeholder="Filter by technology…"
              className="p-3 rounded-lg bg-white/10 text-white placeholder-white/50 border border-indigo-400/40"
            />

            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search projects…"
              className="p-3 rounded-lg bg-white/10 text-white placeholder-white/50 border border-indigo-400/40"
            />

            <select
              name="ordering"
              value={filters.ordering}
              onChange={handleFilterChange}
              className="p-3 rounded-lg bg-white/10 text-white border border-indigo-400/40"
            >
              <option value="-created_at">Newest First</option>
              <option value="created_at">Oldest First</option>
              <option value="name">Name A–Z</option>
              <option value="-name">Name Z–A</option>
            </select>

            <button
              onClick={clearFilters}
              className="px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 hover:bg-white/20 transition"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Grid + pagination */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
          {grid}

          {totalPages > 1 && !loading && !error && projects.length > 0 && (
            <div className="flex justify-center items-center mt-12 gap-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || pageTransition}
                className="px-6 py-3 bg-white/10 text-white rounded-lg disabled:opacity-50 hover:bg-white/20 transition"
              >
                Previous
              </button>

              <span
                className={`text-white text-lg px-6 py-3 bg-white/5 rounded-lg transition ${
                  pageTransition ? "opacity-70" : "opacity-100"
                }`}
              >
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || pageTransition}
                className="px-6 py-3 bg-white/10 text-white rounded-lg disabled:opacity-50 hover:bg-white/20 transition"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
