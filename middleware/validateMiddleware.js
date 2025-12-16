const { validationResult } = require('express-validator');

module.exports = (redirectTo) => {
    return (req, res, next) => {
    

    const errors = validationResult(req);
    if(!errors.isEmpty()){
         const firstError = errors.array()[0].msg;
        return res.redirect(`${redirectTo}?error=${encodeURIComponent(firstError)}`);
        
    }
    next();
};
};