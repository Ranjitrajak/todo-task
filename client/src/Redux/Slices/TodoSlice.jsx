// todosSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const apiUrl = "http://localhost:4000";
const token = Cookies.get("access");
const config = {
  headers: {
    token: token,
    "Content-Type": "application/json",
  },
};

// Async Thunk for fetching todos
export const fetchTodos = createAsyncThunk("fetchTodos", async () => {
  const response = await axios.get(`${apiUrl}/all-task`, config);
  return response.data;
});

// Async Thunk for adding a new todo
export const addTodo = createAsyncThunk("addTodo", async (todo) => {
  const response = await axios.post(`${apiUrl}/create-task`, todo, config);
  return response.data;
});

// Async Thunk for updating a todo
export const updateTodo = createAsyncThunk(
  "updateTodo",
  async ({ todo, id }) => {
    const response = await axios.patch(`${apiUrl}/task/${id}`, todo, config);
    return response.data;
  }
);

// Async Thunk for deleting a todo
export const deleteTodo = createAsyncThunk("deleteTodo", async (id) => {
  const response = await axios.delete(`${apiUrl}/task/${id}`, config);
  return response.data;
});

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.data;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";

        state.error = action.error.message;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.push(action.payload.data);
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.status = "failed";

        state.error = action.error.message;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (todo) => todo._id === action.payload.data._id
        );
        if (index !== -1) {
          state.items[index] = action.payload.data;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (todo) => todo._id !== action.payload.data._id
        );
      });
  },
});

export default todosSlice.reducer;
