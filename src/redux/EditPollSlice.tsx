import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface editedPollTitle {
  title: string;
  idOfPoll: number;
  createdBy: number;
}
interface EditPollOption {
  pollId: number;
  optionId: number | null;
  optionTitle: string;
}
export type EditedState = {
  titleUpdateLoading: boolean;
  titleUpdateSuccess: boolean;
  singleUserLoading: boolean;
  singleUserSuccess: boolean;
  singleUserData: object;
};
const initialState: EditedState = {
  titleUpdateLoading: false,
  titleUpdateSuccess: false,
  singleUserLoading: false,
  singleUserSuccess: false,
  singleUserData: {},
};
const baseUrl = process.env.REACT_APP_BASE_URL;

export const getSinglePoll = createAsyncThunk(
  "getSinglePoll",
  async (number: number) => {
    const accessToken: string | null = localStorage.getItem("userToken");
    const parsedToken = JSON.parse(accessToken as string);
    try {
      const response = await axios.get(`${baseUrl}poll/${number}`, {
        headers: {
          token: parsedToken,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

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
    if (data.optionId === null) {
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
          `${baseUrl}option/edit/${data.pollId}`,
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
  reducers: {
    deleteSingleUserData: (state) => {
      state.singleUserData = {};
      state.titleUpdateSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(editPollTitle.pending, (state) => {
      state.titleUpdateLoading = true;
    });
    builder.addCase(editPollTitle.fulfilled, (state) => {
      state.titleUpdateLoading = false;
      state.titleUpdateSuccess = true;
    });
    builder.addCase(getSinglePoll.fulfilled, (state, action) => {
      state.singleUserLoading = false;
      state.singleUserSuccess = true;
      state.singleUserData = action.payload;
    });
    builder.addCase(getSinglePoll.pending, (state) => {
      state.singleUserLoading = true;
    });
  },
});
export const { deleteSingleUserData } = editPollSlice.actions;
export default editPollSlice.reducer;
