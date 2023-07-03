import { Container, Typography, Box, Paper, Button } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <Container>
      <Box sx={{ mt: 5, textAlign: 'center' }}>
      {/* Page Heading */}
        <Typography variant="h6" gutterBottom>Take Control of Your Stock Portfolio with Stockify!</Typography>
        <Typography variant="subtitle1" gutterBottom>Manage, Track, and Stay informed about your favourite stocks in one place.</Typography>

        {/* Paper component for feature descriptions */}
        <Paper elevation={3} sx={{ mt: 10, p: 2 }}>
          <Typography variant="subtitle1" gutterBottom>Create a personalized watchlist of your favourite stocks.</Typography>
          <Typography variant="subtitle1" gutterBottom>Track real-time stock prices, including intraday and historical data.</Typography>
          <Typography variant="subtitle1" gutterBottom>Easily manage your portfolio and monitor its performance.</Typography>
          <Typography variant="subtitle1" gutterBottom>Stay updated with detailed stock information and recent news.</Typography>
        </Paper>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 5 }}>Start your journey towards financial success with Stockify today!</Typography>
      </Box>

      {/* Button Admin Login */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <Button variant="contained" color="primary" >
            <Link href="/adminLogin" passHref style={{ textDecoration: 'none', color : 'white' }}>
              Admin Login
            </Link>
          </Button>
        </Box>
    </Container>
  );
}
