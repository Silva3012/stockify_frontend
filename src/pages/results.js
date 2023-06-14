import React, { useContext } from 'react';
import { Typography, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { StockifyContext } from '../StockifyContext';
import Link from 'next/link';

// Results page component
export default function ResultsPage() {
  const { searchResults } = useContext(StockifyContext); // Access the searchResults from the context

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
      <Typography variant="h4" sx={{ mt: 4 , textAlign: 'center' }}>{searchResults.length > 0 ? `${searchResults[0].name} (${searchResults[0].exchange_short})` : 'No Results'}</Typography>
      {/* Render the Results component */}
      <Results />
      {/* Render the back link */}
        <Typography variant="subtitle2" sx={{ mt: 5, textAlign: 'center' }}>
          <Link href="/">Go Back</Link>
        </Typography>
    </div>
  );
}