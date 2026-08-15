import React from 'react';

export default function ProjectForm({ onAdd, onCancel }) {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [image, setImage] = React.useState('');
  const [tags, setTags] = React.useState('');

  function submit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    const project = {
      title: title.trim(),
      description: description.trim(),
      image: image.trim() || null,
      tags: tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    };
    onAdd(project);
    setTitle('');
    setDescription('');
    setImage('');
    setTags('');
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
        <button type="submit" className="primary">Add Project</button>
        <button type="button" onClick={onCancel} style={{ marginLeft: 8 }} className="delete">Cancel</button>
      </div>
    </form>
  );
}
