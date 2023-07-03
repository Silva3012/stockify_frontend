import { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import Header from '@/components/Header';
import { useRouter } from 'next/router';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCloseClick = () => {
    router.push('/');
  };

  const handleEmailLogin = async () => {
    try {
      // Send a POST request to the admin login API endpoint
      const response = await fetch('http://localhost:3001/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        // Login successful
        // Store the authentication token in local storage
        localStorage.setItem('adminToken', responseData.token);

        // Redirect the user to the desired page
        router.push('/adminDashboard');
      } else {
        // Login failed
        setErrorMessage(responseData.message);
      }
    } catch (error) {
      // Error occurred during login
      console.error('An error occurred:', error.message);
      setErrorMessage('An error occurred during login.');
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <Header hideHeader={true} />

      <Button variant="contained" color="primary" fullWidth onClick={handleCloseClick}>
        Close
      </Button>

      <Box sx={{ maxWidth: 400, mx: 'auto', mt: 10 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 4 }}>
          Admin Login
        </Typography>

        <Typography variant="subtitle1" sx={{ textAlign: 'center', my: 2 }}>
          Login with email:
        </Typography>

        <TextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={handleEmailChange}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={handlePasswordChange}
          sx={{ mb: 2 }}
        />

        <Button variant="contained" color="primary" fullWidth onClick={handleEmailLogin}>
          Login with Email
        </Button>

        {errorMessage && (
          <Typography variant="body2" sx={{ textAlign: 'center', mt: 2, color: 'red' }}>
            {errorMessage}
          </Typography>
        )}
      </Box>
    </>
  );
}
