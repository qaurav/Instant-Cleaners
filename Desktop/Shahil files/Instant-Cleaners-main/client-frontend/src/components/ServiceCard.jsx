import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const ServiceCard = ({ service, onClick }) => (
  <Card sx={{ width: 220, m: 1, cursor: "pointer" }} onClick={() => onClick(service._id)}>
    <CardMedia
      component="img"
      height="120"
      image={service.image || "https://via.placeholder.com/220x120"}
      alt={service.name}
    />
    <CardContent>
      <Typography variant="h6">{service.name}</Typography>
      <Typography variant="body2" color="text.secondary">
        {service.description?.slice(0, 50)}...
      </Typography>
    </CardContent>
  </Card>
);


export default ServiceCard;
