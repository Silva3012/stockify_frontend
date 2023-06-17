import { Paper, Typography } from '@mui/material';
import SearchBar from '@/components/SearchBar';
import UserProfile from '@/components/UserProfile';
import WatchlistTable from '@/components/WatchlistTable';
import UserNavbar from '@/components/UserNavBar';
import WatchlistNewsFeed from '@/components/NewsWatchlist';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function WatchlistPage() {
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
                <WatchlistTable />
                <Paper elevation={3} sx={{ p: 2, mt: 4 }}>
                <WatchlistNewsFeed />
                </Paper>
            </ProtectedRoute>
        </>
    );
}
