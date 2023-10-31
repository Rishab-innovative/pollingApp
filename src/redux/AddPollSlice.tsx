import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface newPollData {
  title: string;
  options: { optionTitle: string }[];
}

export type optionState = {
  isSuccess: boolean;
  isLoading: boolean;
};
const initialState: optionState = {
  isSuccess: false,
  isLoading: false,
};
const baseUrl = process.env.REACT_APP_BASE_URL;

export const addNewPoll = createAsyncThunk(
  "addNewPoll",
  async (data: newPollData) => {
    const accessToken: string | null = localStorage.getItem("userToken");
    const parsedToken = JSON.parse(accessToken as string);
    try {
      const response = await axios.post(`${baseUrl}poll/add`, data, {
        headers: {
          token: parsedToken,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
);

const addPollSlice = createSlice({
  name: "addPollSlice",
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addNewPoll.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addNewPoll.fulfilled, (state) => {
      state.isSuccess = true;
      state.isLoading = false;
    });
  },
});
export const { resetSuccess } = addPollSlice.actions;
export default addPollSlice.reducer;
