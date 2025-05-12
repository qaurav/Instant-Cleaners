import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../api";
import ServiceCard from "../components/ServiceCard";

const LocationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [location, setLocation] = useState(null);
  const [servicesAtLocation, setServicesAtLocation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get(`/locations/${id}`)
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
  }, [id]);

  if (loading) return <p>Loading location...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!location) return <p>Location not found</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>{location.name}</h1>
      {location.image && (
        <img
          src={location.image}
          alt={location.name}
          style={{ maxWidth: "100%", height: "auto", marginBottom: 20 }}
        />
      )}
      <p>{location.description}</p>

      <h2>Services at this Location</h2>
      {servicesAtLocation.length > 0 ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          {servicesAtLocation.map((service) => (
            <ServiceCard
              key={service._id}
              service={service}
              onClick={() => navigate(`/services/${service._id}`)}
            />
          ))}
        </div>
      ) : (
        <p>No services available at this location.</p>
      )}

      <Link to="/" style={{ marginTop: 20, display: "inline-block" }}>
        ← Back to Home
      </Link>
    </div>
  );
};

export default LocationPage;
