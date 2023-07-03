import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';

export default function WatchlistTable() {
  const [watchlistData, setWatchlistData] = useState([]);

  useEffect(() => {
    fetchWatchlistData();
  }, []);

  const fetchWatchlistData = () => {
    const token = localStorage.getItem('token');
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch('https://dark-tan-mackerel-wrap.cyclic.app/api/stocks/watchlist', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setWatchlistData(data.stocks);
        console.log(watchlistData)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRemoveFromWatchlist = (ticker) => {
    const token = localStorage.getItem('token');
    const requestOptions = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(`https://dark-tan-mackerel-wrap.cyclic.app/api/stocks/watchlist/remove/${ticker}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log('Stock removed from watchlist:', data);
        // Update the watchlist data after removing the stock
        setWatchlistData(prevData => prevData.filter(item => item.ticker !== ticker));
      })
      .catch((error) => {
        console.error('Error removing stock from watchlist:', error);
      });
  };

  return (
    <>
      <Typography variant="h5" component="div" sx={{ mt: 2 }}>
        Watchlist Overview
      </Typography>
      {watchlistData && watchlistData.length > 0 ? (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle1">Symbol</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">Name</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">Last Price</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">Change %</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">Action</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {watchlistData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.ticker}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell>{item.day_change}</TableCell>
                  <TableCell>
                    <Button variant="outlined" color="primary" size="small" onClick={() => handleRemoveFromWatchlist(item.ticker)}>
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1" sx={{ mt: 2 }}>
          {watchlistData ? 'Watchlist is empty' : ' '}
        </Typography>
      )}
    </>
  );
}
