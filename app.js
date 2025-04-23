const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const contactController = require('./controllers/contactController');

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Routes
app.get('/', (req, res) => {
  res.render('home', { 
    title: 'Home', 
    message: req.session.message
  });
  // Clear message after displaying
  req.session.message = null;
});

app.get('/contact', contactController.getContactForm);
app.post('/contact', contactController.submitContact);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
