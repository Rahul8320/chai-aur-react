import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";

const CompletedTodoList = () => {
  const [expanded, setExpanded] = useState(true);
  const [todoCount, setTodoCount] = useState(0);

  const todos = useSelector((state) => state.todos);

  useEffect(() => {
    const todoCount = todos.filter((item) => item.completed).length;
    setTodoCount(todoCount);

    // set expanded false if 3 or more todo is completed
    todoCount >= 3 && setExpanded(false);
  }, [todos]);

  return (
    <div className="flex flex-wrap gap-y-3 mt-5">
      {/*Loop completed todo here */}
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="text-gray-300 outline-none py-1 px-3 hover:bg-slate-700 rounded-md"
      >
        {expanded ? "👇" : "👉"} Completed {todoCount}
      </button>
      {todos &&
        expanded &&
        todos.map(
          (item) =>
            item.completed === true && <TodoItem todo={item} key={item.id} />
        )}
    </div>
  );
};

export default CompletedTodoList;
