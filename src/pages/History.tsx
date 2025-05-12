import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { BarChart3, ShoppingBag, TrendingUp, CreditCard } from 'lucide-react';
import { shoppingHistory } from '../data/mockData';
import { ItemCategory } from '../types';

const History: React.FC = () => {
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Get top spending categories
  const topCategories = Object.entries(shoppingHistory.categorySummary)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([category, amount]) => ({
      category: category as ItemCategory,
      amount,
      percentage: (amount / shoppingHistory.totalSpent) * 100,
    }));

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Shopping History</h1>
        <p className="mt-1 text-gray-500">Track your shopping habits and expenses over time</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-blue-100 mr-4">
                <ShoppingBag className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Lists</p>
                <h3 className="text-2xl font-bold text-gray-900">{shoppingHistory.lists.length}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-green-100 mr-4">
                <CreditCard className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Spent</p>
                <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(shoppingHistory.totalSpent)}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-purple-100 mr-4">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Avg. Per List</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {formatCurrency(shoppingHistory.totalSpent / (shoppingHistory.lists.length || 1))}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
              Top Spending Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCategories.map((item) => (
                <div key={item.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-sm font-medium">{item.category}</span>
                    </div>
                    <span className="text-sm font-medium">{formatCurrency(item.amount)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Shopping Lists</CardTitle>
          </CardHeader>
          <CardContent>
            {shoppingHistory.lists.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                <p>No shopping history available yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {shoppingHistory.lists.map((list) => (
                  <div key={list.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{list.name}</h4>
                      <p className="text-sm text-gray-500">
                        {new Date(list.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(list.totalEstimatedCost)}</p>
                      <p className="text-sm text-gray-500">
                        {list.items.length} items
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default History;