import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import AdminCRUD from "../components/AdminCRUD";
import BookingCRUD from "../components/BookingCRUD";
import ServiceCRUD from "../components/ServiceCRUD";
import LocationCRUD from "../components/LocationCRUD";


const Dashboard = () => {
  const [selectedModel, setSelectedModel] = useState("admin");

  return (
    <DashboardLayout selectedModel={selectedModel} setSelectedModel={setSelectedModel}>
      <Routes>
        <Route path="/" element={<Navigate to="admin" replace />} />
        <Route path="admin" element={<AdminCRUD />} />
        <Route path="booking" element={<BookingCRUD />} />
        <Route path="services" element={<ServiceCRUD />} />
        <Route path="locations" element={<LocationCRUD />} />
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;
