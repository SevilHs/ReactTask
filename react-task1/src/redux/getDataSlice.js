import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com";
const initialState = {
  data: [],
  loading: false,
  error: "",
};

export const getData = createAsyncThunk("getData", async (apiName) => {
  const res = await axios(`${BASE_URL}/${apiName}`);
  return res.data;
});

export const apiDataSlice = createSlice({
  name: "apiData",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getData.pending, (state) => {
      (state.loading = true), (state.error = "");
    }),
      builder.addCase(getData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      });
    builder.addCase(getData.rejected, (state) => {
      state.error = "Data not Found";
    });
  },
});

export default apiDataSlice.reducer;
