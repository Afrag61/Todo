import Header from "./components/Header.jsx";
import Form from "./components/Form.jsx";
import Todos from "./components/Todos.jsx";

const App = () => {
  const testFetch = async () => {
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

    return response;
  };

  console.log("[[][]] The Response:", testFetch());

  return (
    <>
      <Header />
      <Form />
      <Todos />
    </>
  )
};

export default App;
