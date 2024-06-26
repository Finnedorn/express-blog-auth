// importo express
const express = require("express");
const router = express.Router();
// importo il controller
const postController = require("../controllers/postController");
// setto i middlewares
router.use(express.urlencoded({extended:true}));
const multer = require("multer");
const storage = multer({dest: "public"});
const postDataValidator = require("../middlewares/postDataValidator");
const deleteAssistant = require("../middlewares/deleteAssistant");
// importo il controller con i middleware di autenticazione
const auth = require("../controllers/Auth");



// setto la route base affinche mi mostri il contenuto della funzione index
router.get("/", postController.index);

// la route dello show di ciascun post
router.get("/:slug", postController.show);

// setto la route post a cui invierò del contenuto col quale aggiornerò l'array/json
router.post("/", auth.tokenChecker, storage.single("image"), postDataValidator, postController.store);

// route per l'eliminazione di un elemento
router.delete("/:slug", auth.tokenChecker, auth.adminChecker, deleteAssistant, postController.destroy);



// esporto il modulo
module.exports = router;