const jwt = require('jsonwebtoken');
const config = require('../config/config');

function verifyToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({ error: 'Unauthorized - No token provided' });
    }

    jwt.verify(token.split(' ')[1], config.secret, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Unauthorized - Invalid token' });
        }
        req.userId = decoded.userId;
        next();
    });
}

module.exports = { verifyToken };