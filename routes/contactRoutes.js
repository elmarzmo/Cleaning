const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin/adminController');
const verifyToken = require('../middleware/authMiddleware');


// Endpoint to handle contact form submission
router.get('/', adminController.getContacts);

router.post('/update', verifyToken, adminController.updateContacts);


module.exports = router;


