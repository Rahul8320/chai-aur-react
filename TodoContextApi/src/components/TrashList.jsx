import { useState } from "react";
import { useTrash } from "../contexts/TrashContext";
import TrashItem from "./TrashItem";

const TrashList = () => {
  const [expanded, setExpanded] = useState(false);

  const { trashTodos } = useTrash();

  return (
    <div className="flex flex-wrap gap-y-3 mt-5">
      {/*Loop completed todo here */}
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="text-gray-300 outline-none py-1 px-3 hover:bg-slate-700 rounded-md"
      >
        {expanded ? "👇" : "🗑️"} Trashed {trashTodos.length}
      </button>
      {trashTodos &&
        expanded &&
        trashTodos.map((item) => <TrashItem todo={item} key={item.id} />)}
    </div>
  );
};

export default TrashList;
