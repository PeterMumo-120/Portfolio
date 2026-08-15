import React, { useEffect, useState } from "react";
import "./App.css";

const SAMPLE_PROJECTS = [
  {
    id: "1",
    title: "Brand Identity for Aurora",
    description:
      "Full brand identity including logo, typography, and guidelines for a lifestyle startup.",
    image:
      "https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=4f9f2f6a7a1639d4d28b8b2f4b9d6a3a",
    tags: ["Branding", "Design"],
  },
  {
    id: "2",
    title: "E-commerce UX Overhaul",
    description:
      "Redesigned checkout and product pages for a boutique e-commerce store to increase conversions.",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=3f2a3bcb1f1b5f6a9d0f6b3a7f6a2a1b",
    tags: ["UX", "Web"],
  },
  {
    id: "3",
    title: "Social Campaign Motion",
    description:
      "Short animated assets and a campaign guide for social platforms.",
    image:
      "https://images.unsplash.com/photo-1504198266287-1659872e6590?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=a7b3e5b1c8c1b4f3c6d1f8a9f3e2b1c4",
    tags: ["Motion", "Social"],
  },
];

function App() {
  const [projects, setProjects] = useState(() => {
    try {
      const raw = localStorage.getItem("projects:v1");
      return raw ? JSON.parse(raw) : SAMPLE_PROJECTS;
    } catch (e) {
      return SAMPLE_PROJECTS;
    }
  });
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("projects:v1", JSON.stringify(projects));
    } catch (e) {
      // ignore write errors
    }
  }, [projects]);

  function handleAdd(project) {
    setProjects((prev) => [{ ...project, id: Date.now().toString() }, ...prev]);
    setShowForm(false);
  }

  function handleDelete(id) {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }

  const lower = query.trim().toLowerCase();
  const filtered = projects.filter((p) => {
    if (!lower) return true;
    return (
      p.title.toLowerCase().includes(lower) ||
      p.description.toLowerCase().includes(lower) ||
      (p.tags || []).some((t) => t.toLowerCase().includes(lower))
    );
  });

  return (
    <div className="app-root">
      <header className="site-header">
        <div className="site-brand">
          <h1>Creative Agency</h1>
          <p className="tagline">We craft meaningful brand & digital experiences.</p>
        </div>
        <div className="controls">
          <div className="search">
            <input
              aria-label="Search projects"
              placeholder="Search projects, tags..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button className="primary" onClick={() => setShowForm((s) => !s)}>
            {showForm ? "Close" : "Add Project"}
          </button>
        </div>
      </header>

      {showForm && <ProjectForm onAdd={handleAdd} />}

      <main>
        <section className="projects-section">
          <h2 className="section-title">Projects</h2>
          <p className="section-sub">A curated selection of our recent work.</p>

          <div className="grid">
            {filtered.length === 0 && (
              <div className="empty">No projects match your search.</div>
            )}

            {filtered.map((p) => (
              <article key={p.id} className="card">
                {p.image && (
                  <div className="thumb" style={{ backgroundImage: `url(${p.image})` }} />
                )}
                <div className="card-body">
                  <h3>{p.title}</h3>
                  <p className="desc">{p.description}</p>
                  <div className="meta">
                    <div className="tags">
                      {(p.tags || []).map((t, i) => (
                        <span key={i} className="tag">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="card-actions">
                      <button
                        className="delete"
                        title="Remove project"
                        onClick={() => handleDelete(p.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <small>© {new Date().getFullYear()} Creative Agency — Built with React + Vite</small>
      </footer>
    </div>
  );
}

function ProjectForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    const project = {
      title: title.trim(),
      description: description.trim(),
      image: image.trim() || null,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
    onAdd(project);
    setTitle("");
    setDescription("");
    setImage("");
    setTags("");
  }

  return (
    <form className="project-form" onSubmit={submit}>
      <div className="form-row">
        <label>
          Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Image URL
          <input value={image} onChange={(e) => setImage(e.target.value)} placeholder="Optional" />
        </label>
      </div>

      <label className="full">
        Description
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>

      <label className="full">
        Tags (comma separated)
        <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="e.g. Branding, Web" />
      </label>

      <div className="form-actions">
        <button type="submit" className="primary">
          Add Project
        </button>
      </div>
    </form>
  );
}

export default App;
