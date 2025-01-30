import { useContext } from "react";
import { TodoContext } from "../store/TodosContext";

const DeleteModal = ({ id, title, setIsVisible, onClose}) => {
    const {deleteTodo} = useContext(TodoContext)

  const confirmDelete = (identifier) => {
    if (identifier === "yes") {
      deleteTodo(id);
      setIsVisible(false);
      {onClose && onClose()}
    } else {
      setIsVisible(false);
    }
  };

  return (
    <div className="backdrop">
      <div className="modal">
        <p className="delete-text">
          Are you sure delete ({title})
        </p>
        <div className="delete-confirm">
          <button className="delete-no" onClick={() => confirmDelete("no")}>
            No
          </button>
          <button className="delete-yes" onClick={() => confirmDelete("yes")}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
