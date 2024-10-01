import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthContext';
import ProtectedRoute from './ProtectedRoute';

// Lazy load components for better performance
const Dashboard = lazy(() => import('./Dashboard'));
const SignUp = lazy(() => import('./components/auth/SignUp'));
const SignIn = lazy(() => import('./components/auth/SignIn'));

// Fallback component for lazy loading
const Loading = () => <div>Loading...</div>;

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />

            {/* Protected Route */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />

            {/* Navigate to Dashboard for root URL */}
            <Route path="/" element={<Dashboard />} />

            {/* 404 Not Found Route */}
            <Route path="*" element={<div>404 - Not Found</div>} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
