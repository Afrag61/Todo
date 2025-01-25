import TodosContextProvider from "./store/TodosContext.jsx";
import Page from "./components/page.jsx";
import { useEffect, useState } from "react";

const App = () => {

  // const fetchTodos = async () => {
  //   const resp = await fetch("http://localhost:3000/todos");

  //   return resp.json();
  // };

  // const setTodosState = async () => {
  //   const res = await fetchTodos();

  //   setTodos(res);
  // };

  // useEffect(() => {
  //   setTodosState();
  // }, []);

  /*const testFetch = async () => {
        const response = await fetch(`http://localhost:3000/todos`, {
            method: "GET",
            // method: "POST",
            // headers: {
            //   "Content-Type": "application/json",
            // },
            // body: JSON.stringify({
            //   title: "New Todo From Fetch",
            //   description: "This is a new Todo from fetch API call",
            // }),
        });

        return response.json();
    };*/

  return (
    <TodosContextProvider>
      <Page />
    </TodosContextProvider>
  );
};

export default App;
