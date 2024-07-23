import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CategoryPage.css';

const CategoryPage = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/categories/${id}/products`)
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, [id]);

  return (
    <div className="category-page">
      <h1>Productos</h1>
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.imagen} alt={product.nombre} />
            <h2>{product.nombre}</h2>
            <p>{product.descripcion}</p>
            <p>${product.precio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
