// SignUp.js
import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const handleSignUp = async () => {
    try {
      const signupEndpoint = '/users'; 
      if (!firstName || !lastName || !email || !password || !confirmPassword || !contactNumber) {
        alert('Please fill in all required fields.');
        return;
      }

      if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
      }

      const userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        contactNumber: contactNumber,
      };

      const response = await fetch(signupEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Registration successful:', responseData);
      } else {
        const errorData = await response.json();
        console.error('Registration failed:', errorData);
        alert('Registration failed. Please check your details and try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error.message);
      alert('An error occurred during registration. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <TextField
        label="First Name"
        variant="outlined"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        label="Last Name"
        variant="outlined"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
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
      <TextField
        label="Confirm Password"
        variant="outlined"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <TextField
        label="Contact Number"
        variant="outlined"
        value={contactNumber}
        onChange={(e) => setContactNumber(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSignUp}>
        Sign Up
      </Button>
    </div>
  );
};

export default SignUp;
