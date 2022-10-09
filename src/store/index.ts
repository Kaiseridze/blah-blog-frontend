import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import postSlice from "./reducers/postSlice";
import commentSlice from "./reducers/commentSlice";

const rootReducer = combineReducers({
  posts: postSlice,
  auth: authSlice,
  comment: commentSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppState = ReturnType<typeof setupStore>;
export type AppDispatch = AppState["dispatch"];
