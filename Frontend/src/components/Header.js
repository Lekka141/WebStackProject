import React from 'react';
import { Box, Typography } from '@mui/material';

/**
 * Header component responsible for rendering the main dashboard heading and subtitle
 *
 * This component provides an engaging introduction to the dashboard, welcoming the user with a main heading and a supporting subtitle.
 * It utilizes Material-UI components for consistent styling and a responsive design that adapts to various screen sizes.
 *
 * @returns {JSX.Element} - The rendered header section with a title and subtitle
 */
function Header() {
  return (
    /**
     * Box component is used for layout and spacing purposes, providing padding and centering the content.
     * 'padding' adds spacing around the content, while 'textAlign' ensures the content is centered horizontally.
     */
    <Box sx={{ padding: { xs: 2, md: 4 }, textAlign: 'center', backgroundColor: 'primary.main', color: 'white' }}>
      {/**
       * Typography component for the main heading.
       * 'variant="h4"' sets the size and weight for a heading level 4.
       * Responsive typography is enabled by setting 'variant' to dynamically adapt based on screen size.
       */}
      <Typography variant={{ xs: 'h5', md: 'h4' }} component="h1" gutterBottom>
        Welcome to Your Dashboard
      </Typography>

      {/**
       * Typography component for the subtitle.
       * 'variant="subtitle1"' makes the text suitable for a supporting role, and 'gutterBottom' adds spacing below the element.
       */}
      <Typography variant="subtitle1" component="p">
        Manage your digital footprint with VaultConnect
      </Typography>
    </Box>
  );
}

export default Header;
