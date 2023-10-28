import { useSelector, useDispatch } from "react-redux";
import { completedTodoCount } from "../features/todo/todoSlice";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-wrap gap-y-3">
      <p className="text-gray-300 px-3">
        🔆 My Day {todos.length - dispatch(completedTodoCount())}
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
