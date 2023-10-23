import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const base_URL = process.env.REACT_APP_BASE_URL;
const accessToken = localStorage.getItem("userToken");
export const fetchPollList = createAsyncThunk("fetchPollList", async () => {
  try {
    const response = await axios.get(`${base_URL}poll/list/1?limit=4`, {
      headers: {
        token: accessToken,
      },
    });
    return response.data.rows;
  } catch (error) {
    throw error;
  }
});

export type PollListState = {
  isLoading: boolean;
  data: string[];
  isError: boolean;
};

const initialState: PollListState = {
  isLoading: false,
  data: [],
  isError: false,
};

const PollListSlice = createSlice({
  name: "PollListData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPollList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
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
