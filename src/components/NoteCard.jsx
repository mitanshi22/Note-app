import React from 'react';

export default function NoteCard({ note, onClick }) {
  return (
    <div className='note-card' onClick={onClick} role='button' tabIndex={0}>
      <div className='note-top'>
        <h3 className='note-title'>{note.title}</h3>
        <span className='note-category'>{note.category}</span>
      </div>
      <p className='note-desc'>{note.description}</p>
      <div className='note-footer'>
        <small>{note.timestamp}</small>
      </div>
    </div>
  );
}
