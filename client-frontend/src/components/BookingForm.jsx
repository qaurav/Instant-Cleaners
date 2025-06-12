import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import api from "../api";

const BookingForm = ({ fixedService }) => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    clientName: "",
    email: "",
    phone: "",
    service: fixedService ? fixedService._id : "",
    address: "",
    bookingDate: "",
    message: "",
  });
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!fixedService) {
      api
        .get("/services")
        .then((res) => setServices(res.data))
        .catch((err) => console.error("Failed to fetch services", err));
    }
  }, [fixedService]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");
    setSubmitting(true);
    try {
      await api.post("/bookings", formData);
      setSuccessMsg("Booking submitted successfully!");
      setFormData({
        clientName: "",
        email: "",
        phone: "",
        service: fixedService ? fixedService._id : "",
        address: "",
        bookingDate: "",
        message: "",
      });
    } catch (err) {
      setErrorMsg("Failed to submit booking.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 600,
        mx: "auto",
        p: 1, // Reduced from 2 to 1
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "background.paper",
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h5" component="h2" gutterBottom>
        Book a Service
      </Typography>

      <TextField
        label="Your Name"
        name="clientName"
        value={formData.clientName}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
        size="small" // Reduce field height
      />

      <TextField
        label="Your Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
        size="small" // Reduce field height
      />

      <TextField
        label="Phone Number"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
        size="small" // Reduce field height
      />

      {fixedService ? (
        <TextField
          label="Service"
          value={fixedService.name}
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
          size="small" // Reduce field height
        />
      ) : (
        <FormControl fullWidth margin="normal" required>
          <InputLabel id="service-label">Select Service</InputLabel>
          <Select
            labelId="service-label"
            id="service"
            name="service"
            value={formData.service}
            label="Select Service"
            onChange={handleChange}
            size="small" // Reduce field height
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {services.map((svc) => (
              <MenuItem key={svc._id} value={svc._id}>
                {svc.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      <TextField
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        fullWidth
        margin="normal"
        size="small" // Reduce field height
      />

      <TextField
        label="Booking Date"
        name="bookingDate"
        type="date"
        value={formData.bookingDate}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        size="small" // Reduce field height
      />

      <TextField
        label="Additional Message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        multiline
        rows={2} // Reduced from 3 to 2
        fullWidth
        margin="normal"
        size="small" // Reduce field height
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={submitting}
        fullWidth
        sx={{ mt: 0.5 }} // Reduced from 1 to 0.5
      >
        {submitting ? "Submitting..." : "Submit Booking"}
      </Button>

      {successMsg && (
        <Alert severity="success" sx={{ mt: 0.5 }}>
          {successMsg}
        </Alert>
      )}
      {errorMsg && (
        <Alert severity="error" sx={{ mt: 0.5 }}>
          {errorMsg}
        </Alert>
      )}
    </Box>
  );
};

export default BookingForm;