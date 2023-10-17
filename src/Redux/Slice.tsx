import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const base_URL = "https://pollapi.innotechteam.in/";
export const fetchUserRoles = createAsyncThunk("fetchUserRoles", async () => {
  const response = await axios.get(`${base_URL}role/list`);
  return response.data;
});

export const sendSignUpData = createAsyncThunk(
  "sendSignUpData",
  async (data: any) => {
    const response = await axios.post(`${base_URL}user/register`, data);
    return response.data;
  }
);

export const sendLoginData = createAsyncThunk(
  "sendLoginData",
  async (data: any) => {
    const response = await axios.post(`${base_URL}user/login`, data);
    return response.data;
  }
);

interface SignUpState {
  isLoading: boolean;
  data: string | [];
  isError: boolean;
  fname: string;
  lname: String;
  email: string;
  password: string;
  roleId: number;
}
const initialState: SignUpState = {
  fname: "",
  lname: "",
  email: "",
  password: "",
  roleId: 0,
  isLoading: false,
  data: [],
  isError: false,
};
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
    builder.addCase(fetchUserRoles.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserRoles.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchUserRoles.rejected, (state, action) => {
      state.isError = true;
    });

    builder.addCase(sendSignUpData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(sendSignUpData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(sendSignUpData.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });

    builder.addCase(sendLoginData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(sendLoginData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(sendLoginData.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});
export const { addData } = SignUpSlice.actions;
export default SignUpSlice.reducer;
