import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface editedPollTitle {
  title: string;
  idOfPoll:number;
  createdBy: number;
}
interface EditPollOption {
  optionTitle: string;
  id: number;
  pollId: number;
}
export type EditedState = {
  titleUpdateLoading:boolean
  titleUpdateSuccess:boolean;
};
const initialState: EditedState = {
  titleUpdateLoading:false,
  titleUpdateSuccess:false,
};
const baseUrl = process.env.REACT_APP_BASE_URL;

export const editPollTitle = createAsyncThunk(
  "editPollTitle",
  async (data: editedPollTitle) => {
    const accessToken: string | null = localStorage.getItem("userToken");
    const parsedToken = JSON.parse(accessToken as string);

    try {
      const response = await axios.put(
        `${baseUrl}poll/${data.idOfPoll}`,
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
      state.titleUpdateLoading = true;
    });
    builder.addCase(editPollTitle.fulfilled, (state) => {
      state.titleUpdateLoading = false;
      state.titleUpdateSuccess = true;
    });
  },
});
export default editPollSlice.reducer;