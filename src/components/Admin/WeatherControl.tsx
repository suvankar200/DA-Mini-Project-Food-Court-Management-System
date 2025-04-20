import React from 'react';
import { CloudRain, Sun } from 'lucide-react';
import { useWeather } from '../../context/WeatherContext';
import { format } from 'date-fns';

const WeatherControl: React.FC = () => {
  const { weatherStatus, updateWeatherStatus } = useWeather();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Weather Status Control</h2>
      
      <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-gray-50 rounded-lg">
        <div className="flex items-center mb-4 sm:mb-0">
          {weatherStatus.isBad ? (
            <CloudRain size={48} className="text-blue-500 mr-4" />
          ) : (
            <Sun size={48} className="text-yellow-500 mr-4" />
          )}
          
          <div>
            <h3 className="text-xl font-medium mb-1">
              {weatherStatus.isBad ? 'Bad Weather' : 'Good Weather'}
            </h3>
            <p className="text-gray-600 text-sm">
              Last updated: {format(new Date(weatherStatus.updatedAt), 'MMM d, yyyy h:mm a')}
              {weatherStatus.updatedBy !== 'system' && ` by ${weatherStatus.updatedBy}`}
            </p>
            
            {weatherStatus.isBad && (
              <p className="text-yellow-600 mt-2 text-sm">
                Note: Pickup window is extended by 30 minutes due to bad weather.
              </p>
            )}
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => updateWeatherStatus(false)}
            disabled={!weatherStatus.isBad}
            className={`px-4 py-2 rounded-md flex items-center ${
              !weatherStatus.isBad
                ? 'bg-yellow-100 text-yellow-800 cursor-default'
                : 'bg-yellow-500 text-white hover:bg-yellow-600'
            }`}
          >
            <Sun size={18} className="mr-2" />
            <span>Set Good Weather</span>
          </button>
          
          <button
            onClick={() => updateWeatherStatus(true)}
            disabled={weatherStatus.isBad}
            className={`px-4 py-2 rounded-md flex items-center ${
              weatherStatus.isBad
                ? 'bg-blue-100 text-blue-800 cursor-default'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            <CloudRain size={18} className="mr-2" />
            <span>Set Bad Weather</span>
          </button>
        </div>
      </div>
      
      <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="text-lg font-medium text-blue-800 mb-2">About Weather Control</h3>
        <p className="text-blue-700">
          When bad weather is set, the system automatically extends the pickup window by 30 minutes
          for all new orders. This helps users navigate campus safely during inclement weather.
        </p>
      </div>
    </div>
  );
};

export default WeatherControl;