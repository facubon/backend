import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './dirname';
import productRoutes from './routes/home.routes.js';


const app = express();


//Los productos a llamar:
const products = [
      {name:"producto1", price:1000, code:10},
      {name:"producto2", price:2000, code:30},
      {name:"producto3", price:6000, code:80}

]


// Configuracion handlebars
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    defaultLayout: 'main'
  }))

  app.set('view engine', 'hbs');
  app.set('views', `${__dirname}/views`);


  //Endpoints
  app.get ('/', (req, res) => {
    res.render ('index',{
      title: 'Todos los productos agregados',

      product:products
    })
  })


  app.get ('/realtimeproducts', (req,res)=>{

  })



  app.get('/succes')

  app.use('/products', productRoutes)

  app.listen(8080, () => console.log('Server corriendo en el puerto 8080'))