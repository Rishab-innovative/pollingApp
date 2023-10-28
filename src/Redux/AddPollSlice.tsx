import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface newPollData {
  title: string;
  options: { optionTitle: string }[];
}

export type optionState = {
  isSuccess: boolean;
};
const initialState: optionState = {
  isSuccess: false,
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
      console.log(response, "rsposde  dede");
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
    resetSuccess:(state)=>{
      state.isSuccess=false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addNewPoll.rejected, () => {
      console.log("there is a error in this code");
    });
    builder.addCase(addNewPoll.fulfilled, (state) => {
      console.log("inside Fulfilled slice of addPoll");
      state.isSuccess = true;
    });
  },
});
export const { resetSuccess } = addPollSlice.actions;
export default addPollSlice.reducer;
