import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import backendContactHandler from '../backend/api/contact.js';

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
app.post('/api/contact', contactLimiter, backendContactHandler);
app.post('/api/contact.php', contactLimiter, backendContactHandler);

// Health check
app.get('/api/health', (req, res) => res.json({ success: true, message: 'Server is running!' }));

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  const frontendBuildDir = path.join(__dirname, 'build');
  app.use(express.static(frontendBuildDir));
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendBuildDir, 'index.html'));
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