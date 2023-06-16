import { AppBar, Toolbar, Typography, Button } from '@mui/material';
// import { useContext } from 'react';
// import { AuthContext } from '../authContext';

export default function UserNavbar() {
    // const { logout } = useContext(AuthContext);

    const handleLogout = () => {
    // logout();
    window.location.href = '/'; // Redirect to the home page after logout
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <img src="/Stockify_Logo.png" alt="Stockify" width="100" height="64" />
        </Typography>
        <Button color="inherit" href="/dashboard">Dashboard</Button>
        <Button color="inherit" href="/watchlist">Watchlist</Button>
        <Button color="inherit" href="/portfolio">Portfolio</Button>
        <Button color="inherit" onClick={handleLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
}
