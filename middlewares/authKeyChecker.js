// importo jsonWebToken 
const jwt = require("jsonwebtoken");
require("dotenv").config();

function authChecker(req, res, next) {
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

module.exports = authChecker;