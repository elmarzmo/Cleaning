const mongoose = require('mongoose');

// Define the schema (structure of a messages document)
const messages = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    },
     starred: {
        type: Boolean,
        default: false
    },
    
}, { timestamps: true });

    

module.exports = mongoose.model('Message', messages);  