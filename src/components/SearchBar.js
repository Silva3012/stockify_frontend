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
import { Autocomplete } from '@mui/material'; // Import Autocomplete component
import { StockifyContext } from '../StockifyContext';
import { useRouter } from 'next/router';

const MIN_SEARCH_LENGTH = 1; // Minimum length for autocomplete search

export default function SearchBar({ disabledButtons }) {
  const [symbol, setSymbol] = useState('');
  const [loading, setLoading] = useState(false);
  const { updateSearchResults } = useContext(StockifyContext);
  const [searchResults, setSearchResults] = useState([]);
  const [watchlistStatus, setWatchlistStatus] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [qty, setQty] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();

  // Function to handle the search button click
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
        setSearchResults(data.searchResults);
        updateSearchResults(data.searchResults);
        setSuggestions(data.suggestions);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  // Function to handle the text input change
  const handleChange = (event) => {
    const searchInput = event.target.value;
    setSymbol(searchInput);
    if (searchInput.length >= MIN_SEARCH_LENGTH) {
      setLoading(true);
      const token = localStorage.getItem('token');
      const requestOptions = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const url = `http://localhost:3001/api/stocks/search?symbols=${searchInput}`;
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setSuggestions(data.suggestions.map((option) => option.symbol + ' - ' + option.companyName));
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } else {
      setSuggestions([]);
    }
  };

  // Function to handle the selection of an option from the Autocomplete dropdown
  const handleOptionSelected = (event, value) => {
    if(value) {
      setSymbol(value);
      handleSearch();
    }
  };

  // Function to handle opening the dialog for adding to the portfolio
  const handleOpenDialog = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  // Function to handle closing the dialog for adding to the portfolio
  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedItem(null);
    setQty(0);
  };


  // Function to handle adding the selected item to the watchlist
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
        setWatchlistStatus('success');
        setLoading(false);
        router.reload();
      })
      .catch((error) => {
        console.error('Error adding stock to watchlist:', error);
        setWatchlistStatus('error');
        setLoading(false);
      });
  };

  // Function to handle adding the selected item to the portfolio
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
        handleCloseDialog();
        router.reload();
      })
      .catch((error) => {
        console.error('Error adding stock to portfolio:', error);
        setLoading(false);
      });
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', maxWidth: 400, mx: 'auto', mt: 5 }}>
        <Autocomplete
          freeSolo
          disableClearable
          options={suggestions || []}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField 
              {...params} 
              label="Search for a stock symbol here..." 
              InputProps={{
                ...params.InputProps,
                type: 'search',
              }}
              fullWidth 
              value={symbol} 
              onChange={handleChange} 
              />
          )}
          onChange={handleOptionSelected}
        />
        <Button variant="contained" color="primary" sx={{ ml: 2 }} onClick={handleSearch} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Search'}
        </Button>
      </Box>
      {searchResults && searchResults.length > 0 && (
        <>
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
                        <Button variant="outlined" 
                        disabled={disabledButtons || loading} 
                        onClick={() => handleOpenDialog(item)}>
                          Add to Portfolio
                        </Button>{' '}
                        <Button
                          variant="outlined"
                          disabled={disabledButtons || loading}
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
      )}
    </>
  );
}
