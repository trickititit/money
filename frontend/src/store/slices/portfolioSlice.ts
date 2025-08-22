import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum AssetType {
  Stock = 1,
  RealEstate = 2,
  Cryptocurrency = 3,
  Cash = 4,
  PreciousMetals = 5,
}

export interface Portfolio {
  id: number;
  userId: number;
  name: string;
  description: string;
  baseCurrency: string;
  totalValue: number;
  totalCost: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
  createdAt: string;
  lastUpdated: string;
}

export interface Asset {
  id: number;
  portfolioId: number;
  assetType: AssetType;
  symbol: string;
  name: string;
  quantity: number;
  averageCost: number;
  currentPrice: number;
  currentValue: number;
  currency: string;
  acquiredDate: string;
  lastPriceUpdate: string;
}

export interface AssetAllocation {
  assetType: AssetType;
  value: number;
  percentage: number;
  count: number;
}

export interface PerformanceData {
  period: string;
  value: number;
  gainLoss: number;
  gainLossPercent: number;
}

export interface PortfolioState {
  selectedPortfolioId: number | null;
  portfolios: Portfolio[];
  assets: Asset[];
  assetAllocation: AssetAllocation[];
  performanceData: PerformanceData[];
  totalValue: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
  loading: boolean;
  error: string | null;
}

const initialState: PortfolioState = {
  selectedPortfolioId: null,
  portfolios: [],
  assets: [],
  assetAllocation: [],
  performanceData: [],
  totalValue: 0,
  totalGainLoss: 0,
  totalGainLossPercent: 0,
  loading: false,
  error: null,
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    setSelectedPortfolio: (state, action: PayloadAction<number>) => {
      state.selectedPortfolioId = action.payload;
    },
    setPortfolios: (state, action: PayloadAction<Portfolio[]>) => {
      state.portfolios = action.payload;
      if (state.portfolios.length > 0 && !state.selectedPortfolioId) {
        state.selectedPortfolioId = state.portfolios[0].id;
      }
    },
    addPortfolio: (state, action: PayloadAction<Portfolio>) => {
      state.portfolios.push(action.payload);
    },
    updatePortfolio: (state, action: PayloadAction<Portfolio>) => {
      const index = state.portfolios.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.portfolios[index] = action.payload;
      }
    },
    removePortfolio: (state, action: PayloadAction<number>) => {
      state.portfolios = state.portfolios.filter(p => p.id !== action.payload);
      if (state.selectedPortfolioId === action.payload) {
        state.selectedPortfolioId = state.portfolios.length > 0 ? state.portfolios[0].id : null;
      }
    },
    setAssets: (state, action: PayloadAction<Asset[]>) => {
      state.assets = action.payload;
    },
    addAsset: (state, action: PayloadAction<Asset>) => {
      state.assets.push(action.payload);
    },
    updateAsset: (state, action: PayloadAction<Asset>) => {
      const index = state.assets.findIndex(a => a.id === action.payload.id);
      if (index !== -1) {
        state.assets[index] = action.payload;
      }
    },
    removeAsset: (state, action: PayloadAction<number>) => {
      state.assets = state.assets.filter(a => a.id !== action.payload);
    },
    updateAssetPrices: (state, action: PayloadAction<{ symbol: string; price: number }[]>) => {
      action.payload.forEach(({ symbol, price }) => {
        const asset = state.assets.find(a => a.symbol === symbol);
        if (asset) {
          asset.currentPrice = price;
          asset.currentValue = asset.quantity * price;
          asset.lastPriceUpdate = new Date().toISOString();
        }
      });
    },
    setAssetAllocation: (state, action: PayloadAction<AssetAllocation[]>) => {
      state.assetAllocation = action.payload;
    },
    setPerformanceData: (state, action: PayloadAction<PerformanceData[]>) => {
      state.performanceData = action.payload;
    },
    updatePortfolioTotals: (state, action: PayloadAction<{ totalValue: number; totalGainLoss: number; totalGainLossPercent: number }>) => {
      const { totalValue, totalGainLoss, totalGainLossPercent } = action.payload;
      state.totalValue = totalValue;
      state.totalGainLoss = totalGainLoss;
      state.totalGainLossPercent = totalGainLossPercent;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearPortfolioData: (state) => {
      state.selectedPortfolioId = null;
      state.portfolios = [];
      state.assets = [];
      state.assetAllocation = [];
      state.performanceData = [];
      state.totalValue = 0;
      state.totalGainLoss = 0;
      state.totalGainLossPercent = 0;
    },
  },
});

export const {
  setSelectedPortfolio,
  setPortfolios,
  addPortfolio,
  updatePortfolio,
  removePortfolio,
  setAssets,
  addAsset,
  updateAsset,
  removeAsset,
  updateAssetPrices,
  setAssetAllocation,
  setPerformanceData,
  updatePortfolioTotals,
  setLoading,
  setError,
  clearPortfolioData,
} = portfolioSlice.actions;

export default portfolioSlice.reducer;"