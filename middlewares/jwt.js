// importo jsonWebToken 
const jwt = require("jsonwebtoken");
require("dotenv").config();

function tokenGenerator(user) {
    const newToken = jwt.sign(user, process.env.JWT_SECRET, {expiresIn: "2m"});
    return newToken;
};

module.exports = {
    tokenGenerator
};