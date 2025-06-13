import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import axios from 'axios';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');
    setSubmitting(true);
    try {
      await axios.post('http://localhost:5000/api/contact', formData); // Hardcoded URL
      setSuccessMsg('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setErrorMsg('Failed to send message.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ maxWidth: 500, mx: 'auto', mt: 4, p: 2 }}>
      <Typography variant="h5" gutterBottom>Contact Us</Typography>
      <TextField
        fullWidth
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        margin="normal"
      />
      <TextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
        margin="normal"
      />
      <TextField
        fullWidth
        label="Message"
        name="message"
        multiline
        rows={4}
        value={formData.message}
        onChange={handleChange}
        required
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" disabled={submitting} fullWidth sx={{ mt: 2 }}>
        {submitting ? 'Sending...' : 'Send Message'}
      </Button>
      {successMsg && <Alert severity="success" sx={{ mt: 2 }}>{successMsg}</Alert>}
      {errorMsg && <Alert severity="error" sx={{ mt: 2 }}>{errorMsg}</Alert>}
    </Box>
  );
};

export default ContactForm;