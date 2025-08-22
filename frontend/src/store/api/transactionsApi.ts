import { createApi } from '@reduxjs/toolkit/query/react';
import { baseApi } from './baseApi';

export const transactionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query<any[], number>({
      query: (portfolioId) => `transactions?portfolioId=${portfolioId}`,
      providesTags: ['Transaction'],
    }),
    getTransaction: builder.query<any, number>({
      query: (id) => `transactions/${id}`,
      providesTags: ['Transaction'],
    }),
    createTransaction: builder.mutation<any, any>({
      query: (transaction) => ({
        url: 'transactions',
        method: 'POST',
        body: transaction,
      }),
      invalidatesTags: ['Transaction'],
    }),
    updateTransaction: builder.mutation<any, { id: number; transaction: any }>({
      query: ({ id, transaction }) => ({
        url: `transactions/${id}`,
        method: 'PUT',
        body: transaction,
      }),
      invalidatesTags: ['Transaction'],
    }),
    deleteTransaction: builder.mutation<void, number>({
      query: (id) => ({
        url: `transactions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Transaction'],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useGetTransactionQuery,
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
} = transactionsApi;