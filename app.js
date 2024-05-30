// importo e inizializzo express
const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8080;

// setto i middlewares
app.use(express.static('public'));
// i middleware per accogliere e leggere json/urlencoded/form-data
// all'interno della req.body
app.use(express.json());
const errorFormatter = require("./middlewares/errorFormatter");
const morgan = require("morgan");
app.use(morgan('dev'));

//importo le routes
const postRouter = require("./routers/postRouter");
const authRouter = require("./routers/authRouter");



// rotta di default
app.get('/',(req,res) =>{
    res.redirect("/posts");
});

// rotta di auth
app.use("/login", authRouter);

// rotta posts
app.use('/posts', postRouter);

// abilito il middleware per gestire gli errori
// essendo un middleware il cui scopo è fare il catch di possibili errori
// lo inserisco prima di abilitare il server così che quest'ultimo non blocchi l'esecuzione delle altre routes
app.use(errorFormatter);

// attivo il server
app.listen(port, () => {
    console.log(`Sto runnando il server su http://localhost:${port}`);
});


// NOTA: i middleware e le routes si leggono secondo l'ordine in cui sono definite
// di conseguenza se io volessi negare l'accesso di alcune rotte dietro authetication dovrei
// spostare la route di /login prima delle rotte che voglio proteggere ed inserire per le rotte i middleware di controllo