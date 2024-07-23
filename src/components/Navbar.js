import React, { useState, useEffect, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext';
import './Navbar.css';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [categories, setCategories] = useState([]);
  const [clientAnchorEl, setClientAnchorEl] = useState(null);
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/categorias')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
    handleMenuClose();
  };

  const handleClientMenuOpen = (event) => {
    setClientAnchorEl(event.currentTarget);
  };

  const handleClientMenuClose = () => {
    setClientAnchorEl(null);
  };

  const handleClientOptionClick = (path) => {
    navigate(path);
    handleClientMenuClose();
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position="static" sx={{ bgcolor: 'green' }}>
      <Toolbar>
        <img src="/logo.png" alt="InnovaTec Logo" className="navbar-logo-image" onClick={() => navigate('/')} />
        <Typography variant="h6" style={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
          InnovaTec
        </Typography>
        <Button color="inherit" onClick={() => navigate('/store')}>Tienda</Button>
        <Button color="inherit" onClick={handleMenuOpen}>Categorías</Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {categories.map(category => (
            <MenuItem key={category.id} onClick={() => handleCategoryClick(category.id)}>
              {category.nombre}
            </MenuItem>
          ))}
        </Menu>
        {!user && (
          <Button color="inherit" onClick={handleClientMenuOpen}>Clientes</Button>
        )}
        <Menu
          anchorEl={clientAnchorEl}
          open={Boolean(clientAnchorEl)}
          onClose={handleClientMenuClose}
        >
          <MenuItem onClick={() => handleClientOptionClick('/login')}>Login</MenuItem>
          <MenuItem onClick={() => handleClientOptionClick('/register')}>Register</MenuItem>
        </Menu>
        {user && (
          <Button color="inherit" onClick={handleLogout}>Cerrar Sesión</Button>
        )}
        <div className="cart-icon-container" onClick={() => navigate('/cart')}>
          <Button color="inherit">Carrito</Button>
          {cart.length > 0 && (
            <div className="cart-count">
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </div>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
