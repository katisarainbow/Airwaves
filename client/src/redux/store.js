import { configureStore } from "@reduxjs/toolkit";
import postsReducers from "../reducers/post";
import authReducers from "../reducers/auth";

export const store = configureStore({
  reducer: { post: postsReducers, auth: authReducers },
});
