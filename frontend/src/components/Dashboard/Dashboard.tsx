import { useState } from 'react';
import {
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/outline';

// Mock data for demonstration
const mockPortfolioData = {
  totalValue: 125430.50,
  totalGainLoss: 8420.30,
  totalGainLossPercent: 7.2,
  dailyChange: 520.15,
  dailyChangePercent: 0.42,
};

const mockAssetAllocation = [
  { name: 'Stocks', value: 65420.30, percentage: 52.2, color: 'bg-blue-500' },
  { name: 'Real Estate', value: 35000.00, percentage: 27.9, color: 'bg-green-500' },
  { name: 'Cryptocurrency', value: 15230.20, percentage: 12.1, color: 'bg-yellow-500' },
  { name: 'Cash', value: 7500.00, percentage: 6.0, color: 'bg-gray-500' },
  { name: 'Precious Metals', value: 2280.00, percentage: 1.8, color: 'bg-orange-500' },
];

const mockRecentTransactions = [
  { id: 1, type: 'Buy', asset: 'AAPL', quantity: 10, price: 150.25, date: '2024-01-15', total: 1502.50 },
  { id: 2, type: 'Sell', asset: 'BTC', quantity: 0.5, price: 45000, date: '2024-01-14', total: 22500.00 },
  { id: 3, type: 'Buy', asset: 'Property #1', quantity: 1, price: 250000, date: '2024-01-10', total: 250000.00 },
  { id: 4, type: 'Buy', asset: 'Gold', quantity: 2, price: 2000, date: '2024-01-08', total: 4000.00 },
];

const Dashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('1M');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatPercentage = (percent: number) => {
    return `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Portfolio Dashboard</h1>
        <div className="flex space-x-2">
          {['1D', '1W', '1M', '3M', '1Y', 'ALL'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                selectedPeriod === period
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Portfolio Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat-card">
          <div className="text-sm text-gray-600 mb-1">Total Portfolio Value</div>
          <div className="text-2xl font-bold text-gray-900">
            {formatCurrency(mockPortfolioData.totalValue)}
          </div>
          <div className="flex items-center mt-2">
            {mockPortfolioData.dailyChange >= 0 ? (
              <ArrowUpIcon className="h-4 w-4 text-green-600 mr-1" />
            ) : (
              <ArrowDownIcon className="h-4 w-4 text-red-600 mr-1" />
            )}
            <span
              className={`text-sm ${
                mockPortfolioData.dailyChange >= 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {formatCurrency(Math.abs(mockPortfolioData.dailyChange))} (
              {formatPercentage(mockPortfolioData.dailyChangePercent)}) today
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="text-sm text-gray-600 mb-1">Total Gain/Loss</div>
          <div className="text-2xl font-bold text-green-600">
            {formatCurrency(mockPortfolioData.totalGainLoss)}
          </div>
          <div className="text-sm text-green-600 mt-2">
            {formatPercentage(mockPortfolioData.totalGainLossPercent)} overall
          </div>
        </div>

        <div className="stat-card">
          <div className="text-sm text-gray-600 mb-1">Number of Assets</div>
          <div className="text-2xl font-bold text-gray-900">24</div>
          <div className="text-sm text-gray-500 mt-2">Across 5 categories</div>
        </div>

        <div className="stat-card">
          <div className="text-sm text-gray-600 mb-1">Diversification Score</div>
          <div className="text-2xl font-bold text-blue-600">8.2/10</div>
          <div className="text-sm text-gray-500 mt-2">Well diversified</div>
        </div>
      </div>

      {/* Asset Allocation and Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Asset Allocation */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Asset Allocation</h2>
            <button className="text-sm text-primary-600 hover:text-primary-700">View Details</button>
          </div>
          <div className="space-y-3">
            {mockAssetAllocation.map((asset, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${asset.color}`}></div>
                  <span className="text-sm font-medium text-gray-900">{asset.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">
                    {formatCurrency(asset.value)}
                  </div>
                  <div className="text-xs text-gray-500">{asset.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Chart Placeholder */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Performance</h2>
            <button className="text-sm text-primary-600 hover:text-primary-700">View Chart</button>
          </div>
          <div className="h-48 bg-gray-50 rounded flex items-center justify-center">
            <div className="text-center">
              <div className="text-gray-400 mb-2">Performance Chart</div>
              <div className="text-sm text-gray-500">Chart component will be implemented here</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
          <button className="text-sm text-primary-600 hover:text-primary-700">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Asset
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockRecentTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        transaction.type === 'Buy'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {transaction.asset}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(transaction.price)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(transaction.total)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;