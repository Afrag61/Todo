import { TodoContext } from "../store/TodosContext.jsx";
import { useState, useContext } from "react";
import Todo from "./Todo.jsx";
import TodoDetailsModal from "./TodoDetailsModal.jsx";

const Todos = () => {
  const [modalSate, setModalState] = useState({
    isOpen: false,
    id: undefined,
  });

  const { todos, anyModalIsOpen, setAnyModalIsOpen } = useContext(TodoContext);

  const handleOpenModal = (id) => {
    setAnyModalIsOpen(true)
    setModalState({
      isOpen: true,
      id,
    });
  }

  const handleCloseModal = () => {
    setAnyModalIsOpen(false)
    setModalState({ isOpen: false })
  }

  return (
    <div className="todos-container" style={{
      backdropFilter: anyModalIsOpen ? "none" : "blur(10px)"
    }}>
      <h1 className="todos-header">Todos</h1>
      <ul className="todos-list">
        {todos.map((todo) => (
          <Todo
            key={`${todo.id}-${todo.title}`}
            todo={todo}
            onTitleClick={(id) => handleOpenModal(id)}
          />
        ))}
      </ul>
      {modalSate.isOpen && (
        <TodoDetailsModal
          id={modalSate.id}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Todos;
