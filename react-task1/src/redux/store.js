import { configureStore } from "@reduxjs/toolkit";
import apiDataReducer from "./getDataSlice";

export const store = configureStore({
  reducer: {
    apiData: apiDataReducer,
  },
});
