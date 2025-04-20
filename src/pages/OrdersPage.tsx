import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import OrderCard from '../components/Order/OrderCard';
import FeedbackForm from '../components/Feedback/FeedbackForm';
import { useOrder } from '../context/OrderContext';
import { Order } from '../types';

const OrdersPage: React.FC = () => {
  const location = useLocation();
  const { getUserOrders, submitFeedback, cancelOrder } = useOrder();
  const [orders, setOrders] = useState<Order[]>([]);
  const [feedbackOrderId, setFeedbackOrderId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');

  // Check for a new order parameter in the URL
  const params = new URLSearchParams(location.search);
  const newOrderId = params.get('new');

  useEffect(() => {
    // Get user orders
    const userOrders = getUserOrders();
    setOrders(userOrders);

    // Highlight new order if exists
    if (newOrderId) {
      // Ensure the highlighted order is in view
      setTimeout(() => {
        const element = document.getElementById(`order-${newOrderId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }

    // Set up interval to refresh orders every minute
    const intervalId = setInterval(() => {
      setOrders(getUserOrders());
    }, 60000);

    return () => clearInterval(intervalId);
  }, [getUserOrders, newOrderId]);

  const handleFeedbackSubmit = (orderId: string, rating: number, comment: string) => {
    submitFeedback(orderId, rating, comment);
    setFeedbackOrderId(null);
    // Refresh orders
    setOrders(getUserOrders());
  };

  const handleCancelOrder = (orderId: string) => {
    cancelOrder(orderId);
    setOrders(getUserOrders());
  };

  // Filter orders based on active tab
  const filteredOrders = orders.filter(order => {
    if (activeTab === 'active') {
      return ['pending', 'ready'].includes(order.status);
    } else {
      return ['completed', 'cancelled'].includes(order.status);
    }
  });

  // Sort active orders by pickup time
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (activeTab === 'active') {
      // For active orders, sort by pickup time (ascending)
      return new Date(a.pickupTime).getTime() - new Date(b.pickupTime).getTime();
    } else {
      // For completed orders, sort by creation date (descending)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Orders</h1>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'active'
              ? 'text-orange-500 border-b-2 border-orange-500'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Active Orders
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'completed'
              ? 'text-orange-500 border-b-2 border-orange-500'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Past Orders
        </button>
      </div>

      {feedbackOrderId ? (
        <FeedbackForm
          orderId={feedbackOrderId}
          onSubmit={handleFeedbackSubmit}
          onCancel={() => setFeedbackOrderId(null)}
        />
      ) : (
        <div className="space-y-6">
          {sortedOrders.length > 0 ? (
            sortedOrders.map((order) => (
              <div
                key={order.id}
                id={`order-${order.id}`}
                className={`transition-all ${
                  newOrderId === order.id ? 'ring-2 ring-orange-500' : ''
                }`}
              >
                <OrderCard
                  order={order}
                  onFeedback={() => setFeedbackOrderId(order.id)}
                  onCancel={handleCancelOrder}
                />
              </div>
            ))
          ) : (
            <div className="text-center py-16 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                {activeTab === 'active'
                  ? 'No active orders'
                  : 'No past orders'}
              </h2>
              <p className="text-gray-500">
                {activeTab === 'active'
                  ? 'Your active orders will appear here'
                  : 'Your order history will appear here'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;