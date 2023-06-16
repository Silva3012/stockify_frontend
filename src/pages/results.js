import React, { useContext } from 'react';
import { Typography, Table, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material';
import { StockifyContext } from '../StockifyContext';
import Link from 'next/link';

// Results page component
export default function ResultsPage() {
  const { searchResults } = useContext(StockifyContext); // Access the searchResults from the context

  // Handle adding a stock to the portfolio
  const handleAddToPortfolio = (stock) => {
    // Implement the logic to add the stock to the portfolio
    console.log('Adding stock to portfolio:', stock);
    // Perform the necessary API calls or actions here
  };

  // Handle adding a stock to the watchlist
  const handleAddToWatchlist = (stock) => {
    const { ticker, price, day_change, name } = stock;

    const requestData = {
      ticker,
      price,
      day_change,
      name
    };

    fetch('http://localhost:3001/api/stocks/watchlist/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Stock added to watchlist:', data);
        // Handle any further actions or UI updates here
      })
      .catch((error) => {
        console.error('Error adding stock to watchlist:', error);
        // Handle any error scenarios or UI updates here
      });
  };

  // Results component to render the table
  const Results = () => {
    return (
      <div>
        {/* Table to display the results */}
        <Table>
          {/* Table header */}
          <TableHead>
            <TableRow>
              <TableCell>Ticker</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Today's Change</TableCell>
              <TableCell>Market Cap</TableCell>
              <TableCell>Actions</TableCell> {/* Added column for buttons */}
            </TableRow>
          </TableHead>
          {/* Table body */}
          <TableBody sx={{ align: 'center' }}>
            {/* Map over searchResults array and render a row for each result */}
            {searchResults.map((result, index) => (
              <TableRow key={index}>
                <TableCell>{result.ticker}</TableCell>
                <TableCell>{result.name}</TableCell>
                <TableCell>${result.price}</TableCell>
                <TableCell>{result.day_change}%</TableCell>
                <TableCell>${`${(result.market_cap / 1000000000).toFixed(2)}B`}</TableCell>
                <TableCell>
                  {/* Buttons to add the stock to the portfolio and watchlist */}
                  <Button variant="outlined" onClick={() => handleAddToPortfolio(result)}>
                    Add to Portfolio
                  </Button>
                  <Button variant="outlined" onClick={() => handleAddToWatchlist()}>
                    Add to Watchlist
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  // Render the ResultsPage component
  return (
    <div>
      {/* Heading for the results page */}
      <Typography variant="h4" sx={{ mt: 4 , textAlign: 'center' }}>
        {searchResults.length > 0 ? `${searchResults[0].name} (${searchResults[0].exchange_short})` : 'No Results'}
      </Typography>
      {/* Render the Results component */}
      <Results />
      {/* Render the back link */}
      <Typography variant="subtitle2" sx={{ mt: 5, textAlign: 'center' }}>
        <Link href="/dashboard">Go to dashboard</Link>
      </Typography>
    </div>
  );
}
