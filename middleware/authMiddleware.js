const jwt = require('jsonwebtoken');


// Middleware verify JWT token
function verifyToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1] || req.cookies?.token;

    if (!token) return res.status(401).redirect('/admin-hna46553123/login');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.adminId = decoded;
        next();
    }
    catch (error) {
        return res.status(401).redirect('/admin-hna46553123/login');
    }
}

module.exports = verifyToken;