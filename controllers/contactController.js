const Contact = require('../models/contact');

exports.loadContact = async (req, res, next) => {
    try{
        const contact = await Contact.findOne().lean();
        res.locals.contact = contact;
        next();
    } catch{
        console.error(err);
        next();
    }
    
};




// Get contact form submissions
exports.getAdminContacts = async (req, res) => {
    try {
        const contactData = await Contact.findOne().lean();
        const success = req.query.success === '1';
        res.render('admin-contacts', { 
            title: 'Update Contact Information', 
            extraCSS: '/css/admin-contacts.css',
            layout: 'admin',
            contact: contactData,
            success
         });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};



// Update admin contact form
exports.updateAdminContacts = async (req, res) => {
    try {
        const { phone, email, address, workingHours } = req.body;
        
        const updatedContact = await Contact.findOneAndUpdate(
            {},
            { phone, email, address, workingHours },
            { new: true, upsert: true }
        );
        res.redirect('/admin-hna46553123/update-contacts?success=1');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

