import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export type DeleteState = {
  isError: boolean;
};
const initialState: DeleteState = {
  isError: false,
};
const baseUrl = process.env.REACT_APP_BASE_URL;
export const DeletePollData = createAsyncThunk(
  "loginUserData",
  async (id: number) => {
    console.log(id);
    const accessToken: string | null = localStorage.getItem("userToken");
    const parsedToken = JSON.parse(accessToken as string);
    try {
      const response = await axios.delete(`${baseUrl}poll/${id}`, {
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
