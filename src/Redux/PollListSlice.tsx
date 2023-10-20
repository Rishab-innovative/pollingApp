import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const base_URL = process.env.REACT_APP_BASE_URL;
export const fetchPollList = createAsyncThunk("fetchPollList", async () => {
  const response = await axios.get(`${base_URL}role/list/1?limit=10`);
  return response.data;
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
      console.log(action, "-action-");
    });
    builder.addCase(fetchPollList.pending, (state) => {
      state.isLoading = true;
      console.log("insid pensing");
    });

    builder.addCase(fetchPollList.rejected, (state) => {
      state.isLoading = true;
      console.log("insid rejected");
    });
  },
});
export default PollListSlice.reducer;
