const admin = require('../models/admin');
const jwt = require('jsonwebtoken');
const QuoteRequest = require('../models/quoteRequest');

// Admin registration

exports.createAdmin = async (req, res) => {
    try {
        console.log("🔥 CREATE ROUTE HIT");
        console.log("BODY:", req.body);
        const { username, password } = req.body;    
        // ckeck if admin already exists
        const existingAdmin = await admin.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }   
        const newAdmin = new admin({ username });
        newAdmin.setPassword(password);
        await newAdmin.save();
        res.status(201).json({ message: 'Admin created successfully' });    
    } catch (error) {
            console.error("REGISTER ERROR:", error);  // <-- ADD THIS

        res.status(500).json({ message: 'Server error' });
    }
};  


exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const adminUser = await admin.findOne({ username });
        if (!adminUser || !adminUser.comparePassword(password)) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = adminUser.generateJWT();

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
           // maxAge: 24 * 60 * 60 * 1000
        });

          res.status(200).json({ message: 'Login successful' });

    } catch (error) {
        console.error("LOGIN ERROR:", error);  
        res.status(500).json({ message: 'Server error' });
    }
};


// 
exports.getDashboardData = async (req, res) => {
    try {
        const quoteRequest = await QuoteRequest.find().sort({ createdAt: -1 });
        res.status(200).render('admin-dashboard', { 
            title: 'Admin Dashboard', 
            extraCSS: '/css/admin-dashboard.css', 
            layout: 'admin',
            quoteRequest
         });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }   
};
