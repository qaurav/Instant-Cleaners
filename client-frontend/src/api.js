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



// Booking CRUD
export const createBooking = (data) => api.post("/bookings", data);


// Services CRUD
export const fetchServices = () => api.get("/services");

// Location CRUD
export const fetchLocations = () => api.get("/locations");


export default api;
