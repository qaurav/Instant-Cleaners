import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // if your backend uses cookies/sessions
});

// Add this interceptor:
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


// Admin Auth
export const loginAdmin = (credentials) => api.post("/admin/login", credentials);

export const logoutAdmin = () => api.post("/admin/logout");

// Admin CRUD
export const fetchAdmins = () => api.get("/admin");
export const createAdmin = (data) => api.post("/admin/register", data);
export const updateAdmin = (id, data) => api.put(`/admin/${id}`, data);
export const deleteAdmin = (id) => api.delete(`/admin/${id}`);

// Booking CRUD
export const fetchBookings = () => api.get("/bookings");
export const fetchCompletedBookings = () => api.get("/bookings?status=completed");
export const createBooking = (data) => api.post("/bookings", data);
export const updateBooking = (id, data) => api.put(`/bookings/${id}`, data);
export const deleteBooking = (id) => api.delete(`/bookings/${id}`);

// Services CRUD
export const fetchServices = () => api.get("/services");
export const createService = (data) => api.post("/services", data);
export const updateService = (id, data) => api.put(`/services/${id}`, data);
export const deleteService = (id) => api.delete(`/services/${id}`);

// Location CRUD
export const fetchLocations = () => api.get("/locations");
export const createLocation = (data) => api.post("/locations", data);
export const updateLocation = (id, data) => api.put(`/locations/${id}`, data);
export const deleteLocation = (id) => api.delete(`/locations/${id}`);

export default api;
