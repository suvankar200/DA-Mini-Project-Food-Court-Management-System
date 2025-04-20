import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Utensils } from 'lucide-react';

const AuthLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/menu" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white text-center">
          <div className="flex justify-center mb-4">
            <Utensils size={48} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold">Food Court</h1>
          <p className="text-orange-100 mt-2">Management System</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;