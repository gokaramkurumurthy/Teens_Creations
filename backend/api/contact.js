import nodemailer from 'nodemailer';

export default async function handler(req, res) {

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }

  const { name, email, phone, service, projectTitle, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Required fields missing',
    });
  }

  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  const companyEmail = process.env.COMPANY_EMAIL || emailUser;

  if (!emailUser || !emailPass) {
    console.warn('Email credentials are not configured. Contact form submission was logged only.');
    return res.status(200).json({
      success: true,
      message: 'Message received locally. Configure EMAIL_USER and EMAIL_PASS to send it by email.',
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    await transporter.sendMail({
      from: `"Teens Creations Website" <${emailUser}>`,
      to: companyEmail,
      replyTo: email,
      subject: `New Contact Form Submission – ${projectTitle || 'No Title'}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Service:</strong> ${service || 'N/A'}</p>
        <p><strong>Project Title:</strong> ${projectTitle || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully',
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: 'Failed to send email',
    });
  }
}