const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const authMiddleware = require("../middleware/authMiddleware");
const nodemailer = require("nodemailer");

// Configure Nodemailer transporter with your credentials
const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com", // Assuming you use Office365 for your domain email
  port: 465,
  secure: true, // TLS
  auth: {
    user: "info@instantcarpetcleaningservices.com.au",
    pass: "Baishak@1998",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Connection Error:", error);
  } else {
    console.log("SMTP Server is ready to send emails via booking form");
  }
});

// Create a new booking (public)
router.post("/", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    console.log(booking.email);
    
    await booking.save();

    // Populate the service field to get service details
    await booking.populate("service");

    // Prepare email content with service name
    const mailOptions = {
      from: '"Instant Carpet Cleaning" <info@instantcarpetcleaningservices.com.au>',
      to: booking.email,
      subject: "Booking Received - Instant Carpet Cleaning Services",
      text: `
Dear ${booking.clientName},

Thank you for booking the "${
        booking.service?.name || "service"
      }" with Instant Carpet Cleaning Services.

We have received your booking request for the service on ${booking.bookingDate}.

Our team will shortly confirm the appointment.

If you have any questions, feel free to reply to this email.

Best regards,
Instant Carpet Cleaning Team
      `,
      // Optional:  html version here if desired
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending confirmation email:", error);
        return res.status(201).json({
          booking,
          message: "Booking created but failed to send confirmation email.",
        });
      } else {
        console.log("Confirmation email sent:", info.response);
        res.status(201).json({
          booking,
          message: "Booking created and received email sent.",
        });
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all bookings (admin only)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find().populate("service");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get completed bookings (admin only)
router.get("/completed", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ status: "completed" }).populate(
      "service"
    );
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get booking by ID (admin only)
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("service");
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update booking (admin only)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete booking (admin only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Booking deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
