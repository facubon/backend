import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './dirname';

const app = express();

//Handlebars config
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    defaultLayout: 'main'
}))

app.set('view engine', 'hbs');
app.set('views', `${__dirname}/public`);

//Endpoint
app.get ('/', (req,res)=>{
    res.render('index', {
        title: 'websockts and Hbs',
        name:'emi',
        age:25,
    })
})


app.listen(8080, () => console.log ('server corriendo en el puerto 8080'))