import { createApi } from '@reduxjs/toolkit/query/react';
import { baseApi } from './baseApi';

export const pricesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStockPrice: builder.query<any, string>({
      query: (symbol) => `prices/stocks/${symbol}`,
      providesTags: ['Price'],
    }),
    getStockPrices: builder.query<any[], string[]>({
      query: (symbols) => ({
        url: 'prices/stocks/batch',
        method: 'POST',
        body: { symbols },
      }),
      providesTags: ['Price'],
    }),
    getCryptoPrice: builder.query<any, string>({
      query: (symbol) => `prices/crypto/${symbol}`,
      providesTags: ['Price'],
    }),
    getCryptoPrices: builder.query<any[], string[]>({
      query: (symbols) => ({
        url: 'prices/crypto/batch',
        method: 'POST',
        body: { symbols },
      }),
      providesTags: ['Price'],
    }),
    getForexRate: builder.query<any, string>({
      query: (pair) => `prices/forex/${pair}`,
      providesTags: ['Price'],
    }),
    getPreciousMetalsPrices: builder.query<any[], void>({
      query: () => 'prices/precious-metals',
      providesTags: ['Price'],
    }),
    getHistoricalPrices: builder.query<any[], { symbol: string; assetType: string; startDate: string; endDate: string }>({
      query: ({ symbol, assetType, startDate, endDate }) => 
        `prices/historical?symbol=${symbol}&assetType=${assetType}&startDate=${startDate}&endDate=${endDate}`,
      providesTags: ['Price'],
    }),
  }),
});

export const {
  useGetStockPriceQuery,
  useGetStockPricesQuery,
  useGetCryptoPriceQuery,
  useGetCryptoPricesQuery,
  useGetForexRateQuery,
  useGetPreciousMetalsPricesQuery,
  useGetHistoricalPricesQuery,
} = pricesApi;