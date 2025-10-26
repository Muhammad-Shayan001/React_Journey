import React, { useEffect, useState } from 'react'
import { TodoProvider } from './Context/TodoContext'
import TodoForm from './Components/TodoForm'
import TodoItems from './Components/TodoItems'

const App = () => {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    // setTodos([...todos, todo])
    setTodos((prevTodos) => [...prevTodos, {id: Date.now(), ...todo}])
  }

  const updateTodo = (id , todo) => {
    setTodos((prev) => prev.map((item) => (item.id === id ? todo : item)))
  }
  const ToggleEvent = (id) => {
    setTodos((prev) => prev.map((items) => items.id === id ? {...items , completed : !items.completed} : items))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'))
    if(todos && todos.length > 0) {
      setTodos(todos)
    }
  } , [])
  useEffect(() => {
    localStorage.setItem('todos' , JSON.stringify(todos))
  } , [todos])
  return (
    <TodoProvider value={{todos , addTodo , updateTodo , deleteTodo , ToggleEvent}}>
      <div className="relative min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 animate-gradient-xy flex items-center justify-center p-4 font-sans overflow-hidden">
        
        {/* Floating Background Shapes */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float-delayed"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>

        <div className="relative w-full max-w-md glass-effect bg-gradient-to-br from-white/40 via-purple-100/30 to-indigo-100/30 backdrop-blur-2xl rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] overflow-hidden animate-fade-in transform transition-all hover:scale-[1.01] duration-300 border border-white/50">
          
          {/* Header */}
          <div className="p-8 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-b border-white/20 backdrop-blur-sm">
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight mb-2 drop-shadow-sm">
              My Tasks<span className="text-indigo-500">.</span>
            </h1>
            <p className="text-gray-600 text-sm font-semibold tracking-wide uppercase opacity-75">
              Stay organized & creative
            </p>
          </div>

          {/* Input Area */}
          <div className="bg-white/30 backdrop-blur-sm">
            <TodoForm />
          </div>

          {/* Todo List */}
          <div className="px-6 pb-8 space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar">
            {todos.map((todo) => (
              <div className='w-full' key={todo.id}>
                <TodoItems todo={todo}/>
              </div>
            ))}
          </div>
          
          {/* Footer Status */}
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
            <span>{todos.filter(t => !t.completed).length} tasks remaining</span>
            <div className="flex gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
              <span>Syncing...</span>
            </div>
          </div>

        </div>
      </div>
    </TodoProvider>
  )
}

export default App


