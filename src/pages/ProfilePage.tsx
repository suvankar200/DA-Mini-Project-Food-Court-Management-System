import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Profile</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 flex items-center border-b border-gray-200">
          <div className="bg-orange-100 p-4 rounded-full mr-4">
            <User size={48} className="text-orange-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{currentUser.name}</h2>
            <p className="text-gray-600 capitalize">{currentUser.role}</p>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">User ID</h3>
              <p className="text-gray-900">{currentUser.id}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Role Priority</h3>
              <div className="flex items-center">
                {currentUser.role === 'hod' && (
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                    High Priority (10 min)
                  </span>
                )}
                {currentUser.role === 'faculty' && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    Medium Priority (20 min)
                  </span>
                )}
                {currentUser.role === 'student' && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    Standard Priority (30 min)
                  </span>
                )}
                {currentUser.role === 'admin' && (
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                    Admin Access
                  </span>
                )}
              </div>
            </div>
          </div>
          
          {currentUser.role !== 'admin' && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">Pickup Information</h3>
              <p className="text-blue-700 text-sm">
                Based on your role, your orders will be assigned a pickup window. Please pick up your
                order within the assigned time to avoid automatic Panalty charges.
              </p>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-medium text-blue-800 uppercase mb-1">Normal Weather</h4>
                  <p className="text-blue-700 text-sm">
                    {currentUser.role === 'hod' && 'Your pickup window: 10 minutes'}
                    {currentUser.role === 'faculty' && 'Your pickup window: 20 minutes'}
                    {currentUser.role === 'student' && 'Your pickup window: 30 minutes'}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-xs font-medium text-blue-800 uppercase mb-1">Bad Weather</h4>
                  <p className="text-blue-700 text-sm">
                    {currentUser.role === 'hod' && 'Extended window: 40 minutes (+30)'}
                    {currentUser.role === 'faculty' && 'Extended window: 50 minutes (+30)'}
                    {currentUser.role === 'student' && 'Extended window: 60 minutes (+30)'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;