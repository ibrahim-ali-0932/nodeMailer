// ------------------------------------
// controllers/contactController.js
// ------------------------------------
const Contact = require('../models/contact');
const emailService = require('../services/emailService');

exports.getContactForm = (req, res) => {
  res.render('contact', { 
    title: 'Contact Us',
    message: req.session.message
  });
  // Clear message after displaying
  req.session.message = null;
};

exports.submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Validate input
    if (!name || !email || !message) {
      req.session.message = { type: 'error', text: 'All fields are required' };
      return res.redirect('/contact');
    }
    
    // Save to database
    const contact = new Contact({
      name,
      email,
      message
    });
    await contact.save();
    
    // Send email notification
    const emailResult = await emailService.sendContactNotification({
      name,
      email,
      message
    });
    
    // Send confirmation email to user
    await emailService.sendContactConfirmation({
      name,
      email
    });
    
    req.session.message = { type: 'success', text: 'Message sent successfully!' };
    res.redirect('/');
    
  } catch (error) {
    console.error('Contact submission error:', error);
    req.session.message = { type: 'error', text: 'An error occurred. Please try again.' };
    res.redirect('/contact');
  }
};