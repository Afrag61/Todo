import { createContext, useState, useEffect } from 'react'
import { getTodoById } from '../../backend/helpers';

export const TodoContext = createContext({
    todos: [],
    fetchTodosState: () => {},
    postTodos: () => {},
    getTodoById: () => {},
})

const TodosContextProvider = ({children}) => {
    const [todos, setTodos] = useState([]);

    const fetchTodosState = useEffect(() => {
        const fetchTodosState = async () => {
            const response = await fetch('http://localhost:3000/todos')
            const fetchedTodos = await response.json()
            setTodos(fetchedTodos)
        }

        fetchTodosState()
    }, [todos])

    const postTodos = async ( title, description, dueDateTime) => {
        const response = await fetch(`http://localhost:3000/todos`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                title,
                description,
                dueDateTime,
              }),
            });
    }

    const getTodoById = async (id) => {
        const response = await fetch(`http://localhost:3000/todo/${id}`)
        const data = await response.json()
        // console.log("[[][]]",data);
        return data
    }

    return (
        <TodoContext.Provider value={{todos, fetchTodosState, postTodos, getTodoById}}>
            {children}
        </TodoContext.Provider>
    );
}

export default TodosContextProvider;
