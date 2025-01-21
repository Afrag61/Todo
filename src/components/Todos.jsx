import Todo from "./Todo.jsx";

const Todos = () => {
    return (
        <div className="todos-container">
            <h1 className="todos-header">Todos</h1>
            <ul className="todos-list">
                <Todo />
                <Todo />
            </ul>
        </div>
    );
}

export default Todos;
