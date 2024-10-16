import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText
} from '@mui/material';

function NewsWidget() {
  /* Store the user's query */
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = '4fbef8e9a8894846bc6adf42ee1cbc89'; 

  /* Fetch news based on the user's query */
  const fetchNews = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`
      );
      setArticles(response.data.articles);
    } catch (err) {
      setError('Failed to fetch news. Please try again.');
    }
    setLoading(false);
  };

  /* Handle the search button click */
  const handleSearch = () => {
    if (query.trim() !== '') {
      fetchNews(query);
    }
  };

  useEffect(() => {
    /* Fetch default news on component mount */
    fetchNews('latest');
  }, []);

  return (
    <Card sx={{ maxWidth: 400, margin: 'auto' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          News Widget
        </Typography>

        {/* Input for user to enter search query */}
        <TextField
          label="Search News"
          variant="outlined"
          size="small"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ marginBottom: 2, width: '100%' }}
        />

        {/* Button to trigger the search */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          disabled={loading}
          sx={{ width: '100%' }}
        >
          Search
        </Button>

        {loading && <CircularProgress sx={{ marginTop: 2 }} />}
        {error && (
          <Typography color="error" sx={{ marginTop: 2 }}>
            {error}
          </Typography>
        )}

        {/* Display the news articles */}
        {!loading && !error && articles.length > 0 && (
          <List>
            {articles.slice(0, 5).map((article, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={article.title}
                  secondary={article.source.name}
                />
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
}

export default NewsWidget;
