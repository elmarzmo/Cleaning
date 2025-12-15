const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
         const firstError = errors.array()[0].msg;
        return res.redirect(`/services?error=${encodeURIComponent(firstError)}`);
        
    }
    next();
};