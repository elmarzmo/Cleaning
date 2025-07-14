const mongoose = require('mongoose');

// Define the schema (structure of a service document)
const serviceSchema = new mangoose.Schema({
    name: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true
    },
    description: String,

    phoneNumber: Number,
    
});