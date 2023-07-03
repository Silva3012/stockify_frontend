import { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';

export default function PortfolioOverview() {
  const [portfolioData, setPortfolioData] = useState(null);
  const [amount, setAmount] = useState(0);
  const [totalPortfolioAmount, setTotalPortfolioAmount] = useState(0);

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

    fetch('https://dark-tan-mackerel-wrap.cyclic.app/api/stocks/portfolio', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setPortfolioData(data.portfolio.stocks);
        setAmount(data.portfolio.amount);
        setTotalPortfolioAmount(data.portfolio.totalPortfolioAmount);
        console.log(portfolioData)
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Calculate the total value based on the retrieved portfolio data
  const calculateTotalValue = () => {
    if (portfolioData) {
      let totalValue = 0;

      portfolioData.forEach((stock) => {
        totalValue += stock.totalValue;
      });

      return totalValue;
    }

    return 0;
  };

  // Calculate the today's change based on the retrieved portfolio data
  const calculateTodayChange = () => {
    if (portfolioData) {
      let todayChange = 0;

      portfolioData.forEach((stock) => {
        todayChange += stock.day_change;
      });

      return todayChange;
    }

    return 0;
  };

  // Render loading state if portfolio data is not available
  if (portfolioData == null) {
    return <Typography>Portfolio data is not available yet...</Typography>;
  }

  const totalValue = calculateTotalValue();
  // const annualReturn = calculateAnnualReturn();
  const todayChange = calculateTodayChange();

  return (
    <Card variant="outlined" sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Portfolio Overview
        </Typography>
        <Typography variant="subtitle1">
          Cash: ${amount.toFixed(2)}
        </Typography>
        <Typography variant="subtitle1">
          Total Holdings: ${totalValue.toFixed(2)}
        </Typography>
        <Typography variant="subtitle1">
          Total Portfolio Value: ${totalPortfolioAmount.toFixed(2)}
        </Typography>
        <Typography variant="subtitle1">
          Today's Change: {todayChange.toFixed(2)}%
        </Typography>
      </CardContent>
    </Card>
  );
}
