import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import { createSlug } from "../slugify";

const accentColor = "rgb(37, 150, 190)";

// Utility: Render star rating (full stars only)
const renderStars = (count = 5) => (
  <div style={{ marginBottom: 8 }}>
    {Array.from({ length: count }).map((_, i) => (
      <span key={i} style={{ color: "#ffb400", fontSize: "1.3rem" }}>★</span>
    ))}
  </div>
);

const packageData = [
  {
    name: "Basic Refresh",
    price: 69.99,
    wasPrice: 99.99,
    features: "Standard steam cleaning & quick drying",
    icon: "💧",
    rating: 4,
    bg: "linear-gradient(135deg, #e0f7fa 0%, #f9faff 100%)"
  },
  {
    name: "Premium Care",
    price: 99.99,
    wasPrice: 149.99,
    features: "Deep cleaning, stain removal & deodorizing",
    icon: "✨",
    rating: 5,
    bg: "linear-gradient(135deg, #b2ebf2 0%, #f9faff 100%)"
  },
  {
    name: "Deluxe Protection",
    price: 149.99,
    wasPrice: 199.99,
    features: "All Premium features + fabric protection & eco-friendly products",
    icon: "🛡️",
    rating: 5,
    bg: "linear-gradient(135deg, #80deea 0%, #f9faff 100%)"
  }
];

const featureList = [
  { icon: "🧼", title: "Deep Steam Cleaning", desc: "Our powerful steam extraction penetrates deep to remove stubborn dirt, allergens, and dust mites, ensuring a thorough cleanse." },
  { icon: "🌱", title: "Eco-Friendly & Safe", desc: "We care for your family and the planet by using biodegradable, non-toxic cleaning solutions that are gentle yet effective." },
  { icon: "🧽", title: "Advanced Stain Removal", desc: "Say goodbye to tough stains like wine, coffee, pet accidents, and more with our specialized treatment." },
  { icon: "💨", title: "Rapid Drying Technology", desc: "Our state-of-the-art equipment reduces drying time significantly, so you can enjoy your refreshed carpets sooner." },
  { icon: "🌸", title: "Odor Neutralization", desc: "We eliminate unpleasant odors at the source, leaving your space smelling fresh and inviting." }
];

const stepList = [
  "Comprehensive Inspection: We evaluate your carpet’s condition to tailor the perfect cleaning strategy.",
  "Pre-Treatment: Application of eco-friendly solutions to loosen embedded dirt and stains.",
  "Deep Steam Extraction: Hot water extraction removes dirt, allergens, and bacteria deep within the fibers.",
  "Targeted Spot Treatment: Special attention to stubborn stains and high-traffic areas.",
  "Rapid Drying: Powerful extraction minimizes moisture, speeding up drying time.",
  "Final Quality Check: We ensure your complete satisfaction with a spotless, refreshed carpet."
];

