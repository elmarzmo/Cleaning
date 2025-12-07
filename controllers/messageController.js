const messageRequest = require('../models/messages');

exports.submitMessage = async (req, res) => {
    try {
        const newMessage = new messageRequest({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        });
        await newMessage.save();
        res.status(302).redirect('/quote-success');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};  
