import { TodoContext } from "../store/TodosContext.jsx";
import { useState, useContext, useRef } from "react";
import Todo from "./Todo.jsx";
import TodoDetailsModal from "./TodoDetailsModal.jsx";

const Todos = () => {
  const [modalSate, setModalState] = useState({
    isOpen: false,
    id: undefined,
  });
  // const [todoId, setTodoId] = useState(undefined);
  const modalRef = useRef();

  const { todos } = useContext(TodoContext);

  return (
    <div className="todos-container">
      <h1 className="todos-header">Todos</h1>
      <ul className="todos-list">
        {todos.map((todo) => (
          <Todo
            key={`${todo.id}-${todo.title}`}
            todo={todo}
            onTitleClick={(id) => {
              // setTodoId(id);
              // if (modalRef.current) modalRef.current.showModal();
              setModalState({
                isOpen: true,
                id,
              });
            }}
          />
        ))}
      </ul>
      {/* <TodoDetailsModal ref={modalRef} id={todoId} /> */}
      {modalSate.isOpen && (
        <TodoDetailsModal
          id={modalSate.id}
          onClose={() => setModalState({ isOpen: false })}
        />
      )}
    </div>
  );
};

export default Todos;
