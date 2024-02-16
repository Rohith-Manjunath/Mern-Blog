import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (form, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:2000/api/v1/register", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      return data;
    } catch (e) {
      console.error({ message: e.message });
      return rejectWithValue({ message: e.message });
    }
  }
);
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (form, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:2000/api/v1/login", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();

      return data;
    } catch (e) {
      console.error({ message: e.message });
      return rejectWithValue({ message: e.message });
    }
  }
);

export const logout = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:2000/api/v1/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();

      return data;
    } catch (e) {
      console.error({ message: e.message });
      return rejectWithValue({ message: e.message });
    }
  }
);

export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:2000/api/v1/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();

      return data;
    } catch (e) {
      console.error({ message: e.message });
      return rejectWithValue({ message: e.message });
    }
  }
);

const initialState = {
  user: null,
  message: null,
  error: null,
  loading: false,
  success: false,
};

export const UserSlice = createSlice({
  name: "user",
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
    resetUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        const { err, message, success } = action.payload;

        if (err) {
          state.error = err;
          state.loading = false;
        } else {
          state.loading = false;
          state.success = success;
          state.message = message;
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.err;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { err, message, success } = action.payload;

        if (err) {
          state.error = err;
          state.loading = false;
        } else {
          state.loading = false;
          state.success = success;
          state.message = message;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.err;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        const { err, message, success } = action.payload;

        if (err) {
          state.error = err;
          state.loading = false;
        } else {
          state.loading = false;
          state.success = success;
          state.message = message;
        }
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.err;
      })
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        const { err, user } = action.payload;

        if (err) {
          state.error = err;
          state.loading = false;
        } else {
          state.loading = false;
          state.user = user;
        }
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearMessage, clearSuccess, resetUser } =
  UserSlice.actions;
export default UserSlice.reducer;
