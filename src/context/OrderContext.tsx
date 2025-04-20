import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Order, CartItem, UserRole } from '../types';
import { useAuth } from './AuthContext';
import { addMinutes, isBefore } from 'date-fns';
import { useWeather } from './WeatherContext';

interface OrderContextType {
  orders: Order[];
  placeOrder: (items: CartItem[], total: number) => string;
  cancelOrder: (id: string) => void;
  completeOrder: (id: string) => void;
  submitFeedback: (orderId: string, rating: number, comment: string) => void;
  getUserOrders: () => Order[];
  getAllOrders: () => Order[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

// Priority minutes for different roles
const PRIORITY_TIMES = {
  hod: 15,      // HODs get 15-minute slots
  faculty: 30,  // Faculty get 30-minute slots
  student: 45,  // Students get 45-minute slots
};

// Additional time added when weather is bad
const BAD_WEATHER_EXTENSION = 15;

// Cancellation window in minutes
const CANCEL_WINDOW = 30;

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  const { currentUser } = useAuth();
  const { weatherStatus } = useWeather();

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  // Auto-check for expired orders every minute
  React.useEffect(() => {
    const intervalId = setInterval(checkExpiredOrders, 60000);
    return () => clearInterval(intervalId);
  }, [orders]);

  const checkExpiredOrders = () => {
    const now = new Date();
    setOrders(prev => 
      prev.map(order => {
        if (order.status === 'pending') {
          const orderDate = new Date(order.createdAt);
          const cancelWindow = addMinutes(orderDate, CANCEL_WINDOW);
          if (isBefore(cancelWindow, now)) {
            return { ...order, status: 'cancelled' };
          }
        }
        return order;
      })
    );
  };

  // Generate pickup time based on user role and current weather
  const generatePickupTime = (userRole: UserRole): string => {
    const now = new Date();
    let minutesToAdd = PRIORITY_TIMES[userRole];
    
    // Add extra time if weather is bad
    if (weatherStatus.isBad) {
      minutesToAdd += BAD_WEATHER_EXTENSION;
    }
    
    return addMinutes(now, minutesToAdd).toISOString();
  };

  const placeOrder = (items: CartItem[], total: number): string => {
    if (!currentUser) throw new Error('User must be logged in to place an order');
    
    const newOrder: Order = {
      id: crypto.randomUUID(),
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      items: [...items],
      status: 'pending',
      total,
      pickupTime: generatePickupTime(currentUser.role),
      createdAt: new Date().toISOString(),
    };
    
    setOrders(prev => [...prev, newOrder]);
    return newOrder.id;
  };

  const cancelOrder = (id: string) => {
    setOrders(prev => {
      return prev.map(order => {
        if (order.id === id) {
          const orderDate = new Date(order.createdAt);
          const now = new Date();
          const cancelWindow = addMinutes(orderDate, CANCEL_WINDOW);
          
          // Only allow cancellation within the window
          if (!isBefore(cancelWindow, now)) {
            return { ...order, status: 'cancelled' };
          }
        }
        return order;
      });
    });
  };

  const completeOrder = (id: string) => {
    setOrders(prev =>
      prev.map(order => (order.id === id ? { ...order, status: 'completed' } : order))
    );
  };

  const submitFeedback = (orderId: string, rating: number, comment: string) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId
          ? {
              ...order,
              feedback: {
                rating,
                comment,
                createdAt: new Date().toISOString(),
              },
            }
          : order
      )
    );
  };

  const getUserOrders = () => {
    if (!currentUser) return [];
    return orders.filter(order => order.userId === currentUser.id);
  };

  const getAllOrders = () => {
    return orders;
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        placeOrder,
        cancelOrder,
        completeOrder,
        submitFeedback,
        getUserOrders,
        getAllOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};