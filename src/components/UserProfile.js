import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';

export default function UserProfile() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    fetchUsername();
  }, []);

  const fetchUsername = () => {
    const token = localStorage.getItem('token');
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch('http://localhost:3001/api/users/username', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setUsername(data.name);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Card variant="outlined" sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Welcome, {username}
        </Typography>
        {/* Add more profile information here */}
      </CardContent>
    </Card>
  );
}
