import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import './ProductCard.css'; // Importa el archivo CSS

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Card className="product-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={product.imagen}
          alt={product.nombre}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.nombre}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.descripcion}
          </Typography>
          <Box mt={2}>
            <Typography variant="h6" color="green">
              ${product.precio}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
