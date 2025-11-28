const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');





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

router.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'This is a protected route', adminId: req.adminId });
});

module.exports = router;