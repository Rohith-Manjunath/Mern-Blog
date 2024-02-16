import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllblogs = createAsyncThunk(
  "blogs",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetch("http://localhost:2000/api/v1/blogs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const response = await data.json();

      return response;
    } catch (e) {
      return rejectWithValue({ message: e.message });
    }
  }
);

export const getSingleBlog = createAsyncThunk(
  "blog",
  async (blogId, { rejectWithValue }) => {
    try {
      const data = await fetch(`http://localhost:2000/api/v1/blog/${blogId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const response = await data.json();

      return response;
    } catch (e) {
      return rejectWithValue({ message: e.message });
    }
  }
);

const initialState = {
  blogs: [],
  error: null,
  message: null,
  success: null,
  loading: false,
  blog: null,
};

export const BlogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllblogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllblogs.fulfilled, (state, action) => {
        const { err, success, blogs } = action.payload;

        if (err) {
          state.loading = false;
          state.error = err;
        } else {
          state.blogs = blogs;
          state.success = success;
          state.loading = false;
        }
      })
      .addCase(getAllblogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSingleBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleBlog.fulfilled, (state, action) => {
        const { err, success, blog } = action.payload;

        if (err) {
          state.loading = false;
          state.error = err;
        } else {
          state.blog = blog;
          state.success = success;
          state.loading = false;
        }
      })
      .addCase(getSingleBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearMessage, clearSuccess } = BlogSlice.actions;
export default BlogSlice.reducer;
