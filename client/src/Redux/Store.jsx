import { configureStore } from '@reduxjs/toolkit';
import todosReducer from "./Slices/TodoSlice"
import authReducer from "./Slices/AuthSlice"

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    auth:authReducer
   
  },
});

