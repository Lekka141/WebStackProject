// src/components/widgets/WeatherWidget.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Grid,
} from '@mui/material';

function WeatherWidget() {
  /* Default City */
  const [city, setCity] = useState('Johannesburg'); 
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* OpenWeatherMap API Key */
  const apiKey = 'c2201704c24e9a5fbf114d5629d66e10'; 

  /* Fetch weather data for the specified city */
  const fetchWeatherData = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    }
    setLoading(false);
  };

  /* Fetch default weather data on component mount */
  useEffect(() => {
    fetchWeatherData(city);
  }, []);

  /* Handle changes in the city input field */
  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  /* Trigger a new weather data fetch based on the current city */
  const handleSearch = () => {
    if (city) {
      fetchWeatherData(city);
    }
  };

  return (
    <Card sx={{ maxWidth: 400, margin: 'auto' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Weather Widget
        </Typography>
        {/* Input for the user to enter a city */}
        <TextField
          label="Enter City"
          variant="outlined"
          size="small"
          value={city}
          onChange={handleCityChange}
          sx={{ marginBottom: 2, width: '100%' }}
        />
        {/* Button to fetch weather data for the specified city */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          disabled={loading}
          sx={{ width: '100%' }}
        >
          Get Weather
        </Button>

        {loading && <CircularProgress sx={{ marginTop: 2 }} />}
        {error && (
          <Typography color="error" sx={{ marginTop: 2 }}>
            {error}
          </Typography>
        )}

        {/* Display the weather data */}
        {weatherData && !loading && !error && (
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item xs={12}>
              <Typography variant="h6">{weatherData.name}</Typography>
              <Typography variant="body1">
                {weatherData.weather[0].description}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">
                Temperature: {weatherData.main.temp}°C
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">
                Feels like: {weatherData.main.feels_like}°C
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">
                Humidity: {weatherData.main.humidity}%
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">
                Wind Speed: {weatherData.wind.speed} m/s
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">
                Min Temp: {weatherData.main.temp_min}°C
              </Typography>
              <Typography variant="body2">
                Max Temp: {weatherData.main.temp_max}°C
              </Typography>
            </Grid>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
}

export default WeatherWidget;
