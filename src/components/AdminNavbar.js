import { AppBar, Toolbar, Typography, Button } from '@mui/material';

export default function AdminNavbar() {

    const handleLogout = () => {

    window.location.href = '/'; // Redirect to the home page after logout
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <img src="/Stockify_Logo.png" alt="Stockify" width="100" height="64" />
        </Typography>
        <Button color="inherit" onClick={handleLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
}
