const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const serviceRoutes = require('./routes/serviceRoutes');

// Load environment variables from .env file
dotenv.config();

// Create an express app
const app = express();

// Middleware to prase JSON
app.use(express.json());

// Use service routes 
app.use('/api/service', serviceRoutes);

//  Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then (()=>{
    console.log(' Connected to MongoDB');

})
.catch((error)=>{
    console.error('MongoDB connection error: ', error);
});

// Start the server 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
