const mongoose = require('mongoose');


const quoteSchema= new mongoose.Schema({
    cutomerName: {
        type: String,
        required: true
    },
    address: String,
    serviceRequested: { type: String, 
        required: true},
        additionalNotes: String,
        estimatedPrice: Number, // for later!!
});

