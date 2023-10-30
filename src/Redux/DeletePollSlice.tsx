import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export type LoginState = {
  isError: boolean;
};
const initialState: LoginState = {
  isError: false,
};
const baseUrl = process.env.REACT_APP_BASE_URL;
export const DeletePollData = createAsyncThunk(
  "loginUserData",
  async (id: number) => {
    const response = await axios.post(`${baseUrl}user/login`, id);
    return response;
  }
);
const DeletePollSlice = createSlice({
  name: "logIn",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(DeletePollData.rejected, (state) => {
      state.isError = true;
    });
  },
});
export default DeletePollSlice.reducer;
