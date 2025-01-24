import express from "express";
import {
  loadTodos,
  addTodo,
  getTodoById,
  todoToggleCheck,
  deleteTodo,
} from "./helpers.js";

const router = express.Router();

router.get("/todos", async (req, res) => {
  try {
    const todos = await loadTodos();
    res.json(
      todos.map((todo) => ({
        id: todo.id,
        title: todo.title,
        description: todo.description,
        isChecked: todo.isChecked,
        createdOn: todo.createdOn,
        dueDateTime: todo.dueDateTime,
      }))
    );
  } catch (error) {
    res.status(500).json({ error: "Error loading todos." });
  }
});

router.post("/todos", async (req, res) => {
  const { title, description, isChecked, dueDateTime, subTodos } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: "Title, description are required." });
  }
  try {
    const newTodo = await addTodo({
      title,
      description,
      isChecked,
      dueDateTime,
      subTodos,
    });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "Error adding todo." });
  }
});

router.get("/todo/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await getTodoById(id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found." });
    }
    res.json(todo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error getting todo." });
  }
});

router.patch("/todo/:id/toggle-check", async (req, res) => {
  const { id } = req.params;

  try {
    const isSuccess = await todoToggleCheck(id);
    if (!isSuccess) {
      return res.status(400).json({
        isSuccess,
        error: "Some error happened while checking the todo.",
      });
    }
    res.json({ isSuccess });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error checking todo." });
  }
});

router.delete("/todo/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const isSuccess = await deleteTodo(id);
    if (!isSuccess) {
      return res.status(400).json({
        isSuccess,
        error: "Some error happened while deleting the todo.",
      });
    }
    res.json({ isSuccess });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error deleting todo." });
  }
});

export default router;
