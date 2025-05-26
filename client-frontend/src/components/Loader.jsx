// src/components/LogoLoader.jsx
import React from "react";

const waveKeyframes = `
@keyframes wave {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}
`;

const LogoLoader = () => {
  const logoStyle = {
    width: 180,       // Bigger size
    height: 180,
    display: "block",
    margin: "60px auto",  // Center horizontally with margin top/bottom
    filter: "drop-shadow(0 0 6px #2596be)", // subtle glow effect
  };

  // Create 5 clones of the logo with staggered animation delays to simulate wave
  const logos = Array.from({ length: 5 }).map((_, i) => (
    <img
      key={i}
      src="/instantcleanerslogo.png"
      alt="Loading"
      style={{
        ...logoStyle,
        display: "inline-block",
        margin: "0 12px",
        animation: `wave 1.5s ease-in-out infinite`,
        animationDelay: `${i * 0.3}s`,
      }}
    />
  ));

  return (
    <div style={{ textAlign: "center", padding: "40px 0" }}>
      <style>{waveKeyframes}</style>
      <div>{logos}</div>
      <div
        style={{
          marginTop: 24,
          color: "#2596be",
          fontWeight: 700,
          fontSize: 22,
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        Loading...
      </div>
    </div>
  );
};

export default LogoLoader;
