const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');


// Middleware verify JWT token
function verifyToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.adminId = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}   

// Admin login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await Admin.findOne({ username });
        if (!admin || !(await admin.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = admin.generateJWT();
        res.json({ token });
    } catch (error) {

        res.status(500).json({ message: 'Server error' });
    }
});


// Protected route example
router.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'This is a protected route', adminId: req.adminId });
});


router.post('/create', async (req, res) => {
    try {
        console.log("🔥 CREATE ROUTE HIT");
        console.log("BODY:", req.body);
        const { username, password } = req.body;

        // ckeck if admin already exists
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }
        const newAdmin = new Admin({ username });
        newAdmin.setPassword(password);
        await newAdmin.save();
        res.status(201).json({ message: 'Admin created successfully' });
        
    } catch (error) {
            console.error("REGISTER ERROR:", error);  // <-- ADD THIS

        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;