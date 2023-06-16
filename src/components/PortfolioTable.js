import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

export default function PortfolioTable() {
  const [portfolioData, setPortfolioData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [sellQuantity, setSellQuantity] = useState(0);

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = () => {
    const token = localStorage.getItem('token');
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch('http://localhost:3001/api/stocks/portfolio', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setPortfolioData(data.portfolio[0].stocks);
        console.log(portfolioData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSell = (stock) => {
    setSelectedStock(stock);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedStock(null);
    setSellQuantity(0);
  };

  const handleSellQuantityChange = (event) => {
    setSellQuantity(event.target.value);
  };

  const handleConfirmSell = () => {
    const token = localStorage.getItem('token');
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ticker: selectedStock.ticker,
        qty: parseInt(selectedStock.qty),
      }),
    };

    fetch(`http://localhost:3001/api/stocks/portfolio/sell/${selectedStock.ticker}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log('Stock sold:', data);
        // Update the portfolio data after selling the stock
        fetchPortfolioData();
        handleCloseDialog();
      })
      .catch((error) => {
        console.error('Error selling stock:', error);
      });
  };

  return (
    <>
      <Typography variant="h5" component="div" sx={{ mt: 2 }}>
        Holdings
      </Typography>
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
                <Typography variant="subtitle1">Current Price</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">Purchase Price</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">QTY</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">Total Value</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">Total Gain/Loss</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">Trade Actions</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {portfolioData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.ticker}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>${item.currentPrice.toFixed(2)}</TableCell>
                <TableCell>${item.purchasePrice.toFixed(2)}</TableCell>
                <TableCell>{item.qty}</TableCell>
                <TableCell>${item.totalValue.toFixed(2)}</TableCell>
                <TableCell>${item.totalGainLoss}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="error" size="small" onClick={() => handleSell(item)}>
                    Sell
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for selling stocks */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Sell Stock</DialogTitle>
        <DialogContent>
          <TextField
            label="Quantity"
            type="number"
            value={sellQuantity}
            onChange={handleSellQuantityChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleConfirmSell} color="primary" disabled={sellQuantity <= 0}>
            Sell
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
