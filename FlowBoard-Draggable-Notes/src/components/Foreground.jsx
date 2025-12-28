import React, { useEffect, useState } from 'react'
import Card from './Card'

function Foreground() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // 1. Show: Fetching data from Django
    fetch('http://127.0.0.1:8000/api/notes/')
      .then(res => res.json())
      .then(data => setNotes(data));
  }, []);

  const handleDelete = (id) => {
    // 2. Delete: Removing data from Django
    fetch(`http://127.0.0.1:8000/api/notes/${id}/delete/`, { method: 'DELETE' })
      .then(() => setNotes(notes.filter(note => note.id !== id)));
  }

  return (
    <div className="fixed flex flex-wrap gap-20 top-0 left-0 z-[3] w-full h-full p-5">
      {notes.map((item) => (
        // Pass handleDelete down so the close icon works
        <Card key={item.id} data={item} onDelete={() => handleDelete(item.id)} />
      ))}
    </div>
  )
}

export default Foreground