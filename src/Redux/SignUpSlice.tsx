import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface signUpPageInputData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId: string;
}
export type SignUpState = {
  isLoading: boolean;
  data: string[];
  isError: boolean;
  fname: string;
  lname: String;
  email: string;
  password: string;
  roleId: number;
  status: number;
};
const initialState: SignUpState = {
  fname: "",
  lname: "",
  email: "",
  password: "",
  roleId: 0,
  isLoading: false,
  data: [],
  isError: false,
  status: 0,
};
const base_URL = process.env.REACT_APP_BASE_URL;
export const fetchUserRoles = createAsyncThunk("fetchUserRoles", async () => {
  const response = await axios.get(`${base_URL}role/list`);
  return response.data;
});
export const signUpUserData = createAsyncThunk(
  "signUpUserData",
  async (data: signUpPageInputData) => {
    const response = await axios.post(`${base_URL}user/register`, data);
    return response;
  }
);
const SignUpSlice = createSlice({
  name: "SignUpData",
  initialState,
  reducers: {
    addData: (state, action) => {
      state.fname = action.payload.fname;
      state.lname = action.payload.lname;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.roleId = action.payload.roleId;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserRoles.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(signUpUserData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signUpUserData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.status = action.payload.status;
    });
    builder.addCase(signUpUserData.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});
export const { addData } = SignUpSlice.actions;
export default SignUpSlice.reducer;