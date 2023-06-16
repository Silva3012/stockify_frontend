import React, { useState, useContext } from 'react';
import {
  Button,
  TextField,
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { StockifyContext } from '../StockifyContext';
import { useRouter } from 'next/router';

export default function SearchBar({ onSearchResults }) {
  const [symbol, setSymbol] = useState('');
  const [loading, setLoading] = useState(false);
  const { updateSearchResults } = useContext(StockifyContext);
  const [searchResults, setSearchResults] = useState([]);
  const [watchlistStatus, setWatchlistStatus] = useState(null); // Add state for watchlist status
  const [open, setOpen] = useState(false); // State for the dialog
  const [selectedItem, setSelectedItem] = useState(null); // State for the selected item
  const [qty, setQty] = useState(0); // State for the quantity
  const router = useRouter();

  const handleSearch = () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const url = `http://localhost:3001/api/stocks/search?symbols=${symbol}`;
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        updateSearchResults(data.results.data);
        setSearchResults(data.results.data); // Set the search results in the component state
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleChange = (event) => {
    setSymbol(event.target.value);
  };

  // Handle opening the dialog and setting the selected item
  const handleOpenDialog = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  // Handle closing the dialog
  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedItem(null);
    setQty(0);
  };

  // Handle adding a stock to the watchlist
  const handleAddToWatchlist = (item) => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ticker: item.ticker,
        price: parseFloat(item.price),
        day_change: item.day_change,
        name: item.name,
      }),
    };

    fetch('http://localhost:3001/api/stocks/watchlist/add', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log('Stock added to watchlist:', data);
        setWatchlistStatus('success'); // Set the watchlist status to success
        setLoading(false);
        router.push('/dashboard');
      })
      .catch((error) => {
        console.error('Error adding stock to watchlist:', error);
        setWatchlistStatus('error'); // Set the watchlist status to error
        setLoading(false);
      });
  };

  // Handle adding a stock to the portfolio
  const handleAddToPortfolio = () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ticker: selectedItem.ticker,
        name: selectedItem.name,
        currentPrice: parseFloat(selectedItem.price),
        purchasePrice: parseFloat(selectedItem.price),
        qty: parseInt(qty),
        day_change: selectedItem.day_change,
      }),
    };

    fetch('http://localhost:3001/api/stocks/portfolio/add', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log('Stock added to portfolio:', data);
        setLoading(false);
        handleCloseDialog(); // Close the dialog
        router.push('/dashboard');
      })
      .catch((error) => {
        console.error('Error adding stock to portfolio:', error);
        setLoading(false);
      });
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', maxWidth: 400, mx: 'auto', mt: 5 }}>
        <TextField label="Search for a stock symbol here..." fullWidth value={symbol} onChange={handleChange} />
        <Button variant="contained" color="primary" sx={{ ml: 2 }} onClick={handleSearch} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Search'}
        </Button>
      </Box>
      {searchResults.length > 0 && (
        <Box sx={{ mx: 'auto', mt: 2 }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Symbol</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Change %</TableCell>
                  <TableCell>Market Cap</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {searchResults.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.ticker}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                    <TableCell>{item.day_change}</TableCell>
                    <TableCell>${`${(item.market_cap / 1000000000).toFixed(2)}B`}</TableCell>
                    <TableCell>
                      {/* Buttons to add the stock to the portfolio and watchlist */}
                      <Button
                        variant="outlined"
                        disabled={loading}
                        onClick={() => handleOpenDialog(item)}
                      >
                        Add to Portfolio
                      </Button>{' '}
                      <Button
                        variant="outlined"
                        disabled={loading}
                        onClick={() => handleAddToWatchlist(item)}
                      >
                        {loading ? (
                          <CircularProgress size={24} />
                        ) : (
                          watchlistStatus === 'success' ? 'Added' : 'Add to Watchlist'
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {/* Dialog for adding to portfolio */}
      <Dialog open={open} onClose={handleCloseDialog} maxWidth="sm" sx={{ "& .MuiDialog-paper": { width: "100%", maxWidth: "600px" } }}>
        <DialogTitle>Add to Portfolio (Quantity)</DialogTitle>
        <DialogContent>
          <TextField
            label="Quantity"
            type="number"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddToPortfolio} color="primary" disabled={qty <= 0}>
            Buy
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
