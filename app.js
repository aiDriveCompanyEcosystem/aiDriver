// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Import route files
const homeRoutes = require('./routes/homeRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const contactRoutes = require('./routes/contactRoutes');

// Import middleware files
const authMiddleware = require('./middleware/authMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');

// Create an instance of the Express application
const app = express();

// Configure the application
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define the application routes
app.use('/', homeRoutes);
app.use('/about', aboutRoutes);
app.use('/contact', contactRoutes);

// Define the application middleware
app.use(authMiddleware);
app.use(errorMiddleware);

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost:27017/aiDriverDB', { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((err) => {
        console.error('Error connecting to the database', err);
    });

// Start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
