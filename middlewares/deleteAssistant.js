// importo e leggo il JSON
let blogPosts = require("../db/db-blog.json");



// funzione middleware per eliminare un post
function deleteAssistant(req, res, next) {
    // estrapolo lo slug dalla request
    const reqSlug = req.params.slug;
    // cerco l'elemento nell'array
    const postToDestroy = blogPosts.find(post => post.slug === reqSlug);
    console.log(postToDestroy);
    if(!postToDestroy){  
        return res.status(404).json({
            error: "404",
            message: "Post non trovato"
        });
    }
    // per poter portare fuori dal middleware l'elemento selezionato
    // lo associo ad una key della request
    req.postToDestroy = postToDestroy;
    console.log(req.postToDestroy);
    next();
}


module.exports = deleteAssistant;