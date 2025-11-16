import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import NotesList from './components/NotesList';
import NoteModal from './components/NoteModal';
import initialNotes from './data/notes.json';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Notes');
  const [modalOpen, setModalOpen] = useState(false);
  const [editNote, setEditNote] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('notesApp_v1');
    if (saved) setNotes(JSON.parse(saved));
    else setNotes(initialNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem('notesApp_v1', JSON.stringify(notes));
  }, [notes]);

  const addOrUpdateNote = (note) => {
    if (note.id) {
      setNotes(prev => prev.map(n => (n.id === note.id ? note : n)));
    } else {
      const newNote = {
        ...note,
        id: Date.now(),
        timestamp: new Date().toLocaleString()
      };
      setNotes(prev => [newNote, ...prev]);
    }
  };

  const deleteNote = (id) => {
    if (window.confirm('Delete this note?')) {
      setNotes(prev => prev.filter(n => n.id !== id));
      setModalOpen(false);
      setEditNote(null);
    }
  };

  const filteredNotes = selectedCategory === 'All Notes'
    ? notes
    : notes.filter(n => n.category === selectedCategory);

  return (
    <div className='app-container'>
      <Sidebar selected={selectedCategory} setSelected={setSelectedCategory} />

      <main className='main-area'>
        <div className='header'>
          <h1>Notes</h1>
          <div>
            <button className='create-btn' onClick={() => { setEditNote(null); setModalOpen(true); }}>
              + Create Note
            </button>
          </div>
        </div>

        <NotesList notes={filteredNotes} onNoteClick={(note) => { setEditNote(note); setModalOpen(true); }} />
      </main>

      {modalOpen && (
        <NoteModal
          close={() => { setModalOpen(false); setEditNote(null); }}
          save={addOrUpdateNote}
          deleteNote={deleteNote}
          editNote={editNote}
        />
      )}
    </div>
  );
}
