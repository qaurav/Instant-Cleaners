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
        padding: 24,
        maxWidth: 900,
        margin: "auto",
        fontFamily: "Arial, sans-serif",
        color: "#333",
        backgroundColor: "#f9faff",
        borderRadius: 12,
        boxShadow: "0 4px 15px rgba(37, 150, 190, 0.2)",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          marginBottom: 24,
          color: "rgb(37, 150, 190)",
          fontWeight: "700",
          textAlign: "center",
        }}
      >
        {service.name}
      </h1>

      {service.image && (
        <img
          src={service.image}
          alt={service.name}
          style={{
            maxWidth: "100%",
            height: "auto",
            marginBottom: 30,
            borderRadius: 12,
            boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
      )}

      {/* Render description with HTML formatting */}
      <div
        style={{ lineHeight: 1.7, fontSize: "1.15rem", color: "#444" }}
        dangerouslySetInnerHTML={{ __html: service.description }}
      />

      {/* Additional Static Content */}
      <h2
        style={{
          marginTop: 50,
          fontSize: "1.8rem",
          color: "rgb(37, 150, 190)",
          borderBottom: "2px solid rgb(37, 150, 190)",
          paddingBottom: 8,
        }}
      >
        Why Choose Us?
      </h2>
      <ul style={{ fontSize: "1.1rem", marginTop: 16, color: "#555" }}>
        <li>✅ Experienced and Professional Staff</li>
        <li>✅ Eco-Friendly Products Used</li>
        <li>✅ Satisfaction Guaranteed</li>
        <li>✅ 24/7 Customer Support</li>
      </ul>

      <h3
        style={{
          marginTop: 40,
          fontSize: "1.5rem",
          color: "rgb(37, 150, 190)",
          fontWeight: "600",
        }}
      >
        Benefits of Our Service:
      </h3>
      <p style={{ color: "#555", fontSize: "1.1rem", marginTop: 12 }}>
        Experience the top-notch service with our industry-leading techniques to
        ensure your satisfaction. We prioritize your needs and provide
        customized solutions tailored just for you.
      </p>

      {/* Booking form with fixedService prop */}
      <div style={{ marginTop: 40 }}>
        <BookingForm fixedService={service} />
      </div>

      <Link
        to="/"
        style={{
          marginTop: 30,
          display: "inline-block",
          color: "rgb(37, 150, 190)",
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: "1.1rem",
          transition: "color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.target.style.color = "#1b8db3")}
        onMouseLeave={(e) => (e.target.style.color = "rgb(37, 150, 190)")}
      >
        ← Back to Home
      </Link>
    </div>
  );
};

export default ServicePage;
