import express from "express";
import todoRoutes from "./controllers.js";

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

app.use(todoRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
