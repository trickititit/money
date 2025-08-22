import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseApi } from './baseApi';

export const portfolioApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPortfolios: builder.query<any[], void>({
      query: () => 'portfolios',
      providesTags: ['Portfolio'],
    }),
    getPortfolio: builder.query<any, number>({
      query: (id) => `portfolios/${id}`,
      providesTags: ['Portfolio'],
    }),
    createPortfolio: builder.mutation<any, any>({
      query: (portfolio) => ({
        url: 'portfolios',
        method: 'POST',
        body: portfolio,
      }),
      invalidatesTags: ['Portfolio'],
    }),
    updatePortfolio: builder.mutation<any, { id: number; portfolio: any }>({
      query: ({ id, portfolio }) => ({
        url: `portfolios/${id}`,
        method: 'PUT',
        body: portfolio,
      }),
      invalidatesTags: ['Portfolio'],
    }),
    deletePortfolio: builder.mutation<void, number>({
      query: (id) => ({
        url: `portfolios/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Portfolio'],
    }),
  }),
});

export const {
  useGetPortfoliosQuery,
  useGetPortfolioQuery,
  useCreatePortfolioMutation,
  useUpdatePortfolioMutation,
  useDeletePortfolioMutation,
} = portfolioApi;