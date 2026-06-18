import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, try later.',
}));

// Contact form specific limiter
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many contact form submissions, try later.',
});

// Email transporter
const createTransporter = () => nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  pool: true,
  maxConnections: 1,
  tls: {
    rejectUnauthorized: false, // Use with caution, only for testing
  },
});

// Test email endpoint
app.get('/ανα/test-email', async (req, res) => {
  try {
    const transporter = createTransporter();
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.COMPANY_EMAIL || process.env.EMAIL_USER,
      subject: 'Test Email',
      text: 'This is a test email from Teens Creations.',
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Test email sent successfully!' });
  } catch (error) {
    console.error('Test email error:', error);
    res.status(500).json({ success: false, message: 'Failed to send test email.', error: error.message });
  }
});

// Contact form endpoint
app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const { name, email, phone, service, projectTitle, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email address.' });
    }

    const transporter = createTransporter();

    const companyMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.COMPANY_EMAIL || process.env.EMAIL_USER,
      subject: `New Contact Form Submission - ${projectTitle || 'General Inquiry'}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p>Dear Teens Creations Team,</p>
        <p>A new inquiry has been received through the contact form on your website. Below are the details:</p>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px; font-weight: bold;">Name:</td>
            <td style="padding: 8px;">${name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px; font-weight: bold;">Email:</td>
            <td style="padding: 8px;">${email}</td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px; font-weight: bold;">Phone:</td>
            <td style="padding: 8px;">${phone || 'Not provided'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px; font-weight: bold;">Service:</td>
            <td style="padding: 8px;">${service || 'Not specified'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px; font-weight: bold;">Project Title:</td>
            <td style="padding: 8px;">${projectTitle || 'Not specified'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px; font-weight: bold;">Message:</td>
            <td style="padding: 8px;">${message}</td>
          </tr>
        </table>
        <p>Please follow up with the sender at your earliest convenience.</p>
        <p>Best regards,<br>Teens Creations Contact System</p>
      `,
    };

    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank You for Contacting Teens Creations',
      html: `
        <h2>Thank You for Reaching Out!</h2>
        <p>Dear ${name},</p>
        <p>We have received your inquiry through the Teens Creations website. Thank you for considering us for your ${service || 'project needs'}!</p>
        <p><strong>Your Submission Details:</strong></p>
        <ul>
          <li><strong>Project Title:</strong> ${projectTitle || 'Not specified'}</li>
          <li><strong>Message:</strong> ${message}</li>
        </ul>
        <p>Our team will review your message and respond within 1-2 business days. If you have any urgent questions, feel free to reach out to us directly at ${process.env.COMPANY_EMAIL || 'our contact email'}.</p>
        <p>We look forward to discussing your project further!</p>
        <p>Best regards,<br>The Teens Creations Team</p>
      `,
    };

    await Promise.all([
      transporter.sendMail(companyMailOptions),
      transporter.sendMail(userMailOptions),
    ]);

    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Contact form error:', {
      message: error.message,
      stack: error.stack,
      requestBody: req.body,
    });
    res.status(500).json({ success: false, message: 'Failed to send message.', error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => res.json({ success: true, message: 'Server is running!' }));

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});