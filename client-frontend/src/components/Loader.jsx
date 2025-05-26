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
    width: 180,
    height: 180,
    display: "inline-block",
    margin: "0 12px",
    filter: "drop-shadow(0 0 8px #2596be)",
    animation: "wave 1.5s ease-in-out infinite",
  };

  const logos = Array.from({ length: 5 }).map((_, i) => (
    <img
      key={i}
      src="/instantcleanerslogo.png"
      alt="Loading"
      style={{
        ...logoStyle,
        animationDelay: `${i * 0.3}s`,
      }}
    />
  ));

  return (
    <div
      style={{
        textAlign: "center",
        padding: "60px 0",
        background: "linear-gradient(90deg, #e0f7fa 0%, #b2ebf2 100%)",
        borderRadius: 16,
        boxShadow: "0 8px 32px rgba(37, 150, 190, 0.15)",
      }}
    >
      <style>{waveKeyframes}</style>
      <div>{logos}</div>
    </div>
  );
};

export default LogoLoader;
