import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/query";
import UserSlice from "./UserSlice";
import { authApi } from "./User";
import BlogSlice from "./BlogSlice";
import { blogsApi } from "./BlogAuth";

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "blogs"],
};

// Persisted reducer
const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    user: UserSlice,
    blogs: BlogSlice,
    [authApi.reducerPath]: authApi.reducer,
    [blogsApi.reducerPath]: blogsApi.reducer, // Add the reducer for blogsApi
  })
);

// Create the persisted store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(blogsApi.middleware),
});

setupListeners(store.dispatch);

// Persistor
export const persistor = persistStore(store);
