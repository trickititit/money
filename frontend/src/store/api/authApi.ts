import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { AuthResponse, User } from '../slices/authSlice';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  baseCurrency?: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://localhost:7001/api/',
  prepareHeaders: (headers, { getState }) => {
    headers.set('content-type', 'application/json');
    return headers;
  },
});

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (userInfo) => ({
        url: 'auth/register',
        method: 'POST',
        body: userInfo,
      }),
    }),
    refreshToken: builder.mutation<AuthResponse, RefreshTokenRequest>({
      query: (refreshData) => ({
        url: 'auth/refresh',
        method: 'POST',
        body: refreshData,
      }),
    }),
    revokeToken: builder.mutation<{ message: string }, RefreshTokenRequest>({
      query: (refreshData) => ({
        url: 'auth/revoke',
        method: 'POST',
        body: refreshData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
    }),
    revokeAllTokens: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: 'auth/revoke-all',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
    }),
    getCurrentUser: builder.query<User, void>({
      query: () => ({
        url: 'auth/me',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
      providesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshTokenMutation,
  useRevokeTokenMutation,
  useRevokeAllTokensMutation,
  useGetCurrentUserQuery,
} = authApi;