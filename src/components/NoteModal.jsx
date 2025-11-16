import React, { useState } from 'react';

export default function NoteModal({ close, save, deleteNote, editNote }) {
  const [title, setTitle] = useState(editNote?.title || '');
  const [description, setDescription] = useState(editNote?.description || '');
  const [category, setCategory] = useState(editNote?.category || 'Work');

  const handleSubmit = () => {
    if (!title.trim()) return alert('Title required!');
    save({
      id: editNote?.id,
      title: title.trim(),
      description: description.trim(),
      category,
      timestamp: editNote?.timestamp || new Date().toLocaleString()
    });
    close();
  };

  return (
    <div className='modal-bg' onMouseDown={close}>
      <div className='modal' onMouseDown={(e) => e.stopPropagation()}>
        <h2>{editNote ? 'Edit Note' : 'Create Note'}</h2>

        <label>Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder='Title' />

        <label>Description</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder='Description' rows={6} />

        <label>Category</label>
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option>Work</option>
          <option>Personal</option>
          <option>Ideas</option>
        </select>

        <div className='modal-actions'>
          <button className='save-btn' onClick={handleSubmit}>{editNote ? 'Update' : 'Create'}</button>
          {editNote && <button className='delete-btn' onClick={() => deleteNote(editNote.id)}>Delete</button>}
          <button className='close-btn' onClick={close}>Close</button>
        </div>
      </div>
    </div>
  );
}
