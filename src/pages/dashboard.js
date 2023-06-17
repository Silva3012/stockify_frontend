import SearchBar from '@/components/SearchBar';
import UserProfile from '@/components/UserProfile';
import UserNavbar from '../components/UserNavBar';
import PortfolioOverview from '@/components/PortfolioOverview';
import WatchlistTable from '@/components/WatchlistTable';
import PortfolioTable from '@/components/PortfolioTable';
import { Paper, Typography } from '@mui/material';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function DashboardPage() {
  return (
    <>
      <ProtectedRoute>
        <UserNavbar />
        <UserProfile />
        <Paper elevation={3} sx={{ p: 2, mt: 4, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Search Stock
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Enter a symbol to add to your watchlist or purchase stock
          </Typography>
            <SearchBar />
        </Paper>
        <PortfolioOverview />
        <WatchlistTable />
        <PortfolioTable />
      </ProtectedRoute>
    </>
  );
}
