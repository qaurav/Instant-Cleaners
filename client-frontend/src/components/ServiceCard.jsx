import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// Utility to strip HTML tags
function stripHtml(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

const ServiceCard = ({ service, onClick }) => (
  <Card
    sx={{
      width: 380,
      height: 250,
      m: 2,
      borderRadius: 3,
      overflow: "hidden",
      position: "relative",
      cursor: "pointer",
      boxShadow: "0 4px 20px rgba(37,150,190,0.10)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      backgroundImage: `url(${service.image || "https://via.placeholder.com/380x250"})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
    onClick={() => onClick(service._id)}
  >
    {/* Dark overlay */}
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to bottom, rgba(0,0,0,0.36) 60%, rgba(0,0,0,0.68) 100%)",
        zIndex: 1,
      }}
    />
    {/* Content */}
    <Box
      sx={{
        position: "relative",
        zIndex: 2,
        color: "#fff",
        p: 3,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "flex-end",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 800,
          letterSpacing: 1,
          mb: 1,
          textShadow: "0 2px 8px rgba(0,0,0,0.28)",
          textTransform: "uppercase",
        }}
      >
        {service.name}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          mb: 2,
          fontSize: "1rem",
          fontWeight: 400,
          textShadow: "0 2px 8px rgba(0,0,0,0.18)",
        }}
      >
        {stripHtml(service.description)?.slice(0, 80)}...
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 700,
          borderBottom: "2px solid #fff",
          width: "fit-content",
          cursor: "pointer",
          textTransform: "uppercase",
          fontSize: "1rem",
          letterSpacing: 0.5,
          mt: "auto",
        }}
      >
        Learn More
      </Typography>
    </Box>
  </Card>
);

export default ServiceCard;
