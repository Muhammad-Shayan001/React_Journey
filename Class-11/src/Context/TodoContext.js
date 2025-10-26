import { createContext, useContext } from "react";

export const todoContext = createContext({
    todos : [
        {
            id : 1 ,
            todo : 'Todo Msg',
            completed : false
        }
    ],
    addTodo : () => {} ,
    updateTodo : () => {},
    deleteTodo : () => {},
    ToggleEvent : () => {}

})

export const useTodo = () => {
    return useContext(todoContext)
}

export const TodoProvider = todoContext.Provider                                          