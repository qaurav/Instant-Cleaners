import React, { useEffect, useState } from "react";
import {
  Box, Typography, Table, TableBody, TableCell, TableHead, TableRow,
  Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  IconButton, Snackbar, Alert, Select, MenuItem, InputLabel, FormControl
} from "@mui/material";
import { fetchLocations, createLocation, updateLocation, deleteLocation, fetchServices } from "../api";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const LocationCRUD = () => {
  const [locations, setLocations] = useState([]);
  const [services, setServices] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingLocation, setEditingLocation] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "", image: "", services: [] });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadLocations();
    loadServices();
  }, []);

  const loadLocations = async () => {
    setLoading(true);
    try {
      const res = await fetchLocations();
      setLocations(res.data);
    } catch (err) {
      setSnackbar({ open: true, message: "Failed to load locations", severity: "error" });
    }
    setLoading(false);
  };

  const loadServices = async () => {
    try {
      const res = await fetchServices();
      setServices(res.data);
    } catch (err) { }
  };

  const handleOpenDialog = (location = null) => {
    setEditingLocation(location);
    setFormData(location
      ? { name: location.name, description: location.description, image: location.image, services: location.services || [] }
      : { name: "", description: "", image: "", services: [] }
    );
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingLocation(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "services" ? (typeof value === "string" ? value.split(",") : value) : value
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (editingLocation) {
        await updateLocation(editingLocation._id, formData);
        setSnackbar({ open: true, message: "Location updated", severity: "success" });
      } else {
        await createLocation(formData);
        setSnackbar({ open: true, message: "Location created", severity: "success" });
      }
      loadLocations();
      handleCloseDialog();
    } catch {
      setSnackbar({ open: true, message: "Failed to save location", severity: "error" });
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this location?")) {
      setLoading(true);
      try {
        await deleteLocation(id);
        setSnackbar({ open: true, message: "Location deleted", severity: "success" });
        loadLocations();
      } catch {
        setSnackbar({ open: true, message: "Failed to delete location", severity: "error" });
      }
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>Location Management</Typography>
      <Button variant="contained" onClick={() => handleOpenDialog()} sx={{ mb: 2 }} disabled={loading}>
        Add Location
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell><TableCell>Description</TableCell>
            <TableCell>Image URL</TableCell><TableCell>Services</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {locations.map((loc) => (
            <TableRow key={loc._id}>
              <TableCell>{loc.name}</TableCell>
              <TableCell>{loc.description}</TableCell>
              <TableCell>{loc.image}</TableCell>
              <TableCell>
                {(loc.services || []).map(svc =>
                  typeof svc === "object" ? svc.name : (services.find(s => s._id === svc)?.name || svc)
                ).join(", ")}
              </TableCell>
              <TableCell>
                <IconButton onClick={() => handleOpenDialog(loc)} color="primary"><EditIcon /></IconButton>
                <IconButton onClick={() => handleDelete(loc._id)} color="error"><DeleteIcon /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingLocation ? "Edit Location" : "Add Location"}</DialogTitle>
        <DialogContent>
          <TextField label="Name" name="name" value={formData.name} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Description" name="description" value={formData.description} onChange={handleChange} fullWidth margin="normal" multiline rows={3} />
          <TextField label="Image URL" name="image" value={formData.image} onChange={handleChange} fullWidth margin="normal" />
          <FormControl fullWidth margin="normal">
            <InputLabel id="services-label">Services</InputLabel>
            <Select
              labelId="services-label"
              name="services"
              multiple
              value={formData.services}
              onChange={handleChange}
              renderValue={(selected) => selected.map(sid => services.find(s => s._id === sid)?.name || sid).join(", ")}
            >
              {services.map((svc) => (
                <MenuItem key={svc._id} value={svc._id}>{svc.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} disabled={loading}>
            {editingLocation ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
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

export default LocationCRUD;
