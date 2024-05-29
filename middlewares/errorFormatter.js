const { error } = require("console");

function errorFormatter(err,req,res,next){
    const statusCode = 500;
    res.format({
        html: () => res.status(statusCode).send(err.message),
        json: () => res.status(statusCode).json({
            statusCode,
            error: err.message, 
            stack: err.message})
    });
}

module.exports = errorFormatter;