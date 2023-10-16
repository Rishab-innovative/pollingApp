import { configureStore } from "@reduxjs/toolkit";
import SignUpSlice from "./Slice";

export const store = configureStore({
  reducer: SignUpSlice,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
