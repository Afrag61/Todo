import { useActionState } from "react";
import { isEmpty, minLength, isNotBetween } from "./../validation.js";

const Form = () => {
  function handleAction(PrevFormState, formData) {
    const title = formData.get("title");
    const description = formData.get("description");
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

    if (errors.length > 0) {
      return {
        errors,
        enteredValues: {
          title,
          description,
        },
      };
    }

    // TODO: Post values to backend    

    if (errors.length === 0) {
        return {
          errors: false
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
        {formState.errors && (
          <ul className="errors">
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
        <div className="button-container">
          <button className="save" type="submit" disabled={pending}>
            Save
          </button>
          <button className="reset" type="reset" disabled={pending}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
