// importo e inizializzo express
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

// setto i middlewares
app.use(express.static('public'));
app.use(express.json());
const errorFormatter = require("./middlewares/errorFormatter");
const morgan = require("morgan");
app.use(morgan('dev'));

//importo le routes
const postRouter = require("./routers/postRouter");
// const authRouter = require("./routers/authRouter");



// rotta di default
app.get('/',(req,res) =>{
    res.redirect('/posts');
});


// rotta posts
app.use('/posts', postRouter);

app.use(errorFormatter);

// attivo il server
app.listen(port, () => {
    console.log(`Sto runnando il server su http://localhost:${port}`);
});