const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');


// router.post('/submit-quote', quoteController.submitQuote);

// 
router.post('/submit-message', messageController.submitMessage);

module.exports = router;