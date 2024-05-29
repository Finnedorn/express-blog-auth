let blogPosts = require("../db/db-blog.json");

function deleteAssistant(req, res, next) {

    const reqSlug = req.params.slug;
    const postToDestroy = blogPosts.find(post => post.slug === reqSlug);
    if(!postToDestroy){  
        return res.status(404).json({
            error: "404",
            message: "Post non trovato"
        });
    }
    req.postToDestroy = postToDestroy;
    console.log(req.postToDestroy);
    next();
}
module.exports = deleteAssistant;