const QuoteRequest = require('../models/quoteRequest');


// Get all quote requests
exports.getAllQuotes = async (req, res) => {
    try {
        const quotes = await QuoteRequest.find();
        res.status(200).json(quotes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// submitted quote request
exports.submitQuote = async (req, res) => {
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
        res.status(302).redirect('/quote-success');
        
        

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a single quote request by ID
exports.getQuoteById = async (req, res) => {
    try {
        const quote = await QuoteRequest.findById(req.params.id);
        if (!quote) return res.status(404).json({ message: 'Quote request not found' });
        res.status(200).json(quote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// 

// Delete a quote request by ID
exports.deleteQuoteById = async (req, res) => {
    try {   
        const deleted = await QuoteRequest.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Quote request not found' });
        res.status(200).json({ message: 'Quote request deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Toggle star status of a quote request by ID
exports.toggleStarQuoteById = async (req, res) => {
    try {
        const quote = await QuoteRequest.findById(req.params.id);   
        if (!quote) return res.status(404).json({ message: 'Quote request not found' });
        quote.starred = !quote.starred;
        await quote.save();
        res.status(200).json({ message: 'Quote request star status toggled', starred: quote.starred });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};