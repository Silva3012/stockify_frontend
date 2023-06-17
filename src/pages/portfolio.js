import { Typography, Paper } from '@mui/material';
import UserProfile from '@/components/UserProfile';
import PortfolioTable from '@/components/PortfolioTable';
import SearchBar from '@/components/SearchBar';
import UserNavbar from '@/components/UserNavBar';
import PortfolioOverview from '@/components/PortfolioOverview';
import PortfolioNewsFeed from '@/components/NewsPortfolio';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function PortfolioPage() {
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
            <PortfolioTable />
            <Paper elevation={3} sx={{ p: 2, mt: 4 }}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                Recent News
                </Typography>
                <PortfolioNewsFeed />
            </Paper>
        </ProtectedRoute>
        </>
    );
}
