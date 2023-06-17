import { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
require('dotenv').config();
import Link from 'next/link';

const WatchlistNewsFeed = () => {
  const [newsData, setNewsData] = useState(null);

  useEffect(() => {
    fetchNewsData();
  }, []);

  const fetchNewsData = () => {
    // Fetch the user's portfolio data from the backend
    const token = localStorage.getItem('token');
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch('http://localhost:3001/api/stocks/watchlist', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        const symbols = extractSymbolsFromWatchlist(data.stocks);
        console.log(symbols);
        fetchNewsDataFromAPI(symbols);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const extractSymbolsFromWatchlist = (watchlist) => {
    // Extract the stock symbols from the portfolio data
    const symbols = watchlist.map((stock) => stock.ticker);
    return symbols;
  };

const fetchNewsDataFromAPI = async (symbols) => {
  try {
    
    const params = {
      api_token: process.env.STOCKDATA_API_TOKEN,
      symbols: symbols.join(','),
      filter_entities: true,
      language: 'en',
    };

    const esc = encodeURIComponent;
    const query = Object.keys(params)
      .map((k) => esc(k) + '=' + esc(params[k]))
      .join('&');

    const requestOptions = {
      method: 'GET',
    };

    const response = await fetch(`https://api.stockdata.org/v1/news/all?${query}`, requestOptions);
    if (response.ok) {
      const data = await response.json();
      const newsData = data.data;
      setNewsData(newsData);
      console.log(newsData);
    } else {
      throw new Error('API request failed');
    }
  } catch (error) {
    console.log('Error:', error);
  }
};


  // Render loading state if news data is not available
  if (!newsData) {
    return <Typography>Loading news data...</Typography>;
  }

   return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {newsData.map((newsItem) => (
        <Card key={newsItem.uuid} variant="outlined" style={{ margin: '10px' }}>
          <CardContent>
            <Typography variant="h6" component="div">
              {newsItem.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2}}>
              {newsItem.description}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
               <Link href={newsItem.url} target="_blank" rel="noopener noreferrer">
                  {newsItem.url}
              </Link>
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default WatchlistNewsFeed;
