import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const transactionsApi = createApi({
  reducerPath: "transactionsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/" }),
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
  }),
});

export const {
  useGetTransactionsQuery,
  useDeleteTransactionMutation,
  useEditTransactionMutation,
  useAddTransactionMutation,
} = transactionsApi;
