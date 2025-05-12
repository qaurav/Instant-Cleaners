import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import { fetchBookings, fetchServices, createBooking, updateBooking, deleteBooking } from "../api";

const BookingCRUD = () => {
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [formData, setFormData] = useState({
    clientName: "",
    email: "",
    phone: "",
    service: "",
    address: "",
    bookingDate: "",
    status: "pending",
    message: "",
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Load bookings and services
  const loadBookings = async () => {
    try {
      const res = await fetchBookings();
      setBookings(res.data);
    } catch (err) {
      setSnackbar({ open: true, message: "Failed to load bookings", severity: "error" });
    }
  };

  const loadServices = async () => {
    try {
      const res = await fetchServices();
      setServices(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadBookings();
    loadServices();
  }, []);

  // Filter bookings based on showCompleted
  const displayedBookings = showCompleted
    ? bookings.filter((b) => b.status === "completed")
    : bookings;

  // Open dialog for add or edit
  const handleOpenDialog = (booking = null) => {
    setEditingBooking(booking);

    if (booking) {
      // If booking.service is object (populated), use its _id, else use string id
      const serviceId = typeof booking.service === "object" ? booking.service._id : booking.service;

      setFormData({
        clientName: booking.clientName || "",
        email: booking.email || "",
        phone: booking.phone || "",
        service: serviceId || "",
        address: booking.address || "",
        bookingDate: dayjs(booking.bookingDate).format("YYYY-MM-DD") || "",
        status: booking.status || "pending",
        message: booking.message || "",
      });
    } else {
      setFormData({
        clientName: "",
        email: "",
        phone: "",
        service: "",
        address: "",
        bookingDate: "",
        status: "pending",
        message: "",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingBooking(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit add or update booking
  const handleSubmit = async () => {
    try {
      if (editingBooking) {
        await updateBooking(editingBooking._id, formData);
        setSnackbar({ open: true, message: "Booking updated successfully", severity: "success" });
      } else {
        await createBooking(formData);
        setSnackbar({ open: true, message: "Booking created successfully", severity: "success" });
      }
      loadBookings();
      handleCloseDialog();
    } catch (err) {
      setSnackbar({ open: true, message: "Failed to save booking", severity: "error" });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await deleteBooking(id);
        setSnackbar({ open: true, message: "Booking deleted successfully", severity: "success" });
        loadBookings();
      } catch (err) {
        setSnackbar({ open: true, message: "Failed to delete booking", severity: "error" });
      }
    }
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Booking Management
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Button variant="contained" onClick={() => handleOpenDialog()}>
          Add Booking
        </Button>
        <Button
          variant={showCompleted ? "contained" : "outlined"}
          color="secondary"
          onClick={() => setShowCompleted((prev) => !prev)}
        >
          {showCompleted ? "Show All Bookings" : "Completed Bookings"}
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Client Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Service</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Booking Date</TableCell>
            <TableCell>Status</TableCell>
            {!showCompleted && <TableCell>Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
  {displayedBookings.map((booking) => (
    <TableRow key={booking._id}>
      <TableCell>{booking.clientName}</TableCell>
      <TableCell>{booking.email}</TableCell>
      <TableCell>{booking.phone}</TableCell>
      <TableCell>
        {typeof booking.service === "object"
          ? booking.service.name
          : services.find((s) => s._id === booking.service)?.name || booking.service}
      </TableCell>
      <TableCell>{booking.address}</TableCell>
      <TableCell>{dayjs(booking.bookingDate).format("YYYY-MM-DD")}</TableCell>
      <TableCell>{booking.status}</TableCell>
      <TableCell>
        {booking.status !== "completed" ? (
          <>
            <IconButton onClick={() => handleOpenDialog(booking)} color="primary" aria-label="edit">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(booking._id)} color="error" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </>
        ) : null}
      </TableCell>
    </TableRow>
  ))}
</TableBody>

      </Table>

      {/* Booking Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingBooking ? "Edit Booking" : "Add Booking"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Client Name"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="service-label">Service</InputLabel>
            <Select
              labelId="service-label"
              name="service"
              value={formData.service}
              onChange={handleChange}
              label="Service"
            >
              {services.map((svc) => (
                <MenuItem key={svc._id} value={svc._id}>
                  {svc.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Booking Date"
            name="bookingDate"
            type="date"
            value={formData.bookingDate}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            fullWidth
            margin="normal"
            select
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </TextField>
          <TextField
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {editingBooking ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BookingCRUD;
