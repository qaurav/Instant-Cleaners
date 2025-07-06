import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Helmet } from "react-helmet";

const galleryImages = [
  {
    src: "https://www.rjliving.com.au/cdn/shop/articles/SereneLiving2_13dfbda4-c5df-4e2f-8b5d-1f2dd5a70f89.jpg?v=1695360399",
    alt: "Serene living room with natural light and modern furniture",
  },
  {
    src: "https://stanleysteemer-cdn-guhsdrcta9dzabde.a01.azurefd.net/prod-container/images/default-source/furniture-cleaning-page/upholstery-serviceline-noaffa-720x460.png?sfvrsn=634ba292_2",
    alt: "Professional upholstery cleaning service in action",
  },
  {
    src: "https://i0.wp.com/enviro-clean.co.uk/wp-content/uploads/2021/04/Deep-and-Thorough-Cleaning.png?fit=1080%2C1080&ssl=1",
    alt: "Deep and thorough carpet cleaning process",
  },
  {
    src: "https://images.stockcake.com/public/f/7/c/f7c8bec2-7457-4ebb-b7d6-40e4212f281f_large/luxurious-leather-lounge-stockcake.jpg",
    alt: "Luxurious leather lounge sofa in a bright living room",
  },
  {
    src: "https://www.luxurylivingroomfurnitures.com/wp-content/uploads/2022/03/%E6%9C%AA%E6%A0%87%E9%A2%98-1-%E6%81%A2%E5%A4%8D%E7%9A%84-1-500x500.jpg",
    alt: "Modern luxury living room furniture setup",
  },
  {
    src: "https://i.pinimg.com/736x/ee/b6/46/eeb6463a561f8b097d53af4cec176a24.jpg",
    alt: "Cozy and clean carpeted living room interior",
  },
  {
    src: "https://img5.su-cdn.com/cdn-cgi/image/width=750,height=750/mall/file/2021/08/26/45e4de6d4f4d4cf4b990bf045747eb79.jpg",
    alt: "Professional carpet cleaning equipment in use",
  },
];

const AboutUsPage = () => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm")); // small devices
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md")); // medium devices

  const imageHeight = isXs ? 120 : isSm ? 150 : 180;
  const bodyFontSize = isXs ? "1rem" : "1.2rem";

  return (
    <>
      <Helmet>
        <title>About Us - Instant Carpet Cleaning Services</title>
        <meta
          name="description"
          content="Learn about Instant Carpet Cleaning Services, our history, team, and commitment to high-quality carpet cleaning since 2010."
        />
        <meta name="robots" content="index, follow" />
        {/* Add more meta tags as needed */}
      </Helmet>

      <main>
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
          {/* Page Title */}
          <Typography
            variant="h3"
            component="h1"
            align="center"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "#004d40",
              letterSpacing: 1,
              mb: { xs: 4, md: 6 },
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            }}
          >
            About Us
          </Typography>

          <Grid container spacing={6} alignItems="center">
            {/* Left Side: Image Gallery */}
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                {galleryImages.map(({ src, alt }, i) => (
                  <Grid item xs={6} sm={4} key={i}>
                    <Box
                      component="img"
                      src={src}
                      alt={alt}
                      sx={{
                        width: "100%",
                        height: imageHeight,
                        objectFit: "cover",
                        borderRadius: 3,
                        boxShadow: 3,
                        cursor: "pointer",
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.05)",
                          boxShadow: 6,
                        },
                      }}
                      onClick={() => {
                        setIndex(i);
                        setOpen(true);
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Right Side: Text Content */}
            <Grid item xs={12} md={6}>
              <Box sx={{ px: { xs: 0, md: 4 } }}>
                <section aria-labelledby="history-heading">
                  <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontSize: bodyFontSize, color: "#555", mb: 3 }}
                    id="history-heading"
                  >
                    Instant Carpet Cleaning Services started out as “Experts Carpet Cleaning” in June 2010 before changing its name to Instant Carpet Cleaning Services in 2019.
                  </Typography>

                  <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontSize: bodyFontSize, color: "#555", mb: 3 }}
                  >
                    Over the past 15 years, we have quickly grown from a husband-and-wife team, working just a few hours a week, to a large team made up of passionate and highly trained detail cleaners – not just ordinary, hasty spray-and-wipers!
                  </Typography>

                  <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontSize: bodyFontSize, color: "#555" }}
                  >
                    Instant Carpet Cleaning Services’ high standards quickly became the norm, with new clients constantly asking us where we had been hiding ourselves all these years, as our cleaning standards were so much higher than what they had experienced in the past.
                  </Typography>
                </section>
              </Box>
            </Grid>
          </Grid>

          {/* Lightbox */}
          <Lightbox
            open={open}
            close={() => setOpen(false)}
            slides={galleryImages.map(({ src }) => ({ src }))}
            index={index}
            controller={{ closeOnBackdropClick: true }}
            onIndexChange={setIndex}
          />
        </Container>
      </main>
    </>
  );
};

export default AboutUsPage;
