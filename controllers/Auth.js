// importo jsonWebToken 
const jwt = require("jsonwebtoken");
// importo dotenv per leggere la secret key
require("dotenv").config();
// importo e leggo il JSON
let users = require("../db/db-users.json");


// creo una funzione di middleware per generare il token alla chiamata /login
function tokenGenerator(user) {
    // creo il token tramite il metodo sign di jwt
    // sign accetta 3 parametri: l'oggetto user ovvero l'utente che io importo nella funzione,
    // la key che ho storato nell'env e un oggetto con la durata del token (2m = 2 minuti / 2h = 2 ore / 2d = 2 giorni)
    // nel caso in cui non inserisca quest'ultimo, la durata di default del token sarà di 1h 
    const newToken = jwt.sign(user, process.env.JWT_SECRET, {expiresIn: "2m"});
    return newToken;
};

// funzione middleware di login 
// (non ho un parametro per next in quanto restituisco un json)
function login(req, res) {
    // prendo i valori inviati dall'utente dal request body 
    const {username, password} = req.body;
    if(!username || !password) {
        return res.status(400).json({
            error: "400",
            message: "Username o password mancanti"
        });
    }
    // con un find cerco l'elemento nell'array
    const loginUser = users.find(user => user.username === username && user.password === password);
    if(loginUser){
        // genero il token per l'utente
        const token = tokenGenerator(loginUser);
        // lo mando in risposta tramite json
        res.json({
            token : token,
            user : loginUser.username,
            role : loginUser.role
        });
    }else{
        return res.status(404).json({
            error: "404",
            message: "Username o password non corretti"
        });
    }
};

// funzione di middleware per controllare il token
function tokenChecker(req, res, next) {
    // prendo i valori inviati dall'utente nell'header della request
    // in postman -> headers -> authorization: 'Bearer ' + token
    const authToken = req.headers.authorization;
    if(!authToken) {
        return res.status(401).json({
            error: "401",
            message: "Necessiti di un token per accedere a questa route"
        });

    }
    // splitto il token per togliere il suffisso Bearer
    // e mi storo in tokenSplitted solo il valore del token
    const tokenSplitted = authToken.split(" ")[1];

    // verifico il token con il metodo verify
    // accetta 2 parametri: il token, la key che ho storata nell'env
    // inoltre mi restituisce un callback con 2 parametri: err e user 
    jwt.verify(tokenSplitted, process.env.JWT_SECRET, (err, user) => {
        if(err) {
            let errorMessage = "Accesso negato:"
            switch(err.message){
                case "jwt expired":
                    errorMessage += "Token scaduto";
                break;
                case "jwt malformed":
                    errorMessage += "Token non corretto";
                break;
                default:
                    errorMessage += "Token non valido";
                break;
            }
        }
        // se il token è valido l'utente non incapperà nel catch
        req.user = user;
        next();
    });
}

// funzione di middleware per controllare che l'utente sia admin
function adminChecker(req, res, next) {
    // se l'utente non ha admin restituisco un 403
    if(req.user.role !== "admin") {
        return res.status(403).json({
            error: "403",
            message: "Non hai il permesso di accedere a questa route"
        });
    }
    // altrimenti puo continuare l'operazione
    next();
}

module.exports= {
    login,
    tokenChecker,
    adminChecker
}