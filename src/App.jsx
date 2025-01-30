import TodosContextProvider from "./store/TodosContext.jsx";
import Page from "./components/Page.jsx";

const App = () => {
  return (
    <TodosContextProvider>
      <Page />
    </TodosContextProvider>
  );
};

export default App;
