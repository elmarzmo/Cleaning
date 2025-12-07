const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');


// router.post('/submit-quote', quoteController.submitQuote);

// 
router.post('/submit-message', messageController.submitMessage);

// 
router.get('/', messageController.getMessages);

// Delete a message by ID
router.delete('/:id', messageController.deleteMessageById);

// Toggle star status of a message by ID
router.patch('/:id/message-star', messageController.toggleStarMessageById);


module.exports = router;