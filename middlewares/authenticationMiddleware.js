const jwt = require('jsonwebtoken');

const requirAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, 'Port-folio-hulala', (err, decodedToken) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(decodedToken);
                next();
            }
        });
    } else {
        console.error('JWT token is not provided.');
        res.status(401).json({ error: 'Unauthorized' });
    }
};

module.exports = { requirAuth };
