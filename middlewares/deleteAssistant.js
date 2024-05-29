let blogPosts = require("../db/db-blog.json");

function deleteAssistant(req, res, next) {

    const reqSlug = req.params.slug;
    const postToDestroy = blogPosts.find(post => post.slug === reqSlug);
    if(!postToDestroy){  
        return res.status(404).send(`Ci dispiace, non abbiamo trovato il post che vuoi eliminare`);
    }
    req.postToDestroy = postToDestroy;
    console.log(req.postToDestroy);
    next();
}
module.exports = deleteAssistant;