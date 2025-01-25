import { createContext, useState, useEffect } from 'react'
import { getTodoById } from '../../backend/helpers';

export const TodoContext = createContext({
    todos: [],
    fetchTodosState: () => { },
    addTodo: () => { },
    getTodoById: () => { },
})

const TodosContextProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);

    const fetchTodosState = async () => {
        const response = await fetch('http://localhost:3000/todos')
        const fetchedTodos = await response.json()
        setTodos(fetchedTodos)
    }

    useEffect(() => {
        fetchTodosState()
    }, [])

    const addTodo = async (title, description, dueDateTime) => {
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
        }).then(async (res) => {
            if (res.isSuccess) {
                await fetchTodosState()
            }
        }).catch((error) => {
            console.log('[[][]] The Error:', error);
        });

        // return response.json();
    }

    const getTodoById = async (id) => {
        const response = await fetch(`http://localhost:3000/todo/${id}`)
        const data = await response.json()
        // console.log("[[][]]",data);
        return data
    }

    return (
        <TodoContext.Provider value={{ todos, addTodo, fetchTodosState, getTodoById }}>
            {children}
        </TodoContext.Provider>
    );
}

export default TodosContextProvider;
