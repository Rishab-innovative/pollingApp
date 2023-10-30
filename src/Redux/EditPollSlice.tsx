import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface editedPollTitle {
  title: string;
  createdBy: number;
  id: number;
}
// interface EditPollOption {
//   options: any;
// }
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
        `${baseUrl}poll/${data.id}`,
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
  async (data: any) => {
    const accessToken: string | null = localStorage.getItem("userToken");
    const parsedToken = JSON.parse(accessToken as string);
    console.log("12345aa", { data });
    const axiosPromises = data.map((item: any) => {
      console.log(item.id, "id delhioo");
      return axios.put(`${baseUrl}option/edit/${item.id}`, item.optionTitle, {
        headers: {
          token: parsedToken,
        },
      });
    });
    return axios
      .all(axiosPromises)
      .then((responses) => {
        return responses;
      })
      .catch((error) => {
        throw error;
      });
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
