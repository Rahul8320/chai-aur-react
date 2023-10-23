import { useEffect, useState } from "react";
import { TodoProvider } from "./contexts/TodoContext";
import { TodoForm, TodoItem } from "./components";

function App() {
  const [todos, setTodos] = useState([]);
  const [expanded, setExpanded] = useState(true);
  const [completedTodoCount, setCompletedTodoCount] = useState(0);

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

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      setTodos(todos);

      const completedTodos = todos.reduce(
        (acc, item) => (item.completed === true ? (acc += 1) : acc),
        0
      );
      setCompletedTodoCount(completedTodos);
      completedTodos >= 3 && setExpanded(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));

    const completedTodos = todos.reduce(
      (acc, item) => (item.completed === true ? (acc += 1) : acc),
      0
    );
    setCompletedTodoCount(completedTodos);
    completedTodos >= 3 && setExpanded(false);
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
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
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            <p className="text-gray-300 px-3">
              🔆 My Day{" "}
              {todos.reduce(
                (acc, item) => (item.completed === false ? (acc += 1) : acc),
                0
              )}
            </p>
            {todos &&
              todos.map(
                (item) =>
                  item.completed === false && (
                    <TodoItem todo={item} key={item.id} />
                  )
              )}
          </div>
          {/* completed todos */}
          {completedTodoCount !== 0 && (
            <div className="flex flex-wrap gap-y-3 mt-5">
              {/*Loop completed todo here */}
              <button
                onClick={() => setExpanded((prev) => !prev)}
                className="text-gray-300 outline-none py-1 px-3 hover:bg-slate-700 rounded-md"
              >
                {expanded ? "👇" : "👉"} Completed {completedTodoCount}
              </button>
              {todos &&
                expanded &&
                todos.map(
                  (item) =>
                    item.completed === true && (
                      <TodoItem todo={item} key={item.id} />
                    )
                )}
            </div>
          )}
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
