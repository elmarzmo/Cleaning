const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const {engine} = require('express-handlebars');
const serviceRoutes = require('./routes/serviceRoutes');
const quoteRequests = require('./routes/quoteRoutes');
const AdminRoutes = require('./routes/adminRoutes');
const QuoteRequest = require('./models/quoteRequest');
const verifyToken = require('./middleware/authMiddleware');
const cookieParser = require('cookie-parser');





// Load environment variables from .env file
dotenv.config();

// Create an express app
const app = express();


// use cookie parser
app.use(cookieParser());


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
// Use quote request routes

app.use('/api/quotes', quoteRequests);


// Use service routes 
app.use('/api/service', serviceRoutes);


// Use admin routes
app.use('/admin-hna46553123', AdminRoutes);






// Quote success page

app.get('/quote-success', (req, res) => {
    res.render('quote-success', { title: 'Cendy&D - Quote Submitted', extraCSS: '/css/quote-success.css' });
});

// 
/*
app.get('/admin-hna46553123/login', (req, res) => {
    res.render('admin-login', { title: 'Admin Login', extraCSS: '/css/admin.css', layout: 'admin' });
});
/*
app.get('/admin-hna46553123/dashboard', (req, res) => {
    //const quotes = await QuoteRequest.find().sort({ createdAt: -1 });
    res.render('admin-dashboard', { title: 'Admin Dashboard', extraCSS: '/css/admin-dashboard.css' });
});
*/
//  Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then (()=> console.log(' Connected to MongoDB'))
.catch((error)=> console.error('MongoDB connection error: ', error));

// Start the server 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);});
