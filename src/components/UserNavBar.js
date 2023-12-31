import { AppBar, Toolbar, Typography, Button } from '@mui/material';
export default function UserNavbar() {

    const handleLogout = () => {

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
