import React, { useEffect, useState } from 'react'
import Card from './Card'

function Foreground() {
  const [notes, setNotes] = useState([]);

  const API_BASE_URL = 'https://flowboard-j5yw.onrender.com'; // Replace with your actual Backend URL

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/notes/`)
      .then(res => res.json())
      .then(data => setNotes(data))
      .catch(err => console.error("Connection Error:", err));
  }, []);

  const handleDelete = (id) => {
    fetch(`${API_BASE_URL}/api/notes/${id}/delete/`, { method: 'DELETE' })
      .then(res => {
        if (res.ok) setNotes(notes.filter(note => note.id !== id));
      });
  }

  return (
    <div className="fixed flex flex-wrap gap-20 top-0 left-0 z-[3] w-full h-full p-5">
      {notes.length > 0 ? (
        notes.map((item) => (
          <Card key={item.id} data={item} onDelete={() => handleDelete(item.id)} />
        ))
      ) : (
        <div className="text-white opacity-50">
          Connected to API. Add notes in Django Admin to see them here!
        </div>
      )}
    </div>
  )
}

export default Foreground;