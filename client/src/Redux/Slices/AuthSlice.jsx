import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
const apiUrl = "http://localhost:4000";

// Async Thunk for fetching todos
export const fetchUser = createAsyncThunk("fetchUser", async (token) => {
  const config = {
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
  };

  const response = await axios.get(`${apiUrl}/user`, config);
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "",
    isAuthenticated: false,
  },

  reducers: {
    logout: (state, action) => {
      Cookies.remove("access");
      Cookies.remove("userId");
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.isAuthenticated = action.payload.success;
    });
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
