import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const loginEndpoint = '/auth'; 

      if (!email || !password) {
        alert('Please enter both email and password.');
        return;
      }

      const userCredentials = {
        email: email,
        password: password,
      };

      const response = await fetch(loginEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCredentials),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Login successful:', responseData);
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData);
        alert('Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      alert('An error occurred during login. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Sign In
      </Button>
    </div>
  );
};

export default Login;
