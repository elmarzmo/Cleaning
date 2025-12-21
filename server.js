// server.js
const dotenv = require('dotenv');


// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const {engine} = require('express-handlebars');
const {loadContact} = require('./controllers/contactController');

// Import route handlers


const quoteRequests = require('./routes/quoteRoutes');
const AdminRoutes = require('./routes/adminRoutes');

const messageRoutes = require('./routes/messageRoutes');
const contactRoutes = require('./routes/contactRoutes');


// Import Contact model need to be deleted later
const Contact = require('./models/contact');

// Create an express app
const app = express();


// Load environment variables from .env file
dotenv.config();


// global Middleware


// use cookie parser
app.use(cookieParser());
// use express 
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


// Inject global view  Data
app.use(loadContact);

// public pages
// root for homepage
app.get('/', (req, res) => {
    res.render('home', { title: 'C&D Cleaning Services' });
});
// root for quote page
app.get('/quote', (req, res) => {
    const selectedService = req.query['service-type'] || 'basic';
    res.render('quote', { title: 'C&D Cleaning Services' , extraCSS: '/css/quote.css', selectedService });
});
// services page
app.get('/services', (req, res) => {
    res.render('services', { title: 'C&D Cleaning Services' , extraCSS: '/css/services.css'});
});
// Quote success page

app.get('/quote-success', (req, res) => {
    res.render('quote-success', { title: 'Cendy&D - Quote Submitted', extraCSS: '/css/quote-success.css' });
});

/*----------------------------
   API Routes
------------------------------*/
// Use quote request routes
app.use('/api/quotes', quoteRequests);
// Use contact routes
app.use('/api/contacts', contactRoutes);
// Use message routes
app.use('/api/messages', messageRoutes);
// Use service routes 

/*----------------------------
Admin Routes
--------------------------------*/

// Use admin routes
app.use('/admin-hna46553123', AdminRoutes);

//  debug delete late


app.get('/debug-contact', async (req, res) => {
    const data = await Contact.findOne();
    res.json(data);
});


//  Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then (()=> console.log(' Connected to MongoDB'))
.catch((error)=> console.error('MongoDB connection error: ', error));

// Start the server 
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);});
