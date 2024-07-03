// src/components/InstantMeetingNotes/index.js
import React, { useState, useEffect } from 'react';
import './InstantMeetingNotes.css';

const InstantMeetingNotes = () => {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [notesList, setNotesList] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notesList')) || [];
    setNotesList(savedNotes);
  }, []);

  const handleSaveNote = () => {
    if (note.trim() === '' || title.trim() === '') return;

    const newNote = {
      title,
      note,
      date: new Date().toLocaleString(),
    };

    let newNotesList;
    if (editIndex >= 0) {
      newNotesList = notesList.map((item, index) =>
        index === editIndex ? newNote : item
      );
      setEditIndex(-1);
    } else {
      newNotesList = [...notesList, newNote];
    }

    setNotesList(newNotesList);
    setTitle('');
    setNote('');
    localStorage.setItem('notesList', JSON.stringify(newNotesList));
  };

  const handleEditNote = (index) => {
    const noteToEdit = notesList[index];
    setTitle(noteToEdit.title);
    setNote(noteToEdit.note);
    setEditIndex(index);
  };

  const handleDeleteNote = (index) => {
    const newNotesList = notesList.filter((_, i) => i !== index);
    setNotesList(newNotesList);
    localStorage.setItem('notesList', JSON.stringify(newNotesList));
  };

  return (
    <div className="instant-meeting-notes">
      <h1>Instant Meeting Notes</h1>
      <input
        type="text"
        placeholder="Enter meeting title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Enter your meeting notes"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button onClick={handleSaveNote}>
        {editIndex >= 0 ? 'Update Note' : 'Save Note'}
      </button>
      <h2>Notes List</h2>
      <ul>
        {notesList.map((item, index) => (
          <li key={index}>
            <div className="note-header">
              <strong>{item.title}</strong>
              <span className="note-date">{item.date}</span>
            </div>
            <p>{item.note}</p>
            <div className="note-actions">
              <button className="edit-note-button" onClick={() => handleEditNote(index)}>
                Edit
              </button>
              <button className="delete-note-button" onClick={() => handleDeleteNote(index)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InstantMeetingNotes;
