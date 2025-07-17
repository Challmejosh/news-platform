import { configureStore } from "@reduxjs/toolkit";
import { storiesApi } from "./api/storiesApi";
import Bookmark from "./slice/bookmarkSlice"
import toggle from "./slice/toggleSlice"
export const store = configureStore({
  reducer: {
    [storiesApi.reducerPath]: storiesApi.reducer,
    bookmark:Bookmark,
    toggle: toggle
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(storiesApi.middleware),
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
