// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import AdminCRUD from "../components/AdminCRUD";
import BookingCRUD from "../components/BookingCRUD";
import ServiceCRUD from "../components/ServiceCRUD";
import LocationCRUD from "../components/LocationCRUD";
import MailCRUD from "../components/MailCRUD"; // <-- NEW

const Dashboard = () => {
  const location = useLocation();

  const [selectedModel, setSelectedModel] = useState(() => {
    const pathSegment = location.pathname.split("/")[2];
    return pathSegment || "admin";
  });

  useEffect(() => {
    const pathSegment = location.pathname.split("/")[2];
    if (pathSegment && pathSegment !== selectedModel) {
      setSelectedModel(pathSegment);
    }
  }, [location.pathname, selectedModel]);

  return (
    <DashboardLayout
      selectedModel={selectedModel}
      setSelectedModel={setSelectedModel}
    >
      <Routes>
        <Route path="/" element={<Navigate to="admin" replace />} />
        <Route path="admin" element={<AdminCRUD />} />
        <Route path="booking" element={<BookingCRUD />} />
        <Route path="services" element={<ServiceCRUD />} />
        <Route path="locations" element={<LocationCRUD />} />
        <Route path="mail" element={<MailCRUD />} /> {/* NEW */}
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;
