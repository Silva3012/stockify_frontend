import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { Button, TextField, Box, CircularProgress } from '@mui/material';
import { StockifyContext } from '../StockifyContext';

export default function SearchBar() {
// useState hook to manage the search query from the client
  const [symbol, setSymbol] = useState('');
  const [loading, setLoading] = useState(false); // State to track loading state
  const router = useRouter();
// Access the updateSearchResults function from the context
const { updateSearchResults } = useContext(StockifyContext);

  const handleSearch = () => {
    setLoading(true); // Set loading state to true
    // Make a request to the backend search route with the symbol
    // Construct the URL with the symbol
    const url = `http://localhost:3001/api/stocks/search?symbols=${symbol}`;
    // Make the request
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Handle the response data
        // const searchResults = data.results; // Store the results in a variable
        console.log(data.results.data);
        updateSearchResults(data.results.data); // Update the search results in the context
        router.push('/results');
      })
      .catch(error => {
        // Handle the error
        console.log(error);
        setLoading(false); // Set loading state to false in case of error
      });
  };

  const handleChange = (event) => {
    setSymbol(event.target.value);
  };

  // const handleClear = () => {
  //   setSymbol(''); // Clear the input field
  // };

  return(
    <Box sx={{ display: 'flex', alignItems: 'center', maxWidth: 400, mx: 'auto', mt: 10 }}>
      <TextField label="Search for a stock symbol here..." fullWidth value={symbol} onChange={handleChange} />
      <Button variant="contained" color="primary" sx={{ ml: 2 }} onClick={handleSearch} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Search'}
      </Button>
    </Box>
  )
}