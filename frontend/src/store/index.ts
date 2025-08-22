import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from './api/authApi';
import { portfolioApi } from './api/portfolioApi';
import { assetsApi } from './api/assetsApi';
import { transactionsApi } from './api/transactionsApi';
import { pricesApi } from './api/pricesApi';
import authSlice from './slices/authSlice';
import portfolioSlice from './slices/portfolioSlice';
import uiSlice from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    // RTK Query APIs
    [authApi.reducerPath]: authApi.reducer,
    [portfolioApi.reducerPath]: portfolioApi.reducer,
    [assetsApi.reducerPath]: assetsApi.reducer,
    [transactionsApi.reducerPath]: transactionsApi.reducer,
    [pricesApi.reducerPath]: pricesApi.reducer,
    
    // Slice reducers
    auth: authSlice,
    portfolio: portfolioSlice,
    ui: uiSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          // Ignore these action types
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/PERSIST',
          'persist/PURGE',
          'persist/REGISTER',
        ],
      },
    }).concat(
      authApi.middleware,
      portfolioApi.middleware,
      assetsApi.middleware,
      transactionsApi.middleware,
      pricesApi.middleware
    ),
});

// Enable listener behavior for the store
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;