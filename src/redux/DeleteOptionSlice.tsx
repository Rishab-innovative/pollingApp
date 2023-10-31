import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export type DeleteOptionState = {
  isError: boolean;
};
const initialState: DeleteOptionState = {
  isError: false,
};
const baseUrl = process.env.REACT_APP_BASE_URL;
export const DeleteOptionData = createAsyncThunk(
  "DeleteOptionData",
  async (id: number) => {
    const accessToken: string | null = localStorage.getItem("userToken");
    const parsedToken = JSON.parse(accessToken as string);
    try {
      const response = await axios.delete(`${baseUrl}option/delete/${id}`, {
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
const DeleteOptionSlice = createSlice({
  name: "deleteOption",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(DeleteOptionData.rejected, (state) => {
      state.isError = true;
    });
  },
});
export default DeleteOptionSlice.reducer;
