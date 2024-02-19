import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: null, // Initial user state
  blog: null,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      state.blogs = action.payload;
    },
  },
});

export const { setBlogs } = blogSlice.actions;

export default blogSlice.reducer;
