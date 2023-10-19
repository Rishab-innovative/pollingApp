import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface loginData {
  email: string;
  password: string;
}
export type LoginState = {
  email: string;
  password: string;
  isError: boolean;
  isLoading: boolean;
};
const initialState: LoginState = {
  email: "",
  password: "",
  isLoading: false,
  isError: false,
};

const base_URL = process.env.REACT_APP_BASE_URL;

export const loginUserData = createAsyncThunk(
  "loginUserData",
  async (data: loginData) => {
    const response = await axios.post(`${base_URL}user/login`, data);
    return response;
  }
);
const LoginSlice = createSlice({
  name: "logIn",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUserData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUserData.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(loginUserData.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});
export default LoginSlice.reducer;
