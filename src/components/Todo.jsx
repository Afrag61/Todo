import { useState } from "react";
import show from "./../assets/show.svg";
import hide from "./../assets/hide.svg";
import Delete from "./../assets/delete.svg";
import checked from "./../assets/checked.svg";
import noneCheck from "./../assets/noneCheck.svg";

const Todo = ({ todo, onTitleClick }) => {
  const [details, setDetails] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const showDetails = () => {
    if (details) {
      setDetails(false);
    } else {
      setDetails(true);
    }
  };

  const handleCheck = () => {
    if (isChecked) {
      setIsChecked(false);
    } else {
      setIsChecked(true);
    }
  };

  return (
    <li className="todo-item">
      <div className="todo-pref">
        <p className="todo-title" onClick={() => onTitleClick(todo.id)}>
          {todo.title}
        </p>
        <div className="buttons">
          <button onClick={handleCheck}>
            <img src={isChecked ? checked : noneCheck} alt="" />
          </button>
          <button onClick={showDetails}>
            <img src={details ? hide : show} alt="show" />
          </button>
          <button className="delete">
            <img src={Delete} alt="" />
          </button>
        </div>
      </div>
      {details && (
        <div className="todo-details">
          {todo.description ? <p>{todo.description}</p> : undefined}
          {todo.createdOn ? (
            <p>{new Date(todo.createdOn).toLocaleString()}</p>
          ) : undefined}
          {todo.dueDateTime ? (
            <p>{new Date(todo.dueDateTime).toLocaleString()}</p>
          ) : undefined}
        </div>
      )}
    </li>
  );
};

export default Todo;
