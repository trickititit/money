import { createApi } from '@reduxjs/toolkit/query/react';
import { baseApi } from './baseApi';

export const assetsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAssets: builder.query<any[], number>({
      query: (portfolioId) => `assets?portfolioId=${portfolioId}`,
      providesTags: ['Asset'],
    }),
    getAsset: builder.query<any, number>({
      query: (id) => `assets/${id}`,
      providesTags: ['Asset'],
    }),
    createAsset: builder.mutation<any, any>({
      query: (asset) => ({
        url: 'assets',
        method: 'POST',
        body: asset,
      }),
      invalidatesTags: ['Asset'],
    }),
    updateAsset: builder.mutation<any, { id: number; asset: any }>({
      query: ({ id, asset }) => ({
        url: `assets/${id}`,
        method: 'PUT',
        body: asset,
      }),
      invalidatesTags: ['Asset'],
    }),
    deleteAsset: builder.mutation<void, number>({
      query: (id) => ({
        url: `assets/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Asset'],
    }),
  }),
});

export const {
  useGetAssetsQuery,
  useGetAssetQuery,
  useCreateAssetMutation,
  useUpdateAssetMutation,
  useDeleteAssetMutation,
} = assetsApi;"