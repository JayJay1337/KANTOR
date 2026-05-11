const jwt = require("jsonwebtoken")

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({message: "Brak tokena "});
    const token = authHeader.split(" ")[1]

    try {
        jwt.verify(token, "klucz")
        next()
    } catch (err) {
        return res.status(401).json({message: "Brak tokena "});
    }
}

module.exports = authMiddleware