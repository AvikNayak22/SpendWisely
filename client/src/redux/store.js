import { configureStore } from "@reduxjs/toolkit";
import { transactionsApi } from "./apiSlice";

const store = configureStore({
  reducer: {
    [transactionsApi.reducerPath]: transactionsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(transactionsApi.middleware),
});

export default store;
