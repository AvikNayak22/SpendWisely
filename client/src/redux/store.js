import { configureStore } from "@reduxjs/toolkit";
import { transactionsApi } from "./apiSlice";
import authSlice from "./authSlice";

const store = configureStore({
  reducer: {
    [transactionsApi.reducerPath]: transactionsApi.reducer,
    authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(transactionsApi.middleware),
});

export default store;
