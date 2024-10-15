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
import CalendarWidget from './components/Widgets/CalendarWidget'; // Only importing CalendarWidget now
import WidgetSelector from './components/WidgetSelector';

import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from './theme/customizations';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function Dashboard(props) {
  // Define the layout for the React Grid Layout
  const layout = [
    { i: 'calendar', x: 0, y: 0, w: 3, h: 2 },
  ];

  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <AppNavbar />
        {/* Main content */}
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
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 10,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            {/* Use React Grid Layout for the MainGrid */}
            <GridLayout className="layout" layout={layout} cols={9} rowHeight={100} width={1200}>
              <div key="calendar">
                <CalendarWidget />
              </div>
            </GridLayout>
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
