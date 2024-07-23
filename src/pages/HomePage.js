import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import ImageCarousel from '../components/ImageCarousel';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/productos');
        setProducts(response.data);
        setRandomProducts(getRandomProducts(response.data, 5));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRandomProducts(getRandomProducts(products, 5));
    }, 5000); // 5000 milisegundos = 5 segundos

    return () => clearInterval(interval); // Cleanup on unmount
  }, [products]);

  const getRandomProducts = (products, count) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="home-page">
      <ImageCarousel />
      <h2 className="products-title green-text">Productos Disponibles</h2>
      <Box className="product-list">
        {randomProducts.map((product) => (
          <Box 
            key={product.id} 
            className="product-item"
            onClick={() => handleProductClick(product.id)}
          >
            <Box
              component="img"
              className="product-item-image"
              src={product.imagen}
              alt={product.nombre}
            />
            <Box className="product-item-info">
              <Typography variant="h6">{product.nombre}</Typography>
              <Typography variant="body1" className="product-item-price">${product.precio}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default HomePage;
