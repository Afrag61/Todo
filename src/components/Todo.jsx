import show from "./../assets/show.svg";
import hide from "./../assets/hide.svg";
import Delete from "./../assets/delete.svg";
import checked from "./../assets/checked.svg";
import noneCheck from "./../assets/noneCheck.svg";

import { useState } from "react";

const Todo = () => {
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
        <p className="todo-title" onClick={showDetails}>Title</p>
        <div className="buttons">
          <button onClick={showDetails}>
            <img src={details ? hide : show} alt="show" />
          </button>
          <button onClick={handleCheck}>
            <img src={isChecked ? checked : noneCheck} alt="" />
          </button>
          <button className="delete">
            <img src={Delete} alt="" />
          </button>
        </div>
      </div>
      {details && (
        <div className="todo-details">
          <p>description</p>
          <p>Created on</p>
          <p>Due Date</p>
          <p>History</p>
          <p>sub Todos</p>
        </div>
      )}
    </li>
  );
};

export default Todo;
