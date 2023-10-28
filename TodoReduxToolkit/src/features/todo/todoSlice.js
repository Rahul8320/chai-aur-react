/* eslint-disable no-unused-vars */
import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [{ id: nanoid(), title: "Hello world", completed: false }],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        title: action.payload,
        completed: false,
      };
      state.todos.push(todo);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      const { todo, id } = action.payload;

      state.todos = state.todos.map((item) => (item.id === id ? todo : item));
    },
    toggleComplete: (state, action) => {
      const { id } = action.payload;

      state.todos = state.todos.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      );
    },
    completedTodoCount: (state, action) => {
      return state.todos.filter((item) => item.completed).length;
    },
  },
});

export const {
  addTodo,
  removeTodo,
  updateTodo,
  toggleComplete,
  completedTodoCount,
} = todoSlice.actions;

export default todoSlice.reducer;
