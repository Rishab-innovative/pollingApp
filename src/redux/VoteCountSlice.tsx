import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export type VoteCountState = {
  updateVotePending: boolean;
  updateVoteSuccess: boolean;
};
const initialState: VoteCountState = {
  updateVotePending: false,
  updateVoteSuccess: false,
};
const baseUrl = process.env.REACT_APP_BASE_URL;
export const updateVote = createAsyncThunk(
  "editPollOptions",
  async (data: number) => {
    const accessToken: string | null = localStorage.getItem("userToken");
    const parsedToken = JSON.parse(accessToken as string);
    try {
      const response = await axios.post(
        `${baseUrl}vote/count`,
        {
          optionId: data,
        },
        {
          headers: {
            token: parsedToken,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
);
const updateVoteSlice = createSlice({
  name: "updateVoteSlice",
  initialState,
  reducers: {
    // deleteSingleUserData: (state) => {
    //   state.singleUserData = {};
    //   state.titleUpdateSuccess = false;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(updateVote.pending, (state) => {
      state.updateVotePending = true;
    });
    builder.addCase(updateVote.fulfilled, (state) => {
      state.updateVotePending = false;
      state.updateVoteSuccess = true;
    });
  },
});
export default updateVoteSlice.reducer;
