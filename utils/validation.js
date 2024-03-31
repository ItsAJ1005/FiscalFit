const jwt = require("jsonwebtoken");

exports.getUser = async (req, res) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized User" });
    }
    
    try {
        const decodedToken = jwt.verify(token, 'Port-folio-hulala');
        return res.status(200).json({ user: decodedToken });
    } catch (err) {
        console.error(err.message);
        return res.status(401).json({ message: "Unauthorized User" });
    }
};