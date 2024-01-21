import React, { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      const accessToken = data.accessToken;
      localStorage.setItem('token', accessToken);

      console.log('Login successful!');

    } catch (error) {
      // Handle the error
      console.error('Login error:', error.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        Email:
        <input type="text" name="email" value={email} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" name="password" value={password} onChange={handleInputChange} />
      </label>
      <br />
      <button type="submit">Sign In</button>
    </form>
  );
};

export default LoginForm;
