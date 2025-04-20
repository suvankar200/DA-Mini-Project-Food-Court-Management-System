import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { WeatherStatus } from '../types';
import { useAuth } from './AuthContext';

interface WeatherContextType {
  weatherStatus: WeatherStatus;
  updateWeatherStatus: (isBad: boolean) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [weatherStatus, setWeatherStatus] = useState<WeatherStatus>(() => {
    const savedStatus = localStorage.getItem('weatherStatus');
    return savedStatus ? JSON.parse(savedStatus) : {
      isBad: false,
      updatedAt: new Date().toISOString(),
      updatedBy: 'system',
    };
  });
  
  const { currentUser } = useAuth();

  // Save weather status to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('weatherStatus', JSON.stringify(weatherStatus));
  }, [weatherStatus]);

  const updateWeatherStatus = (isBad: boolean) => {
    if (!currentUser || currentUser.role !== 'admin') {
      throw new Error('Only admin can update weather status');
    }
    
    setWeatherStatus({
      isBad,
      updatedAt: new Date().toISOString(),
      updatedBy: currentUser.name,
    });
  };

  return (
    <WeatherContext.Provider value={{ weatherStatus, updateWeatherStatus }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = (): WeatherContextType => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};