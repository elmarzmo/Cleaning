const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const verifyToken = require('../middleware/authMiddleware');




// Admin registration
router.post('/admin/create', adminController.createAdmin);
// Admin login
router.post('/admin/login', adminController.login);


// Protected route example
router.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'This is a protected route', adminId: req.adminId });
});


module.exports = router;