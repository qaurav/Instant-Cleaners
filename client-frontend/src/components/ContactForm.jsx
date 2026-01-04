import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Alert,
  InputAdornment,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import MessageIcon from '@mui/icons-material/Message';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const CONTACT_ENDPOINT = `${API_BASE_URL}/contact`;

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
        timeout: 10000,
      });
      if (response.status === 200 || response.status === 201) {
        setSuccessMsg('Message sent successfully! We will get back to you soon.');
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
      sx={{ 
        width: "100%",
        maxWidth: 600, 
        mx: 'auto',
      }}
    >
      <Typography 
        variant="h5" 
        gutterBottom
        sx={{
          fontWeight: 700,
          color: "#1a1a1a",
          mb: 3,
          fontSize: { xs: "1.5rem", md: "1.75rem" },
        }}
      >
        Get in Touch
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
        fullWidth
        label="Message"
        name="message"
        multiline
        rows={5}
        value={formData.message}
        onChange={handleChange}
        required
        margin="normal"
        error={!!errorMsg && errorMsg.includes('Message')}
        helperText={errorMsg.includes('Message') ? errorMsg : ''}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ alignSelf: "flex-start", mt: 2 }}>
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
        startIcon={<SendIcon />}
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
        {submitting ? 'Sending...' : 'Send Message'}
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
      
      {errorMsg && !errorMsg.includes('Name') && !errorMsg.includes('email') && !errorMsg.includes('Message') && (
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

export default ContactForm;