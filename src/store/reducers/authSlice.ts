import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchLogin, fetchMe, fetchRegister } from "./actionsCreators";
import { IAuthFetch } from "../../models";

const initialState: IAuthFetch = {
  data: null,
  isLoading: false,
  error: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.data = null;
    },
  },
  extraReducers: {
    // Fetching authorization
    [fetchLogin.pending.type]: (state: { isLoading: boolean }) => {
      state.isLoading = true;
    },
    [fetchLogin.fulfilled.type]: (state, action: PayloadAction<IAuthFetch>) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = "";
    },
    [fetchLogin.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Fetching authorized user
    [fetchMe.pending.type]: (state: { isLoading: boolean }) => {
      state.isLoading = true;
    },
    [fetchMe.fulfilled.type]: (state, action: PayloadAction<IAuthFetch>) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = "";
    },
    [fetchMe.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Fetching registration user
    [fetchRegister.pending.type]: (state: { isLoading: boolean }) => {
      state.isLoading = true;
    },
    [fetchRegister.fulfilled.type]: (
      state,
      action: PayloadAction<IAuthFetch>
    ) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = "";
    },
    [fetchRegister.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
