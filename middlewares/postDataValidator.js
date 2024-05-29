const validatePostData = (req, res, next) => {

    const { title, content, tags } = req.body;

    if (!title) {
        return res.status(400).json({ error: "Il campo 'title' è richiesto!" });
    } else if (typeof title !== 'string') {
        return res.status(400).json({ error: "Il campo 'title' deve essere una stringa." });
    }

    if (!content) {
        return res.status(400).json({ error: "Il campo 'content' è richiesto!" });
    } else if (typeof content !== 'string') {
        return res.status(400).json({ error: "Il campo 'content' deve essere una stringa." });
    }

    // if (!image) {
    //     return res.status(400).json({ error: "Il campo 'image' è richiesto!" });
    // }

    if (!tags) {
        return res.status(400).json({ error: "Il campo 'tags' è richiesto!" });
    } else if (!Array.isArray(tags) || tags.length === 0) {
        return res.status(400).json({ error: "Il campo 'tags' deve essere un Array con almeno 1 elemento." });
    }

    next();
};

module.exports = validatePostData;