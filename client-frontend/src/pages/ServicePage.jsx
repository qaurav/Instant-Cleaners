import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";
import BookingForm from "../components/BookingForm";

const ServicePage = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get(`/services/${id}`)
      .then((res) => {
        setService(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load service");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading service...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!service) return <p>Service not found</p>;

  return (
    <div style={{ padding: 20, maxWidth: 700, margin: "auto" }}>
      <h1>{service.name}</h1>
      {service.image && (
        <img
          src={service.image}
          alt={service.name}
          style={{ maxWidth: "100%", height: "auto", marginBottom: 20 }}
        />
      )}
      <p>{service.description}</p>

      {/* Booking form with fixedService prop */}
      <BookingForm fixedService={service} />

      <Link to="/" style={{ marginTop: 20, display: "inline-block" }}>
        ← Back to Home
      </Link>
    </div>
  );
};

export default ServicePage;
