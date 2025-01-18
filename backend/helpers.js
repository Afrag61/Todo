import fs from "node:fs/promises";

// TODO: Define operation functions here

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
    dueDateTime: todo.dueDateTime == undefined ? "" : todo.dueDateTime,
    todos: todo.todos == undefined ? [] : todo.todos,
  };
  todos.unshift(newTodo);
  const dataToSave = { todos };
  await fs.writeFile("./db.json", JSON.stringify(dataToSave, null, 2));
  return newTodo;
}
