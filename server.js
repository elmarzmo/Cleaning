const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const {engine} = require('express-handlebars');
const serviceRoutes = require('./routes/serviceRoutes');

// Load environment variables from .env file
dotenv.config();

// Create an express app
const app = express();

// Middleware to prase JSON
app.use(express.json());

// handelbars setup
app.engine('hbs', engine({extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// root for homepage
app.get('/', (req, res) => {
    res.render('home', { title: 'SparkleClean' });
});


// Use service routes 
app.use('/api/service', serviceRoutes);

//  Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then (()=> console.log(' Connected to MongoDB'))
.catch((error)=> console.error('MongoDB connection error: ', error));

// Start the server 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);});
