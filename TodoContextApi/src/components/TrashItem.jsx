import { useTrash } from "../contexts/TrashContext";

/* eslint-disable react/prop-types */
const TrashItem = ({ todo }) => {
  const { retrieveFromTrash, deleteFromTrash } = useTrash();

  return (
    <div
      className={`flex w-full border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
        todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      }`}
    >
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg border-transparent ${
          todo.completed ? "line-through" : ""
        }`}
        value={todo.todo}
        readOnly={true}
      />

      {/* Retrieve Todo Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => retrieveFromTrash(todo.id)}
      >
        🔃
      </button>

      {/* Delete Todo Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => deleteFromTrash(todo.id)}
      >
        ❌
      </button>
    </div>
  );
};

export default TrashItem;
