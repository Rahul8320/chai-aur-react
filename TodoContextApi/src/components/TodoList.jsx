import { useTodo } from "../contexts/TodoContext";
import TodoItem from "./TodoItem";

/* eslint-disable react/prop-types */
const TodoList = () => {
  const { todos, completedTodoCount } = useTodo();

  return (
    <div className="flex flex-wrap gap-y-3">
      {/*Loop and Add TodoItem here */}
      <p className="text-gray-300 px-3">
        🔆 My Day {todos.length - completedTodoCount()}
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
