/* eslint-disable no-unused-vars */
import { createContext, useContext } from "react";

export const TrashContext = createContext({
  trashTodos: [],
  addToTrash: (todo) => {},
  retrieveFromTrash: (id) => {},
  deleteFromTrash: (id) => {},
});

export const useTrash = () => {
  return useContext(TrashContext);
};

export const TrashProvider = TrashContext.Provider;
