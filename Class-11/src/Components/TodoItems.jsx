import React, { useState } from 'react'
import { useTodo } from '../Context'

const TodoItems = ({todo}) => {
    const [isTodoEditable , setIsTodoEditable] = useState(false)
    const [todoMsg , setTodoMsg] = useState(todo.todo)
    const { updateTodo , deleteTodo , ToggleEvent} = useTodo()
    
    const editTodo = () => {
        updateTodo(todo.id , {...todo , todo:todoMsg})
        setIsTodoEditable(false)
    }

    const toggleCompleted = () => {
        ToggleEvent(todo.id)
    }

    return (
        <div className={`group flex items-center justify-between p-4 mb-3 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 animate-slide-up border border-white/40 hover:border-white/60 ${todo.completed ? 'bg-gray-100/50 backdrop-blur-sm' : 'bg-gradient-to-r from-indigo-200/80 via-purple-200/80 to-pink-200/80 backdrop-blur-md'}`}>
            <div className="flex items-center gap-4 flex-1">
                <label className="relative cursor-pointer group/check">
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={toggleCompleted}
                        className="peer sr-only"
                    />
                    <div className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) transform peer-checked:rotate-[360deg] hover:scale-110 ${
                        todo.completed 
                        ? 'bg-gradient-to-br from-green-400 to-emerald-600 border-transparent shadow-[0_0_15px_rgba(74,222,128,0.5)]' 
                        : 'bg-white/40 border-indigo-300 hover:border-indigo-500 shadow-sm hover:shadow-indigo-200'
                    }`}>
                        <svg 
                            className={`w-5 h-5 text-white drop-shadow-sm transition-all duration-300 delay-100 ${
                                todo.completed ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                            }`}
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor" 
                            strokeWidth="3"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                    </div>
                </label>
                
                <div className="flex-1 relative">
                    {isTodoEditable ? (
                        <input
                            type="text"
                            value={todoMsg}
                            onChange={(e) => setTodoMsg(e.target.value)}
                            onBlur={editTodo}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') editTodo();
                            }}
                            autoFocus
                            className={`w-full bg-transparent border-none outline-none text-lg text-gray-800 px-0 py-0 transition-all duration-300 focus:ring-0`}
                        />
                    ) : (
                        <p
                            className={`text-lg font-medium transition-all duration-300 select-none ${
                                todo.completed
                                    ? "text-gray-400 line-through decoration-2 decoration-indigo-200"
                                    : "text-gray-700"
                            }`}
                        >
                            {todoMsg}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 ease-out pl-4">
                <button
                    onClick={() => {
                        if (todo.completed) return;
                        if (isTodoEditable) {
                            editTodo();
                        } else {
                            setIsTodoEditable(true);
                        }
                    }}
                    disabled={todo.completed}
                    className={`p-2 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm hover:shadow-md ${isTodoEditable ? 'bg-green-100 text-green-600 hover:bg-green-200' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'} ${todo.completed ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isTodoEditable ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                        </svg>
                    )}
                </button>
                
                <button
                    onClick={() => deleteTodo(todo.id)}
                    className="p-2 bg-red-50 text-red-500 hover:bg-red-100 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm hover:shadow-md"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.49 1.478l-.56 17.433A2.25 2.25 0 0117.08 24H6.92a2.25 2.25 0 01-2.248-2.122L4.13 6.695a48.85 48.85 0 01-3.878-.512.75.75 0 11.49-1.478 48.841 48.841 0 013.878-.512V4.478C4.75 3.268 5.676 2.25 6.844 2.25h10.312c1.168 0 2.094 1.018 2.094 2.228zM8.25 9.75a.75.75 0 01.75.75v8.25a.75.75 0 01-1.5 0v-8.25a.75.75 0 01.75-.75zm3.75 0a.75.75 0 01.75.75v8.25a.75.75 0 01-1.5 0v-8.25a.75.75 0 01.75-.75zm3.75 0a.75.75 0 01.75.75v8.25a.75.75 0 01-1.5 0v-8.25a.75.75 0 01.75-.75z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default TodoItems