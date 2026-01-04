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
  InputAdornment,
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MessageIcon from '@mui/icons-material/Message';
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
      const res = await api.post("/bookings", formData);
      setSuccessMsg(res.data.message || "Booking submitted successfully!");
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
      setErrorMsg("Failed to submit booking. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "100%",
        maxWidth: 600,
        mx: "auto",
        p: 4,
        boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
        borderRadius: 3,
        backgroundColor: "#ffffff",
        border: "1px solid #e0e0e0",
      }}
      noValidate
      autoComplete="off"
    >
      <Typography 
        variant="h4" 
        component="h2" 
        gutterBottom
        sx={{
          fontWeight: 700,
          color: "#1a1a1a",
          mb: 3,
          textAlign: "center",
          fontSize: { xs: "1.75rem", md: "2rem" },
        }}
      >
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
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonIcon sx={{ color: "#2596BE" }} />
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: "#2596BE",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#2596BE",
            },
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#2596BE",
          },
        }}
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
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon sx={{ color: "#2596BE" }} />
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: "#2596BE",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#2596BE",
            },
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#2596BE",
          },
        }}
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
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PhoneIcon sx={{ color: "#2596BE" }} />
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: "#2596BE",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#2596BE",
            },
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#2596BE",
          },
        }}
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
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#f5f5f5",
            },
          }}
        />
      ) : (
        <FormControl 
          fullWidth 
          margin="normal" 
          required
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "#2596BE",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#2596BE",
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#2596BE",
            },
          }}
        >
          <InputLabel id="service-label">Select Service</InputLabel>
          <Select
            labelId="service-label"
            id="service"
            name="service"
            value={formData.service}
            label="Select Service"
            onChange={handleChange}
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
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LocationOnIcon sx={{ color: "#2596BE" }} />
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: "#2596BE",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#2596BE",
            },
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#2596BE",
          },
        }}
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
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CalendarTodayIcon sx={{ color: "#2596BE" }} />
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: "#2596BE",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#2596BE",
            },
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#2596BE",
          },
        }}
      />

      <TextField
        label="Additional Message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        multiline
        rows={3}
        fullWidth
        margin="normal"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ alignSelf: "flex-start", mt: 1 }}>
              <MessageIcon sx={{ color: "#2596BE" }} />
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: "#2596BE",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#2596BE",
            },
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#2596BE",
          },
        }}
      />

      <Button
        type="submit"
        variant="contained"
        disabled={submitting}
        fullWidth
        sx={{ 
          mt: 3,
          py: 1.5,
          backgroundColor: "#2596BE",
          fontSize: "1rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: 0.5,
          boxShadow: "0 4px 12px rgba(37, 150, 190, 0.3)",
          "&:hover": {
            backgroundColor: "#1A7A9E",
            boxShadow: "0 6px 16px rgba(37, 150, 190, 0.4)",
            transform: "translateY(-2px)",
          },
          "&:disabled": {
            backgroundColor: "#b0b0b0",
          },
          transition: "all 0.3s ease",
        }}
      >
        {submitting ? "Submitting..." : "Submit Booking"}
      </Button>

      {successMsg && (
        <Alert 
          severity="success" 
          sx={{ 
            mt: 2,
            borderRadius: 2,
          }}
        >
          {successMsg}
        </Alert>
      )}
      {errorMsg && (
        <Alert 
          severity="error" 
          sx={{ 
            mt: 2,
            borderRadius: 2,
          }}
        >
          {errorMsg}
        </Alert>
      )}
    </Box>
  );
};

export default BookingForm;