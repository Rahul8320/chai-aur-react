import { useSelector } from "react-redux";
import { TodoForm, TodoList, CompletedTodoList } from "./components";
import { useEffect, useState } from "react";

function App() {
  const [completedTodoCount, setCompletedTodoCount] = useState(0);
  const todos = useSelector((state) => state.todos);

  useEffect(() => {
    const count = todos.filter((item) => item.completed).length;
    setCompletedTodoCount(count);
  }, [todos]);

  return (
    <>
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
          {completedTodoCount !== 0 && <CompletedTodoList />}

          {/* List of all trash todos */}
          {/* {trashTodos.length !== 0 && <TrashList />} */}
        </div>
      </div>
    </>
  );
}

export default App;
