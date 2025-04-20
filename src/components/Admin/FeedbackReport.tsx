import React from 'react';
import { useOrder } from '../../context/OrderContext';
import { format } from 'date-fns';
import { Feedback } from '../../types';

const FeedbackReport: React.FC = () => {
  const { orders } = useOrder();
  
  // Get orders with feedback
  const ordersWithFeedback = orders.filter(order => order.feedback);
  
  // Calculate average rating
  const totalRating = ordersWithFeedback.reduce(
    (sum, order) => sum + (order.feedback?.rating || 0),
    0
  );
  const averageRating = ordersWithFeedback.length
    ? (totalRating / ordersWithFeedback.length).toFixed(1)
    : 0;
  
  // Group feedback by rating for the chart
  const ratingCounts = [0, 0, 0, 0, 0]; // For ratings 1-5
  ordersWithFeedback.forEach(order => {
    if (order.feedback) {
      ratingCounts[order.feedback.rating - 1]++;
    }
  });
  
  // Find the max count for scaling the bars
  const maxCount = Math.max(...ratingCounts);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Feedback Report</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-orange-50 p-4 rounded-lg">
          <h3 className="text-orange-800 font-medium mb-1">Total Feedback</h3>
          <p className="text-3xl font-bold text-orange-600">{ordersWithFeedback.length}</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-green-800 font-medium mb-1">Average Rating</h3>
          <div className="flex items-baseline">
            <p className="text-3xl font-bold text-green-600">{averageRating}</p>
            <p className="text-green-600 ml-1">/5</p>
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-blue-800 font-medium mb-1">Feedback Rate</h3>
          <p className="text-3xl font-bold text-blue-600">
            {orders.length
              ? `${Math.round((ordersWithFeedback.length / orders.length) * 100)}%`
              : '0%'}
          </p>
        </div>
      </div>
      
      {/* Rating distribution chart */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Rating Distribution</h3>
        <div className="flex items-end space-x-4 h-40">
          {ratingCounts.map((count, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div
                className="w-full bg-orange-400 rounded-t"
                style={{
                  height: `${maxCount ? (count / maxCount) * 100 : 0}%`,
                  minHeight: count ? '10%' : '2%',
                }}
              ></div>
              <div className="text-sm font-medium mt-2">{index + 1} ★</div>
              <div className="text-xs text-gray-500">{count}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Recent feedback table */}
      <div>
        <h3 className="text-lg font-medium mb-4">Recent Feedback</h3>
        {ordersWithFeedback.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Comment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {ordersWithFeedback
                  .sort((a, b) => {
                    const dateA = a.feedback?.createdAt ?? '';
                    const dateB = b.feedback?.createdAt ?? '';
                    return dateB.localeCompare(dateA);
                  })
                  .map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-900">{order.userName}</div>
                        <div className="text-gray-500 text-sm capitalize">{order.userRole}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < (order.feedback?.rating || 0) ? 'text-yellow-500' : 'text-gray-300'}>
                              ★
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-900">{order.feedback?.comment}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {order.feedback?.createdAt &&
                          format(new Date(order.feedback.createdAt), 'MMM d, yyyy')}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            No feedback received yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackReport;