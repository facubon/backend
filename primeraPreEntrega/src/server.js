
const express = require ('express')

const app = express ();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended : true}));

// ROUTES

app.listen (PORT,console.log(`servidor corriendo en el puerto ${PORT}`))