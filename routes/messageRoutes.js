const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { submitMessageValidator } = require('../validators/messageValidator');
const validate = require('../middleware/validateMiddleware');




// 
router.post('/submit-message', submitMessageValidator, validate('/') ,messageController.submitMessage);

// 
router.get('/', messageController.getMessages);

// Delete a message by ID
router.delete('/:id', messageController.deleteMessageById);

// Toggle star status of a message by ID
router.patch('/:id/message-star', messageController.toggleStarMessageById);


module.exports = router;