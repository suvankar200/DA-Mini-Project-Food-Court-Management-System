import React from 'react';
import { useOrder } from '../context/OrderContext';
import { useWeather } from '../context/WeatherContext';
import FoodManagement from '../components/Admin/FoodManagement';
import OrderManagement from '../components/Admin/OrderManagement';
import WeatherControl from '../components/Admin/WeatherControl';
import FeedbackReport from '../components/Admin/FeedbackReport';
import { format } from 'date-fns';
import { TrendingUp, ShoppingBag, Clock, CheckCircle } from 'lucide-react';

const AdminDashboardPage: React.FC = () => {
  const { orders } = useOrder();

  // Get today's orders
  const today = new Date().toISOString().split('T')[0];
  const todayOrders = orders.filter(order => 
    order.createdAt.startsWith(today)
  );

  // Calculate statistics
  const totalSales = todayOrders.reduce((sum, order) => sum + order.total, 0);
  const completedOrders = todayOrders.filter(order => order.status === 'completed').length;
  const pendingOrders = todayOrders.filter(order => order.status === 'pending').length;

  // Get most popular items
  const itemCounts = todayOrders.reduce((acc, order) => {
    order.items.forEach(item => {
      acc[item.name] = (acc[item.name] || 0) + item.quantity;
    });
    return acc;
  }, {} as Record<string, number>);

  const popularItems = Object.entries(itemCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
      
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <TrendingUp className="text-green-500 mr-3" size={24} />
            <div>
              <p className="text-sm text-gray-500">Today's Sales</p>
              <p className="text-xl font-bold">₹{totalSales.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <ShoppingBag className="text-blue-500 mr-3" size={24} />
            <div>
              <p className="text-sm text-gray-500">Total Orders Today</p>
              <p className="text-xl font-bold">{todayOrders.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <Clock className="text-orange-500 mr-3" size={24} />
            <div>
              <p className="text-sm text-gray-500">Pending Orders</p>
              <p className="text-xl font-bold">{pendingOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <CheckCircle className="text-green-500 mr-3" size={24} />
            <div>
              <p className="text-sm text-gray-500">Completed Orders</p>
              <p className="text-xl font-bold">{completedOrders}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Items */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Today's Popular Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularItems.map(([name, count]) => (
            <div key={name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">{name}</span>
              <span className="text-gray-600">{count} orders</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {todayOrders.slice(0, 5).map(order => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap">#{order.id.slice(0, 8)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.userName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize
                      ${order.status === 'completed' ? 'bg-green-100 text-green-800' :
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">₹{order.total.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {format(new Date(order.createdAt), 'h:mm a')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admin Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <WeatherControl />
        <FoodManagement />
      </div>
    </div>
  );
};

export default AdminDashboardPage;