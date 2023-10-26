import { useState } from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const base_URL = process.env.REACT_APP_BASE_URL;
export const fetchPollList = createAsyncThunk(
  "fetchPollList",
  async (number: number) => {
    const accessToken: any = localStorage.getItem("userToken");
    const parsedToken = JSON.parse(accessToken);
    try {
      const response = await axios.get(
        `${base_URL}poll/list/${number}?limit=10`,
        {
          headers: {
            token: parsedToken,
          },
        }
      );
      return response.data.rows;
    } catch (error) {
      throw error;
    }
  }
);
export type PollListState = {
  isLoading: boolean;
  data: string[];
  isError: boolean;
  size: number;
};
const initialState: PollListState = {
  isLoading: false,
  data: [],
  isError: false,
  size: 0,
};
const PollListSlice = createSlice({
  name: "PollListData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPollList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.size = action.payload.length;
    });
    builder.addCase(fetchPollList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPollList.rejected, (state) => {
      state.isLoading = true;
    });
  },
});
export default PollListSlice.reducer;
