import { configureStore } from "@reduxjs/toolkit";
import Bookmark from "./slice/bookmarkSlice"
import toggle from "./slice/toggleSlice"
export const store = configureStore({
  reducer: {
    bookmark:Bookmark,
    toggle: toggle
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
