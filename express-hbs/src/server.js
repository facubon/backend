import express from 'express';
import handlebars from 'express-handlebars';

const app = express();

// Configuracion handlebars
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    defaultLayout: 'main'
  }))

  app.set('view engine', 'hbs');
  app.set('views', `${__dirname}/views`);


  app.listen(3000, () => console.log('Server corriendo en el puerto 3000'))