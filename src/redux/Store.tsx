import { configureStore } from "@reduxjs/toolkit";
import SignUpSlice from "./SignUpSlice";
import LoginSlice from "./LoginSlice";
import editPollSlice from "./EditPollSlice";
import PollListSlice from "./PollListSlice";
import addPollSlice from "./AddPollSlice";
import ListUserSlice from "./ListUserSlice";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  signUp: SignUpSlice,
  logIn: LoginSlice,
  pollList: PollListSlice,
  addPoll: addPollSlice,
  editPoll: editPollSlice,
  userList: ListUserSlice,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
