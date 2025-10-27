import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeTodo, updateTodo } from '../Features/Todo/todoSlice'

const TodoItem = ({ todo }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editText, setEditText] = useState(todo.text)
    const dispatch = useDispatch()

    const handleUpdate = () => {
        if (editText.trim()) {
            dispatch(updateTodo({ id: todo.id, text: editText }))
            setIsEditing(false)
        }
    }

    const handleCancel = () => {
        setEditText(todo.text)
        setIsEditing(false)
    }

    return (
        <li className="group relative flex flex-col md:flex-row justify-between items-center bg-gray-900/50 backdrop-blur-md border border-white/5 hover:border-cyan-500/50 p-5 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:-translate-y-1 gap-4">
            {/* Futuristic background element */}
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="flex items-center gap-4 z-10 w-full">
                <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_#06b6d4] transition-colors duration-300 ${isEditing ? 'bg-yellow-400 shadow-yellow-400 animate-ping' : 'bg-cyan-500 animate-pulse'}`}></div>
                
                {isEditing ? (
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full bg-black/40 border-b-2 border-yellow-400 text-yellow-300 font-mono text-lg focus:outline-none px-2 py-1 animate-pulse"
                        autoFocus
                    />
                ) : (
                    <span className="text-gray-300 font-mono text-lg tracking-wide group-hover:text-cyan-100 transition-colors break-all">
                        {todo.text}
                    </span>
                )}
            </div>

            <div className="flex gap-3 z-10 shrink-0">
                {isEditing ? (
                    <>
                        <button
                            onClick={handleUpdate}
                            className="relative overflow-hidden px-4 py-2 rounded border border-yellow-500/30 text-yellow-400 hover:text-black hover:bg-yellow-400 transition-all duration-300"
                        >
                            <span className="font-mono text-xs font-bold">SAVE</span>
                        </button>
                        <button
                            onClick={handleCancel}
                            className="relative overflow-hidden px-4 py-2 rounded border border-gray-600 text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-300"
                        >
                            <span className="font-mono text-xs font-bold">ABORT</span>
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="relative overflow-hidden px-4 py-2 rounded border border-cyan-500/30 text-cyan-400 hover:text-white hover:border-cyan-500 hover:bg-cyan-500/20 transition-all duration-300 group/btn"
                        >
                            <span className="relative z-10 font-mono text-xs font-bold">REWRITE</span>
                            <div className="absolute inset-0 bg-cyan-500/10 scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left duration-300"></div>
                        </button>
                        <button
                            onClick={() => dispatch(removeTodo(todo.id))}
                            className="relative overflow-hidden px-4 py-2 rounded border border-red-500/30 text-red-400 hover:text-white hover:border-red-500 hover:bg-red-500/20 transition-all duration-300 group/btn"
                        >
                            <span className="relative z-10 font-mono text-xs font-bold">TERMINATE</span>
                            <div className="absolute inset-0 bg-red-500/10 scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left duration-300"></div>
                        </button>
                    </>
                )}
            </div>

            {/* Scanline effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000 pointer-events-none"></div>
        </li>
    )
}

export default TodoItem
