import React from 'react';
import NoteCard from './NoteCard';

export default function NotesList({ notes, onNoteClick }) {
  if (!notes || notes.length === 0) {
    return <div className='empty'>No notes yet. Create one!</div>;
  }

  return (
    <div className='notes-grid'>
      {notes.map(note => (
        <NoteCard key={note.id} note={note} onClick={() => onNoteClick(note)} />
      ))}
    </div>
  );
}
