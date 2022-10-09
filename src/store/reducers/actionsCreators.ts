import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk(
  "/posts/fetchPosts",
  async (
    { page, sortBy}: { page: number; sortBy?: string },
    thunkApi
  ) => {
    try {
      const { data } = await axios.get(`/posts?page=${page}&sortBy=${sortBy}`);
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const removePosts = createAsyncThunk(
  "/posts/removePosts",
  async (id: string) => {
    await axios.delete(`/posts/${id}`);
  }
);

export const fetchLogin = createAsyncThunk(
  "/auth/fetchLogin",
  async (params: {}, thunkApi) => {
    try {
      const { data } = await axios.post("/auth/login", params);
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchMe = createAsyncThunk("/auth/fetchMe", async () => {
  const { data } = await axios.get("/auth/me");
  return data;
});

export const fetchRegister = createAsyncThunk(
  "/auth/fetchRegister",
  async (params: {}, thunkApi) => {
    try {
      const { data } = await axios.post("/auth/register", params);
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        error.response.data.message || error.message
      );
    }
  }
);

export const getPostComments = createAsyncThunk(
  "/comment/getPostComments",
  async (id: string | undefined, thunkApi) => {
    try {
      const { data } = await axios.get(`/posts/comments/${id}`);
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        error.response.data.message || error.message
      );
    }
  }
);

export const createComment = createAsyncThunk(
  "/comment/createComment",
  async ({ id, text }: { id: string | undefined; text: string }, thunkApi) => {
    try {
      const { data } = await axios.post(`/comments/${id}`, {
        id,
        text,
      });
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        error.response.data.message || error.message
      );
    }
  }
);

export const removeComment = createAsyncThunk(
  "/comment/removeComment",
  async ({
    id,
    comment_id,
  }: {
    id: string | undefined;
    comment_id: string;
  }) => {
    await axios.delete(`/posts/${id}/comments/${comment_id}`);
  }
);
