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

// Get all messages
exports.getMessages = async (req, res) => {
    try {
        const messages = await messageRequest.find();
        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};  
// Delete a message by ID
exports.deleteMessageById = async (req, res) => {
    try {   
        const deleted = await messageRequest.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Message not found' });
        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};  

// Toggle star status of a message by ID
exports.toggleStarMessageById = async (req, res) => {
    try {
        const message = await messageRequest.findById(req.params.id);
        if (!message) return res.status(404).json({ message: 'Message not found' });        
        message.starred = !message.starred;
        await message.save();
        res.status(200).json({ message: 'Message star status toggled', starred: message.starred });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};  
