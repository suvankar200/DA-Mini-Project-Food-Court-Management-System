import React, { useState } from 'react';
import { useOrder } from '../../context/OrderContext';
import { format } from 'date-fns';
import { Order } from '../../types';

const OrderManagement: React.FC = () => {
  const { orders, completeOrder, cancelOrder } = useOrder();
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter(order => order.status === filterStatus);

  const getStatusClass = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'ready':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Order Management</h2>
      
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilterStatus('all')}
          className={`px-3 py-1 rounded-md text-sm ${
            filterStatus === 'all'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Orders
        </button>
        {(['pending', 'ready', 'completed', 'cancelled'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-3 py-1 rounded-md text-sm capitalize ${
              filterStatus === status
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {status}
          </button>
        ))}
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pickup Time
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">
                    #{order.id.slice(0, 8)}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {format(new Date(order.createdAt), 'MMM d, h:mm a')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-900">{order.userName}</div>
                  <div className="text-gray-500 text-sm capitalize">{order.userRole}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                  ₹{order.total.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusClass(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                  {format(new Date(order.pickupTime), 'h:mm a')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {order.status === 'pending' && (
                    <>
                      <button
                        onClick={() => completeOrder(order.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded-md text-sm mr-2"
                      >
                        Ready
                      </button>
                      <button
                        onClick={() => cancelOrder(order.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md text-sm"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  {order.status === 'ready' && (
                    <button
                      onClick={() => completeOrder(order.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Complete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredOrders.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No orders found with the selected status.
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;