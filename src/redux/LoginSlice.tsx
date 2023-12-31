import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface loginData {
  email: string;
  password: string;
}
export type LoginState = {
  isLoading: boolean;
  user: string;
};
const initialState: LoginState = {
  isLoading: false,
  user: "",
};
const baseUrl = process.env.REACT_APP_BASE_URL;
export const loginUserData = createAsyncThunk(
  "loginUserData",
  async (data: loginData) => {
    const response = await axios.post(`${baseUrl}user/login`, data);
    return response;
  }
);
const LoginSlice = createSlice({
  name: "logIn",
  initialState,
  reducers: {
    removeLogInData: (state) => {
      state.user = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUserData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUserData.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.user = action.payload.data;
    });
    builder.addCase(loginUserData.rejected, (state) => {
      state.isLoading = false;
    });
  },
});
export const { removeLogInData } = LoginSlice.actions;
export default LoginSlice.reducer;
