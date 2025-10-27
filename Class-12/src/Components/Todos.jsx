import React from 'react'
import { useSelector } from 'react-redux'
import TodoItem from './TodoItem'

const Todos = () => {
    const todos = useSelector(state => state.todos)

    return (
        <div className="w-full max-w-3xl mx-auto mt-10 px-4">
            <h2 className="text-3xl font-black text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 tracking-tighter drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                ACTIVE PROTOCOLS
            </h2>
            <ul className="space-y-4">
                {todos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} />
                ))}
            </ul>
        </div>
    )
}

export default Todos