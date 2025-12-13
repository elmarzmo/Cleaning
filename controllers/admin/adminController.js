const QuoteRequest = require('../../models/quoteRequest');
const Messages = require('../../models/messages');



// Get dashboard data
exports.getDashboardData = async (req, res) => {
    try {
        const quoteRequest = await QuoteRequest.find().sort({ createdAt: -1 });
        res.status(200).render('admin-dashboard', { 
            title: 'Admin Dashboard', 
            extraCSS: '/css/admin-dashboard.css', 
            layout: 'admin',
            quoteRequest
         });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }   
};

// get message data
exports.getMessages = async (req, res) => {
    try {
        const messages = await Messages.find().sort({ createdAt: -1 });

        // Render the admin-messages view with the retrieved messages
        res.status(200).render('admin-messages', { 
            messages
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
