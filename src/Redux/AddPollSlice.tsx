import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface newPollData {
  title: string;
  option: [];
}
export type LoginState = {
  email: string;
  password: string;
  isError: boolean;
  isLoading: boolean;
  user: string;
};
const initialState: LoginState = {
  email: "",
  password: "",
  isLoading: false,
  isError: false,
  user: "",
};
const baseUrl = process.env.REACT_APP_BASE_URL;

export const addNewPoll = createAsyncThunk(
  "addNewPoll",
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

const LoginSlice = createSlice({
  name: "logIn",
  initialState,
  reducers: {
    removeLogInData: (state) => {
      state.user = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addNewPoll.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addNewPoll.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.user = action.payload.data;
    });
    builder.addCase(addNewPoll.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});
export const { removeLogInData } = LoginSlice.actions;
export default LoginSlice.reducer;
