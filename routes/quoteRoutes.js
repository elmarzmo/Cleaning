const express = require('express');
const router = express.Router();
const QuoteRequest = require('../models/quoteRequest');
const quoteController = require('../controllers/quoteController');

// Get all quote requests
router.get('/', quoteController.getAllQuotes);

// Get a single quote request by ID
router.get('/:id', quoteController.getQuoteById);


// Endpoint to handle quote form submission
router.post('/submit-quote', quoteController.submitQuote);
router.delete('/:id', quoteController.deleteQuoteById);
    


module.exports = router;