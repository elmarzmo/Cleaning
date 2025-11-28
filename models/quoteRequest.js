const mongoose = require('mongoose');


const quoteSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
   email: {
        type: String,
        required: true
    },
   phone: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    service: {
        type: String,
        required: true
    },
    frequency: {
        type: String,
        required: true
    },
    note: {
        type: String
    },
    
},{ timestamps: true});

module.exports = mongoose.model('QuoteRequest', quoteSchema);