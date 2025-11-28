const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    
    hash: String,
    salt: String

}, { timestamps: true });

// Method to set salt and hash the password for an admin user
adminSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

// Compare password
adminSchema.methods.comparePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

// Method to validate password
adminSchema.methods.generateJWT = function() {
    return jwt.sign({ id: this._id, username: this.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
};


const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;