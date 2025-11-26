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

app.use(express.static('public'));
// Middleware to prase JSON
app.use(express.json());

// 
app.use(express.urlencoded({ extended: true }));
// handelbars setup
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
    helpers: {
        eq: (a, b) => a === b
    }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// root for homepage
app.get('/', (req, res) => {
    res.render('home', { title: 'Cendy&D' });
});

app.get('/quote', (req, res) => {
    const selectedService = req.query['service-type'] || 'basic';
    res.render('quote', { title: 'Cendy&D' , extraCSS: '/css/quote.css', selectedService });
});

app.get('/services', (req, res) => {
    res.render('services', { title: 'Cendy&D' , extraCSS: '/css/services.css'});
});

// Endpoint to handle quote form submission 

app.post('/submit-quote', (req, res) => {
    try {
    const {name, email, phone, serviceType, frequency} = req.body;
    // Here you can process the quote request, e.g., save to database or send email
    console.log('Quote request received: ', req.body);
    res.status(200).redirect('/quote-success');   
    } catch (error) {
        console.error('Error processing quote request: ', error);
    res.status(500).json({message: 'Error processing quote request'});
    }
});
// Use service routes 
app.use('/api/service', serviceRoutes);

app.get('/quote-success', (req, res) => {
    res.render('quote-success', { title: 'Cendy&D - Quote Submitted', extraCSS: '/css/quote-success.css' });
});

//  Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then (()=> console.log(' Connected to MongoDB'))
.catch((error)=> console.error('MongoDB connection error: ', error));

// Start the server 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);});
