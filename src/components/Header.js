import { AppBar, Toolbar, Button, Typography } from '@mui/material';

// Functional component for Header
export default function Header({ hideHeader }) {

  if (hideHeader) {
    return null; // Render nothing if hideHeader is true
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <img src="/Stockify_Logo.png" alt="Stockify" width="100" height="64" />
        </Typography>
        <Button color="inherit" href="/register">Register</Button>
        <Button color="inherit" href="/login">Login</Button>
      </Toolbar>
    </AppBar>
  );
}
