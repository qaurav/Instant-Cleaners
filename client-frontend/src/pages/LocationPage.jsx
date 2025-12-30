import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../api";
import ServiceCard from "../components/ServiceCard";
import { createSlug } from "../slugify";
import LogoLoader from "../components/Loader";
import { Helmet } from "react-helmet";

const accentColor = "rgb(37, 150, 190)";

const styles = {
  container: {
    padding: 24,
    maxWidth: 1200,
    margin: "auto",
    fontFamily: "Arial, sans-serif",
    color: "#333",
    background: "linear-gradient(120deg, #f9faff 60%, #e0f7fa 100%)",
    borderRadius: 16,
    boxShadow: "0 8px 32px rgba(37, 150, 190, 0.10)",
  },
  title: {
    fontSize: "2.7rem",
    marginBottom: 12,
    color: accentColor,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: 1,
  },
  divider: {
    width: 80,
    height: 4,
    background: accentColor,
    margin: "0 auto 32px auto",
    borderRadius: 2,
  },
  image: {
    maxWidth: "100%",
    height: "auto",
    marginBottom: 32,
    borderRadius: 14,
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  description: {
    lineHeight: 1.7,
    fontSize: "1.15rem",
    color: "#444",
    marginBottom: 32,
  },
  sectionTitle: {
    color: accentColor,
    fontWeight: 700,
    fontSize: "1.5rem",
    marginBottom: 20,
    marginTop: 10,
  },
  servicesContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
  },
  backLink: {
    color: accentColor,
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "1.1rem",
    padding: "10px 28px",
    borderRadius: 6,
    background: "linear-gradient(90deg, #e0f7fa 0%, #b2ebf2 100%)",
    boxShadow: "0 2px 6px rgba(37,150,190,0.07)",
    border: `1px solid ${accentColor}40`,
    transition: "background 0.3s, color 0.3s",
    display: "inline-block",
    cursor: "pointer",
  },
};

