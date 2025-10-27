import React from 'react'
import AddTodo from './Components/AddTodo'
import Todos from './Components/Todos'

const App = () => {
  return (
    <div className="min-h-screen bg-gray-950 py-8 text-white selection:bg-cyan-500/30 overflow-hidden relative">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Radial Gradient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_200px,#3b82f61a,transparent)]"></div>

      <div className="relative z-10 container mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-black text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)] tracking-tighter">
          TASK MANAGER 
        </h1>
        <p className="text-center text-cyan-500/60 font-mono text-sm tracking-[0.3em] mb-10 animate-pulse">SYSTEM ONLINE</p>
        
        <AddTodo />
        <Todos />
      </div>
    </div>
  )
}

export default App