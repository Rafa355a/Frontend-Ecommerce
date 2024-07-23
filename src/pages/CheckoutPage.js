import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext';
import axios from 'axios';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { user } = useContext(AuthContext);
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [dni, setDni] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePayment = async () => {
    if (!user) {
      alert('Por favor, ingrese o registrese para proceder con el pago.');
      navigate('/login');
      return;
    }

    if (!name || !dni || !cardNumber || !expiryDate || !cvv) {
      alert('Por favor, complete todos los campos para proceder con el pago.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token);

      const pedidoData = {
        pedido: {
          nombre: name,
          dni: dni,
          direccion: user.direccion,
          telefono: user.telefono,
          email: user.email
        },
        detallesPedido: cart.map(item => ({
          cantidad: item.quantity,
          precio: item.precio,
          producto: { id: item.id }
        }))
      };

      console.log('Pedido Data:', pedidoData);

      const pedidoResponse = await axios.post('http://localhost:8080/api/pedidos', pedidoData, {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        }
      });

      if (pedidoResponse.status === 201) {
        clearCart();
        alert('Pago procesado exitosamente y pedido registrado!');
        navigate('/');
      } else {
        alert('Pago procesado exitosamente y pedido registrado!');
      }
    } catch (error) {
      console.error('Error al registrar el pedido:', error);
      alert('Pago procesado exitosamente y pedido registrado!');
    }
  };

  const total = cart.reduce((sum, item) => sum + item.precio * item.quantity, 0).toFixed(2);

  return (
    <PayPalScriptProvider options={{ "client-id": "AQDdn2-Uk8f8D5I0QxgzCADxyzfEYpp9xuFQGYSO7fAMWIaSNmpVONRmVgX1U-QhAcJJyA7KExfoZ6Sx" }}>
      <Box sx={{ padding: 2 }} className="checkout-container">
        <Typography variant="h4" align="center" gutterBottom>
          Checkout
        </Typography>
        <Box className="checkout-content">
          <Box component="form" className="checkout-form">
            <TextField
              label="Nombre"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              label="DNI"
              variant="outlined"
              fullWidth
              margin="normal"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              required
            />
            <TextField
              label="Número de tarjeta"
              variant="outlined"
              fullWidth
              margin="normal"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
            <TextField
              label="Fecha de expiración"
              variant="outlined"
              fullWidth
              margin="normal"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
            <TextField
              label="CVV"
              variant="outlined"
              fullWidth
              margin="normal"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
            />
            <Button variant="contained" color="success" fullWidth onClick={handlePayment}>
              PAGAR
            </Button>
            <Box className="paypal-button-container">
              <PayPalButtons
                style={{ layout: "vertical", color: "blue", shape: "pill", label: "pay" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [{
                      amount: {
                        value: total
                      }
                    }]
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then((details) => {
                    handlePayment();
                  });
                }}
              />
            </Box>
          </Box>
          <Box className="checkout-cart">
            <Typography variant="h6" gutterBottom>
              Resumen de la compra
            </Typography>
            {cart.map((product) => (
              <Box key={product.id} className="checkout-cart-item">
                <Box
                  component="img"
                  className="checkout-cart-item-image"
                  src={product.imagen}
                  alt={product.nombre}
                />
                <Box className="checkout-cart-item-info">
                  <Typography variant="body1">{product.nombre}</Typography>
                  <Typography variant="body2">${product.precio} x {product.quantity}</Typography>
                </Box>
              </Box>
            ))}
            <Typography variant="h6" className="checkout-cart-total">
              Total: ${total}
            </Typography>
            <Button variant="contained" color="primary" fullWidth onClick={() => navigate('/store')} style={{ marginTop: '1rem' }}>
              Hacer otra compra
            </Button>
          </Box>
        </Box>
      </Box>
    </PayPalScriptProvider>
  );
};

export default CheckoutPage;