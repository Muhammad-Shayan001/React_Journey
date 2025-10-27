import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../Features/Todo/todoSlice'

const AddTodo = () => {
    const [input, setInput] = useState('')
    const dispatch = useDispatch()

    const addTodoHandler = (e) => {
        e.preventDefault()
        if (!input.trim()) return
        dispatch(addTodo(input))
        setInput('')
    }

    return (
        <form onSubmit={addTodoHandler} className="flex flex-col md:flex-row justify-center items-center mt-12 gap-6 p-4">
            <div className="relative group w-full md:w-auto">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <input
                    type="text"
                    className="relative w-full md:w-96 bg-gray-900 text-cyan-300 border border-gray-800 rounded-lg py-4 px-6 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent placeholder-gray-600 font-mono tracking-wider shadow-xl transition-all"
                    placeholder=">> INITIALIZE NEW TASK..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
            </div>
            <button
                type="submit"
                className="relative group px-8 py-4 bg-gray-900 rounded-lg leading-none flex items-center border border-cyan-500/30 hover:border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all duration-300 overflow-hidden"
            >
                <div className="absolute inset-0 bg-cyan-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative flex items-center space-x-3">
                    <span className="text-cyan-400 font-mono font-bold tracking-widest group-hover:text-white transition-colors">ADD PROTOCOL</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-purple-500 group-hover:text-white transition-colors transform group-hover:rotate-90 duration-300">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </span>
            </button>
        </form>
    )
}

export default AddTodo