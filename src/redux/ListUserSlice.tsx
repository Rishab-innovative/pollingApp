import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface userType {
  limit: number;
  page: number;
}
export type userListState = {
  isLoading: boolean;
  data: [];
};
const initialState: userListState = {
  isLoading: false,
  data: [],
};
const baseUrl = process.env.REACT_APP_BASE_URL;

export const userList = createAsyncThunk("userList", async (data: userType) => {
  const accessToken: string | null = localStorage.getItem("userToken");
  const parsedToken = JSON.parse(accessToken as string);
  try {
    const response = await axios.get(
      `${baseUrl}user/list/${data.page}?limit=${data.limit}`,
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
});

const ListUserSlice = createSlice({
  name: "userListSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(userList.pending, (state) => {
      state.isLoading = true;
    });
  },
});
export default ListUserSlice.reducer;
