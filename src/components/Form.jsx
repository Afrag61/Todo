import { useActionState, useEffect, useState } from "react";
import { isEmpty, minLength, isNotBetween } from "./../validation.js";
import Submit from "./Submit.jsx";
import Reset from "./Reset.jsx";

const Form = () => {
  const [todo, setTodo] = useState({
    id: Math.random(),
    title: "",
    description: "",
    isChecked: false,
    createdOn: "", // The Created On Date
    dueDateTime: "", // The Due Date
    history: [], // The History Array of HistoryModel
    todos: [], // The Array of Sub-Todos
  });

  async function handleAction(PrevFormState, formData) {
    const title = formData.get("title");
    const description = formData.get("description");
    const dueDateTime = formData.get("dueDate");
    let errors = [];

    if (isEmpty(title)) {
      errors.push("You must provide todo title.");
    }

    if (minLength(title)) {
      errors.push("Todo title must be at least five characters long.");
    }

    if (isEmpty(description)) {
      errors.push("You must provide todo description.");
    }

    if (isNotBetween(description)) {
      errors.push(
        "Todo description must be between 10 and 300 characters long."
      );
    }

    if (isEmpty(dueDateTime)) {
      errors.push("You must provide Due Date Time");
    }

    if (errors.length > 0) {
      return {
        errors,
        enteredValues: {
          title,
          description,
          dueDateTime,
        },
      };
    }

    setTodo((prevTodo) => {
      return {
        ...prevTodo,
        title,
        description,
        dueDateTime,
      };
    });

    // TODO: Post values to backend

    const response = await fetch(`http://localhost:3000/todos`, {
      // method: "GET",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        dueDateTime,
      }),
    });

    if (errors.length === 0) {
      return {
        errors: false,
      };
    }
  }

  const [formState, formAction, pending] = useActionState(handleAction, {
    errors: false,
  });

  const errorStyle = formState.errors && "error";

  return (
    <div className={`form-container ${errorStyle}`}>
      <h1>Enter Todo</h1>
      <form action={formAction}>
        <div className="input-container">
          <label htmlFor="title">Title</label>
          <input
            className={`input`}
            type="text"
            id="title"
            name="title"
            placeholder="Todo title..."
            defaultValue={formState.enteredValues?.title}
          />
        </div>
        <div className="textarea-container">
          <label htmlFor="description">Description</label>
          <textarea
            className={`textarea`}
            type="text"
            id="description"
            name="description"
            placeholder="Todo description..."
            defaultValue={formState.enteredValues?.description}
          />
        </div>
        <div className="date-container">
          <label htmlFor="dueDate">Due Date</label>
          <input type="datetime-local" id="dueDate" name="dueDate" defaultValue={formState.enteredValues?.dueDateTime} />
        </div>
        {formState.errors && (
          <ul className="errors">
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
        <div className="button-container">
          <Submit />
          <Reset />
        </div>
      </form>
    </div>
  );
};

export default Form;
