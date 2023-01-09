
const express = require ('express')
const cartRouter = require('./routes/cart.routes');
const productRouter = require('./routes/product.routes');

const app = express ();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended : true}));

// ROUTES

app.use('/api/cart', cartRouter);
app.use('/api/product', productRouter);	


app.listen (PORT,console.log(`servidor corriendo en el puerto ${PORT}`))