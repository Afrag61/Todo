import { createContext, useState, useEffect } from 'react'

export const TodoContext = createContext({
    todos: [],
    fetchTodosState: () => {},
    postTodos: () => {},
})

const TodosContextProvider = ({children}) => {
    const [todos, setTodos] = useState([]);

    const fetchTodosState = useEffect(() => {
        const fetchTodosState = async () => {
            const response = await fetch('http://localhost:3000/todos')
            const data = response.json()
            const fetchedTodos = await data
            setTodos(fetchedTodos)
        }

        fetchTodosState()
    }, [todos])

    const postTodos = async ( title, description, dueDateTime) => {
        const response = await fetch(`http://localhost:3000/todos`, {
              // method: "GET",
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

    return (
        <TodoContext.Provider value={{todos, fetchTodosState, postTodos}}>
            {children}
        </TodoContext.Provider>
    );
}

export default TodosContextProvider;
