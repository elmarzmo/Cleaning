const express = require('express');
const router = express.Router();
const QuoteRequest = require('../models/quoteRequest');

const adminController = require('../controllers/adminController');
const verifyToken = require('../middleware/authMiddleware');




// Admin registration
router.post('/create', adminController.createAdmin);
// Admin login
router.post('/login', adminController.login);


// Protected route example
router.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'This is a protected route', adminId: req.adminId });
});

router.get('/dashboard', verifyToken, async (req, res) => {
    try {
         const quoteRequests = await QuoteRequest.find().sort({ createdAt: -1 });
    res.render('admin-dashboard', { 
        title: 'Admin Dashboard', 
        extraCSS: '/css/admin-dashboard.css', 
        quoteRequests });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;