const express = require('express');
const router = express.Router();

const quoteController = require('../controllers/quoteController');

const verifyToken = require('../middleware/authMiddleware');
const  validate  = require('../middleware/validateMiddleware');
const {submitQuoteValidator} = require('../validators/quoteValidator');



// Get all quote requests
router.get('/',verifyToken, quoteController.getAllQuotes);

// Get a single quote request by ID
router.get('/:id', verifyToken, quoteController.getQuoteById);


// Endpoint to handle quote form submission
router.post('/submit-quote',submitQuoteValidator, validate('/quote') ,quoteController.submitQuote);
router.delete('/:id', verifyToken, quoteController.deleteQuoteById);
router.patch('/:id/star',verifyToken, quoteController.toggleStarQuoteById);


module.exports = router;