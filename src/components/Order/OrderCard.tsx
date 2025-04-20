import React from 'react';
import { format, differenceInMinutes } from 'date-fns';
import { QRCodeSVG } from 'qrcode.react';
import { Order } from '../../types';
import { CheckCircle, XCircle, Clock, MessageSquare, AlertTriangle } from 'lucide-react';
import { useWeather } from '../../context/WeatherContext';

interface OrderCardProps {
  order: Order;
  onFeedback?: (orderId: string) => void;
  onCancel?: (orderId: string) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onFeedback, onCancel }) => {
  const { weatherStatus } = useWeather();
  const now = new Date();
  const orderDate = new Date(order.createdAt);
  const pickupTime = new Date(order.pickupTime);
  
  // Calculate waiting time based on role
  const getWaitingTime = () => {
    const baseTime = {
      hod: 10,
      faculty: 20,
      student: 30
    }[order.userRole] || 45;
    
    return weatherStatus.isBad ? baseTime + 15 : baseTime;
  };

  const waitingTime = getWaitingTime();
  const remainingCancelTime = differenceInMinutes(
    new Date(orderDate.getTime() + waitingTime * 60000),
    now
  );

  const canCancel = remainingCancelTime > 0 && order.status === 'pending';

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    ready: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  const statusIcons = {
    pending: <Clock size={16} className="text-yellow-500" />,
    ready: <Clock size={16} className="text-blue-500" />,
    completed: <CheckCircle size={16} className="text-green-500" />,
    cancelled: <XCircle size={16} className="text-red-500" />,
  };

  // Generate QR code data
  const qrData = JSON.stringify({
    orderId: order.id,
    status: order.status,
    pickupTime: order.pickupTime,
    total: order.total,
  });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-sm text-gray-500">Order ID: #{order.id.slice(0, 8)}</p>
            <p className="text-sm text-gray-500">
              {format(new Date(order.createdAt), 'MMM d, yyyy h:mm a')}
            </p>
          </div>
          
          <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${statusColors[order.status]}`}>
            {statusIcons[order.status]}
            <span className="capitalize">{order.status}</span>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="font-medium mb-2">Items:</h3>
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm mb-1">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span className="text-gray-700">₹{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-2 border-t border-gray-100 flex justify-between font-medium">
          <span>Total</span>
          <span>₹{order.total.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="p-4 bg-gray-50">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h4 className="text-sm font-medium">Pickup Time</h4>
            <p className="text-gray-700">
              {format(pickupTime, 'h:mm a')}
            </p>
            {order.status === 'pending' && (
              <p className="text-sm text-gray-600 mt-1">
                Waiting Time: {waitingTime} minutes
                {weatherStatus.isBad && ' (includes weather extension)'}
              </p>
            )}
          </div>
          
          {canCancel && onCancel && (
            <div>
              <button
                onClick={() => onCancel(order.id)}
                className="px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center"
              >
                <XCircle size={16} className="mr-1" />
                <span>Cancel ({remainingCancelTime}m)</span>
              </button>
              <p className="text-xs text-gray-500 mt-1 text-right">
                Cancel window closes at {format(new Date(orderDate.getTime() + waitingTime * 60000), 'h:mm a')}
              </p>
            </div>
          )}
        </div>

        {order.status === 'pending' && (
          <div className="flex items-center p-3 bg-yellow-50 rounded-md mb-4">
            <AlertTriangle size={18} className="text-yellow-600 mr-2" />
            <p className="text-sm text-yellow-700">
              Please pick up your order within {waitingTime} minutes to avoid Panalty charges.
            </p>
          </div>
        )}
        
        {/* QR Code Ticket */}
        {(order.status === 'pending' || order.status === 'ready') && (
          <div className="flex justify-center p-4 bg-white rounded-md border border-gray-200">
            <div className="text-center">
              <QRCodeSVG value={qrData} size={150} />
              <p className="text-sm text-gray-600 mt-2">Show this QR code when picking up your order</p>
            </div>
          </div>
        )}
        
        {order.status === 'completed' && !order.feedback && onFeedback && (
          <button
            onClick={() => onFeedback(order.id)}
            className="flex items-center space-x-1 px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <MessageSquare size={16} />
            <span>Leave Feedback</span>
          </button>
        )}
        
        {order.feedback && (
          <div className="flex items-center space-x-1 text-gray-600">
            <span className="text-sm">Rated: {order.feedback.rating}/5</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < order.feedback!.rating ? 'text-yellow-500' : 'text-gray-300'}>
                  ★
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCard;