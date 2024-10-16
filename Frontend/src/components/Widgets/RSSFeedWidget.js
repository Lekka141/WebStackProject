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

/* Define the RSSFeedWidget component */
function RSSFeedWidget() {
  /* State to manage the RSS feed URL */
  const [rssUrl, setRssUrl] = useState('');
  /* State to store the RSS feed data */
  const [feedData, setFeedData] = useState([]);
  /* State to manage the loading status */
  const [loading, setLoading] = useState(false);
  /* State to handle any errors during data fetch */
  const [error, setError] = useState(null);

  /* Function to fetch RSS feed data */
  const fetchRSSFeed = async () => {
    /* Set loading to true before fetching data */
    setLoading(true);
    setError(null);

    try {
      /* Use axios to fetch the RSS feed data */
      const response = await axios.get(`https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`);
      /* Update feedData with the fetched data */
      setFeedData(response.data.items);
    } catch (err) {
      /* Handle any errors that occur during the fetch */
      setError('Failed to fetch RSS feed. Please check the URL.');
    }
    /* Set loading to false after fetching data */
    setLoading(false);
  };

  /* Handle the input change for the RSS URL */
  const handleUrlChange = (event) => {
    setRssUrl(event.target.value);
  };

  /* Function to handle the fetch operation on button click */
  const handleFetch = () => {
    /* Only fetch if a URL is provided */
    if (rssUrl) {
      fetchRSSFeed();
    }
  };

  /* Render the component */
  return (
    <Card sx={{ maxWidth: 400, margin: 'auto' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          RSS Feed Widget
        </Typography>
        {/* Input field for the RSS feed URL */}
        <TextField
          label="Enter RSS Feed URL"
          variant="outlined"
          size="small"
          value={rssUrl}
          onChange={handleUrlChange}
          sx={{ marginBottom: 2, width: '100%' }}
        />
        {/* Button to fetch the RSS feed */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleFetch}
          disabled={loading}
          sx={{ width: '100%' }}
        >
          Get RSS Feed
        </Button>

        {/* Display loading spinner while fetching data */}
        {loading && <CircularProgress sx={{ marginTop: 2 }} />}
        {/* Display error message if any error occurs */}
        {error && (
          <Typography color="error" sx={{ marginTop: 2 }}>
            {error}
          </Typography>
        )}

        {/* Display fetched RSS feed data */}
        {feedData.length > 0 && (
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            {feedData.map((item, index) => (
              <Grid item xs={12} key={index}>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body2">{item.pubDate}</Typography>
                <Typography variant="body1">{item.description}</Typography>
              </Grid>
            ))}
          </Grid>
        )}
      </CardContent>
    </Card>
  );
}

/* Export the RSSFeedWidget component */
export default RSSFeedWidget;
