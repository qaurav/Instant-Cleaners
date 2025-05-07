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
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { fetchAdmins, createAdmin, updateAdmin, deleteAdmin } from "../api";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const AdminCRUD = () => {
  const [admins, setAdmins] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const loadAdmins = async () => {
    try {
      const res = await fetchAdmins();
      setAdmins(res.data);
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Failed to load admins", severity: "error" });
    }
  };

  useEffect(() => {
    loadAdmins();
  }, []);

  const handleOpenDialog = (admin = null) => {
    setEditingAdmin(admin);
    setFormData(admin ? { username: admin.username, password: "" } : { username: "", password: "" });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingAdmin(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (editingAdmin) {
        await updateAdmin(editingAdmin._id, formData);
        setSnackbar({ open: true, message: "Admin updated successfully", severity: "success" });
      } else {
        await createAdmin(formData);
        setSnackbar({ open: true, message: "Admin created successfully", severity: "success" });
      }
      loadAdmins();
      handleCloseDialog();
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Failed to save admin", severity: "error" });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      try {
        await deleteAdmin(id);
        setSnackbar({ open: true, message: "Admin deleted successfully", severity: "success" });
        loadAdmins();
      } catch (err) {
        console.error(err);
        setSnackbar({ open: true, message: "Failed to delete admin", severity: "error" });
      }
    }
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Admin Management
      </Typography>
      <Button variant="contained" onClick={() => handleOpenDialog()} sx={{ mb: 2 }}>
        Add Admin
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Password (hashed)</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {admins.map((admin) => (
            <TableRow key={admin._id}>
              <TableCell>{admin.username}</TableCell>
              <TableCell>••••••••</TableCell>
              <TableCell>
                <IconButton onClick={() => handleOpenDialog(admin)} color="primary" aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(admin._id)} color="error" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Dialog for add/edit */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editingAdmin ? "Edit Admin" : "Add Admin"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            helperText={editingAdmin ? "Leave blank to keep current password" : ""}
            required={!editingAdmin}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {editingAdmin ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar notifications */}
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

export default AdminCRUD;
