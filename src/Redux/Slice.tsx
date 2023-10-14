import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserRoles = createAsyncThunk("fetchUserRoles", async () => {
  const response = await axios.get("https://pollapi.innotechteam.in/role/list");
  return response.data;
});

const SignUpSlice = createSlice({
  name: "SignUpData",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  reducers:{
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
// export const { addData } = SignUpSlice.actions;
export default SignUpSlice.reducer;
