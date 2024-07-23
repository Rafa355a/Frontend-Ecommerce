import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import './StaticProductCard.css';

const StaticProductCard = ({ image, title }) => {
  return (
    <Card className="static-product-card">
      <CardMedia
        component="img"
        className="card-media"
        image={image}
        alt={title}
      />
      <CardContent>
        <Typography className="card-title" gutterBottom variant="h5" component="div">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StaticProductCard;
