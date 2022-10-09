import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICommentFetch } from "../../models";
import { createComment, getPostComments, removeComment } from "./actionsCreators";

const initialState: ICommentFetch = {
  comments: [],
  isLoading: false,
  error: "",
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: {
    [createComment.pending.type]: (state: { isLoading: boolean }) => {
      state.isLoading = true;
    },
    [createComment.fulfilled.type]: (
      state,
      action: PayloadAction<ICommentFetch>
    ) => {
      state.comments.push(action.payload);
      state.isLoading = false;
    },
    [createComment.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [getPostComments.pending.type]: (state: { isLoading: boolean }) => {
      state.isLoading = true;
    },
    [getPostComments.fulfilled.type]: (
      state,
      action: PayloadAction<ICommentFetch[]>
    ) => {
      state.comments = action.payload;
      state.isLoading = false;
    },
    [getPostComments.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [removeComment.pending.type]: (state, action) => {
      state.comments = state.comments.filter((obj) => obj._id !== action.meta.arg.comment_id);
    },
  },
});

export default commentSlice.reducer;
