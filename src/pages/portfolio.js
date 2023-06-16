import { useState } from 'react';
import { Typography, Paper } from '@mui/material';
import UserProfile from '@/components/UserProfile';
import PortfolioTable from '@/components/PortfolioTable';
import SearchBar from '@/components/SearchBar';
import UserNavbar from '@/components/UserNavBar';

export default function PortfolioPage() {
    const recentNews = []; // Update this with the fetched data

    return (
        <>
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
        <PortfolioTable />
        <Paper elevation={3} sx={{ p: 2, mt: 4 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
            Recent News
            </Typography>

            {/* Render the recent news */}
            {recentNews.map((newsItem) => (
            <div key={newsItem.id}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                {newsItem.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {newsItem.description}
                </Typography>
            </div>
            ))}
        </Paper>
        </>
    );
}
