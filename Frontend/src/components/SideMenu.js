import React, { useState, useMemo } from 'react';
import { Box, Card, CardContent, Checkbox, FormControlLabel, Grid, Button, Typography } from '@mui/material';
import WeatherWidget from './Widgets/WeatherWidget';
import NewsWidget from './Widgets/NewsWidget';
import FinancialNewsWidget from './Widgets/FinancialNewsWidget';
import CalendarWidget from './Widgets/CalendarWidget';
import RSSFeedWidget from './Widgets/RSSFeedWidget';
import ToDoWidget from './Widgets/ToDoWidget';

/**
 * WidgetSelector component allows users to select and display various widgets on the dashboard.
 * Users can customize their dashboard by toggling the visibility of each widget.
 *
 * @returns {JSX.Element} - The rendered widget selector with checkboxes and selected widgets.
 */
const WidgetSelector = () => {
    /**
     * State to manage which widgets are selected.
     * Each key in the object represents a widget, and the value is a boolean indicating its selection status.
     */
    const [selectedWidgets, setSelectedWidgets] = useState({
        weather: false,
        news: false,
        financialNews: false,
        calendar: false,
        rssFeed: false,
        toDo: false,
    });

    /**
     * List of available widgets for dynamic rendering.
     * This list is used both for generating checkboxes and rendering selected widgets.
     */
    const widgetsList = [
        { name: 'weather', label: 'Weather Widget', component: <WeatherWidget /> },
        { name: 'news', label: 'News Widget', component: <NewsWidget /> },
        { name: 'financialNews', label: 'Financial News Widget', component: <FinancialNewsWidget /> },
        { name: 'calendar', label: 'Calendar Widget', component: <CalendarWidget /> },
        { name: 'rssFeed', label: 'RSS Feed Widget', component: <RSSFeedWidget /> },
        { name: 'toDo', label: 'To-Do Widget', component: <ToDoWidget /> },
    ];

    /**
     * Function to handle changes in the checkbox for selecting widgets.
     * Toggles the selected state of the specified widget.
     *
     * @param {string} widgetName - The name of the widget to toggle its selected state.
     */
    const handleWidgetChange = (widgetName) => {
        if (!selectedWidgets.hasOwnProperty(widgetName)) {
            console.error(`Invalid widget name: ${widgetName}`);
            return;
        }
        setSelectedWidgets((prevWidgets) => ({
            ...prevWidgets,
            [widgetName]: !prevWidgets[widgetName],
        }));
    };

    /**
     * Helper function to render checkboxes for each widget dynamically.
     * Generates a checkbox for each widget in the widgetsList array.
     *
     * @returns {JSX.Element[]} - Array of FormControlLabel components with checkboxes for each widget.
     */
    const renderCheckboxes = () => {
        return widgetsList.map(({ name, label }) => (
            <Grid item xs={12} sm={6} md={4} key={name}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={selectedWidgets[name]}
                            onChange={() => handleWidgetChange(name)}
                            name={name}
                        />
                    }
                    label={label}
                />
            </Grid>
        ));
    };

    /**
     * Memoized rendering of selected widgets to optimize performance.
     * Only the widgets that are selected by the user are rendered in the dashboard.
     *
     * @returns {JSX.Element} - Grid of selected widgets.
     */
    const renderedWidgets = useMemo(() => {
        return (
            <Grid container spacing={2}>
                {widgetsList.map(({ name, component }) =>
                    selectedWidgets[name] && (
                        <Grid item xs={12} sm={6} md={4} key={name}>
                            {component}
                        </Grid>
                    )
                )}
            </Grid>
        );
    }, [selectedWidgets, widgetsList]);

    return (
        <Box>
            {/* Card containing the widget selection checkboxes */}
            <Card sx={{ marginBottom: 3 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Select Your Widgets
                    </Typography>
                    {/* Render checkboxes dynamically for widget selection */}
                    <Grid container spacing={1}>
                        {renderCheckboxes()}
                    </Grid>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: 2 }}
                        onClick={() => console.log('Widgets updated:', selectedWidgets)}
                    >
                        Apply Selection
                    </Button>
                </CardContent>
            </Card>

            {/* Render the selected widgets in the dashboard layout */}
            {renderedWidgets}
        </Box>
    );
};

export default WidgetSelector;
