import React, { useState, useEffect } from 'react';
import { ToggleButton, ToggleButtonGroup, Card, CardContent, Typography } from '@material-ui/core';

const ProductsPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [sortingOption, setSortingOption] = useState('default');
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Assume the user is logged in initially

  useEffect(() => {
    
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      console.log('Redirect to login page');
    } else {
      fetchCategories();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, sortingOption]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://your-backend-api-url/products/categories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const apiUrl = `https://your-backend-api-url/products?category=${selectedCategory}&sort=${sortingOption}`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleCategoryChange = (event, newCategory) => {
    setSelectedCategory(newCategory);
  };

  const handleSortingChange = (event, newSortingOption) => {
    setSortingOption(newSortingOption);
  };

  return (
    <div>
      {isLoggedIn ? (
        <>
          <ToggleButtonGroup value={selectedCategory} exclusive onChange={handleCategoryChange}>
            {categories.map((category) => (
              <ToggleButton key={category.id} value={category.id}>
                {category.name}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          <ToggleButtonGroup value={sortingOption} exclusive onChange={handleSortingChange}>
            <ToggleButton value="default">Default</ToggleButton>
            <ToggleButton value="priceHighToLow">Price High to Low</ToggleButton>
            <ToggleButton value="priceLowToHigh">Price Low to High</ToggleButton>
            <ToggleButton value="newest">Newest</ToggleButton>
          </ToggleButtonGroup>

          {products.map((product) => (
            <Card key={product.id}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography color="text.secondary">Price: {product.price}</Typography>
              </CardContent>
            </Card>
          ))}
        </>
      ) : (
        <Typography variant="h6" color="error">
          Please log in to view products.
        </Typography>
      )}
    </div>
  );
};

export default ProductsPage;
