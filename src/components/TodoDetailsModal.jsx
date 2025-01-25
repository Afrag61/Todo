import { useRef, useContext, useEffect, useState } from "react";
import { TodoContext } from "../store/TodosContext.jsx";

const TodoDetailsModal = ({ id }) => {
  const [todoById, setTodoById] = useState(undefined);
  const dialog = useRef();
  const { getTodoById } = useContext(TodoContext);

  useEffect(() => {
    const getTodo = async (id) => {
      const todo = await getTodoById(id);
      setTodoById(todo);
    };

    getTodo(id);
  }, [id]);

  console.log(todoById);

  return (
    <dialog ref={dialog}>
      <p></p>
    </dialog>
  );
};

export default TodoDetailsModal;
