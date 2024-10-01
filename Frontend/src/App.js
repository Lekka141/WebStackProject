import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
          <Switch>
            {/* Public Routes */}
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />

            {/* Protected Route */}
            <ProtectedRoute path="/dashboard" component={Dashboard} />

            {/* Redirect to Dashboard for root URL */}
            <Route exact path="/" render={() => <Dashboard />} />

            {/* 404 Not Found Route */}
            <Route path="*" render={() => <div>404 - Not Found</div>} />
          </Switch>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
