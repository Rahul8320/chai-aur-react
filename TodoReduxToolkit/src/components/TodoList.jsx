import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import { useEffect, useState } from "react";

const TodoList = () => {
  const [completedTodoCount, setCompletedTodoCount] = useState(0);

  const todos = useSelector((state) => state.todos);

  useEffect(() => {
    const count = todos.filter((item) => item.completed).length;
    setCompletedTodoCount(count);
  }, [todos]);

  return (
    <div className="flex flex-wrap gap-y-3">
      <p className="text-gray-300 px-3">
        🔆 My Day {todos.length - completedTodoCount}
      </p>
      {todos &&
        todos.map(
          (item) =>
            item.completed === false && <TodoItem todo={item} key={item.id} />
        )}
    </div>
  );
};

export default TodoList;
