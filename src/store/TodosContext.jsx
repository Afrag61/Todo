import { createContext, useState, useEffect } from "react";
// import { getTodoById, todoToggleCheck } from "../../backend/helpers";

export const TodoContext = createContext({
  todos: [],
  fetchTodosState: () => {},
  anyModalIsOpen: false,
  setAnyModalIsOpen: () => {},
  addTodo: () => {},
  getTodoById: () => {},
  toggleCheckTodo: () => {},
  deleteTodo: () => {},
});

const TodosContextProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [anyModalIsOpen, setAnyModalIsOpen] = useState(false);

  const fetchTodosState = async () => {
    const response = await fetch("http://localhost:3000/todos");
    const fetchedTodos = await response.json();
    if (fetchedTodos.isSuccess) {
      setTodos(fetchedTodos.todos);
    }
  };

  useEffect(() => {
    fetchTodosState();
  }, []);

  const addTodo = (title, description, dueDateTime) => {
    const response = fetch("http://localhost:3000/todos/add-todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        dueDateTime,
      }),
    })
      .then((res) => {
        res.json().then(async (r) => {
          if (r.isSuccess) {
            await fetchTodosState();
          }
        });
      })
      .catch((error) => {
        console.log("[[][]] The Error:", error);
      });

    // return response.json();
  };

  const getTodoById = async (id) => {
    const response = await fetch(`http://localhost:3000/todos/${id}`);
    const data = await response.json();
    if (data.isSuccess) {
      return data.todo;
    } else {
      return {};
    }
  };

  const toggleCheckTodo = async (id) => {
    const response = await fetch(
      `http://localhost:3000/todos/${id}/toggle-check`,
      {
        method: "PATCH",
      }
    )
      .then((res) => {
        res.json().then(async (r) => {
          if (r.isSuccess) {
            await fetchTodosState();
          }
        });
      })
      .catch((error) => {
        console.log("[[][]] The Error:", error);
      });
  };

  const deleteTodo = async (id) => {
    const response = await fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        res.json().then(async (r) => {
          if (r.isSuccess) {
            await fetchTodosState();
          }
        });
      })
      .catch((error) => {
        console.log("[[][]] The Error:", error);
      });
  };

  // TODO: create addSubTodo api function

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        fetchTodosState,
        getTodoById,
        toggleCheckTodo,
        deleteTodo,
        anyModalIsOpen,
        setAnyModalIsOpen,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodosContextProvider;
