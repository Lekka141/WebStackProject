import React from 'react';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from './components/AppNavbar';
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import AppTheme from './shared-theme/AppTheme';
import GridLayout from 'react-grid-layout'; // Import React Grid Layout
import CalendarWidget from './components/Widgets/CalendarWidget'; // Import CalendarWidget component
import WidgetSelector from './components/WidgetSelector'; // Widget selector component for future use

/* Import custom theme components for customizations */
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from './theme/customizations';

/* Merge the customizations into one object to be passed to AppTheme */
const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function Dashboard(props) {
  /* Define the layout for the React Grid Layout */
  const layout = [
    { i: 'calendar', x: 0, y: 0, w: 3, h: 2 },
    /* Future widgets can be added to the layout here */
  ];

  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      {/* Ensures proper color schemes and UI defaults */}
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        {/* Side menu for navigation */}
        <SideMenu />
        {/* Top navigation bar */}
        <AppNavbar />
        {/* Main content area */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}
        >
          {/* Stack to arrange content elements vertically */}
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 10,
              mt: { xs: 8, md: 0 },
            }}
          >
            {/* Page header */}
            <Header />
            {/* Use React Grid Layout to manage widget placements */}
            <GridLayout className="layout" layout={layout} cols={9} rowHeight={100} width={1200}>
              {/* Calendar widget rendered in a specific layout */}
              <div key="calendar">
                <CalendarWidget />
              </div>
              {/* Future widgets can be rendered here */}
            </GridLayout>
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
