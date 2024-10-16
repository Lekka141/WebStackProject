import React, { useState, useEffect, Suspense } from 'react';
import { Box, CircularProgress, Typography, Button } from '@mui/material';
import MainGrid from './components/MainGrid';
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import { ErrorBoundary } from 'react-error-boundary';
import { get } from './utils/API';

/** Lazy load widgets */
const WeatherWidget = React.lazy(() => import('./components/Widgets/WeatherWidget'));
const CalendarWidget = React.lazy(() => import('./components/Widgets/CalendarWidget'));
const ToDoWidget = React.lazy(() => import('./components/Widgets/ToDoWidget'));
const FinancialNewsWidget = React.lazy(() => import('./components/Widgets/FinancialNewsWidget'));
const RSSFeedWidget = React.lazy(() => import('./components/Widgets/RSSFeedWidget'));
const NewsWidget = React.lazy(() => import('./components/Widgets/NewsWidget'));

/** Fallback component to display while widgets load */
const LoadingSpinner = () => (
  <Box textAlign="center" mt={4}>
    <CircularProgress />
    <Typography variant="h6" mt={2}>Loading Widget...</Typography>
  </Box>
);

/** Error Fallback Component */
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div role="alert">
    <Typography variant="h6" color="error">Something went wrong!</Typography>
    <pre>{error.message}</pre>
    <Button variant="contained" color="primary" onClick={resetErrorBoundary}>Try again</Button>
  </div>
);

function Dashboard() {
  const [activeWidgets, setActiveWidgets] = useState(['WeatherWidget', 'CalendarWidget', 'ToDoWidget']);
  const [data, setData] = useState(null); /* State to hold fetched data */

  /** Fetch data on mount */
  useEffect(() => {
    get('/data-endpoint') /* Use the get method from API */
      .then(response => {
        setData(response);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  /** Function to toggle widget visibility */
  const toggleWidget = (widget) => {
    setActiveWidgets(prevWidgets =>
      prevWidgets.includes(widget) ? prevWidgets.filter(w => w !== widget) : [...prevWidgets, widget]
    );
  };

  return (
    <Box>
      <Header /> {/* App header */}
      <SideMenu toggleWidget={toggleWidget} /> {/* Sidebar with widget selection */}
      <MainGrid>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<LoadingSpinner />}>
            {activeWidgets.includes('WeatherWidget') && <WeatherWidget data={data?.weather} />}
            {activeWidgets.includes('CalendarWidget') && <CalendarWidget data={data?.calendar} />}
            {activeWidgets.includes('ToDoWidget') && <ToDoWidget data={data?.todos} />}
            {activeWidgets.includes('FinancialNewsWidget') && <FinancialNewsWidget />}
            {activeWidgets.includes('RSSFeedWidget') && <RSSFeedWidget />}
            {activeWidgets.includes('NewsWidget') && <NewsWidget />}
          </Suspense>
        </ErrorBoundary>
      </MainGrid>
    </Box>
  );
}

export default Dashboard;