const LocationPage = ({ locations }) => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [location, setLocation] = useState(null);
  const [servicesAtLocation, setServicesAtLocation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLoader] = useState(false);

  useEffect(() => {
    if (!locations || locations.length === 0) {
      setError("Locations data not available");
      setLoading(false);
      return;
    }

    const matchedLocation = locations.find(
      (loc) => createSlug(loc.name) === slug
    );
    if (!matchedLocation) {
      setError("Location not found");
      setLoading(false);
      return;
    }

    api
      .get(`/locations/${matchedLocation._id}`)
      .then((res) => {
        setLocation(res.data);

        if (res.data.services && res.data.services.length > 0) {
          if (typeof res.data.services[0] === "object") {
            setServicesAtLocation(res.data.services);
            setLoading(false);
          } else {
            api
              .get("/services")
              .then((svcRes) => {
                const allServices = svcRes.data;
                const filteredServices = allServices.filter((svc) =>
                  res.data.services.includes(svc._id)
                );
                setServicesAtLocation(filteredServices);
                setLoading(false);
              })
              .catch(() => {
                setError("Failed to load services");
                setLoading(false);
              });
          }
        } else {
          setServicesAtLocation([]);
          setLoading(false);
        }
      })
      .catch(() => {
        setError("Failed to load location");
        setLoading(false);
      });
  }, [slug, locations]);

  // Generate Schema
  const generateSchema = () => {
    if (!location) return null;

    const baseUrl = window.location.origin;
    const cleanDescription = location.description
      ? location.description.replace(/(<([^>]+)>)/gi, "").trim()
      : `Professional carpet cleaning services in ${location.name}`;

    // LocalBusiness Schema
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${baseUrl}/locations/${slug}#business`,
      name: `Instant Carpet Cleaning - ${location.name}`,
      description: cleanDescription,
      image: location.image || `${baseUrl}/default-location.jpg`,
      address: {
        "@type": "PostalAddress",
        addressLocality: location.name,
        addressRegion: "NSW",
        addressCountry: "AU",
      },
      geo: location.coordinates ? {
        "@type": "GeoCoordinates",
        latitude: location.coordinates.lat,
        longitude: location.coordinates.lng,
      } : undefined,
      url: `${baseUrl}/locations/${slug}`,
      telephone: location.phone || "+61-XXX-XXX-XXX",
      priceRange: "$$",
      areaServed: {
        "@type": "City",
        name: location.name,
      },
      hasOfferCatalog: servicesAtLocation.length > 0 ? {
        "@type": "OfferCatalog",
        name: "Carpet Cleaning Services",
        itemListElement: servicesAtLocation.map((service, index) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.name,
            description: service.description?.replace(/(<([^>]+)>)/gi, "").slice(0, 200),
            url: `${baseUrl}/services/${createSlug(service.name)}`,
          },
        })),
      } : undefined,
    };

    // BreadcrumbList Schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: baseUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Locations",
          item: `${baseUrl}/locations`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: location.name,
          item: `${baseUrl}/locations/${slug}`,
        },
      ],
    };

    return [localBusinessSchema, breadcrumbSchema];
  };

  if (loading && showLoader) {
    return <LogoLoader />;
  }

  if (error)
    return (
      <main style={{ padding: 24, maxWidth: 1200, margin: "auto" }}>
        <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
      </main>
    );
  if (!location)
    return (
      <main style={{ padding: 24, maxWidth: 1200, margin: "auto" }}>
        <p>Location not found</p>
      </main>
    );

  const schemas = generateSchema();

  return (
    <>
      <Helmet>
        <title>{location.name} - Instant Carpet Cleaning Services</title>
        <meta
          name="description"
          content={
            location.description
              ? location.description.replace(/(<([^>]+)>)/gi, "").slice(0, 160)
              : `Learn about our services and offerings at ${location.name}.`
          }
        />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${location.name} - Instant Carpet Cleaning`} />
        <meta property="og:description" content={location.description?.replace(/(<([^>]+)>)/gi, "").slice(0, 200)} />
        <meta property="og:image" content={location.image} />
        <meta property="og:url" content={`${window.location.origin}/locations/${slug}`} />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${location.name} - Instant Carpet Cleaning`} />
        <meta name="twitter:description" content={location.description?.replace(/(<([^>]+)>)/gi, "").slice(0, 200)} />
        <meta name="twitter:image" content={location.image} />

        {/* Canonical URL */}
        <link rel="canonical" href={`${window.location.origin}/locations/${slug}`} />

        {/* Structured Data */}
        {schemas && schemas.map((schema, index) => (
          <script key={index} type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        ))}
      </Helmet>

      <main style={styles.container}>
        <header>
          <h1 style={styles.title}>{location.name}</h1>
          <div style={styles.divider} aria-hidden="true" />
        </header>

        {location.image && (
          <img
            src={location.image}
            alt={`Image of ${location.name}`}
            style={styles.image}
            loading="lazy"
          />
        )}

        <article
          style={styles.description}
          aria-label={`${location.name} description`}
          dangerouslySetInnerHTML={{ __html: location.description }}
        />

        <section aria-labelledby="services-heading">
          <h2 id="services-heading" style={styles.sectionTitle}>
            Services Available at This Location
          </h2>
          {servicesAtLocation.length > 0 ? (
            <div style={styles.servicesContainer}>
              {servicesAtLocation.map((service) => (
                <ServiceCard
                  key={service._id}
                  service={service}
                  onClick={() => navigate(`/services/${createSlug(service.name)}`)}
                />
              ))}
            </div>
          ) : (
            <p>No services available at this location.</p>
          )}
        </section>

        <nav aria-label="Back to home page" style={{ textAlign: "center", marginTop: 38 }}>
          <Link
            to="/"
            style={styles.backLink}
            onMouseEnter={(e) => (e.target.style.background = "#b2ebf2")}
            onMouseLeave={(e) =>
              (e.target.style.background = "linear-gradient(90deg, #e0f7fa 0%, #b2ebf2 100%)")
            }
          >
            ← Back to Home
          </Link>
        </nav>
      </main>
    </>
  );
};

export default LocationPage;