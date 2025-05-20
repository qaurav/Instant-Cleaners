import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../api";
import ServiceCard from "../components/ServiceCard";
import { createSlug } from "../slugify"; // Your slug function

const accentColor = "rgb(37, 150, 190)";

const LocationPage = ({ locations }) => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [location, setLocation] = useState(null);
  const [servicesAtLocation, setServicesAtLocation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!locations || locations.length === 0) {
      setError("Locations data not available");
      setLoading(false);
      return;
    }

    // Find location ID by slug
    const matchedLocation = locations.find(loc => createSlug(loc.name) === slug);
    if (!matchedLocation) {
      setError("Location not found");
      setLoading(false);
      return;
    }

    // Fetch location details by ID
    api.get(`/locations/${matchedLocation._id}`)
      .then((res) => {
        setLocation(res.data);

        if (res.data.services && res.data.services.length > 0) {
          if (typeof res.data.services[0] === "object") {
            setServicesAtLocation(res.data.services);
            setLoading(false);
          } else {
            api.get("/services")
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

  if (loading) return <p>Loading location...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!location) return <p>Location not found</p>;

  return (
    <div
      style={{
        padding: 24,
        maxWidth: 1200,
        margin: "auto",
        fontFamily: "Arial, sans-serif",
        color: "#333",
        background: "linear-gradient(120deg, #f9faff 60%, #e0f7fa 100%)",
        borderRadius: 16,
        boxShadow: "0 8px 32px rgba(37, 150, 190, 0.10)",
      }}
    >
      <h1
        style={{
          fontSize: "2.7rem",
          marginBottom: 12,
          color: accentColor,
          fontWeight: "800",
          textAlign: "center",
          letterSpacing: 1,
        }}
      >
        {location.name}
      </h1>
      <div
        style={{
          width: 80,
          height: 4,
          background: accentColor,
          margin: "0 auto 32px auto",
          borderRadius: 2,
        }}
      />
      {location.image && (
        <img
          src={location.image}
          alt={location.name}
          style={{
            maxWidth: "100%",
            height: "auto",
            marginBottom: 32,
            borderRadius: 14,
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
      )}

      <div
        style={{
          lineHeight: 1.7,
          fontSize: "1.15rem",
          color: "#444",
          marginBottom: 32,
        }}
        dangerouslySetInnerHTML={{ __html: location.description }}
      />

      <h2
        style={{
          color: accentColor,
          fontWeight: 700,
          fontSize: "1.5rem",
          marginBottom: 18,
          marginTop: 10,
        }}
      >
        Why Choose This Location?
      </h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 32,
          marginBottom: 36,
          justifyContent: "center",
        }}
      >
        {/* ... your features ... */}
      </div>

      <h2
        style={{
          color: accentColor,
          fontWeight: 700,
          fontSize: "1.5rem",
          marginBottom: 20,
          marginTop: 10,
        }}
      >
        Services Available at This Location
      </h2>
      {servicesAtLocation.length > 0 ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
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

      <div style={{ textAlign: "center", marginTop: 38 }}>
        <Link
          to="/"
          style={{
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
          }}
          onMouseEnter={e => e.target.style.background = "#b2ebf2"}
          onMouseLeave={e => e.target.style.background = "linear-gradient(90deg, #e0f7fa 0%, #b2ebf2 100%)"}
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default LocationPage;
