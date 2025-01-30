import { useContext } from "react";
import { TodoContext } from "../store/TodosContext";

const DeleteModal = ({ id, title, closeDeleteModal, closeDetailsModal}) => {
    const {deleteTodo} = useContext(TodoContext)

  const confirmDelete = (identifier) => {
    if (identifier === "yes") {
      deleteTodo(id);
      closeDeleteModal();
      {closeDetailsModal && closeDetailsModal()}
    } else {
        closeDeleteModal();
    }
  };

  return (
    <div className="backdrop">
      <div className="modal">
        <p className="delete-text">
          Are you sure delete Todo ?
        </p>
        <h1 className="todo-delete">{title}</h1>
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
