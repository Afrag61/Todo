import { useState } from "react";
import show from "./../assets/show.svg";
import hide from "./../assets/hide.svg";
import Delete from "./../assets/delete.svg";
import checked from "./../assets/checked.svg";
import noneCheck from "./../assets/noneCheck.svg";
import { useContext } from "react";
import { TodoContext } from "../store/TodosContext";
import DeleteModal from "./DeleteModal";

const Todo = ({ todo, onTitleClick }) => {
  const [details, setDetails] = useState(false);
  const [deleteModalIsVisible, setDeleteModalIsVisible] = useState(false)

  const { toggleCheckTodo } = useContext(TodoContext);

  const showDetails = () => {
    if (details) {
      setDetails(false);
    } else {
      setDetails(true);
    }
  };

  const handleCheck = () => {
    toggleCheckTodo(todo.id);
  };

  const handleDeleteTodo = () => {
    setDeleteModalIsVisible(true)
  };

  return (
    <>
      {deleteModalIsVisible && <DeleteModal id={todo.id} title={todo.title} setIsVisible={setDeleteModalIsVisible}/>}
      <li className="todo-item">
        <div className="todo-pref">
          <p className="todo-title" onClick={() => onTitleClick(todo.id)}>
            {todo.title}
          </p>
          <div className="buttons">
            <button onClick={handleCheck}>
              <img src={todo.isChecked ? checked : noneCheck} alt="" />
            </button>
            <button onClick={showDetails}>
              <img src={details ? hide : show} alt="show" />
            </button>
            <button className="delete" onClick={handleDeleteTodo}>
              <img src={Delete} alt="Delete" />
            </button>
          </div>
        </div>
        {details && (
          <div className="todo-details">
            {todo.description ? (
              <p>Description: {todo.description}</p>
            ) : undefined}
            {todo.createdOn ? (
              <p>Created on: {new Date(todo.createdOn).toLocaleString()}</p>
            ) : undefined}
            {todo.dueDateTime ? (
              <p>Due Date: {new Date(todo.dueDateTime).toLocaleString()}</p>
            ) : undefined}
          </div>
        )}
      </li>
    </>
  );
};

export default Todo;
