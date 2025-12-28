import React, { useEffect, useState } from 'react'
import Card from './Card'

function Foreground() {
  const [notes, setNotes] = useState([]);

  // ✅ CHANGE THIS to your actual Render Backend URL
  const API_BASE_URL = 'https://flowboard-backend.onrender.com';

  useEffect(() => {
    // Fetching data from your LIVE Django API
    fetch(`${API_BASE_URL}/api/notes/`)
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(data => setNotes(data))
      .catch(err => console.error("Error fetching notes:", err));
  }, []);

  const handleDelete = (id) => {
    // Removing data from your LIVE Django API
    fetch(`${API_BASE_URL}/api/notes/${id}/delete/`, { 
      method: 'DELETE' 
    })
      .then(res => {
        if (res.ok) {
          setNotes(notes.filter(note => note.id !== id));
        }
      })
      .catch(err => console.error("Error deleting note:", err));
  }

  return (
    <div className="fixed flex flex-wrap gap-20 top-0 left-0 z-[3] w-full h-full p-5">
      {notes.length > 0 ? (
        notes.map((item) => (
          <Card key={item.id} data={item} onDelete={() => handleDelete(item.id)} />
        ))
      ) : (
        <div className="text-white opacity-50">No notes found or loading...</div>
      )}
    </div>
  )
}

export default Foreground;