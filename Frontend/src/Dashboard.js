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

/** Error Fallback Component for handling widget loading errors */
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div role="alert">
    <Typography variant="h6" color="error">Something went wrong!</Typography>
    <pre>{error.message}</pre>
    <Button variant="contained" color="primary" onClick={resetErrorBoundary}>Try again</Button>
  </div>
);

function Dashboard() {
  /** State to manage active widgets */
  const [activeWidgets, setActiveWidgets] = useState(['WeatherWidget', 'CalendarWidget', 'ToDoWidget']);
  const [data, setData] = useState(null); /** State to hold fetched data */

  /**
   * Fetch data when the component mounts.
   * Uses the 'get' method from API utility to fetch data from the given endpoint.
   */
  useEffect(() => {
    get('/data-endpoint')
      .then(response => {
        setData(response);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  /**
   * Function to toggle the visibility of widgets on the dashboard.
   * Updates the activeWidgets state to add or remove the specified widget.
   */
  const toggleWidget = (widget) => {
    setActiveWidgets(prevWidgets =>
      prevWidgets.includes(widget) ? prevWidgets.filter(w => w !== widget) : [...prevWidgets, widget]
    );
  };

  return (
    <Box>
      <Header /> {/* Render the app header */}
      <SideMenu toggleWidget={toggleWidget} /> {/* Sidebar with widget selection to toggle widgets */}
      <MainGrid> {/* Main content area where widgets are displayed */}
        {
          /**
           * Wrap widgets in ErrorBoundary to catch any runtime errors specific to each widget.
           * Suspense is used to display a loading spinner while each widget is being loaded.
           */
        }
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
