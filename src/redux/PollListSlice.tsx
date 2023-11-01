import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;
export const fetchPollList = createAsyncThunk(
  "fetchPollList",
  async (number: number) => {
    const accessToken: string | null = localStorage.getItem("userToken");
    const parsedToken = JSON.parse(accessToken as string);
    try {
      const response = await axios.get(
        `${baseUrl}poll/list/${number}?limit=10`,
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
  reducers: {
    emptyPollList: (state) => {
      state.size = 0;
    },
  },
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
export const { emptyPollList } = PollListSlice.actions;
export default PollListSlice.reducer;
