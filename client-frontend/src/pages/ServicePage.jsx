import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api"; // Your axios or fetch wrapper
import BookingForm from "../components/BookingForm";

const ServicePage = () => {
  const { id } = useParams(); // Get service ID from URL params
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await api.get(`/services/${id}`);
        setService(res.data);
      } catch (err) {
        setError("Failed to load service");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  if (loading) return <p>Loading service...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!service) return <p>Service not found</p>;

  return (
    <div
      style={{
        padding: 20,
        maxWidth: 800,
        margin: "auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>{service.name}</h1>

      {service.image && (
        <img
          src={service.image}
          alt={service.name}
          style={{
            maxWidth: "100%",
            height: "auto",
            marginBottom: 20,
            borderRadius: 8,
          }}
        />
      )}

      {/* Render description with HTML formatting */}
      <p
        style={{ lineHeight: 1.6, fontSize: "1.1rem", color: "#444" }}
        dangerouslySetInnerHTML={{ __html: service.description }}
      />

      {/* Additional Static Content */}
      <h2 style={{ marginTop: "40px", fontSize: "1.5rem" }}>Why Choose Us?</h2>
      <ul>
        <li>✅ Experienced and Professional Staff</li>
        <li>✅ Eco-Friendly Products Used</li>
        <li>✅ Satisfaction Guaranteed</li>
        <li>✅ 24/7 Customer Support</li>
      </ul>

      <h3 style={{ marginTop: "30px" }}>Benefits of Our Service:</h3>
      <p style={{ color: "#444" }}>
        Experience the top-notch service with our industry-leading techniques to
        ensure your satisfaction. We prioritize your needs and provide
        customized solutions.
      </p>

      {/* Booking form with fixedService prop */}
      <BookingForm fixedService={service} />

      <Link
        to="/"
        style={{
          marginTop: 20,
          display: "inline-block",
          color: "#3498db",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        ← Back to Home
      </Link>
    </div>
  );
};

export default ServicePage;
