import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface editedPollTitle {
  title: string;
  createdBy: number;
}
interface EditPollOption {
  optionTitle: string;
  id: number;
  pollId: number;
}
export type EditedState = {
  isSuccess: boolean;
  isLoading: boolean;
};
const initialState: EditedState = {
  isSuccess: false,
  isLoading: false,
};
const baseUrl = process.env.REACT_APP_BASE_URL;

export const editPollTitle = createAsyncThunk(
  "editPollTitle",
  async (data: editedPollTitle) => {
    const accessToken: string | null = localStorage.getItem("userToken");
    const parsedToken = JSON.parse(accessToken as string);

    try {
      const response = await axios.post(
        `${baseUrl}poll/`,
        {
          createdBy: data.createdBy,
          title: data.title,
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
export const editPollOptions = createAsyncThunk(
  "editPollOptions",
  async (data: EditPollOption) => {
    const accessToken: string | null = localStorage.getItem("userToken");
    const parsedToken = JSON.parse(accessToken as string);
    if (data.id === null) {
      console.log("12345aa", data);
      try {
        const response = await axios.post(
          `${baseUrl}poll/addPollOption/${data.pollId}`,
          {
            optionTitle: data.optionTitle,
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
    } else {
      console.log(data, "inisde else");
      try {
        const response = await axios.put(
          `${baseUrl}option/edit/${data.id}`,
          {
            optionTitle: data.optionTitle,
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
  }
);
const editPollSlice = createSlice({
  name: "editPollSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(editPollTitle.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editPollTitle.fulfilled, (state) => {
      state.isSuccess = true;
      state.isLoading = false;
    });
    builder.addCase(editPollOptions.pending, (state) => {
      // state.isLoading = true;
      console.log("inside pending");
    });
    builder.addCase(editPollOptions.fulfilled, (state) => {
      // state.isSuccess = true;
      // state.isLoading = false;
      console.log("inside fulfilled");
    });
  },
});
// export const { resetSuccess } = addPollSlice.actions;
export default editPollSlice.reducer;
