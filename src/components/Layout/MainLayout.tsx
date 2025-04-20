import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCart, Utensils, User, ClipboardList, LogOut, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWeather } from '../../context/WeatherContext';

const MainLayout: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const { totalItems } = useCart();
  const { weatherStatus } = useWeather();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Utensils className="text-orange-500" size={24} />
            <h1 className="text-xl font-bold text-gray-800">Campus Food Court</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {weatherStatus.isBad && (
              <div className="flex items-center text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full text-sm">
                <AlertCircle size={16} className="mr-1" />
                <span>Bad Weather Alert</span>
              </div>
            )}
            
            <div className="text-sm text-gray-600">
              <span className="font-semibold capitalize">{currentUser.role}</span>
              <span className="mx-1">|</span>
              <span>{currentUser.name}</span>
            </div>
            
            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-gray-700 flex items-center"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-grow flex">
        {/* Sidebar */}
        <nav className="w-20 bg-white shadow-md flex flex-col items-center py-8">
          <NavLink
            to="/menu"
            className={({ isActive }) =>
              `p-3 rounded-full mb-6 ${
                isActive ? 'bg-orange-100 text-orange-600' : 'text-gray-500 hover:bg-gray-100'
              }`
            }
            title="Menu"
          >
            <Utensils size={24} />
          </NavLink>
          
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `p-3 rounded-full mb-6 ${
                isActive ? 'bg-orange-100 text-orange-600' : 'text-gray-500 hover:bg-gray-100'
              }`
            }
            title="Orders"
          >
            <ClipboardList size={24} />
          </NavLink>
          
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `p-3 rounded-full mb-6 ${
                isActive ? 'bg-orange-100 text-orange-600' : 'text-gray-500 hover:bg-gray-100'
              }`
            }
            title="Profile"
          >
            <User size={24} />
          </NavLink>
          
          {currentUser.role === 'admin' && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `p-3 rounded-full mb-6 ${
                  isActive ? 'bg-orange-100 text-orange-600' : 'text-gray-500 hover:bg-gray-100'
                }`
              }
              title="Admin Dashboard"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18" />
                <path d="M9 21V9" />
              </svg>
            </NavLink>
          )}
        </nav>

        {/* Content */}
        <main className="flex-grow p-6">
          <Outlet />
        </main>

        {/* Cart Button */}
        {currentUser.role !== 'admin' && (
          <NavLink
            to="/cart"
            className="fixed bottom-8 right-8 bg-orange-500 text-white p-4 rounded-full shadow-lg hover:bg-orange-600 transition-colors"
          >
            <div className="relative">
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </div>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default MainLayout;