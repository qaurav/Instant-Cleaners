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
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const imageHeight = isXs ? 140 : isSm ? 170 : 200;

  return (
    <>
      <Helmet>
        <title>
          About Us - Instant Carpet Cleaning Services | 15+ Years of Excellence
        </title>
        <meta
          name="description"
          content="Learn about Instant Carpet Cleaning Services, our history since 2010, our dedicated team, and commitment to high-quality carpet cleaning across Sydney."
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://instantcarpetcleaningservices.com.au/aboutus"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="About Us - Instant Carpet Cleaning Services"
        />
        <meta
          property="og:description"
          content="15+ years of professional carpet cleaning excellence in Sydney. From a small team to Sydney's trusted cleaning experts."
        />
        <meta
          property="og:url"
          content="https://instantcarpetcleaningservices.com.au/aboutus"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://instantcarpetcleaningservices.com.au/instantcleanerslogo.jpg"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="About Us - Instant Carpet Cleaning Services"
        />
        <meta
          name="twitter:description"
          content="15+ years of professional carpet cleaning excellence in Sydney."
        />
        <meta
          name="twitter:image"
          content="https://instantcarpetcleaningservices.com.au/instantcleanerslogo.jpg"
        />

        {/* Schema.org */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "About Instant Carpet Cleaning Services",
            description:
              "Learn about Instant Carpet Cleaning Services, our history since 2010, and our commitment to excellence.",
            url: "https://instantcarpetcleaningservices.com.au/aboutus",
            mainEntity: {
              "@type": "LocalBusiness",
              name: "Instant Carpet Cleaning Services",
              foundingDate: "2010-06",
              url: "https://instantcarpetcleaningservices.com.au",
              telephone: "+61411331731",
              email: "info@instantcarpetcleaningservices.com.au",
              address: {
                "@type": "PostalAddress",
                streetAddress: "2 Chifley Square",
                addressLocality: "Sydney",
                addressRegion: "NSW",
                postalCode: "2000",
                addressCountry: "AU",
              },
              areaServed: {
                "@type": "City",
                name: "Sydney",
              },
            },
          })}
        </script>
      </Helmet>

      <Box
        component="main"
        sx={{
          backgroundColor: "#f8f9fa",
          minHeight: "100vh",
          py: { xs: 6, md: 10 },
        }}
      >
        <Container maxWidth="lg">
          {/* Page Title */}
          <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 800,
                color: "#1a1a1a",
                letterSpacing: -0.5,
                mb: 2,
                fontSize: { xs: "2.25rem", sm: "2.75rem", md: "3.25rem" },
              }}
            >
              About Us
            </Typography>
            <Box
              sx={{
                width: 80,
                height: 4,
                backgroundColor: "#2596BE",
                margin: "0 auto",
                borderRadius: 2,
              }}
            />
          </Box>

          <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
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
                        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.05) translateY(-5px)",
                          boxShadow: "0 12px 30px rgba(37, 150, 190, 0.25)",
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
              <Box
                sx={{
                  backgroundColor: "#ffffff",
                  p: { xs: 4, md: 5 },
                  borderRadius: 4,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                }}
              >
                <section aria-labelledby="history-heading">
                  <Typography
                    variant="body1"
                    paragraph
                    sx={{
                      fontSize: { xs: "1.05rem", md: "1.15rem" },
                      color: "#4a4a4a",
                      lineHeight: 1.8,
                      mb: 3,
                    }}
                    id="history-heading"
                  >
                    Instant Carpet Cleaning Services started out as "Experts
                    Carpet Cleaning" in June 2010 before changing its name to
                    Instant Carpet Cleaning Services in 2019.
                  </Typography>

                  <Typography
                    variant="body1"
                    paragraph
                    sx={{
                      fontSize: { xs: "1.05rem", md: "1.15rem" },
                      color: "#4a4a4a",
                      lineHeight: 1.8,
                      mb: 3,
                    }}
                  >
                    Over the past 15 years, we have quickly grown from a
                    husband-and-wife team, working just a few hours a week, to a
                    large team made up of passionate and highly trained detail
                    cleaners – not just ordinary, hasty spray-and-wipers!
                  </Typography>

                  <Typography
                    variant="body1"
                    paragraph
                    sx={{
                      fontSize: { xs: "1.05rem", md: "1.15rem" },
                      color: "#4a4a4a",
                      lineHeight: 1.8,
                    }}
                  >
                    Instant Carpet Cleaning Services' high standards quickly
                    became the norm, with new clients constantly asking us where
                    we had been hiding ourselves all these years, as our
                    cleaning standards were so much higher than what they had
                    experienced in the past.
                  </Typography>
                </section>

                {/* Stats Box */}
                <Box
                  sx={{
                    mt: 5,
                    pt: 4,
                    borderTop: "2px solid #e0e0e0",
                    display: "flex",
                    justifyContent: "space-around",
                    flexWrap: "wrap",
                    gap: 3,
                  }}
                >
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 800,
                        color: "#2596BE",
                        fontSize: { xs: "2rem", md: "2.5rem" },
                      }}
                    >
                      15+
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#6c757d",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                      }}
                    >
                      Years Experience
                    </Typography>
                  </Box>

                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 800,
                        color: "#2596BE",
                        fontSize: { xs: "2rem", md: "2.5rem" },
                      }}
                    >
                      5000+
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#6c757d",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                      }}
                    >
                      Happy Clients
                    </Typography>
                  </Box>

                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 800,
                        color: "#2596BE",
                        fontSize: { xs: "2rem", md: "2.5rem" },
                      }}
                    >
                      98%
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#6c757d",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                      }}
                    >
                      Satisfaction Rate
                    </Typography>
                  </Box>
                </Box>
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
      </Box>
    </>
  );
};

export default AboutUsPage;
