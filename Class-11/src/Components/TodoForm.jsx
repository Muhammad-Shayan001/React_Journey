import React, { useState } from 'react'
import { useTodo } from '../Context'

const TodoForm = () => {
    const [todo , setTodo] = useState("")

    const {addTodo} = useTodo()

    const add = (e) => {
        e.preventDefault()

        if(!todo) return

        addTodo({todo , completed :false})
        setTodo("")
    }

return (
    <form onSubmit={add} className="mb-8 animate-fade-in">
        <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500 animate-gradient-xy"></div>
            <div className="relative flex items-center">
                <input 
                    type="text" 
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    placeholder="What needs to be done?" 
                    className="w-full pl-6 pr-20 py-5 bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl shadow-inner text-gray-800 placeholder-gray-600 focus:ring-2 focus:ring-white/50 focus:bg-white/50 transition-all duration-300 ease-out text-lg font-medium"
                />
                <button 
                    type="submit"
                    className="absolute right-3 p-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:shadow-indigo-500/50 hover:scale-105 active:scale-95 flex items-center justify-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    </form>
)
}

export default TodoForm