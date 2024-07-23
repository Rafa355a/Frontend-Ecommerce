import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { CartContext } from '../contexts/CartContext';
import { toast } from 'react-toastify';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/api/productos/${productId}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the product!', error);
      });
  }, [productId]);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.nombre} ha sido añadido al carrito!`);
  };

  const handleViewCart = () => {
    navigate('/cart');
  };

  return (
    <Container className="product-detail-container">
      <Box className="product-detail">
        <Box
          component="img"
          src={product.imagen}
          alt={product.nombre}
          className="product-detail-image"
        />
        <Box className="product-detail-info">
          <Typography variant="h4" gutterBottom>
            {product.nombre}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {product.descripcion}
          </Typography>
          <Typography variant="h5" color="green" paragraph>
            ${product.precio}
          </Typography>
          <Box className="product-detail-buttons">
            <Button variant="contained" color="success" className="add-to-cart-btn" onClick={handleAddToCart}>
              ADD TO CART
            </Button>
            <Button variant="contained" color="primary" className="view-cart-btn" onClick={handleViewCart}>
              VER MI CARRITO
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ProductDetailPage;
