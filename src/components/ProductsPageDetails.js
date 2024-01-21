import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, TextField, Button } from '@material-ui/core';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(`https://your-backend-api-url/products/${productId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product details');
      }
      const data = await response.json();
      setProductDetails(data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    setQuantity(newQuantity);
  };

  const handleBuyClick = () => {
    console.log(`Buy ${quantity} units of ${productDetails.name}`);
  };

  return (
    <div>
      {productDetails ? (
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              {productDetails.name}
            </Typography>
            <Typography color="text.secondary">Description: {productDetails.description}</Typography>
            <Typography color="text.secondary">Price: {productDetails.price}</Typography>
            <TextField
              type="number"
              label="Quantity"
              value={quantity}
              onChange={handleQuantityChange}
              InputProps={{ inputProps: { min: 1 } }}
            />

            {productDetails.image ? (
              <img
                src={productDetails.image}
                alt={productDetails.name}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            ) : (
              <Typography variant="body2" color="textSecondary">
                Image not available
              </Typography>
            )}

            <Button variant="contained" color="primary" onClick={handleBuyClick}>
              Buy
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="h6" color="error">
          Loading product details failed.
        </Typography>
      )}
    </div>
  );
};

export default ProductDetailsPage;