const ServicePage = ({ services }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // console.log("useEffect running with services:", services);
    if (!services || services.length === 0) {
      console.log("No services available, setting error");
      setError("No services available.");
      return;
    }
    // services.forEach(svc => {
    //   const generatedSlug = createSlug(svc.name);
    //   console.log(`Service name: "${svc.name}" -> Generated slug: "${generatedSlug}"`);
    // });
    const matchedService = services.find(svc => {
      const generatedSlug = createSlug(svc.name).toLowerCase();
      const normalizedSlug = slug.toLowerCase().trim();
      return generatedSlug === normalizedSlug;
    });
    if (!matchedService) {
      setService(null);
      setError("Service not found");
      return;
    }
    setService(matchedService);
  }, [slug, services]);

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
          letterSpacing: 1
        }}
      >
        {service.name}
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
      {service.image && (
        <img
          src={service.image}
          alt={service.name}
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

      {/* Render description with HTML formatting */}
      <div
        style={{
          lineHeight: 1.7,
          fontSize: "1.15rem",
          color: "#444",
          marginBottom: 32,
        }}
        dangerouslySetInnerHTML={{ __html: service.description }}
      />

      {/* Features Section */}
      <h2
        style={{
          color: accentColor,
          fontWeight: 700,
          fontSize: "1.5rem",
          marginBottom: 18,
          marginTop: 10,
        }}
      >
        Why Trust Us With Your Carpets?
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
        {featureList.map((f, i) => (
          <div
            key={i}
            style={{
              flex: "1 1 240px",
              background: "#fff",
              borderRadius: 14,
              boxShadow: "0 2px 12px rgba(37,150,190,0.07)",
              padding: "28px 22px",
              minWidth: 180,
              display: "flex",
              alignItems: "flex-start",
              gap: 16,
            }}
          >
            <span style={{ fontSize: "1.6rem", marginTop: 2 }}>{f.icon}</span>
            <div>
              <b style={{ color: accentColor }}>{f.title}</b>
              <div style={{ fontSize: "1rem", marginTop: 6 }}>{f.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: "1.1rem", marginBottom: 30 }}>
        Our mission is to create a healthier indoor environment by removing allergens and bacteria that can affect your well-being – all while preserving the softness and beauty of your carpets.
      </div>

      {/* Packages Section */}
      <h2
        style={{
          color: accentColor,
          fontWeight: 700,
          fontSize: "1.5rem",
          marginBottom: 20,
          marginTop: 10,
        }}
      >
        Choose the Perfect Package for Your Needs
      </h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 36,
          justifyContent: "center",
          marginBottom: 44,
          padding: "0 12px",
        }}
      >
        {packageData.map((pkg, i) => (
          <div
            key={i}
            style={{
              flex: "1 1 240px",
              minWidth: 220,
              maxWidth: 300,
              background: pkg.bg,
              borderRadius: 18,
              boxShadow: "0 2px 16px rgba(37,150,190,0.10)",
              padding: "36px 22px 28px 22px",
              textAlign: "center",
              border: `2px solid ${accentColor}20`,
              margin: "0 8px",
              transition: "transform 0.2s",
            }}
          >
            <div style={{ fontSize: "2.3rem", marginBottom: 12 }}>{pkg.icon}</div>
            <div
              style={{
                fontWeight: 700,
                fontSize: "1.2rem",
                color: accentColor,
                marginBottom: 10,
              }}
            >
              {pkg.name}
            </div>

            {/* Star Rating */}
            {renderStars(pkg.rating)}

            {/* "Starts from" label */}
            <div
              style={{
                fontSize: "0.95rem",
                color: "#666",
                marginBottom: 4,
                letterSpacing: 0.5,
                fontWeight: 500,
              }}
            >
              Starts from
            </div>

            {/* Price display */}
            <div style={{ marginBottom: 8 }}>
              {pkg.wasPrice && (
                <span
                  style={{
                    textDecoration: "line-through",
                    color: "#b0b0b0",
                    fontSize: "1.1rem",
                    marginRight: 8,
                    fontWeight: 500,
                  }}
                >
                  ${pkg.wasPrice}
                </span>
              )}
              <span
                style={{
                  fontSize: "2rem",
                  fontWeight: 800,
                  color: "#222",
                  letterSpacing: 1,
                }}
              >
                ${pkg.price}
              </span>
            </div>

            <div style={{ fontSize: "1.07rem", color: "#444" }}>{pkg.features}</div>
          </div>
        ))}
      </div>

      {/* Steps Section */}
      <h2
        style={{
          color: accentColor,
          fontWeight: 700,
          fontSize: "1.5rem",
          marginBottom: 22,
          marginTop: 10
        }}
      >
        Our Proven 6-Step Cleaning Process
      </h2>
      <ol style={{ paddingLeft: 22, marginBottom: 36 }}>
        {stepList.map((step, idx) => (
          <li key={idx} style={{ marginBottom: 15, fontSize: "1.12rem" }}>
            <b style={{ color: accentColor }}>{step.split(":")[0]}:</b>
            {step.includes(":") ? <span> {step.split(":").slice(1).join(":")}</span> : null}
          </li>
        ))}
      </ol>

      <div style={{ fontStyle: "italic", color: "#555", marginBottom: 28, fontSize: "1.08rem" }}>
        Experience the joy of walking on soft, clean carpets that enhance the comfort and beauty of your home or office.
      </div>

      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <span style={{ fontWeight: 700, color: accentColor, fontSize: "1.1rem" }}>
          Don’t wait!
        </span>
        <span>
          Contact us today to schedule your appointment and enjoy a healthier, fresher living space with our trusted carpet cleaning experts.
        </span>
      </div>

      {/* Booking form with fixedService prop */}
      <div style={{
        marginTop: 30,
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 10px rgba(37,150,190,0.06)",
        padding: 28,
        maxWidth: 600,
        marginLeft: "auto",
        marginRight: "auto"
      }}>
        <BookingForm fixedService={service} />
      </div>

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

export default ServicePage;