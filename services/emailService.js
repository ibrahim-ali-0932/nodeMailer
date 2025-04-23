// ------------------------------------
// services/emailService.js
// ------------------------------------
const nodemailer = require('nodemailer');
const config = require('../config/email');

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: config.host,
  port: config.port,
  secure: config.secure,
  auth: {
    user: config.auth.user,
    pass: config.auth.pass
  }
});

// Send notification email to admin
exports.sendContactNotification = async ({ name, email, message }) => {
  const mailOptions = {
    from: `"${config.fromName}" <${config.fromEmail}>`,
    to: config.adminEmail,
    subject: 'New Contact Form Submission',
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `
  };

  return transporter.sendMail(mailOptions);
};

// Send confirmation email to user
exports.sendContactConfirmation = async ({ name, email }) => {
  const mailOptions = {
    from: `"${config.fromName}" <${config.fromEmail}>`,
    to: email,
    subject: 'Thank you for contacting us',
    html: `
      <h2>Thank you for your message, ${name}!</h2>
      <p>We have received your inquiry and will get back to you as soon as possible.</p>
      <p>Best regards,<br>The Team</p>
    `
  };

  return transporter.sendMail(mailOptions);
};