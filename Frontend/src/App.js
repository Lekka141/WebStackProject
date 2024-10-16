import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import { ErrorBoundary } from 'react-error-boundary';

/** Lazy load components for better performance */
const Dashboard = lazy(() => import('./Dashboard'));
const SignUp = lazy(() => import('./components/auth/SignUp'));
const SignIn = lazy(() => import('./components/auth/SignIn'));
const WeatherWidget = lazy(() => import('./components/Widgets/WeatherWidget'));
const CalendarWidget = lazy(() => import('./components/Widgets/CalendarWidget'));
const ToDoWidget = lazy(() => import('./components/Widgets/ToDoWidget'));
const FinancialNewsWidget = lazy(() => import('./components/Widgets/FinancialNewsWidget'));
const NewsWidget = lazy(() => import('./components/Widgets/NewsWidget'));
const RSSFeedWidget = lazy(() => import('./components/Widgets/RSSFeedWidget'));
const Header = lazy(() => import('./components/Header'));
const SideMenu = lazy(() => import('./components/SideMenu'));

/** Fallback component for lazy loading */
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
    <p>Loading...</p>
  </div>
);

/** Error Fallback Component for error boundary */
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div role="alert" className="error-fallback">
    <h2>Oops! Something went wrong.</h2>
    <pre>{error.message}</pre>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/weather" element={<ProtectedRoute><WeatherWidget /></ProtectedRoute>} />
              <Route path="/calendar" element={<ProtectedRoute><CalendarWidget /></ProtectedRoute>} />
              <Route path="/todo" element={<ProtectedRoute><ToDoWidget /></ProtectedRoute>} />
              <Route path="/financial-news" element={<ProtectedRoute><FinancialNewsWidget /></ProtectedRoute>} />
              <Route path="/news" element={<ProtectedRoute><NewsWidget /></ProtectedRoute>} />
              <Route path="/rss-feed" element={<ProtectedRoute><RSSFeedWidget /></ProtectedRoute>} />
              <Route path="/" element={<Dashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Router>
    </AuthProvider>
  );
}

export default App;
