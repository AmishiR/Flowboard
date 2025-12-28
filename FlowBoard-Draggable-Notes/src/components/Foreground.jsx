import React, { useEffect, useState } from 'react'
import Card from './Card'

function Foreground() {
  const [notes, setNotes] = useState([]);
  const API_BASE_URL = 'https://flowboard-j5yw.onrender.com';

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/notes/`)
      .then(res => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        return res.json();
      })
      .then(data => {
        console.log("Notes received:", data);
        setNotes(data); // Directly set data because it is a clean array []
      })
      .catch(err => console.error("Fetch error:", err));
  }, []);

  const handleDelete = (id) => {
    fetch(`${API_BASE_URL}/api/notes/${id}/delete/`, { method: 'DELETE' })
      .then(res => {
        if (res.ok) setNotes(prev => prev.filter(note => note.id !== id));
      })
      .catch(err => console.error("Delete error:", err));
  }

  return (
    <div className="fixed flex flex-wrap gap-20 top-0 left-0 z-[3] w-full h-full p-5">
      {notes.length > 0 ? (
        notes.map((item) => (
          <Card key={item.id} data={item} onDelete={() => handleDelete(item.id)} />
        ))
      ) : (
        <div className="text-white opacity-50 text-xl">
          {/* This helps you know if the app is actually running */}
          Frontend is live. Fetching notes from {API_BASE_URL}...
        </div>
      )}
    </div>
  )
}

export default Foreground;