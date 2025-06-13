const express = require('express');
     const router = express.Router();
     const nodemailer = require('nodemailer');
     require('dotenv').config();

     const transporter = nodemailer.createTransport({
       host: 'smtp.hostinger.com',
       port: 465,
       secure: true,
       auth: {
         user: 'info@instantcarpetcleaningservices.com.au',
         pass: 'Baishak@1998'
       },
       tls: {
         rejectUnauthorized: false
       }
     });

     transporter.verify((error, success) => {
       if (error) {
         console.error('SMTP Connection Error:', error);
       } else {
         console.log('SMTP Server is ready to send emails');
       }
     });

     router.post('/', async (req, res) => { // Changed from '/contact' to '/'
       const { name, email, message } = req.body;

       if (!name || !email || !message) {
         return res.status(400).json({ error: 'All fields are required' });
       }

       const mailOptions = {
         from: 'info@instantcarpetcleaningservices.com.au',
         to: 'info@instantcarpetcleaningservices.com.au',
         replyTo: email,
         subject: `New Contact Form Submission from ${name}`,
         text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
         html: `<h3>New Contact Form Submission</h3><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`
       };

       try {
         await transporter.sendMail(mailOptions);
         res.status(200).json({ message: 'Email sent successfully' });
       } catch (error) {
         console.error('Error sending email:', error);
         res.status(500).json({ error: 'Failed to send email' });
       }
     });

     module.exports = router;