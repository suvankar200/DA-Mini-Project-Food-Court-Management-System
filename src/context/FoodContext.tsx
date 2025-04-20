import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { FoodItem } from '../types';
import { mockFoodItems } from '../data/mockData';

interface FoodContextType {
  foodItems: FoodItem[];
  addFoodItem: (item: Omit<FoodItem, 'id'>) => void;
  updateFoodItem: (id: string, updates: Partial<FoodItem>) => void;
  toggleAvailability: (id: string) => void;
  deleteFoodItem: (id: string) => void;
}

const FoodContext = createContext<FoodContextType | undefined>(undefined);

export const FoodProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>(() => {
    // Force reload mock data during development
    if (import.meta.env.MODE === 'development') {
      return mockFoodItems;
    }

    const savedItems = localStorage.getItem('foodItems');
    return savedItems ? JSON.parse(savedItems) : mockFoodItems;
  });

  // Save food items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('foodItems', JSON.stringify(foodItems));
  }, [foodItems]);

  const addFoodItem = (item: Omit<FoodItem, 'id'>) => {
    const newItem = {
      ...item,
      id: crypto.randomUUID(),
    };
    setFoodItems(prev => [...prev, newItem]);
  };

  const updateFoodItem = (id: string, updates: Partial<FoodItem>) => {
    setFoodItems(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const toggleAvailability = (id: string) => {
    setFoodItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, available: !item.available } : item
      )
    );
  };

  const deleteFoodItem = (id: string) => {
    setFoodItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <FoodContext.Provider
      value={{
        foodItems,
        addFoodItem,
        updateFoodItem,
        toggleAvailability,
        deleteFoodItem,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};

export const useFood = (): FoodContextType => {
  const context = useContext(FoodContext);
  if (context === undefined) {
    throw new Error('useFood must be used within a FoodProvider');
  }
  return context;
};