import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../store/TodosContext.jsx";
import closeIco from './../assets/close.svg'

const TodoDetailsModal = ({ id, onClose }) => {
  const [todoDetails, setTodoDetails] = useState(undefined);
  const { getTodoById } = useContext(TodoContext);

  useEffect(() => {
    const getTodo = async (id) => {
      const todo = await getTodoById(id);
      setTodoDetails(todo);
    };

    getTodo(id);
  }, [id]);

  return (
    <div className="backdrop">
      <div className="modal">
        <div className="modal-header">
        <h1>{todoDetails?.title}</h1>
        <button className="close" onClick={onClose}>
          <img src={closeIco} alt="Close" />
        </button>
        </div>
        <p>Description: {todoDetails?.description}</p>
        <p>Created On: {todoDetails?.createdOn}</p>
        <p>Due Date: {todoDetails?.dueDateTime}</p>
        <p>Tasks: {todoDetails?.subTodos}</p>
        <p>History: {todoDetails?.history}</p>
        <div className="modal-buttons">
          <button className="edit" onClick={onClose}>Edit</button>
          <button className="delete" onClick={onClose}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default TodoDetailsModal;
