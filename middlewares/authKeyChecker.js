// importo jsonWebToken 
const jwt = require("jsonwebtoken");
require("dotenv").config();

function tokenChecker(req, res, next) {
    const authToken = req.headers.authorization;
    if(!authToken) {
        return res.status(401).json({
            error: "401",
            message: "Necessiti di un token per accedere a questa route"
        });

    }
    const tokenSplitted = authToken.split(" ")[1];

    jwt.verify(tokenSplitted, process.env.JWT_SECRET, (err, user) => {
        if(err) {
            return res.status(403).json({
                error: "403",
                message: "Token scaduto"
            });
        }
        req.user = user;
        next();
    });
}

function adminChecker(req, res, next) {
    if(req.user.role !== "admin") {
        return res.status(403).json({
            error: "403",
            message: "Non hai il permesso di accedere a questa route"
        });
    }
    next();
}

module.exports = {
    tokenChecker,
    adminChecker
};