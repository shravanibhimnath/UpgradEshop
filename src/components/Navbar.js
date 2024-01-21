import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, InputBase } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const Navbar = () => {
  const history = useHistory();

  const handleSignIn = () => {
    
    loginUser()
      .then(() => {
        
        history.push('/products');
      })
      .catch((error) => {
        console.error('Login error:', error);
      });
  };

  const handleSignUp = () => {
  
    registerUser()
      .then(() => {
       
        history.push('/products');
      })
      .catch((error) => {
        console.error('Registration error:', error);
      });
  };

  const handleSearch = (searchTerm) => {
   
    searchProducts(searchTerm)
      .then((results) => {
        console.log('Search results:', results);
      
      })
      .catch((error) => {
        console.error('Search error:', error);
      });
  };

  const Navbar = ({ isLoggedIn, isAdmin }) => {
    return (
        <AppBar position="static" style={{ backgroundColor: '#3f51b5' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <ShoppingCartIcon />
            </IconButton>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              upGrad Eshop
            </Typography>
            {isLoggedIn ? (
              <>
                <Button color="inherit">Search</Button>
                <Button color="inherit" component={Link} to="/">
                  Home
                </Button>
                <Button color="inherit" onClick={logoutHandler}>
                  Logout
                </Button>
                {isAdmin && (
                  <Button color="inherit" component={Link} to="/add-products">
                    Add Products
                  </Button>
                )}
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/signup">
                  Sign Up
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
      );
    };
  }    
    export default Navbar;    