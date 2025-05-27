import React, { useState, useEffect } from "react";

const revealKeyframes = `
@keyframes reveal {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
`;

const LogoLoader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000); // Minimum 2-second display

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  const logoStyle = {
    width: 400, // Equal width and height for perfect circle
    height: 400, // Equal width and height for perfect circle
    display: "inline-block",
    filter: "drop-shadow(0 0 8px #2596be)",
    animation: "reveal 1.5s ease-out forwards",
    borderRadius: "50%", // Circular shape
    transformOrigin: "center", // Scale from center
    objectFit: "cover", // Ensure image fits within circular bounds
  };

  if (!isVisible) return null; // Hide loader after 2 seconds

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "60px 0",
        background: "#ffffff", // White background
        borderRadius: 16,
        boxShadow: "0 8px 32px rgba(37, 150, 190, 0.15)",
      }}
    >
      <style>{revealKeyframes}</style>
      <img
        src="/instantcleanerslogo.jpg"
        alt="Instant Carpet Cleaning Logo"
        style={logoStyle}
        onError={(e) => console.error("Image failed to load:", e.target.src)}
      />
    </div>
  );
};

export default LogoLoader;