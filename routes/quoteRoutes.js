const express = require('express');
const router = express.Router();
const QuoteRequest = require('../models/quoteRequest');

// Endpoint to handle quote form submission
router.post('/submit-quote', async (req, res) => {
    try { 
        const newQuote = new QuoteRequest({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            zip: req.body.zip,
            service: req.body.service,
            frequency: req.body.frequency,
            notes: req.body.notes
        });
        await newQuote.save();
       
        console.log('Quote request received: ',{name: req.body.name });
        res.status(200).redirect('/quote-success');   
        } catch (error) {
            console.error('Error processing quote request: ', error);
        res.status(500).json({message: 'Error processing quote request'});
        }
});

module.exports = router;