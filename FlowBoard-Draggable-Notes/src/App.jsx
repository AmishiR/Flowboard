import React from 'react'
import Background from "./components/Background"
import Foreground from './components/Foreground'

function App() {
  return (
    <div className="w-full h-screen bg-zinc-900 relative">
      <Background/>
      <Foreground/>
    </div>
  )
}

export default App
