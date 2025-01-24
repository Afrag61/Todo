import fs from "node:fs/promises";

export async function loadTodos() {
  try {
    const dbFileData = await fs.readFile("./db.json");
    const parsedData = JSON.parse(dbFileData);
    return parsedData.todos;
  } catch (error) {
    return [];
  }
}

export async function addTodo(todo) {
  const todos = await loadTodos();
  const newTodo = {
    id: new Date().getTime(),
    ...todo,
    isChecked: todo.isChecked == undefined ? false : todo.isChecked,
    createdOn: new Date().toISOString(),
    dueDateTime: todo.dueDateTime == undefined ? "" : todo.dueDateTime,
    subTodos: todo.subTodos == undefined ? [] : todo.subTodos,
    history: [],
  };
  todos.unshift(newTodo);
  const dataToSave = { todos };
  await fs.writeFile("./db.json", JSON.stringify(dataToSave, null, 2));
  return newTodo;
}

export async function getTodoById(id) {
  const todos = await loadTodos();

  return todos.find((todo) => todo.id === Number(id));
}

export async function todoToggleCheck(id) {
  const todos = await loadTodos();
  let isSuccess = false;

  const res = todos.map((todo) => {
    if (todo.id === Number(id)) {
      isSuccess = true;
    }

    return {
      ...todo,
      isChecked: todo.id === Number(id) ? !todo.isChecked : todo.isChecked,
    };
  });

  const dataToSave = {
    todos: res,
  };
  await fs
    .writeFile("./db.json", JSON.stringify(dataToSave, null, 2))
    .then(() => {
      isSuccess = true;
    })
    .catch(() => {
      isSuccess = false;
    });

  return isSuccess;
}

export async function deleteTodo(id) {
  const todos = await loadTodos();
  let isSuccess = false;

  const res = todos.filter((todo) => todo.id !== Number(id));

  const dataToSave = {
    todos: res,
  };
  await fs
    .writeFile("./db.json", JSON.stringify(dataToSave, null, 2))
    .then(() => {
      isSuccess = true;
    })
    .catch(() => {
      isSuccess = false;
    });

  return isSuccess;
}
