import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPosts, removePosts } from "./actionsCreators";
import { IPostFetch, IPost} from "../../models";

const initialState: IPostFetch = {
  posts: [],
  isLoading: true,
  error: "",
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    // Get our posts from DB
    [fetchPosts.pending.type]: (state: { isLoading: boolean }) => {
      state.isLoading = true;
    },
    [fetchPosts.fulfilled.type]: (state, action: PayloadAction<IPost[]>) => {
      state.isLoading = false;
      state.posts = action.payload;
      state.error = "";
    },
    [fetchPosts.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //Remove our post from db
    [removePosts.pending.type]: (state, action) => {
      state.posts.data = state.posts.data.filter(
        (obj: IPost) => obj._id !== action.meta.arg
      );
    },
  },
});

export default postSlice.reducer;
