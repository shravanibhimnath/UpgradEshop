// components/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import {AppBar,Toolbar,Typography,IconButton,Container,Card,CardContent,Button,Dialog,DialogTitle,DialogContent,DialogActions,TextField,Snackbar,}from '@material-ui/core';
import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon } from '@material-ui/icons';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [editProductId, setEditProductId] = useState(null);
  const [addProductName, setAddProductName] = useState('');
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://your-backend-api-url/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDeleteClick = (productId) => {
    setDeleteProductId(productId);
    setDeleteDialogOpen(true);
  };

  const handleEditClick = (productId) => {
    setEditProductId(productId);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(`https://your-backend-api-url/products/${deleteProductId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      setSnackbarMessage(`Product ${deleteProductId} deleted successfully`);
      setSnackbarOpen(true);
      setDeleteDialogOpen(false);
      fetchProducts(); // Fetch updated product list
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEditConfirm = async () => {
    try {
      setSnackbarMessage(`Product ${editProductId} modified successfully`);
      setSnackbarOpen(true);
      setEditProductId(null);
      fetchProducts();
    } catch (error) {
      console.error('Error modifying product:', error);
    }
  };

  const handleAddProduct = async () => {
    try {
      setSnackbarMessage(`Product ${addProductName} added successfully`);
      setSnackbarOpen(true);
      setAddProductName('');
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Admin Dashboard</Typography>
          <IconButton color="inherit" onClick={handleAddProduct}>
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container>
        {products.map((product) => (
          <Card key={product.id}>
            <CardContent>
              <Typography variant="h5" component="div">
                {product.name}
              </Typography>
              <IconButton color="primary" onClick={() => handleEditClick(product.id)}>
                <EditIcon />
              </IconButton>
              <IconButton color="secondary" onClick={() => handleDeleteClick(product.id)}>
                <DeleteIcon />
              </IconButton>
            </CardContent>
          </Card>
        ))}
      </Container>
      <Dialog open={isDeleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Are you sure you want to delete this product?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button color="secondary" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </div>
  );
};

export default AdminDashboard;
