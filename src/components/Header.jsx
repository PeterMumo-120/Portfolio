import React from 'react';

export default function Header({ query, setQuery, showForm, toggleForm }) {
  return (
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

        <button className="primary" onClick={toggleForm}>
          {showForm ? 'Close' : 'Add Project'}
        </button>
      </div>
    </header>
  );
}
