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
  const [anyModalIsOpen, setAnyModalIsOpen] = useState(false)

  const fetchTodosState = async () => {
    const response = await fetch("https://nwwbs8ll-3000.uks1.devtunnels.ms/todos");
    const fetchedTodos = await response.json();
    setTodos(fetchedTodos);
  };

  useEffect(() => {
    fetchTodosState();
  }, []);

  const addTodo = (title, description, dueDateTime) => {
    const response = fetch(`https://nwwbs8ll-3000.uks1.devtunnels.ms/todos`, {
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
    const response = await fetch(`https://nwwbs8ll-3000.uks1.devtunnels.ms/todo/${id}`);
    const data = await response.json();
    // console.log("[[][]]",data);
    return data;
  };

  const toggleCheckTodo = async (id) => {
    const response = await fetch(`https://nwwbs8ll-3000.uks1.devtunnels.ms/todo/${id}/toggle-check`, {
      method: "PATCH"
    }).then((res) => {
      res.json().then(async (r) => {
        if (r.isSuccess) {
          await fetchTodosState();
        }
      });
    })
    .catch((error) => {
      console.log("[[][]] The Error:", error);
    });
  }

  const deleteTodo = (id) => {
    const response = fetch(`https://nwwbs8ll-3000.uks1.devtunnels.ms/todo/${id}`,{
      method: "DELETE"
    }).then((res) => {
      res.json().then(async (r) => {
        if (r.isSuccess) {
          await fetchTodosState();
        }
      });
    })
    .catch((error) => {
      console.log("[[][]] The Error:", error);
    });
  }

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, fetchTodosState, getTodoById, toggleCheckTodo, deleteTodo, anyModalIsOpen, setAnyModalIsOpen }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodosContextProvider;
