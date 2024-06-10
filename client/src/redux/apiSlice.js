import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const transactionsApi = createApi({
  reducerPath: "transactionsApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://spendwisely-i35h.onrender.com/api/v1/",
    // baseUrl: "http://localhost:8080/api/v1/",
    baseUrl: "https://spend-wisely-bcsc.vercel.app/api/v1/",
  }),
  credentials: "include",
  tagTypes: ["Transactions"],
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: ({ userid, frequency, type }) => ({
        url: "transactions/get-transaction",
        method: "POST",
        body: { userid, frequency, type },
      }),
      providesTags: ["Transactions"],
    }),
    deleteTransaction: builder.mutation({
      query: (transactionId) => ({
        url: "transactions/delete-transaction",
        method: "POST",
        body: { transactionId },
      }),
      invalidatesTags: ["Transactions"],
    }),
    editTransaction: builder.mutation({
      query: ({ transactionId, payload }) => ({
        url: "transactions/edit-transaction",
        method: "POST",
        body: { payload, transactionId },
      }),
      invalidatesTags: ["Transactions"],
    }),
    addTransaction: builder.mutation({
      query: (transaction) => ({
        url: "transactions/add-transaction",
        method: "POST",
        body: transaction,
      }),
      invalidatesTags: ["Transactions"],
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "users/login",
        method: "POST",
        body: credentials,
      }),
    }),
    registerUser: builder.mutation({
      query: (credentials) => ({
        url: "users/register",
        method: "POST",
        body: credentials,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "users/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useDeleteTransactionMutation,
  useEditTransactionMutation,
  useAddTransactionMutation,
  useLoginUserMutation,
  useRegisterUserMutation,
  useLogoutUserMutation,
} = transactionsApi;
