import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const LocationCard = ({ location, onClick }) => (
  <Card sx={{ width: 280, m: 1, cursor: 'pointer' }} onClick={() => onClick(location._id)}>
    <CardMedia
      component="img"
      height="120"
      image={location.image || 'https://via.placeholder.com/220x120'}
      alt={location.name}
    />
    <CardContent>
      <Typography variant="h6" component="div">
        {location.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {location.description?.slice(0, 50)}...
      </Typography>
    </CardContent>
  </Card>
);

export default LocationCard;
