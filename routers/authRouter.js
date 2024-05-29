// importo express
const express = require("express");
const router = express.Router();
// importo il controller con le variabili middleware di autenticazione
const auth = require("../controllers/Auth");

router.post("/", auth.login);

module.exports = router;