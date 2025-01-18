import express from "express";
import { loadTodos, addTodo } from "./helpers.js";

const app = express();

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());

// TODO: Define routes here

app.get("/todos", async (req, res) => {
  try {
    const todos = await loadTodos();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Error loading todos." });
  }
});

app.post("/todos", async (req, res) => {
  const { title, description, isChecked, dueDateTime, todos } = req.body;

  //   await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!title || !description) {
    return res.status(400).json({ error: "Title, description are required." });
  }
  try {
    const newTodo = await addTodo({
      title,
      description,
      isChecked,
      dueDateTime,
      todos,
    });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "Error adding todo." });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
