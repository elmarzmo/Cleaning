const mongoose = require('mongoose');

// Define the schema (structure of a messages document)
const contactSchema = new mongoose.Schema({
    phone: {
        type: String,
        default: '(870) 316-2209'
    },
    email: {
        type: String,
        default: 'contact@example.com'
    },
    address: {
        type: String,
        default: ' Memphis, TN 38119'
    },
    workingHours: {
        type: String,
        default: 'Mon-Fri 9am-5pm',
    },
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);