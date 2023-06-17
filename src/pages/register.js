import { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import Link from 'next/link';
import Header from '../components/Header';
import { useRouter } from 'next/router';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCloseClick = () => {
    router.push('/');
  };

  const handleEmailRegister = async () => {
    try {
      // Send a POST request to the registration API endpoint
      const response = await fetch('http://localhost:3001/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        // Registration successful
        // Redirect the user to the login page or perform any other desired action
        router.push('/login');
      } else {
        // Registration failed
        setErrorMessage(responseData.message);
      }
    } catch (error) {
      // Error occurred during registration
      console.error('An error occurred:', error.message);
      setErrorMessage('An error occurred during registration.');
    }
  };

  const handleGoogleRegister = () => {
    router.push('http://localhost:3001/api/users/auth/google');
    // console.log('Google registration clicked');
  };

  const handleFacebookRegister = () => {
    router.push('http://localhost:3001/api/user/auth/facebook');
    // console.log('Facebook registration clicked');
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
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
          Register
        </Typography>

        <Button variant="contained" fullWidth onClick={handleGoogleRegister} sx={{ mb: 2 }}>
          Register with Google
        </Button>

        <Button variant="contained" fullWidth onClick={handleFacebookRegister} sx={{ mb: 2 }}>
          Register with Facebook
        </Button>

        <Typography variant="subtitle1" sx={{ textAlign: 'center', my: 2 }}>
          Or register with email:
        </Typography>

        <TextField
          label="Name"
          type="text"
          fullWidth
          value={name}
          onChange={handleNameChange}
          sx={{ mb: 2 }}
        />

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

        <Button variant="contained" color="primary" fullWidth onClick={handleEmailRegister}>
          Register with Email
        </Button>

        {errorMessage && (
          <Typography variant="body2" sx={{ textAlign: 'center', mt: 2, color: 'red' }}>
            {errorMessage}
          </Typography>
        )}

        <Typography variant="body2" sx={{ textAlign: 'center', mt: 4 }}>
          Already have an account?{' '}
          <Link href="/login">
            Login
          </Link>
        </Typography>
      </Box>
    </>
  );
}
