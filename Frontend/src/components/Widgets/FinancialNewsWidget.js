import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
  TextField,
  Button,
  Pagination,
} from '@mui/material';

/** Financial News Widget Component */
function FinancialNewsWidget() {
  /** State variables */
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState('finance'); /* Default search keyword */
  const [page, setPage] = useState(1); /* Pagination state */
  const [totalResults, setTotalResults] = useState(0); /* Total results from the API */

  /** API key for NewsAPI */
  const apiKey = '4fbef8e9a8894846bc6adf42ee1cbc89';

  /** Fetch news data from NewsAPI */
  const fetchNews = async (searchKeyword = 'finance', pageNumber = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${searchKeyword}&page=${pageNumber}&apiKey=${apiKey}`
      );
      setNews(response.data.articles);
      setTotalResults(response.data.totalResults);
    } catch (err) {
      setError('Failed to fetch financial news. Please try again.');
    }
    setLoading(false);
  };

  /** Fetch news when component mounts or search keyword/page changes */
  useEffect(() => {
    fetchNews(keyword, page);
  }, [keyword, page]);

  /** Handle search input changes */
  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  /** Handle search button click */
  const handleSearch = () => {
    setPage(1); /* Reset to page 1 for new search */
    fetchNews(keyword);
  };

  /** Handle pagination */
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Card sx={{ maxWidth: 800, margin: 'auto', padding: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Financial News
        </Typography>

        {/* Search Input */}
        <TextField
          label="Search Keyword"
          variant="outlined"
          size="small"
          value={keyword}
          onChange={handleKeywordChange}
          sx={{ marginBottom: 2, width: '100%' }}
        />

        {/* Search Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          disabled={loading}
          sx={{ marginBottom: 2, width: '100%' }}
        >
          Search
        </Button>

        {/* Display Loading Spinner */}
        {loading && <CircularProgress sx={{ margin: '20px auto', display: 'block' }} />}

        {/* Display Error Message */}
        {error && (
          <Typography color="error" sx={{ marginBottom: 2 }}>
            {error}
          </Typography>
        )}

        {/* Display News Articles */}
        {news.length > 0 && !loading && !error && (
          <Grid container spacing={2}>
            {news.map((article, index) => (
              <Grid item xs={12} key={index}>
                <Card sx={{ backgroundColor: '#f9f9f9' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {article.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      {article.source.name} - {new Date(article.publishedAt).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2">{article.description}</Typography>
                    <Button
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outlined"
                      sx={{ marginTop: 2 }}
                    >
                      Read More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Pagination */}
        {totalResults > 20 && (
          <Pagination
            count={Math.ceil(totalResults / 20)}
            page={page}
            onChange={handlePageChange}
            sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}
          />
        )}
      </CardContent>
    </Card>
  );
}

export default FinancialNewsWidget;
