// importo e leggo il JSON
let users = require("../db/db-users.json");
// importo il middleware
const {tokenGenerator} = require("../middlewares/jwt");

function login(req, res) {
    const {username, password} = req.body;
    const loginUser = users.find(user => user.username === username && user.password === password);
    if(loginUser){
        const token = tokenGenerator(loginUser);
        res.json({token});
    }else{
        res.status(404).json({
            error: "404",
            message: "Username o password non corretti"
        });
    }
};

module.exports= {
    login
}