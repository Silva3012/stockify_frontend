import { Box, Typography } from '@mui/material';

// Functional component for Footer
export default function Footer() {
  return (
    <Box sx={{ mt: 10, textAlign: 'center' }}>
      <Typography variant="body2" color="text.secondary">© {new Date().getFullYear()} Stockify. All rights reserved.</Typography>
    </Box>
  );
}
