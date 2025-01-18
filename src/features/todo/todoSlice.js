import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({
        id: nanoid(),
        todo: action.payload.data,
        isCompleted: action.payload.isCompleted,
      });
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id == action.payload);
      if (todo) todo.isCompleted = !todo.isCompleted;
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    editTodo: (state, action) => {
      const editedTodo = state.todos.find((t) => t.id == action.payload.id);
      if (editedTodo) editedTodo.todo = action.payload.data;
    },
  },
});

export const { addTodo, editTodo, deleteTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;
