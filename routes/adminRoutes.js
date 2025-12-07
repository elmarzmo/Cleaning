const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const adminController = require('../controllers/adminController');
const verifyToken = require('../middleware/authMiddleware');


router.get('/login', (req, res) => {
    const token = req.cookies.token;
    if (token) {
        try {
            jwt.verify(token, process.env.JWT_SECRET);
            return res.redirect('/admin-hna46553123/dashboard');
        } catch (error) {
            // Invalid token, proceed to login page
            
        }


    }
    res.render('admin-login', { title: 'Admin Login', extraCSS: '/css/admin.css', layout: 'admin' });
});

// Admin registration
router.post('/create', adminController.createAdmin);
// Admin login
router.post('/login', adminController.login);


// Protected route example
router.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'This is a protected route', adminId: req.adminId });
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/admin-hna46553123/login');
});

router.get('/dashboard', verifyToken, adminController.getDashboardData);

router.get('/messages', verifyToken, adminController.getMessages);



module.exports = router;