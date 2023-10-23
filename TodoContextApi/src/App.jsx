import { useEffect, useState } from "react";
import { TodoProvider } from "./contexts/TodoContext";
import { CompletedTodoList, TodoForm, TodoList } from "./components";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [
      { id: Date.now(), todo: todo, completed: false },
      ...prev,
    ]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((item) => (item.id === id ? todo : item)));
  };

  const deleteTodo = (id) => {
    const result = confirm(
      "Are you sure you want to delete this todo permanently?"
    );
    result === true &&
      setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const completedTodoCount = () => {
    return todos.filter((item) => item.completed).length;
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{
        todos,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleComplete,
        completedTodoCount,
      }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>

          {/* List all incomplete todos */}
          <TodoList />

          {/* List all completed todos */}
          {completedTodoCount() !== 0 && <CompletedTodoList />}
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
