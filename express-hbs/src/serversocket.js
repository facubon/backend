import express from 'express';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.routes.js'
import __dirname from './dirname';
import {server} from 'socket.io';

const app = express();
const httpServer = app.listen (3000, ()=> console.log (`servidor corriendo en el puerto ${3000}`))

const io = new server (httpServer);

// Configuracion handlebars
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    defaultLayout: 'mainsocket'
  }))

  app.set('view engine', 'hbs');
  app.set('views', `${__dirname}/views`);
  app.use (express.static(`${__dirname}/public`))

  app.use(express.json());
  app.use (express.urlencoded({extended:true}));


//routes
app.use ('/', viewsRouter);


io.on ("connection", () => {
    console.log ("se a pasado un nuevo producto");

    socket.emit('productos', 'pasando los productos')
})





