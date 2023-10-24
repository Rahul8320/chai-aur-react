import { useEffect, useState } from "react";
import { TodoProvider } from "./contexts/TodoContext";
import { CompletedTodoList, TodoForm, TodoList } from "./components";
import { TrashProvider } from "./contexts/TrashContext";

function App() {
  const [todos, setTodos] = useState([]);
  const [trashTodos, setTrashTodos] = useState([]);

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
    const todo = todos.filter((item) => item.id === id);
    addToTrash(todo);
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

  const addToTrash = (todo) => {
    setTrashTodos((prev) => [todo, ...prev]);
  };

  const retrieveFromTrash = (id) => {
    const todo = todos.filter((item) => item.id === id);
    updateTodo(todo.id, todo);
    setTrashTodos((prev) => prev.filter((item) => item.id !== id));
  };

  const deleteFromTrash = (id) => {
    const result = confirm(
      "Are you sure you want to delete this todo permanently?"
    );
    result === true &&
      setTrashTodos((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      setTodos(todos);
    }

    const trashTodos = JSON.parse(localStorage.getItem("trashTodos"));

    if (trashTodos && trashTodos.length > 0) {
      setTrashTodos(trashTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("trashTodos", JSON.stringify(trashTodos));
  }, [todos, trashTodos]);

  return (
    <TrashProvider
      value={{ trashTodos, addToTrash, retrieveFromTrash, deleteFromTrash }}
    >
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
    </TrashProvider>
  );
}

export default App;
