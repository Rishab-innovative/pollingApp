import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserRoles = createAsyncThunk("fetchUserRoles", async () => {
  const response = await axios.get("https://pollapi.innotechteam.in/role/list");
  return response.data;
});
// interface SignUpData {
//   fname: string;
//   lname: String;
//   email: string;
//   password: string;
//   role: String;
// }
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
      console.log("unable to fetch data", action.payload);
      state.isError = true;
    });
  },
});
export const { addData } = SignUpSlice.actions;
export default SignUpSlice.reducer;
