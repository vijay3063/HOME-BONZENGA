import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

// Pages
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import CustomerDashboard from '@/pages/customer/Dashboard';
import VendorDashboard from '@/pages/vendor/Dashboard';
import AdminDashboard from '@/pages/admin/Dashboard';
import BookingPage from '@/pages/customer/BookingPage';
import SearchPage from '@/pages/customer/SearchPage';

function ProtectedRoute({ children, roles }: { children: React.ReactNode; roles?: string[] }) {
  const { user, loading } = useAuth();
  console.log('ProtectedRoute rendering, user:', user, 'loading:', loading);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-primary mx-auto mb-4"></div>
        <p className="text-lg text-foreground">Loading...</p>
      </div>
    </div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  const { user } = useAuth();
  console.log('AppRoutes rendering, user:', user);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={user ? <Navigate to={`/${user.role.toLowerCase()}`} /> : <LoginPage />} />
      <Route path="/register" element={user ? <Navigate to={`/${user.role.toLowerCase()}`} /> : <RegisterPage />} />
      <Route path="/search" element={<SearchPage />} />
      
      {/* Customer Routes */}
      <Route path="/customer" element={
        <ProtectedRoute roles={['CUSTOMER']}>
          <CustomerDashboard />
        </ProtectedRoute>
      } />
      <Route path="/customer/book/:vendorId" element={
        <ProtectedRoute roles={['CUSTOMER']}>
          <BookingPage />
        </ProtectedRoute>
      } />
      
      {/* Vendor Routes */}
      <Route path="/vendor" element={
        <ProtectedRoute roles={['VENDOR']}>
          <VendorDashboard />
        </ProtectedRoute>
      } />
      
      {/* Admin Routes */}
      <Route path="/admin" element={
        <ProtectedRoute roles={['ADMIN']}>
          <AdminDashboard />
        </ProtectedRoute>
      } />
      
      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

const Index = () => {
  console.log('Index component rendering');
  
  return (
    <div className="min-h-screen bg-background">
      <AppRoutes />
    </div>
  );
};

export default Index;
