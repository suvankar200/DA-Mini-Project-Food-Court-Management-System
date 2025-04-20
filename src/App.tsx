import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { FoodProvider } from './context/FoodContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { WeatherProvider } from './context/WeatherContext';
import Feedback from './components/Feedback';

// Layouts
import AuthLayout from './components/Layout/AuthLayout';
import MainLayout from './components/Layout/MainLayout';

// Pages
import LoginPage from './pages/LoginPage';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboardPage from './pages/AdminDashboardPage';

// Route guard
const ProtectedRoute: React.FC<{ children: React.ReactNode; adminOnly?: boolean }> = ({
  children,
  adminOnly = false,
}) => {
  const auth = JSON.parse(localStorage.getItem('auth') || 'null');
  
  if (!auth) {
    return <Navigate to="/login" replace />;
  }
  
  if (adminOnly && auth.role !== 'admin') {
    return <Navigate to="/menu" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <WeatherProvider>
          <FoodProvider>
            <CartProvider>
              <OrderProvider>
                <Routes>
                  {/* Auth routes */}
                  <Route element={<AuthLayout />}>
                    <Route path="/login" element={<LoginPage />} />
                  </Route>
                  
                  {/* Protected routes */}
                  <Route element={<MainLayout />}>
                    <Route path="/menu" element={<MenuPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route 
                      path="/admin" 
                      element={
                        <ProtectedRoute adminOnly>
                          <AdminDashboardPage />
                        </ProtectedRoute>
                      } 
                    />
                  </Route>
                  
                  {/* Redirect home to menu */}
                  <Route path="/" element={<Navigate to="/login" replace />} />
                  <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
                <div>
                  <h1>Welcome to Our Website</h1>
                  <Feedback />
                </div>
              </OrderProvider>
            </CartProvider>
          </FoodProvider>
        </WeatherProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;