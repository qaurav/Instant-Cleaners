import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import axios from 'axios';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const CONTACT_ENDPOINT = `${API_BASE_URL}/contact`; // Adjust endpoint if different

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required';
    if (!formData.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) return 'Invalid email format';
    if (!formData.message.trim()) return 'Message is required';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    const validationError = validateForm();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setSubmitting(true);
    try {
      const response = await axios.post(CONTACT_ENDPOINT, formData, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000, // 10-second timeout
      });
      if (response.status === 200 || response.status === 201) {
        setSuccessMsg('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setErrorMsg('Unexpected response from server.');
      }
    } catch (error) {
      if (error.response) {
        setErrorMsg(`Server error: ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        setErrorMsg('Network error: Unable to reach the server.');
      } else {
        setErrorMsg('Error: Failed to send message.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ maxWidth: 500, mx: 'auto', mt: 4, p: 2 }}
    >
      <Typography variant="h5" gutterBottom>
        Contact Us
      </Typography>
      <TextField
        fullWidth
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        margin="normal"
        error={!!errorMsg && errorMsg.includes('Name')}
        helperText={errorMsg.includes('Name') ? errorMsg : ''}
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
        error={!!errorMsg && errorMsg.includes('email')}
        helperText={errorMsg.includes('email') ? errorMsg : ''}
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
        error={!!errorMsg && errorMsg.includes('Message')}
        helperText={errorMsg.includes('Message') ? errorMsg : ''}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={submitting}
        fullWidth
        sx={{ mt: 2 }}
      >
        {submitting ? 'Sending...' : 'Send Message'}
      </Button>
      {successMsg && <Alert severity="success" sx={{ mt: 2 }}>{successMsg}</Alert>}
      {errorMsg && !errorMsg.includes('Name') && !errorMsg.includes('email') && !errorMsg.includes('Message') && (
        <Alert severity="error" sx={{ mt: 2 }}>{errorMsg}</Alert>
      )}
    </Box>
  );
};

export default ContactForm;