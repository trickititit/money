import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UIState {
  sidebarOpen: boolean;
  selectedAssets: string[];
  currentView: 'dashboard' | 'stocks' | 'real-estate' | 'crypto' | 'cash' | 'precious-metals' | 'transactions' | 'analytics';
  currency: string;
  theme: 'light' | 'dark';
  notifications: Notification[];
  modals: {
    addAsset: boolean;
    addTransaction: boolean;
    portfolioSettings: boolean;
  };
  loading: {
    global: boolean;
    assets: boolean;
    transactions: boolean;
    prices: boolean;
  };
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const initialState: UIState = {
  sidebarOpen: true,
  selectedAssets: [],
  currentView: 'dashboard',
  currency: 'USD',
  theme: 'light',
  notifications: [],
  modals: {
    addAsset: false,
    addTransaction: false,
    portfolioSettings: false,
  },
  loading: {
    global: false,
    assets: false,
    transactions: false,
    prices: false,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setSelectedAssets: (state, action: PayloadAction<string[]>) => {
      state.selectedAssets = action.payload;
    },
    addSelectedAsset: (state, action: PayloadAction<string>) => {
      if (!state.selectedAssets.includes(action.payload)) {
        state.selectedAssets.push(action.payload);
      }
    },
    removeSelectedAsset: (state, action: PayloadAction<string>) => {
      state.selectedAssets = state.selectedAssets.filter(id => id !== action.payload);
    },
    clearSelectedAssets: (state) => {
      state.selectedAssets = [];
    },
    setCurrentView: (state, action: PayloadAction<UIState['currentView']>) => {
      state.currentView = action.payload;
    },
    setCurrency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id' | 'timestamp' | 'read'>>) => {
      const notification: Notification = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        read: false,
      };
      state.notifications.unshift(notification);
      // Keep only last 50 notifications
      if (state.notifications.length > 50) {
        state.notifications = state.notifications.slice(0, 50);
      }
    },
    markNotificationAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    openModal: (state, action: PayloadAction<keyof UIState['modals']>) => {
      state.modals[action.payload] = true;
    },
    closeModal: (state, action: PayloadAction<keyof UIState['modals']>) => {
      state.modals[action.payload] = false;
    },
    closeAllModals: (state) => {
      Object.keys(state.modals).forEach(key => {
        state.modals[key as keyof UIState['modals']] = false;
      });
    },
    setLoading: (state, action: PayloadAction<{ key: keyof UIState['loading']; value: boolean }>) => {
      const { key, value } = action.payload;
      state.loading[key] = value;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  setSelectedAssets,
  addSelectedAsset,
  removeSelectedAsset,
  clearSelectedAssets,
  setCurrentView,
  setCurrency,
  setTheme,
  addNotification,
  markNotificationAsRead,
  removeNotification,
  clearNotifications,
  openModal,
  closeModal,
  closeAllModals,
  setLoading,
} = uiSlice.actions;

export default uiSlice.reducer;