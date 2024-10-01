import React from 'react';
import { Grid, Paper } from '@mui/material';

function MainGrid() {
  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      <Grid item xs={12} sm={6} md={4}>
        <Paper sx={{ padding: 2 }}>Widget 1</Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper sx={{ padding: 2 }}>Widget 2</Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper sx={{ padding: 2 }}>Widget 3</Paper>
      </Grid>
    </Grid>
  );
}

export default MainGrid;
