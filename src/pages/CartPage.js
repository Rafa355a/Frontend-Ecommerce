import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

const CartPage = () => {
  const { cart, addToCart, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.precio * item.quantity, 0);

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const handleDecrease = (productId) => {
    const product = cart.find((item) => item.id === productId);
    if (product.quantity > 1) {
      updateQuantity(productId, product.quantity - 1);
    }
  };

  const handleIncrease = (productId) => {
    updateQuantity(productId, cart.find((item) => item.id === productId).quantity + 1);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Carrito de Compras
      </Typography>
      {cart.map((product) => (
        <Box key={product.id} className="cart-item">
          <Box
            component="img"
            className="cart-item-image"
            src={product.imagen}
            alt={product.nombre}
          />
          <Box className="cart-item-info">
            <Typography variant="h6">{product.nombre}</Typography>
            <Typography variant="body1" className="cart-item-price">${product.precio} x {product.quantity}</Typography>
          </Box>
          <Box className="cart-item-actions">
            <Button onClick={() => handleDecrease(product.id)}>-</Button>
            <Button onClick={() => handleIncrease(product.id)}>+</Button>
            <Button className="delete-button" onClick={() => handleRemove(product.id)}>ELIMINAR</Button>
          </Box>
        </Box>
      ))}
      <Typography variant="h5" align="center" className="total-price">
        Total: <span className="total-price-value">${total.toFixed(2)}</span>
      </Typography>
      <Box className="cart-buttons">
        <Button variant="contained" color="success" onClick={() => navigate('/store')}>
          Hacer otra compra
        </Button>
        <Button variant="contained" color="success" onClick={() => navigate('/checkout')}>
          Proceder Pago
        </Button>
      </Box>
    </Box>
  );
};

export default CartPage;
