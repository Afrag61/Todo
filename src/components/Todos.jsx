import { TodoContext } from "../store/TodosContext.jsx";
import { useState, useContext } from "react";
import Todo from "./Todo.jsx";
import TodoDetailsModal from "./TodoDetailsModal.jsx";

const Todos = () => {
  const [modalSate, setModalState] = useState({
    isOpen: false,
    id: undefined,
  });

  const { todos } = useContext(TodoContext)

  return (
    <div className="todos-container">
      <h1 className="todos-header">Todos</h1>
      <ul className="todos-list">
        {todos.map((todo) => (
          <Todo
            key={`${todo.id}-${todo.title}`}
            todo={todo}
            onTitleClick={(id) =>
              setModalState({
                isOpen: true,
                id,
              })
            }
          />
        ))}
      </ul>
      {modalSate.isOpen && <TodoDetailsModal id={modalSate.id} />}
    </div>
  );
};

export default Todos;
