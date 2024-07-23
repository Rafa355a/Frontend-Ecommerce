import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './StorePage.css';

const StorePage = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState(''); // Estado para el filtro
  const navigate = useNavigate(); // Usa useNavigate

  useEffect(() => {
    axios.get('http://localhost:8080/api/productos')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`); // Navega a la página de detalles del producto
  };

  // Función para manejar el cambio de filtro
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Función para ordenar productos
  const getFilteredProducts = () => {
    let filteredProducts = [...products];
    if (filter === 'priceLowToHigh') {
      filteredProducts.sort((a, b) => a.precio - b.precio);
    } else if (filter === 'priceHighToLow') {
      filteredProducts.sort((a, b) => b.precio - a.precio);
    } else if (filter === 'nameAZ') {
      filteredProducts.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else if (filter === 'nameZA') {
      filteredProducts.sort((a, b) => b.nombre.localeCompare(a.nombre));
    }
    return filteredProducts;
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Todos los Productos
      </Typography>
      <Box sx={{ marginBottom: 2, textAlign: 'center' }}>
      <select className="filter-select" onChange={handleFilterChange}>
        <option value="">Selecciona un filtro</option>
        <option value="priceLowToHigh">Precio: Menor a Mayor</option>
        <option value="priceHighToLow">Precio: Mayor a Menor</option>
        <option value="nameAZ">Nombre: A-Z</option>
        <option value="nameZA">Nombre: Z-A</option>
      </select>
      </Box>
      <Box className="product-list">
        {getFilteredProducts().map((product) => (
          <Box 
            key={product.id} 
            className="product-item"
            onClick={() => handleProductClick(product.id)} // Agrega el evento onClick
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
    </Box>
  );
};

export default StorePage;
